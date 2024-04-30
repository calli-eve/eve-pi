"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { memo, useCallback, useEffect, useState } from "react";
import { AccessToken, CharacterUpdate, Env, PlanetWithInfo } from "../types";
import { MainGrid } from "./components/MainGrid";
import { refreshToken } from "@/esi-sso";
import {
  CharacterContext,
  ColorContext,
  ColorSelectionType,
  SessionContext,
  defaultColors,
} from "./context/Context";
import { useSearchParams } from "next/navigation";
import { EvePraisalResult, fetchAllPrices } from "@/eve-praisal";
import { getPlanet, getPlanetUniverse, getPlanets } from "@/planets";
import { PlanetConfig } from "./components/PlanetConfig/PlanetConfigDialog";

const Home = () => {
  const [characters, setCharacters] = useState<AccessToken[]>([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [environment, setEnvironment] = useState<Env | undefined>(undefined);
  const [compactMode, setCompactMode] = useState(false);
  const [planMode, setPlanMode] = useState(false);
  const [piPrices, setPiPrices] = useState<EvePraisalResult | undefined>(
    undefined,
  );

  const [colors, setColors] = useState<ColorSelectionType>(defaultColors);
  const [alertMode, setAlertMode] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams && searchParams.get("code");

  const deleteCharacter = (character: AccessToken) => {
    const charactersToSave = characters.filter(
      (c) => character.character.characterId !== c.character.characterId,
    );
    setCharacters(charactersToSave);
    saveCharacters(charactersToSave);
  };

  const updateCharacter = (
    character: AccessToken,
    updates: CharacterUpdate,
  ) => {
    const charactersToSave = characters.map((c) => {
      if (c.character.characterId === character.character.characterId)
        return {
          ...c,
          ...(updates.account ? { account: updates.account } : {}),
          ...(updates.comment ? { comment: updates.comment } : {}),
          ...(updates.system ? { system: updates.system } : {}),
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
    characters: AccessToken[],
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

  const initializeCharacterPlanets = (
    characters: AccessToken[],
  ): Promise<AccessToken[]> =>
    Promise.all(
      characters.map(async (c) => {
        const planets = await getPlanets(c);
        const planetsWithInfo: PlanetWithInfo[] = await Promise.all(
          planets.map(async (p) => ({
            ...p,
            info: await getPlanet(c, p),
            infoUniverse: await getPlanetUniverse(p),
          })),
        );
        return {
          ...c,
          planets: planetsWithInfo,
        };
      }),
    );

  const saveCharacters = (characters: AccessToken[]): AccessToken[] => {
    localStorage.setItem("characters", JSON.stringify(characters));
    return characters;
  };

  const restoreCharacters = (characters: AccessToken[]) => {
    refreshSession(characters)
      .then(saveCharacters)
      .then(initializeCharacterPlanets)
      .then(setCharacters);
  };

  const toggleCompactMode = () => {
    setCompactMode(!compactMode);
  };

  const togglePlanMode = () => {
    setPlanMode(!planMode);
  };

  const toggleAlertMode = () => {
    setAlertMode(!alertMode);
  };

  const updatePlanetConfig = (config: PlanetConfig) => {
    console.log("poop");
  };

  const readPlanetConfig = ({
    planetId,
    characterId,
  }: {
    planetId: number;
    characterId: number;
  }): PlanetConfig => {
    const defaultConfig = { planetId, characterId, excludeFromTotals: false };

    return defaultConfig;
  };

  useEffect(() => {
    const storedCompactMode = localStorage.getItem("compactMode");
    if (!storedCompactMode) return;
    storedCompactMode === "true" ? setCompactMode(true) : false;
  }, []);

  useEffect(() => {
    const storedColors = localStorage.getItem("colors");
    if (!storedColors) return;
    setColors(JSON.parse(storedColors));
  }, []);

  useEffect(() => {
    const storedAlertMode = localStorage.getItem("alertMode");
    if (!storedAlertMode) return;
    setAlertMode(JSON.parse(storedAlertMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("compactMode", compactMode ? "true" : "false");
  }, [compactMode]);

  useEffect(() => {
    localStorage.setItem("alertMode", alertMode ? "true" : "false");
  }, [alertMode]);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

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
      .then(initializeCharacterPlanets)
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
      refreshSession(characters)
        .then(saveCharacters)
        .then(initializeCharacterPlanets)
        .then(setCharacters);
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
        planMode,
        togglePlanMode,
        piPrices,
        alertMode,
        toggleAlertMode,
        updatePlanetConfig,
        readPlanetConfig,
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
        <ColorContext.Provider value={{ colors: colors, setColors: setColors }}>
          <MainGrid />
        </ColorContext.Provider>
      </CharacterContext.Provider>
    </SessionContext.Provider>
  );
};

export default memo(Home);
