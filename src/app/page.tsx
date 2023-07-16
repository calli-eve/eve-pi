"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { memo, useCallback, useEffect, useState } from "react";
import { AccessToken, CharacterUpdate, Env } from "../types";
import { MainGrid } from "./components/MainGrid";
import { refreshToken } from "@/esi-sso";
import { CharacterContext, SessionContext } from "./context/Context";
import { useSearchParams } from "next/navigation";
import { EvePraisalResult, fetchAllPrices } from "@/eve-praisal";

const Home = () => {
  const [characters, setCharacters] = useState<AccessToken[]>([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [environment, setEnvironment] = useState<Env | undefined>(undefined);
  const [compactMode, setCompactMode] = useState(false);
  const [piPrices, setPiPrices] = useState<EvePraisalResult | undefined>(
    undefined
  );

  const searchParams = useSearchParams();
  const code = searchParams && searchParams.get("code");

  // Memoize chracter state manipulations

  const deleteCharacter = (character: AccessToken) => {
    const charactersToSave = characters.filter(
      (c) => character.character.characterId !== c.character.characterId
    );
    setCharacters(charactersToSave);
    saveCharacters(charactersToSave);
  };

  const updateCharacter = (
    character: AccessToken,
    updates: CharacterUpdate
  ) => {
    const charactersToSave = characters.map((c) => {
      if (c.character.characterId === character.character.characterId)
        return {
          ...c,
          ...(updates.account ? { account: updates.account } : {}),
        };
      return c;
    });
    setCharacters(charactersToSave);
    saveCharacters(charactersToSave);
  };

  const refreshSession = (characters: AccessToken[]) => {
    return Promise.all(characters.map((c) => refreshToken(c)));
  };

  const handleCallback = async (
    characters: AccessToken[]
  ): Promise<AccessToken[]> => {
    if (code) {
      window.history.replaceState(null, "", "/");
      const res = await fetch(`api/token?code=${code}`);
      return [...characters, await res.json()];
    }
    return Promise.resolve(characters);
  };

  const initializeCharacters = useCallback((): AccessToken[] => {
    const localStorageCharacters = localStorage.getItem("characters");
    if (localStorageCharacters) {
      const characterArray: AccessToken[] = JSON.parse(localStorageCharacters);
      return characterArray;
    }
    return [];
  }, []);

  const saveCharacters = (characters: AccessToken[]): AccessToken[] => {
    localStorage.setItem("characters", JSON.stringify(characters));
    return characters;
  };

  const restoreCharacters = (characters: AccessToken[]) => {
    refreshSession(characters).then(saveCharacters).then(setCharacters);
  };

  const toggleCompactMode = () => {
    setCompactMode(!compactMode);
  };

  useEffect(() => {
    const storedCompactMode = localStorage.getItem("compactMode");
    if (!storedCompactMode) return;
    storedCompactMode === "true" ? setCompactMode(true) : false;
  }, []);

  useEffect(() => {
    localStorage.setItem("compactMode", compactMode ? "true" : "false");
  }, [compactMode]);

  // Initialize EVE PI
  useEffect(() => {
    fetch("api/env")
      .then((r) => r.json())
      .then((env) => {
        setEnvironment({
          EVE_SSO_CLIENT_ID: env.EVE_SSO_CLIENT_ID,
          EVE_SSO_CALLBACK_URL: env.EVE_SSO_CALLBACK_URL,
        });
      })
      .then(initializeCharacters)
      .then(refreshSession)
      .then(handleCallback)
      .then(saveCharacters)
      .then(setCharacters)
      .then(() => setSessionReady(true));
  }, []);

  useEffect(() => {
    fetchAllPrices()
      .then(setPiPrices)
      .catch(() => console.log("failed getting pi prices"));
  }, []);

  useEffect(() => {
    const ESI_CACHE_TIME_MS = 600000;
    const interval = setInterval(() => {
      const characters = initializeCharacters();
      refreshSession(characters).then(saveCharacters).then(setCharacters);
    }, ESI_CACHE_TIME_MS);
    return () => clearInterval(interval);
  });
  return (
    <SessionContext.Provider
      value={{
        sessionReady,
        setSessionReady,
        refreshSession,
        EVE_SSO_CALLBACK_URL: environment?.EVE_SSO_CALLBACK_URL ?? "",
        EVE_SSO_CLIENT_ID: environment?.EVE_SSO_CLIENT_ID ?? "",
        compactMode,
        toggleCompactMode,
        piPrices,
      }}
    >
      <CharacterContext.Provider
        value={{
          characters,
          deleteCharacter,
          updateCharacter,
          restoreCharacters,
        }}
      >
        <MainGrid sessionReady={sessionReady} />
      </CharacterContext.Provider>
    </SessionContext.Provider>
  );
};

export default memo(Home);
