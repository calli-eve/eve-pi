import { EvePraisalResult } from "@/eve-praisal";
import { AccessToken, CharacterUpdate, PlanetConfig } from "@/types";
import { Dispatch, SetStateAction, createContext } from "react";

export const CharacterContext = createContext<{
  characters: AccessToken[];
  deleteCharacter: (character: AccessToken) => void;
  updateCharacter: (character: AccessToken, update: CharacterUpdate) => void;
  restoreCharacters: (characters: AccessToken[]) => void;
}>({
  characters: [],
  deleteCharacter: () => {},
  updateCharacter: () => {},
  restoreCharacters: () => {},
});

export const SessionContext = createContext<{
  sessionReady: boolean;
  refreshSession: (characters: AccessToken[]) => void;
  setSessionReady: Dispatch<SetStateAction<boolean>>;
  EVE_SSO_CALLBACK_URL: string;
  EVE_SSO_CLIENT_ID: string;
  compactMode: boolean;
  toggleCompactMode: () => void;
  planMode: boolean;
  togglePlanMode: () => void;
  alertMode: boolean;
  toggleAlertMode: () => void;
  extractionTimeMode: boolean;
  toggleExtractionTimeMode: () => void;
  piPrices: EvePraisalResult | undefined;
  updatePlanetConfig: (config: PlanetConfig) => void;
  readPlanetConfig: ({
    characterId,
    planetId,
  }: {
    characterId: number;
    planetId: number;
  }) => PlanetConfig;
  balanceThreshold: number;
  setBalanceThreshold: Dispatch<SetStateAction<number>>;
  showProductIcons: boolean;
  setShowProductIcons: (show: boolean) => void;
}>({
  sessionReady: false,
  refreshSession: () => {},
  setSessionReady: () => {},
  EVE_SSO_CALLBACK_URL: "",
  EVE_SSO_CLIENT_ID: "",
  compactMode: false,
  toggleCompactMode: () => {},
  planMode: false,
  togglePlanMode: () => {},
  alertMode: false,
  toggleAlertMode: () => {},
  extractionTimeMode: false,
  toggleExtractionTimeMode: () => {},
  piPrices: undefined,
  updatePlanetConfig: () => {},
  readPlanetConfig: ({
    planetId,
    characterId,
  }: {
    planetId: number;
    characterId: number;
  }) => {
    return { characterId, planetId, excludeFromTotals: true };
  },
  balanceThreshold: 1000,
  setBalanceThreshold: () => {},
  showProductIcons: false,
  setShowProductIcons: () => {},
});

export type ColorSelectionType = {
  defaultColor: string;
  expiredColor: string;
  twoHoursColor: string;
  fourHoursColor: string;
  eightHoursColor: string;
  twelveHoursColor: string;
  dayColor: string;
  twoDaysColor: string;
};

export const defaultColors = {
  defaultColor: "#006596",
  expiredColor: "#AB324A",
  twoHoursColor: "#9C4438",
  fourHoursColor: "#765B21",
  eightHoursColor: "#63620D",
  twelveHoursColor: "#2C6C2F",
  dayColor: "#2F695A",
  twoDaysColor: "#2F695A",
};

export const ColorContext = createContext<{
  colors: ColorSelectionType;
  setColors: (colors: ColorSelectionType) => void;
}>({
  colors: defaultColors,
  setColors: () => {},
});
