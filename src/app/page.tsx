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

const Home = () => {
  const [characters, setCharacters] = useState<AccessToken[]>([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [environment, setEnvironment] = useState<Env | undefined>(undefined);

  const searchParams = useSearchParams();
  const code = searchParams && searchParams.get("code");

  // Initialize SSO env
  useEffect(() => {
    fetch("api/env")
      .then((r) => r.json())
      .then((j) => {
        setEnvironment({
          EVE_SSO_CLIENT_ID: j.EVE_SSO_CLIENT_ID,
          EVE_SSO_CALLBACK_URL: j.EVE_SSO_CALLBACK_URL,
        });
      });
  }, []);

  // Memoize chracter state manipulations
  const addCharacter = useCallback((character: AccessToken) => {
    setCharacters((chars) => [
      ...chars.filter(
        (c) => c.character.characterId !== character.character.characterId
      ),
      character,
    ]);
  }, []);

  const deleteCharacter = useCallback(
    (character: AccessToken) => {
      setCharacters(
        characters.filter(
          (c) => character.character.characterId !== c.character.characterId
        )
      );
    },
    [characters]
  );

  const updateCharacter = useCallback(
    (character: AccessToken, updates: CharacterUpdate) => {
      setCharacters(
        characters.map((c) => {
          if (c.character.characterId === character.character.characterId)
            return {
              ...c,
              ...(updates.account ? { account: updates.account } : {}),
            };
          return c;
        })
      );
    },
    [characters]
  );

  const refreshSession = useCallback((characters: AccessToken[]) => {
    Promise.all(characters.map((c) => refreshToken(c)))
      .then(setCharacters)
      .finally(() => setSessionReady(true));
  }, []);

  // Handle EVE SSO callback
  useEffect(() => {
    if (code) {
      window.history.replaceState(null, "", "/");
      fetch(`api/token?code=${code}`)
        .then((res) => res.json())
        .then(addCharacter)
        .catch();
    }
  }, [code, addCharacter]);

  // Initialise saved characters
  useEffect(() => {
    const localStorageCharacters = localStorage.getItem("characters");
    if (localStorageCharacters) {
      const characterArray: AccessToken[] = JSON.parse(localStorageCharacters);
      setCharacters(characterArray);
    }
  }, []);

  // Update saved characters to local storage on state change
  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  return (
    <SessionContext.Provider
      value={{
        sessionReady,
        setSessionReady,
        refreshSession,
        EVE_SSO_CALLBACK_URL: environment?.EVE_SSO_CALLBACK_URL ?? "",
        EVE_SSO_CLIENT_ID: environment?.EVE_SSO_CLIENT_ID ?? "",
      }}
    >
      <CharacterContext.Provider
        value={{
          characters,
          deleteCharacter,
          updateCharacter,
        }}
      >
        <MainGrid sessionReady={sessionReady} />
      </CharacterContext.Provider>
    </SessionContext.Provider>
  );
};

export default memo(Home);
