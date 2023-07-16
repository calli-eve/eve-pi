import { Api } from "./esi-api";

export interface AccessToken {
  access_token: string;
  expires_at: number;
  token_type: "Bearer";
  refresh_token: string;
  character: Character;
  account: string;
  needsLogin: boolean;
}

export interface Character {
  name: string;
  characterId: number;
}

export interface PlanetWithInfo extends Planet {
  info: PlanetInfo;
  infoUniverse: PlanetInfoUniverse;
}
export interface CharacterPlanets {
  name: string;
  characterId: number;
  account?: string;
  planets: PlanetWithInfo[];
}

export interface CharacterUpdate {
  account?: string;
}

export type Planet = EsiType<"v1", "getCharactersCharacterIdPlanets">[number];

export type PlanetInfoUniverse = EsiType<"v1", "getUniversePlanetsPlanetId">;

export type PlanetInfo = EsiType<
  "v3",
  "getCharactersCharacterIdPlanetsPlanetId"
>;

export interface Env {
  EVE_SSO_CALLBACK_URL: string;
  EVE_SSO_CLIENT_ID: string;
}

type EsiApiVersionType = keyof InstanceType<typeof Api<unknown>>;
type EsiApiPathType<V extends EsiApiVersionType> = keyof InstanceType<
  typeof Api<unknown>
>[V];
type EsiApiResponseType<
  V extends EsiApiVersionType,
  T extends EsiApiPathType<V>
> = Awaited<ReturnType<InstanceType<typeof Api<unknown>>[V][T]>>;
export type EsiType<
  V extends EsiApiVersionType,
  T extends EsiApiPathType<V>
> = EsiApiResponseType<V, T> extends { data: any }
  ? EsiApiResponseType<V, T>["data"]
  : never;
