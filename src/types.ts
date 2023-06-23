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

export interface CharacterUpdate {
  account?: string;
}

export interface Planet {
  last_update: string;
  num_pins: number;
  owner_id: number;
  planet_id: number;
  planet_type:
    | "temperate"
    | "barren"
    | "oceanic"
    | "ice"
    | "gas"
    | "lava"
    | "storm"
    | "plasma";
  solar_system_id: number;
  upgrade_level: number;
}

export interface Env {
  EVE_SSO_CALLBACK_URL: string;
  EVE_SSO_CLIENT_ID: string;
}
