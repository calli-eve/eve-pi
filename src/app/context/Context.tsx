import { AccessToken, CharacterUpdate } from "@/types";
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
}>({
  sessionReady: false,
  refreshSession: () => {},
  setSessionReady: () => {},
  EVE_SSO_CALLBACK_URL: "",
  EVE_SSO_CLIENT_ID: "",
});
