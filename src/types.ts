export interface AccessToken {
  access_token: string;
  expires_at: number;
  token_type: "Bearer";
  refresh_token: string;
  character: Character;
  account: string;
  needsLogin: boolean;
  comment: string;
  system: string;
  planets: PlanetWithInfo[];
  planetConfig: PlanetConfig[];
}

export interface Character {
  name: string;
  characterId: number;
}

export interface Planet {
  planet_id: number;
  solar_system_id: number;
  planet_type: "temperate" | "barren" | "oceanic" | "ice" | "gas" | "lava" | "storm" | "plasma";
  last_update: string;
  num_pins: number;
  owner_id: number;
  upgrade_level: number;
}

export interface PlanetInfo {
  links: Array<{
    destination_pin_id: number;
    link_level: number;
    source_pin_id: number;
  }>;
  pins: Pin[];
  routes: Array<{
    content_type_id: number;
    destination_pin_id: number;
    quantity: number;
    route_id: number;
    source_pin_id: number;
    waypoints?: number[];
  }>;
}

export interface PlanetInfoUniverse {
  name: string;
  planet_id: number;
  system_id: number;
  type_id: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export interface PlanetWithInfo extends Planet {
  info: PlanetInfo;
  infoUniverse: PlanetInfoUniverse;
}

export interface CharacterPlanets {
  name: string;
  characterId: number;
  account?: string;
  system?: string;
  planets: PlanetWithInfo[];
}

export interface CharacterUpdate {
  account?: string;
  comment?: string;
  system?: string;
}

export interface Env {
  EVE_SSO_CALLBACK_URL: string;
  EVE_SSO_CLIENT_ID: string;
}

export interface EvePraisalResult {
  appraisal: {
    items: Array<{
      typeID: number;
      prices: {
        sell: {
          min: number;
        };
      };
    }>;
  };
}

export interface Pin {
  pin_id: number;
  type_id: number;
  schematic_id?: number;
  expiry_time?: string;
  install_time?: string;
  latitude: number;
  longitude: number;
  extractor_details?: {
    cycle_time?: number;
    head_radius?: number;
    heads: Array<{
      head_id: number;
      latitude: number;
      longitude: number;
    }>;
    product_type_id?: number;
    qty_per_cycle?: number;
  };
  contents?: Array<{
    type_id: number;
    amount: number;
  }>;
}

export interface PlanetConfig {
  characterId: number;
  planetId: number;
  excludeFromTotals: boolean;
}
