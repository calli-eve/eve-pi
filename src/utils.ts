import { AccessToken, Character } from "./types";

export const extractCharacterFromToken = (token: AccessToken): Character => {
  const decodedToken = parseJwt(token.access_token);
  return {
    name: decodedToken.name,
    characterId: decodedToken.sub.split(":")[2],
  };
};

const parseJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};
