import { AccessToken, Character } from "../types";

export const extractCharacterFromToken = (token: AccessToken): Character | null => {
  const decodedToken = parseJwt(token.access_token);
  if (!decodedToken || !decodedToken.name || !decodedToken.sub) {
    return null;
  }
  return {
    name: decodedToken.name,
    characterId: decodedToken.sub.split(":")[2],
  };
};

const parseJwt = (token: string | undefined) => {
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (error) {
    console.error('Failed to parse JWT token:', error);
    return null;
  }
};
