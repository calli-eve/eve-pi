/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * @format int64
 * @example 1
 */
export type AccessListID = number;

export interface AllianceDetail {
  /** Alliance's creator corporation ID */
  creator_corporation_id: CorporationID;
  /** Alliance's creator ID */
  creator_id: CharacterID;
  /**
   * Alliance's founding date
   * @format date-time
   */
  date_founded: string;
  /** Alliance's executor corporation ID */
  executor_corporation_id?: CorporationID;
  /** Alliance's faction ID */
  faction_id?: FactionID;
  /** Alliance's name */
  name: string;
  /** Alliance's ticker */
  ticker: string;
}

/**
 * @format int64
 * @example 99000001
 */
export type AllianceID = number;

export type AlliancesAllianceIdContactsGet = {
  /** @format int64 */
  contact_id: number;
  contact_type: "character" | "corporation" | "alliance" | "faction";
  label_ids?: number[];
  /**
   * Standing of the contact
   * @format double
   */
  standing: number;
}[];

export type AlliancesAllianceIdContactsLabelsGet = {
  /** @format int64 */
  label_id: number;
  label_name: string;
}[];

/** @uniqueItems true */
export type AlliancesAllianceIdCorporationsGet = number[];

export interface AlliancesAllianceIdIconsGet {
  px128x128?: string;
  px64x64?: string;
}

/** @uniqueItems true */
export type AlliancesGet = number[];

/**
 * @format int64
 * @example 33
 */
export type ArchetypeID = number;

/**
 * @format int64
 * @example 209
 */
export type AttributeID = number;

/**
 * @format int64
 * @example 1
 */
export type BloodlineID = number;

/**
 * @format int64
 * @example 90000001
 */
export type CharacterID = number;

export type CharactersAffiliationPost = {
  /**
   * The character's alliance ID, if their corporation is in an alliance
   * @format int64
   */
  alliance_id?: number;
  /**
   * The character's ID
   * @format int64
   */
  character_id: number;
  /**
   * The character's corporation ID
   * @format int64
   */
  corporation_id: number;
  /**
   * The character's faction ID, if their corporation is in a faction
   * @format int64
   */
  faction_id?: number;
}[];

export type CharactersCharacterIdAgentsResearchGet = {
  /** @format int64 */
  agent_id: number;
  /** @format double */
  points_per_day: number;
  /** @format double */
  remainder_points: number;
  /** @format int64 */
  skill_type_id: number;
  /** @format date-time */
  started_at: string;
}[];

export type CharactersCharacterIdAssetsGet = {
  is_blueprint_copy?: boolean;
  is_singleton: boolean;
  /** @format int64 */
  item_id: number;
  location_flag:
    | "AssetSafety"
    | "AutoFit"
    | "BoosterBay"
    | "CapsuleerDeliveries"
    | "Cargo"
    | "CorporationGoalDeliveries"
    | "CorpseBay"
    | "Deliveries"
    | "DroneBay"
    | "ExpeditionHold"
    | "FighterBay"
    | "FighterTube0"
    | "FighterTube1"
    | "FighterTube2"
    | "FighterTube3"
    | "FighterTube4"
    | "FleetHangar"
    | "FrigateEscapeBay"
    | "Hangar"
    | "HangarAll"
    | "HiSlot0"
    | "HiSlot1"
    | "HiSlot2"
    | "HiSlot3"
    | "HiSlot4"
    | "HiSlot5"
    | "HiSlot6"
    | "HiSlot7"
    | "HiddenModifiers"
    | "Implant"
    | "InfrastructureHangar"
    | "LoSlot0"
    | "LoSlot1"
    | "LoSlot2"
    | "LoSlot3"
    | "LoSlot4"
    | "LoSlot5"
    | "LoSlot6"
    | "LoSlot7"
    | "Locked"
    | "MedSlot0"
    | "MedSlot1"
    | "MedSlot2"
    | "MedSlot3"
    | "MedSlot4"
    | "MedSlot5"
    | "MedSlot6"
    | "MedSlot7"
    | "MobileDepotHold"
    | "MoonMaterialBay"
    | "QuafeBay"
    | "RigSlot0"
    | "RigSlot1"
    | "RigSlot2"
    | "RigSlot3"
    | "RigSlot4"
    | "RigSlot5"
    | "RigSlot6"
    | "RigSlot7"
    | "ShipHangar"
    | "Skill"
    | "SpecializedAmmoHold"
    | "SpecializedAsteroidHold"
    | "SpecializedCommandCenterHold"
    | "SpecializedFuelBay"
    | "SpecializedGasHold"
    | "SpecializedIceHold"
    | "SpecializedIndustrialShipHold"
    | "SpecializedLargeShipHold"
    | "SpecializedMaterialBay"
    | "SpecializedMediumShipHold"
    | "SpecializedMineralHold"
    | "SpecializedOreHold"
    | "SpecializedPlanetaryCommoditiesHold"
    | "SpecializedSalvageHold"
    | "SpecializedShipHold"
    | "SpecializedSmallShipHold"
    | "StructureDeedBay"
    | "SubSystemBay"
    | "SubSystemSlot0"
    | "SubSystemSlot1"
    | "SubSystemSlot2"
    | "SubSystemSlot3"
    | "SubSystemSlot4"
    | "SubSystemSlot5"
    | "SubSystemSlot6"
    | "SubSystemSlot7"
    | "Unlocked"
    | "Wardrobe";
  /** @format int64 */
  location_id: number;
  location_type: "station" | "solar_system" | "item" | "other";
  /** @format int64 */
  quantity: number;
  /** @format int64 */
  type_id: number;
}[];

export type CharactersCharacterIdAssetsLocationsPost = {
  /** @format int64 */
  item_id: number;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
}[];

export type CharactersCharacterIdAssetsNamesPost = {
  /** @format int64 */
  item_id: number;
  name: string;
}[];

export interface CharactersCharacterIdAttributesGet {
  /**
   * Neural remapping cooldown after a character uses remap accrued over time
   * @format date-time
   */
  accrued_remap_cooldown_date?: string;
  /**
   * Number of available bonus character neural remaps
   * @format int64
   */
  bonus_remaps?: number;
  /** @format int64 */
  charisma: number;
  /** @format int64 */
  intelligence: number;
  /**
   * Datetime of last neural remap, including usage of bonus remaps
   * @format date-time
   */
  last_remap_date?: string;
  /** @format int64 */
  memory: number;
  /** @format int64 */
  perception: number;
  /** @format int64 */
  willpower: number;
}

export type CharactersCharacterIdBlueprintsGet = {
  /**
   * Unique ID for this item.
   * @format int64
   */
  item_id: number;
  /** Type of the location_id */
  location_flag:
    | "AutoFit"
    | "Cargo"
    | "CorpseBay"
    | "DroneBay"
    | "FleetHangar"
    | "Deliveries"
    | "HiddenModifiers"
    | "Hangar"
    | "HangarAll"
    | "LoSlot0"
    | "LoSlot1"
    | "LoSlot2"
    | "LoSlot3"
    | "LoSlot4"
    | "LoSlot5"
    | "LoSlot6"
    | "LoSlot7"
    | "MedSlot0"
    | "MedSlot1"
    | "MedSlot2"
    | "MedSlot3"
    | "MedSlot4"
    | "MedSlot5"
    | "MedSlot6"
    | "MedSlot7"
    | "HiSlot0"
    | "HiSlot1"
    | "HiSlot2"
    | "HiSlot3"
    | "HiSlot4"
    | "HiSlot5"
    | "HiSlot6"
    | "HiSlot7"
    | "AssetSafety"
    | "Locked"
    | "Unlocked"
    | "Implant"
    | "QuafeBay"
    | "RigSlot0"
    | "RigSlot1"
    | "RigSlot2"
    | "RigSlot3"
    | "RigSlot4"
    | "RigSlot5"
    | "RigSlot6"
    | "RigSlot7"
    | "ShipHangar"
    | "SpecializedFuelBay"
    | "SpecializedOreHold"
    | "SpecializedGasHold"
    | "SpecializedMineralHold"
    | "SpecializedSalvageHold"
    | "SpecializedShipHold"
    | "SpecializedSmallShipHold"
    | "SpecializedMediumShipHold"
    | "SpecializedLargeShipHold"
    | "SpecializedIndustrialShipHold"
    | "SpecializedAmmoHold"
    | "SpecializedCommandCenterHold"
    | "SpecializedPlanetaryCommoditiesHold"
    | "SpecializedMaterialBay"
    | "SubSystemSlot0"
    | "SubSystemSlot1"
    | "SubSystemSlot2"
    | "SubSystemSlot3"
    | "SubSystemSlot4"
    | "SubSystemSlot5"
    | "SubSystemSlot6"
    | "SubSystemSlot7"
    | "FighterBay"
    | "FighterTube0"
    | "FighterTube1"
    | "FighterTube2"
    | "FighterTube3"
    | "FighterTube4"
    | "Module";
  /**
   * References a station, a ship or an item_id if this blueprint is located within a container. If the return value is an item_id, then the Character AssetList API must be queried to find the container using the given item_id to determine the correct location of the Blueprint.
   * @format int64
   */
  location_id: number;
  /**
   * Material Efficiency Level of the blueprint.
   * @format int64
   */
  material_efficiency: number;
  /**
   * A range of numbers with a minimum of -2 and no maximum value where -1 is an original and -2 is a copy. It can be a positive integer if it is a stack of blueprint originals fresh from the market (e.g. no activities performed on them yet).
   * @format int64
   */
  quantity: number;
  /**
   * Number of runs remaining if the blueprint is a copy, -1 if it is an original.
   * @format int64
   */
  runs: number;
  /**
   * Time Efficiency Level of the blueprint.
   * @format int64
   */
  time_efficiency: number;
  /** @format int64 */
  type_id: number;
}[];

/** List of attendees for a given event */
export type CharactersCharacterIdCalendarEventIdAttendeesGet = {
  /** @format int64 */
  character_id?: number;
  event_response?: "declined" | "not_responded" | "accepted" | "tentative";
}[];

/** Full details of a specific event */
export interface CharactersCharacterIdCalendarEventIdGet {
  /** @format date-time */
  date: string;
  /**
   * Length in minutes
   * @format int64
   */
  duration: number;
  /** @format int64 */
  event_id: number;
  /** @format int64 */
  importance: number;
  /** @format int64 */
  owner_id: number;
  owner_name: string;
  owner_type:
    | "eve_server"
    | "corporation"
    | "faction"
    | "character"
    | "alliance";
  response: string;
  text: string;
  title: string;
}

/** Up to 50 events from now or the event you requested */
export type CharactersCharacterIdCalendarGet = {
  /** @format date-time */
  event_date?: string;
  /** @format int64 */
  event_id?: number;
  event_response?: "declined" | "not_responded" | "accepted" | "tentative";
  /** @format int64 */
  importance?: number;
  title?: string;
}[];

export interface CharactersCharacterIdClonesGet {
  home_location?: {
    /** @format int64 */
    location_id?: number;
    location_type?: "station" | "structure";
  };
  jump_clones: {
    implants: number[];
    /** @format int64 */
    jump_clone_id: number;
    /** @format int64 */
    location_id: number;
    location_type: "station" | "structure";
    name?: string;
  }[];
  /** @format date-time */
  last_clone_jump_date?: string;
  /** @format date-time */
  last_station_change_date?: string;
}

export type CharactersCharacterIdContactsGet = {
  /** @format int64 */
  contact_id: number;
  contact_type: "character" | "corporation" | "alliance" | "faction";
  /** Whether this contact is in the blocked list. Note a missing value denotes unknown, not true or false */
  is_blocked?: boolean;
  /** Whether this contact is being watched */
  is_watched?: boolean;
  label_ids?: number[];
  /**
   * Standing of the contact
   * @format double
   */
  standing: number;
}[];

export type CharactersCharacterIdContactsLabelsGet = {
  /** @format int64 */
  label_id: number;
  label_name: string;
}[];

/** 201 created array */
export type CharactersCharacterIdContactsPost = number[];

export type CharactersCharacterIdContractsContractIdBidsGet = {
  /**
   * The amount bid, in ISK
   * @format double
   */
  amount: number;
  /**
   * Unique ID for the bid
   * @format int64
   */
  bid_id: number;
  /**
   * Character ID of the bidder
   * @format int64
   */
  bidder_id: number;
  /**
   * Datetime when the bid was placed
   * @format date-time
   */
  date_bid: string;
}[];

export type CharactersCharacterIdContractsContractIdItemsGet = {
  /** true if the contract issuer has submitted this item with the contract, false if the isser is asking for this item in the contract */
  is_included: boolean;
  is_singleton: boolean;
  /**
   * Number of items in the stack
   * @format int64
   */
  quantity: number;
  /**
   * -1 indicates that the item is a singleton (non-stackable). If the item happens to be a Blueprint, -1 is an Original and -2 is a Blueprint Copy
   * @format int64
   */
  raw_quantity?: number;
  /**
   * Unique ID for the item
   * @format int64
   */
  record_id: number;
  /**
   * Type ID for item
   * @format int64
   */
  type_id: number;
}[];

export type CharactersCharacterIdContractsGet = {
  /**
   * Who will accept the contract
   * @format int64
   */
  acceptor_id: number;
  /**
   * ID to whom the contract is assigned, can be alliance, corporation or character ID
   * @format int64
   */
  assignee_id: number;
  /** To whom the contract is available */
  availability: "public" | "personal" | "corporation" | "alliance";
  /**
   * Buyout price (for Auctions only)
   * @format double
   */
  buyout?: number;
  /**
   * Collateral price (for Couriers only)
   * @format double
   */
  collateral?: number;
  /** @format int64 */
  contract_id: number;
  /**
   * Date of confirmation of contract
   * @format date-time
   */
  date_accepted?: string;
  /**
   * Date of completed of contract
   * @format date-time
   */
  date_completed?: string;
  /**
   * Expiration date of the contract
   * @format date-time
   */
  date_expired: string;
  /**
   * Сreation date of the contract
   * @format date-time
   */
  date_issued: string;
  /**
   * Number of days to perform the contract
   * @format int64
   */
  days_to_complete?: number;
  /**
   * End location ID (for Couriers contract)
   * @format int64
   */
  end_location_id?: number;
  /** true if the contract was issued on behalf of the issuer's corporation */
  for_corporation: boolean;
  /**
   * Character's corporation ID for the issuer
   * @format int64
   */
  issuer_corporation_id: number;
  /**
   * Character ID for the issuer
   * @format int64
   */
  issuer_id: number;
  /**
   * Price of contract (for ItemsExchange and Auctions)
   * @format double
   */
  price?: number;
  /**
   * Remuneration for contract (for Couriers only)
   * @format double
   */
  reward?: number;
  /**
   * Start location ID (for Couriers contract)
   * @format int64
   */
  start_location_id?: number;
  /** Status of the the contract */
  status:
    | "outstanding"
    | "in_progress"
    | "finished_issuer"
    | "finished_contractor"
    | "finished"
    | "cancelled"
    | "rejected"
    | "failed"
    | "deleted"
    | "reversed";
  /** Title of the contract */
  title?: string;
  /** Type of the contract */
  type: "unknown" | "item_exchange" | "auction" | "courier" | "loan";
  /**
   * Volume of items in the contract
   * @format double
   */
  volume?: number;
}[];

export type CharactersCharacterIdCorporationhistoryGet = {
  /** @format int64 */
  corporation_id: number;
  /** True if the corporation has been deleted */
  is_deleted?: boolean;
  /**
   * An incrementing ID that can be used to canonically establish order of records in cases where dates may be ambiguous
   * @format int64
   */
  record_id: number;
  /** @format date-time */
  start_date: string;
}[];

/**
 * 201 created number
 * @format double
 */
export type CharactersCharacterIdCspaPost = number;

export interface CharactersCharacterIdFatigueGet {
  /**
   * Character's jump fatigue expiry
   * @format date-time
   */
  jump_fatigue_expire_date?: string;
  /**
   * Character's last jump activation
   * @format date-time
   */
  last_jump_date?: string;
  /**
   * Character's last jump update
   * @format date-time
   */
  last_update_date?: string;
}

export type CharactersCharacterIdFittingsGet = {
  description: string;
  /** @format int64 */
  fitting_id: number;
  items: {
    flag:
      | "Cargo"
      | "DroneBay"
      | "FighterBay"
      | "HiSlot0"
      | "HiSlot1"
      | "HiSlot2"
      | "HiSlot3"
      | "HiSlot4"
      | "HiSlot5"
      | "HiSlot6"
      | "HiSlot7"
      | "Invalid"
      | "LoSlot0"
      | "LoSlot1"
      | "LoSlot2"
      | "LoSlot3"
      | "LoSlot4"
      | "LoSlot5"
      | "LoSlot6"
      | "LoSlot7"
      | "MedSlot0"
      | "MedSlot1"
      | "MedSlot2"
      | "MedSlot3"
      | "MedSlot4"
      | "MedSlot5"
      | "MedSlot6"
      | "MedSlot7"
      | "RigSlot0"
      | "RigSlot1"
      | "RigSlot2"
      | "ServiceSlot0"
      | "ServiceSlot1"
      | "ServiceSlot2"
      | "ServiceSlot3"
      | "ServiceSlot4"
      | "ServiceSlot5"
      | "ServiceSlot6"
      | "ServiceSlot7"
      | "SubSystemSlot0"
      | "SubSystemSlot1"
      | "SubSystemSlot2"
      | "SubSystemSlot3";
    /** @format int64 */
    quantity: number;
    /** @format int64 */
    type_id: number;
  }[];
  name: string;
  /** @format int64 */
  ship_type_id: number;
}[];

/** 201 created object */
export interface CharactersCharacterIdFittingsPost {
  /** @format int64 */
  fitting_id: number;
}

export interface CharactersCharacterIdFleetGet {
  /**
   * Character ID of the current fleet boss
   * @format int64
   */
  fleet_boss_id: number;
  /**
   * The character's current fleet ID
   * @format int64
   */
  fleet_id: number;
  /** Member’s role in fleet */
  role:
    | "fleet_commander"
    | "squad_commander"
    | "squad_member"
    | "wing_commander";
  /**
   * ID of the squad the member is in. If not applicable, will be set to -1
   * @format int64
   */
  squad_id: number;
  /**
   * ID of the wing the member is in. If not applicable, will be set to -1
   * @format int64
   */
  wing_id: number;
}

export interface CharactersCharacterIdFwStatsGet {
  /**
   * The given character's current faction rank
   * @format int64
   */
  current_rank?: number;
  /**
   * The enlistment date of the given character into faction warfare. Will not be included if character is not enlisted in faction warfare
   * @format date-time
   */
  enlisted_on?: string;
  /**
   * The faction the given character is enlisted to fight for. Will not be included if character is not enlisted in faction warfare
   * @format int64
   */
  faction_id?: number;
  /**
   * The given character's highest faction rank achieved
   * @format int64
   */
  highest_rank?: number;
  /** Summary of kills done by the given character against enemy factions */
  kills: {
    /**
     * Last week's total number of kills by a given character against enemy factions
     * @format int64
     */
    last_week: number;
    /**
     * Total number of kills by a given character against enemy factions since the character enlisted
     * @format int64
     */
    total: number;
    /**
     * Yesterday's total number of kills by a given character against enemy factions
     * @format int64
     */
    yesterday: number;
  };
  /** Summary of victory points gained by the given character for the enlisted faction */
  victory_points: {
    /**
     * Last week's victory points gained by the given character
     * @format int64
     */
    last_week: number;
    /**
     * Total victory points gained since the given character enlisted
     * @format int64
     */
    total: number;
    /**
     * Yesterday's victory points gained by the given character
     * @format int64
     */
    yesterday: number;
  };
}

export type CharactersCharacterIdImplantsGet = number[];

export type CharactersCharacterIdIndustryJobsGet = {
  /**
   * Job activity ID
   * @format int64
   */
  activity_id: number;
  /** @format int64 */
  blueprint_id: number;
  /**
   * Location ID of the location from which the blueprint was installed. Normally a station ID, but can also be an asset (e.g. container) or corporation facility
   * @format int64
   */
  blueprint_location_id: number;
  /** @format int64 */
  blueprint_type_id: number;
  /**
   * ID of the character which completed this job
   * @format int64
   */
  completed_character_id?: number;
  /**
   * Date and time when this job was completed
   * @format date-time
   */
  completed_date?: string;
  /**
   * The sume of job installation fee and industry facility tax
   * @format double
   */
  cost?: number;
  /**
   * Job duration in seconds
   * @format int64
   */
  duration: number;
  /**
   * Date and time when this job finished
   * @format date-time
   */
  end_date: string;
  /**
   * ID of the facility where this job is running
   * @format int64
   */
  facility_id: number;
  /**
   * ID of the character which installed this job
   * @format int64
   */
  installer_id: number;
  /**
   * Unique job ID
   * @format int64
   */
  job_id: number;
  /**
   * Number of runs blueprint is licensed for
   * @format int64
   */
  licensed_runs?: number;
  /**
   * Location ID of the location to which the output of the job will be delivered. Normally a station ID, but can also be a corporation facility
   * @format int64
   */
  output_location_id: number;
  /**
   * Date and time when this job was paused (i.e. time when the facility where this job was installed went offline)
   * @format date-time
   */
  pause_date?: string;
  /**
   * Chance of success for invention
   * @format double
   */
  probability?: number;
  /**
   * Type ID of product (manufactured, copied or invented)
   * @format int64
   */
  product_type_id?: number;
  /**
   * Number of runs for a manufacturing job, or number of copies to make for a blueprint copy
   * @format int64
   */
  runs: number;
  /**
   * Date and time when this job started
   * @format date-time
   */
  start_date: string;
  /**
   * ID of the station where industry facility is located
   * @format int64
   */
  station_id: number;
  status:
    | "active"
    | "cancelled"
    | "delivered"
    | "paused"
    | "ready"
    | "reverted";
  /**
   * Number of successful runs for this job. Equal to runs unless this is an invention job
   * @format int64
   */
  successful_runs?: number;
}[];

export type CharactersCharacterIdKillmailsRecentGet = {
  /** A hash of this killmail */
  killmail_hash: string;
  /**
   * ID of this killmail
   * @format int64
   */
  killmail_id: number;
}[];

export interface CharactersCharacterIdLocationGet {
  /** @format int64 */
  solar_system_id: number;
  /** @format int64 */
  station_id?: number;
  /** @format int64 */
  structure_id?: number;
}

export type CharactersCharacterIdLoyaltyPointsGet = {
  /** @format int64 */
  corporation_id: number;
  /** @format int64 */
  loyalty_points: number;
}[];

export type CharactersCharacterIdMailGet = {
  /**
   * From whom the mail was sent
   * @format int64
   */
  from?: number;
  is_read?: boolean;
  /** @uniqueItems true */
  labels?: number[];
  /** @format int64 */
  mail_id?: number;
  /**
   * Recipients of the mail
   * @uniqueItems true
   */
  recipients?: {
    /** @format int64 */
    recipient_id: number;
    recipient_type: "alliance" | "character" | "corporation" | "mailing_list";
  }[];
  /** Mail subject */
  subject?: string;
  /**
   * When the mail was sent
   * @format date-time
   */
  timestamp?: string;
}[];

export interface CharactersCharacterIdMailLabelsGet {
  labels?: {
    /** @default "#ffffff" */
    color?:
      | "#0000fe"
      | "#006634"
      | "#0099ff"
      | "#00ff33"
      | "#01ffff"
      | "#349800"
      | "#660066"
      | "#666666"
      | "#999999"
      | "#99ffff"
      | "#9a0000"
      | "#ccff9a"
      | "#e6e6e6"
      | "#fe0000"
      | "#ff6600"
      | "#ffff01"
      | "#ffffcd"
      | "#ffffff";
    /** @format int64 */
    label_id?: number;
    name?: string;
    /** @format int64 */
    unread_count?: number;
  }[];
  /** @format int64 */
  total_unread_count?: number;
}

/**
 * Label ID
 * @format int64
 */
export type CharactersCharacterIdMailLabelsPost = number;

export type CharactersCharacterIdMailListsGet = {
  /**
   * Mailing list ID
   * @format int64
   */
  mailing_list_id: number;
  name: string;
}[];

export interface CharactersCharacterIdMailMailIdGet {
  /** Mail's body */
  body?: string;
  /**
   * From whom the mail was sent
   * @format int64
   */
  from?: number;
  /**
   * Labels attached to the mail
   * @uniqueItems true
   */
  labels?: number[];
  /** Whether the mail is flagged as read */
  read?: boolean;
  /**
   * Recipients of the mail
   * @uniqueItems true
   */
  recipients?: {
    /** @format int64 */
    recipient_id: number;
    recipient_type: "alliance" | "character" | "corporation" | "mailing_list";
  }[];
  /** Mail subject */
  subject?: string;
  /**
   * When the mail was sent
   * @format date-time
   */
  timestamp?: string;
}

/**
 * Mail ID
 * @format int64
 */
export type CharactersCharacterIdMailPost = number;

export type CharactersCharacterIdMedalsGet = {
  /** @format int64 */
  corporation_id: number;
  /** @format date-time */
  date: string;
  description: string;
  graphics: {
    /** @format int64 */
    color?: number;
    graphic: string;
    /** @format int64 */
    layer: number;
    /** @format int64 */
    part: number;
  }[];
  /** @format int64 */
  issuer_id: number;
  /** @format int64 */
  medal_id: number;
  reason: string;
  status: "public" | "private";
  title: string;
}[];

export type CharactersCharacterIdMiningGet = {
  /** @format date */
  date: string;
  /** @format int64 */
  quantity: number;
  /** @format int64 */
  solar_system_id: number;
  /** @format int64 */
  type_id: number;
}[];

export type CharactersCharacterIdNotificationsContactsGet = {
  message: string;
  /** @format int64 */
  notification_id: number;
  /** @format date-time */
  send_date: string;
  /** @format int64 */
  sender_character_id: number;
  /**
   * A number representing the standing level the receiver has been added at by the sender. The standing levels are as follows: -10 -> Terrible | -5 -> Bad |  0 -> Neutral |  5 -> Good |  10 -> Excellent
   * @format double
   */
  standing_level: number;
}[];

export type CharactersCharacterIdNotificationsGet = {
  is_read?: boolean;
  /** @format int64 */
  notification_id: number;
  /** @format int64 */
  sender_id: number;
  sender_type: "character" | "corporation" | "alliance" | "faction" | "other";
  text?: string;
  /** @format date-time */
  timestamp: string;
  type:
    | "AcceptedAlly"
    | "AcceptedSurrender"
    | "AgentRetiredTrigravian"
    | "AllAnchoringMsg"
    | "AllMaintenanceBillMsg"
    | "AllStrucInvulnerableMsg"
    | "AllStructVulnerableMsg"
    | "AllWarCorpJoinedAllianceMsg"
    | "AllWarDeclaredMsg"
    | "AllWarInvalidatedMsg"
    | "AllWarRetractedMsg"
    | "AllWarSurrenderMsg"
    | "AllianceCapitalChanged"
    | "AllianceWarDeclaredV2"
    | "AllyContractCancelled"
    | "AllyJoinedWarAggressorMsg"
    | "AllyJoinedWarAllyMsg"
    | "AllyJoinedWarDefenderMsg"
    | "BattlePunishFriendlyFire"
    | "BillOutOfMoneyMsg"
    | "BillPaidCorpAllMsg"
    | "BountyClaimMsg"
    | "BountyESSShared"
    | "BountyESSTaken"
    | "BountyPlacedAlliance"
    | "BountyPlacedChar"
    | "BountyPlacedCorp"
    | "BountyYourBountyClaimed"
    | "BuddyConnectContactAdd"
    | "CharAppAcceptMsg"
    | "CharAppRejectMsg"
    | "CharAppWithdrawMsg"
    | "CharLeftCorpMsg"
    | "CharMedalMsg"
    | "CharTerminationMsg"
    | "CloneActivationMsg"
    | "CloneActivationMsg2"
    | "CloneMovedMsg"
    | "CloneRevokedMsg1"
    | "CloneRevokedMsg2"
    | "CombatOperationFinished"
    | "ContactAdd"
    | "ContactEdit"
    | "ContainerPasswordMsg"
    | "ContractRegionChangedToPochven"
    | "CorpAllBillMsg"
    | "CorpAppAcceptMsg"
    | "CorpAppInvitedMsg"
    | "CorpAppNewMsg"
    | "CorpAppRejectCustomMsg"
    | "CorpAppRejectMsg"
    | "CorpBecameWarEligible"
    | "CorpDividendMsg"
    | "CorpFriendlyFireDisableTimerCompleted"
    | "CorpFriendlyFireDisableTimerStarted"
    | "CorpFriendlyFireEnableTimerCompleted"
    | "CorpFriendlyFireEnableTimerStarted"
    | "CorpKicked"
    | "CorpLiquidationMsg"
    | "CorpNewCEOMsg"
    | "CorpNewsMsg"
    | "CorpNoLongerWarEligible"
    | "CorpOfficeExpirationMsg"
    | "CorpStructLostMsg"
    | "CorpTaxChangeMsg"
    | "CorpVoteCEORevokedMsg"
    | "CorpVoteMsg"
    | "CorpWarDeclaredMsg"
    | "CorpWarDeclaredV2"
    | "CorpWarFightingLegalMsg"
    | "CorpWarInvalidatedMsg"
    | "CorpWarRetractedMsg"
    | "CorpWarSurrenderMsg"
    | "CorporationGoalClosed"
    | "CorporationGoalCompleted"
    | "CorporationGoalCreated"
    | "CorporationGoalExpired"
    | "CorporationGoalLimitReached"
    | "CorporationGoalNameChange"
    | "CorporationLeft"
    | "CustomsMsg"
    | "DailyItemRewardAutoClaimed"
    | "DeclareWar"
    | "DistrictAttacked"
    | "DustAppAcceptedMsg"
    | "ESSMainBankLink"
    | "EntosisCaptureStarted"
    | "ExpertSystemExpired"
    | "ExpertSystemExpiryImminent"
    | "FWAllianceKickCeoIndividualStandingWarning"
    | "FWAllianceKickMsg"
    | "FWAllianceKickedCeoIndividualStanding"
    | "FWAllianceWarningMsg"
    | "FWCharKickMsg"
    | "FWCharRankGainMsg"
    | "FWCharRankLossMsg"
    | "FWCharWarningMsg"
    | "FWCharacterKickFromCorpIndividualStandingWarning"
    | "FWCharacterKickedFromCorpIndividualStanding"
    | "FWCorpJoinMsg"
    | "FWCorpKickMsg"
    | "FWCorpLeaveMsg"
    | "FWCorpWarningMsg"
    | "FWCorporationKickCeoIndividualStandingWarning"
    | "FWCorporationKickedCeoIndividualStanding"
    | "FacWarCorpJoinRequestMsg"
    | "FacWarCorpJoinWithdrawMsg"
    | "FacWarCorpLeaveRequestMsg"
    | "FacWarCorpLeaveWithdrawMsg"
    | "FacWarDirectEnlistmentRevoked"
    | "FacWarLPDisqualifiedEvent"
    | "FacWarLPDisqualifiedKill"
    | "FacWarLPPayoutEvent"
    | "FacWarLPPayoutKill"
    | "FreelanceProjectACLDeleted"
    | "FreelanceProjectClosed"
    | "FreelanceProjectCompleted"
    | "FreelanceProjectCreated"
    | "FreelanceProjectExpired"
    | "FreelanceProjectLimitReached"
    | "FreelanceProjectParticipantKicked"
    | "GameTimeAdded"
    | "GameTimeReceived"
    | "GameTimeSent"
    | "GiftReceived"
    | "IHubDestroyedByBillFailure"
    | "IncursionCompletedMsg"
    | "IndustryOperationFinished"
    | "IndustryTeamAuctionLost"
    | "IndustryTeamAuctionWon"
    | "InfrastructureHubBillAboutToExpire"
    | "InsuranceExpirationMsg"
    | "InsuranceFirstShipMsg"
    | "InsuranceInvalidatedMsg"
    | "InsuranceIssuedMsg"
    | "InsurancePayoutMsg"
    | "InvasionCompletedMsg"
    | "InvasionSystemLogin"
    | "InvasionSystemStart"
    | "JumpCloneDeletedMsg1"
    | "JumpCloneDeletedMsg2"
    | "KillReportFinalBlow"
    | "KillReportVictim"
    | "KillRightAvailable"
    | "KillRightAvailableOpen"
    | "KillRightEarned"
    | "KillRightUnavailable"
    | "KillRightUnavailableOpen"
    | "KillRightUsed"
    | "LPAutoRedeemed"
    | "LocateCharMsg"
    | "MadeWarMutual"
    | "MercOfferRetractedMsg"
    | "MercOfferedNegotiationMsg"
    | "MercenaryDenAttacked"
    | "MercenaryDenNewMTO"
    | "MercenaryDenReinforced"
    | "MissionCanceledTriglavian"
    | "MissionOfferExpirationMsg"
    | "MissionTimeoutMsg"
    | "MoonminingAutomaticFracture"
    | "MoonminingExtractionCancelled"
    | "MoonminingExtractionFinished"
    | "MoonminingExtractionStarted"
    | "MoonminingLaserFired"
    | "MutualWarExpired"
    | "MutualWarInviteAccepted"
    | "MutualWarInviteRejected"
    | "MutualWarInviteSent"
    | "NPCStandingsGained"
    | "NPCStandingsLost"
    | "OfferToAllyRetracted"
    | "OfferedSurrender"
    | "OfferedToAlly"
    | "OfficeLeaseCanceledInsufficientStandings"
    | "OldLscMessages"
    | "OperationFinished"
    | "OrbitalAttacked"
    | "OrbitalReinforced"
    | "OwnershipTransferred"
    | "RaffleCreated"
    | "RaffleExpired"
    | "RaffleFinished"
    | "ReimbursementMsg"
    | "ResearchMissionAvailableMsg"
    | "RetractsWar"
    | "SPAutoRedeemed"
    | "SeasonalChallengeCompleted"
    | "SkinSequencingCompleted"
    | "SkyhookDeployed"
    | "SkyhookDestroyed"
    | "SkyhookLostShields"
    | "SkyhookOnline"
    | "SkyhookUnderAttack"
    | "SovAllClaimAquiredMsg"
    | "SovAllClaimLostMsg"
    | "SovCommandNodeEventStarted"
    | "SovCorpBillLateMsg"
    | "SovCorpClaimFailMsg"
    | "SovDisruptorMsg"
    | "SovStationEnteredFreeport"
    | "SovStructureDestroyed"
    | "SovStructureReinforced"
    | "SovStructureSelfDestructCancel"
    | "SovStructureSelfDestructFinished"
    | "SovStructureSelfDestructRequested"
    | "SovereigntyIHDamageMsg"
    | "SovereigntySBUDamageMsg"
    | "SovereigntyTCUDamageMsg"
    | "StationAggressionMsg1"
    | "StationAggressionMsg2"
    | "StationConquerMsg"
    | "StationServiceDisabled"
    | "StationServiceEnabled"
    | "StationStateChangeMsg"
    | "StoryLineMissionAvailableMsg"
    | "StructureAnchoring"
    | "StructureCourierContractChanged"
    | "StructureDestroyed"
    | "StructureFuelAlert"
    | "StructureImpendingAbandonmentAssetsAtRisk"
    | "StructureItemsDelivered"
    | "StructureItemsMovedToSafety"
    | "StructureLostArmor"
    | "StructureLostShields"
    | "StructureLowReagentsAlert"
    | "StructureNoReagentsAlert"
    | "StructureOnline"
    | "StructurePaintPurchased"
    | "StructureServicesOffline"
    | "StructureUnanchoring"
    | "StructureUnderAttack"
    | "StructureWentHighPower"
    | "StructureWentLowPower"
    | "StructuresJobsCancelled"
    | "StructuresJobsPaused"
    | "StructuresReinforcementChanged"
    | "TowerAlertMsg"
    | "TowerResourceAlertMsg"
    | "TransactionReversalMsg"
    | "TutorialMsg"
    | "WarAdopted "
    | "WarAllyInherited"
    | "WarAllyOfferDeclinedMsg"
    | "WarConcordInvalidates"
    | "WarDeclared"
    | "WarEndedHqSecurityDrop"
    | "WarHQRemovedFromSpace"
    | "WarInherited"
    | "WarInvalid"
    | "WarRetracted"
    | "WarRetractedByConcord"
    | "WarSurrenderDeclinedMsg"
    | "WarSurrenderOfferMsg";
}[];

export interface CharactersCharacterIdOnlineGet {
  /**
   * Timestamp of the last login
   * @format date-time
   */
  last_login?: string;
  /**
   * Timestamp of the last logout
   * @format date-time
   */
  last_logout?: string;
  /**
   * Total number of times the character has logged in
   * @format int64
   */
  logins?: number;
  /** If the character is online */
  online: boolean;
}

export type CharactersCharacterIdOrdersGet = {
  /**
   * Number of days for which order is valid (starting from the issued date). An order expires at time issued + duration
   * @format int64
   */
  duration: number;
  /**
   * For buy orders, the amount of ISK in escrow
   * @format double
   */
  escrow?: number;
  /** True if the order is a bid (buy) order */
  is_buy_order?: boolean;
  /** Signifies whether the buy/sell order was placed on behalf of a corporation. */
  is_corporation: boolean;
  /**
   * Date and time when this order was issued
   * @format date-time
   */
  issued: string;
  /**
   * ID of the location where order was placed
   * @format int64
   */
  location_id: number;
  /**
   * For buy orders, the minimum quantity that will be accepted in a matching sell order
   * @format int64
   */
  min_volume?: number;
  /**
   * Unique order ID
   * @format int64
   */
  order_id: number;
  /**
   * Cost per unit for this order
   * @format double
   */
  price: number;
  /** Valid order range, numbers are ranges in jumps */
  range:
    | "1"
    | "10"
    | "2"
    | "20"
    | "3"
    | "30"
    | "4"
    | "40"
    | "5"
    | "region"
    | "solarsystem"
    | "station";
  /**
   * ID of the region where order was placed
   * @format int64
   */
  region_id: number;
  /**
   * The type ID of the item transacted in this order
   * @format int64
   */
  type_id: number;
  /**
   * Quantity of items still required or offered
   * @format int64
   */
  volume_remain: number;
  /**
   * Quantity of items required or offered at time order was placed
   * @format int64
   */
  volume_total: number;
}[];

export type CharactersCharacterIdOrdersHistoryGet = {
  /**
   * Number of days the order was valid for (starting from the issued date). An order expires at time issued + duration
   * @format int64
   */
  duration: number;
  /**
   * For buy orders, the amount of ISK in escrow
   * @format double
   */
  escrow?: number;
  /** True if the order is a bid (buy) order */
  is_buy_order?: boolean;
  /** Signifies whether the buy/sell order was placed on behalf of a corporation. */
  is_corporation: boolean;
  /**
   * Date and time when this order was issued
   * @format date-time
   */
  issued: string;
  /**
   * ID of the location where order was placed
   * @format int64
   */
  location_id: number;
  /**
   * For buy orders, the minimum quantity that will be accepted in a matching sell order
   * @format int64
   */
  min_volume?: number;
  /**
   * Unique order ID
   * @format int64
   */
  order_id: number;
  /**
   * Cost per unit for this order
   * @format double
   */
  price: number;
  /** Valid order range, numbers are ranges in jumps */
  range:
    | "1"
    | "10"
    | "2"
    | "20"
    | "3"
    | "30"
    | "4"
    | "40"
    | "5"
    | "region"
    | "solarsystem"
    | "station";
  /**
   * ID of the region where order was placed
   * @format int64
   */
  region_id: number;
  /** Current order state */
  state: "cancelled" | "expired";
  /**
   * The type ID of the item transacted in this order
   * @format int64
   */
  type_id: number;
  /**
   * Quantity of items still required or offered
   * @format int64
   */
  volume_remain: number;
  /**
   * Quantity of items required or offered at time order was placed
   * @format int64
   */
  volume_total: number;
}[];

export type CharactersCharacterIdPlanetsGet = {
  /** @format date-time */
  last_update: string;
  /** @format int64 */
  num_pins: number;
  /** @format int64 */
  owner_id: number;
  /** @format int64 */
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
  /** @format int64 */
  solar_system_id: number;
  /** @format int64 */
  upgrade_level: number;
}[];

export interface CharactersCharacterIdPlanetsPlanetIdGet {
  links: {
    /** @format int64 */
    destination_pin_id: number;
    /** @format int64 */
    link_level: number;
    /** @format int64 */
    source_pin_id: number;
  }[];
  pins: {
    contents?: {
      /** @format int64 */
      amount: number;
      /** @format int64 */
      type_id: number;
    }[];
    /** @format date-time */
    expiry_time?: string;
    extractor_details?: {
      /**
       * in seconds
       * @format int64
       */
      cycle_time?: number;
      /** @format double */
      head_radius?: number;
      heads: {
        /** @format int64 */
        head_id: number;
        /** @format double */
        latitude: number;
        /** @format double */
        longitude: number;
      }[];
      /** @format int64 */
      product_type_id?: number;
      /** @format int64 */
      qty_per_cycle?: number;
    };
    factory_details?: {
      /** @format int64 */
      schematic_id: number;
    };
    /** @format date-time */
    install_time?: string;
    /** @format date-time */
    last_cycle_start?: string;
    /** @format double */
    latitude: number;
    /** @format double */
    longitude: number;
    /** @format int64 */
    pin_id: number;
    /** @format int64 */
    schematic_id?: number;
    /** @format int64 */
    type_id: number;
  }[];
  routes: {
    /** @format int64 */
    content_type_id: number;
    /** @format int64 */
    destination_pin_id: number;
    /** @format double */
    quantity: number;
    /** @format int64 */
    route_id: number;
    /** @format int64 */
    source_pin_id: number;
    /** list of pin ID waypoints */
    waypoints?: number[];
  }[];
}

export interface CharactersCharacterIdPortraitGet {
  px128x128?: string;
  px256x256?: string;
  px512x512?: string;
  px64x64?: string;
}

export interface CharactersCharacterIdRolesGet {
  /** @uniqueItems true */
  roles?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_base?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_hq?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_other?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
}

export interface CharactersCharacterIdSearchGet {
  agent?: number[];
  alliance?: number[];
  character?: number[];
  constellation?: number[];
  corporation?: number[];
  faction?: number[];
  inventory_type?: number[];
  region?: number[];
  solar_system?: number[];
  station?: number[];
  structure?: number[];
}

export interface CharactersCharacterIdShipGet {
  /**
   * Item id's are unique to a ship and persist until it is repackaged. This value can be used to track repeated uses of a ship, or detect when a pilot changes into a different instance of the same ship type.
   * @format int64
   */
  ship_item_id: number;
  ship_name: string;
  /** @format int64 */
  ship_type_id: number;
}

export type CharactersCharacterIdStandingsGet = {
  /** @format int64 */
  from_id: number;
  from_type: "agent" | "npc_corp" | "faction";
  /** @format double */
  standing: number;
}[];

export type CharactersCharacterIdTitlesGet = {
  name?: string;
  /** @format int64 */
  title_id?: number;
}[];

/**
 * Wallet balance
 * @format double
 */
export type CharactersCharacterIdWalletGet = number;

/** Wallet journal entries */
export type CharactersCharacterIdWalletJournalGet = {
  /**
   * The amount of ISK given or taken from the wallet as a result of the given transaction. Positive when ISK is deposited into the wallet and negative when ISK is withdrawn
   * @format double
   */
  amount?: number;
  /**
   * Wallet balance after transaction occurred
   * @format double
   */
  balance?: number;
  /**
   * An ID that gives extra context to the particular transaction. Because of legacy reasons the context is completely different per ref_type and means different things. It is also possible to not have a context_id
   * @format int64
   */
  context_id?: number;
  /** The type of the given context_id if present */
  context_id_type?:
    | "structure_id"
    | "station_id"
    | "market_transaction_id"
    | "character_id"
    | "corporation_id"
    | "alliance_id"
    | "eve_system"
    | "industry_job_id"
    | "contract_id"
    | "planet_id"
    | "system_id"
    | "type_id";
  /**
   * Date and time of transaction
   * @format date-time
   */
  date: string;
  /** The reason for the transaction, mirrors what is seen in the client */
  description: string;
  /**
   * The id of the first party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
   * @format int64
   */
  first_party_id?: number;
  /**
   * Unique journal reference ID
   * @format int64
   */
  id: number;
  /** The user stated reason for the transaction. Only applies to some ref_types */
  reason?: string;
  /** "The transaction type for the given. transaction. Different transaction types will populate different attributes." */
  ref_type:
    | "acceleration_gate_fee"
    | "achievement_category_milestone_reward"
    | "achievement_milestone_reward"
    | "advertisement_listing_fee"
    | "agent_donation"
    | "agent_location_services"
    | "agent_miscellaneous"
    | "agent_mission_collateral_paid"
    | "agent_mission_collateral_refunded"
    | "agent_mission_reward"
    | "agent_mission_reward_corporation_tax"
    | "agent_mission_security_tax"
    | "agent_mission_time_bonus_reward"
    | "agent_mission_time_bonus_reward_corporation_tax"
    | "agent_security_services"
    | "agent_services_rendered"
    | "agents_preward"
    | "air_career_program_reward"
    | "alliance_maintainance_fee"
    | "alliance_registration_fee"
    | "allignment_based_gate_toll"
    | "asset_safety_recovery_tax"
    | "bounty"
    | "bounty_prize"
    | "bounty_prize_corporation_tax"
    | "bounty_prizes"
    | "bounty_reimbursement"
    | "bounty_surcharge"
    | "brokers_fee"
    | "campaign_objective_isk_reward"
    | "clone_activation"
    | "clone_transfer"
    | "contraband_fine"
    | "contract_auction_bid"
    | "contract_auction_bid_corp"
    | "contract_auction_bid_refund"
    | "contract_auction_sold"
    | "contract_brokers_fee"
    | "contract_brokers_fee_corp"
    | "contract_collateral"
    | "contract_collateral_deposited_corp"
    | "contract_collateral_payout"
    | "contract_collateral_refund"
    | "contract_deposit"
    | "contract_deposit_corp"
    | "contract_deposit_refund"
    | "contract_deposit_sales_tax"
    | "contract_price"
    | "contract_price_payment_corp"
    | "contract_reversal"
    | "contract_reward"
    | "contract_reward_deposited"
    | "contract_reward_deposited_corp"
    | "contract_reward_refund"
    | "contract_sales_tax"
    | "copying"
    | "corporate_reward_payout"
    | "corporate_reward_tax"
    | "corporation_account_withdrawal"
    | "corporation_bulk_payment"
    | "corporation_dividend_payment"
    | "corporation_liquidation"
    | "corporation_logo_change_cost"
    | "corporation_payment"
    | "corporation_registration_fee"
    | "cosmetic_market_component_item_purchase"
    | "cosmetic_market_skin_purchase"
    | "cosmetic_market_skin_sale"
    | "cosmetic_market_skin_sale_broker_fee"
    | "cosmetic_market_skin_sale_tax"
    | "cosmetic_market_skin_transaction"
    | "courier_mission_escrow"
    | "cspa"
    | "cspaofflinerefund"
    | "daily_challenge_reward"
    | "daily_goal_payouts"
    | "daily_goal_payouts_tax"
    | "datacore_fee"
    | "dna_modification_fee"
    | "docking_fee"
    | "duel_wager_escrow"
    | "duel_wager_payment"
    | "duel_wager_refund"
    | "ess_escrow_transfer"
    | "external_trade_delivery"
    | "external_trade_freeze"
    | "external_trade_thaw"
    | "factory_slot_rental_fee"
    | "flux_payout"
    | "flux_tax"
    | "flux_ticket_repayment"
    | "flux_ticket_sale"
    | "freelance_jobs_broadcasting_fee"
    | "freelance_jobs_duration_fee"
    | "freelance_jobs_escrow_refund"
    | "freelance_jobs_reward"
    | "freelance_jobs_reward_corporation_tax"
    | "freelance_jobs_reward_escrow"
    | "gm_cash_transfer"
    | "gm_plex_fee_refund"
    | "industry_job_tax"
    | "industry_security_tax"
    | "infrastructure_hub_maintenance"
    | "inheritance"
    | "insurance"
    | "insurgency_corruption_contribution_reward"
    | "insurgency_suppression_contribution_reward"
    | "item_trader_payment"
    | "jump_clone_activation_fee"
    | "jump_clone_installation_fee"
    | "kill_right_fee"
    | "lp_store"
    | "manufacturing"
    | "market_escrow"
    | "market_fine_paid"
    | "market_provider_tax"
    | "market_security_tax"
    | "market_transaction"
    | "medal_creation"
    | "medal_issued"
    | "milestone_reward_payment"
    | "mission_completion"
    | "mission_cost"
    | "mission_expiration"
    | "mission_reward"
    | "npc_bounty_security_tax"
    | "office_rental_fee"
    | "operation_bonus"
    | "opportunity_reward"
    | "planetary_construction"
    | "planetary_export_tax"
    | "planetary_import_tax"
    | "player_donation"
    | "player_trading"
    | "project_discovery_reward"
    | "project_discovery_tax"
    | "project_payouts"
    | "reaction"
    | "redeemed_isk_token"
    | "release_of_impounded_property"
    | "repair_bill"
    | "reprocessing_tax"
    | "researching_material_productivity"
    | "researching_technology"
    | "researching_time_productivity"
    | "resource_wars_reward"
    | "reverse_engineering"
    | "season_challenge_reward"
    | "security_processing_fee"
    | "shares"
    | "skill_purchase"
    | "skyhook_claim_fee"
    | "sovereignity_bill"
    | "store_purchase"
    | "store_purchase_refund"
    | "structure_gate_jump"
    | "transaction_tax"
    | "under_construction"
    | "upkeep_adjustment_fee"
    | "war_ally_contract"
    | "war_fee"
    | "war_fee_surrender";
  /**
   * The id of the second party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
   * @format int64
   */
  second_party_id?: number;
  /**
   * Tax amount received. Only applies to tax related transactions
   * @format double
   */
  tax?: number;
  /**
   * The corporation ID receiving any tax paid. Only applies to tax related transactions
   * @format int64
   */
  tax_receiver_id?: number;
}[];

/** Wallet transactions */
export type CharactersCharacterIdWalletTransactionsGet = {
  /** @format int64 */
  client_id: number;
  /**
   * Date and time of transaction
   * @format date-time
   */
  date: string;
  is_buy: boolean;
  is_personal: boolean;
  /** @format int64 */
  journal_ref_id: number;
  /** @format int64 */
  location_id: number;
  /** @format int64 */
  quantity: number;
  /**
   * Unique transaction ID
   * @format int64
   */
  transaction_id: number;
  /** @format int64 */
  type_id: number;
  /**
   * Amount paid per unit
   * @format double
   */
  unit_price: number;
}[];

export interface CharactersDetail {
  /** Character's alliance ID */
  alliance_id?: AllianceID;
  /**
   * Character's creation date
   * @format date-time
   */
  birthday: string;
  /** Character's bloodline ID */
  bloodline_id: BloodlineID;
  /** Character's corporation ID */
  corporation_id: CorporationID;
  /** Character's description (biography) */
  description?: string;
  /** Character's faction ID */
  faction_id?: FactionID;
  /** Character's gender */
  gender: "male" | "female";
  /** Character's name */
  name: string;
  /** Character's race ID */
  race_id: RaceID;
  /**
   * Character's security status
   * @format double
   * @example 5
   */
  security_status?: number;
  /** Character's corporation title */
  title?: string;
}

export interface CharactersSkillqueueSkill {
  /**
   * The date the skill training will finish
   * @format date-time
   */
  finish_date?: string;
  /**
   * The level the skill is training for
   * @format int64
   */
  finished_level: number;
  /**
   * The Skill Points at the end of the level
   * @format int64
   */
  level_end_sp?: number;
  /**
   * The Skill Points at the start of the level
   * @format int64
   */
  level_start_sp?: number;
  /**
   * The position of the skill in the queue
   * @format int64
   */
  queue_position: number;
  /** The TypeID of the skill */
  skill_id: TypeID;
  /**
   * The date the skill training will start/continue
   * @format date-time
   */
  start_date?: string;
  /**
   * The Skill Points at the start of training
   * @format int64
   */
  training_start_sp?: number;
}

export interface CharactersSkills {
  /** The trained skills */
  skills: CharactersSkillsSkill[];
  /**
   * The total Skill Points spent on skills
   * @format int64
   */
  total_sp: number;
  /**
   * The amount of unallocated Skill Points
   * @format int64
   */
  unallocated_sp?: number;
}

export interface CharactersSkillsSkill {
  /**
   * The active skill level (can differ from trained due to alpha status and/or active expert systems)
   * @format int64
   */
  active_skill_level: number;
  /**
   * The Type ID of the skill
   * @format int64
   */
  skill_id: number;
  /**
   * The amount of Skill Points in the skill
   * @format int64
   */
  skillpoints_in_skill: number;
  /**
   * The trained skill level
   * @format int64
   */
  trained_skill_level: number;
}

/**
 * @format date
 * @example "2025-08-26"
 */
export type CompatibilityDate = string;

/**
 * @format int64
 * @example 20000001
 */
export type ConstellationID = number;

export type ContractsPublicBidsContractIdGet = {
  /**
   * The amount bid, in ISK
   * @format double
   */
  amount: number;
  /**
   * Unique ID for the bid
   * @format int64
   */
  bid_id: number;
  /**
   * Datetime when the bid was placed
   * @format date-time
   */
  date_bid: string;
}[];

export type ContractsPublicItemsContractIdGet = {
  is_blueprint_copy?: boolean;
  /** true if the contract issuer has submitted this item with the contract, false if the isser is asking for this item in the contract */
  is_included: boolean;
  /**
   * Unique ID for the item being sold. Not present if item is being requested by contract rather than sold with contract
   * @format int64
   */
  item_id?: number;
  /**
   * Material Efficiency Level of the blueprint
   * @format int64
   */
  material_efficiency?: number;
  /**
   * Number of items in the stack
   * @format int64
   */
  quantity: number;
  /**
   * Unique ID for the item, used by the contract system
   * @format int64
   */
  record_id: number;
  /**
   * Number of runs remaining if the blueprint is a copy, -1 if it is an original
   * @format int64
   */
  runs?: number;
  /**
   * Time Efficiency Level of the blueprint
   * @format int64
   */
  time_efficiency?: number;
  /**
   * Type ID for item
   * @format int64
   */
  type_id: number;
}[];

export type ContractsPublicRegionIdGet = {
  /**
   * Buyout price (for Auctions only)
   * @format double
   */
  buyout?: number;
  /**
   * Collateral price (for Couriers only)
   * @format double
   */
  collateral?: number;
  /** @format int64 */
  contract_id: number;
  /**
   * Expiration date of the contract
   * @format date-time
   */
  date_expired: string;
  /**
   * Сreation date of the contract
   * @format date-time
   */
  date_issued: string;
  /**
   * Number of days to perform the contract
   * @format int64
   */
  days_to_complete?: number;
  /**
   * End location ID (for Couriers contract)
   * @format int64
   */
  end_location_id?: number;
  /** true if the contract was issued on behalf of the issuer's corporation */
  for_corporation?: boolean;
  /**
   * Character's corporation ID for the issuer
   * @format int64
   */
  issuer_corporation_id: number;
  /**
   * Character ID for the issuer
   * @format int64
   */
  issuer_id: number;
  /**
   * Price of contract (for ItemsExchange and Auctions)
   * @format double
   */
  price?: number;
  /**
   * Remuneration for contract (for Couriers only)
   * @format double
   */
  reward?: number;
  /**
   * Start location ID (for Couriers contract)
   * @format int64
   */
  start_location_id?: number;
  /** Title of the contract */
  title?: string;
  /** Type of the contract */
  type: "unknown" | "item_exchange" | "auction" | "courier" | "loan";
  /**
   * Volume of items in the contract
   * @format double
   */
  volume?: number;
}[];

export type CorporationCorporationIdMiningExtractionsGet = {
  /**
   * The time at which the chunk being extracted will arrive and can be fractured by the moon mining drill.
   * @format date-time
   */
  chunk_arrival_time: string;
  /**
   * The time at which the current extraction was initiated.
   * @format date-time
   */
  extraction_start_time: string;
  /** @format int64 */
  moon_id: number;
  /**
   * The time at which the chunk being extracted will naturally fracture if it is not first fractured by the moon mining drill.
   * @format date-time
   */
  natural_decay_time: string;
  /** @format int64 */
  structure_id: number;
}[];

export type CorporationCorporationIdMiningObserversGet = {
  /** @format date */
  last_updated: string;
  /**
   * The entity that was observing the asteroid field when it was mined.
   * @format int64
   */
  observer_id: number;
  /** The category of the observing entity */
  observer_type: "structure";
}[];

export type CorporationCorporationIdMiningObserversObserverIdGet = {
  /**
   * The character that did the mining
   * @format int64
   */
  character_id: number;
  /** @format date */
  last_updated: string;
  /** @format int64 */
  quantity: number;
  /**
   * The corporation id of the character at the time data was recorded.
   * @format int64
   */
  recorded_corporation_id: number;
  /** @format int64 */
  type_id: number;
}[];

/**
 * @format int64
 * @example 98777771
 */
export type CorporationID = number;

export type CorporationsCorporationIdAlliancehistoryGet = {
  /** @format int64 */
  alliance_id?: number;
  /** True if the alliance has been closed */
  is_deleted?: boolean;
  /**
   * An incrementing ID that can be used to canonically establish order of records in cases where dates may be ambiguous
   * @format int64
   */
  record_id: number;
  /** @format date-time */
  start_date: string;
}[];

export type CorporationsCorporationIdAssetsGet = {
  is_blueprint_copy?: boolean;
  is_singleton: boolean;
  /** @format int64 */
  item_id: number;
  location_flag:
    | "AssetSafety"
    | "AutoFit"
    | "Bonus"
    | "Booster"
    | "BoosterBay"
    | "Capsule"
    | "CapsuleerDeliveries"
    | "Cargo"
    | "CorpDeliveries"
    | "CorpSAG1"
    | "CorpSAG2"
    | "CorpSAG3"
    | "CorpSAG4"
    | "CorpSAG5"
    | "CorpSAG6"
    | "CorpSAG7"
    | "CorporationGoalDeliveries"
    | "CrateLoot"
    | "Deliveries"
    | "DroneBay"
    | "DustBattle"
    | "DustDatabank"
    | "ExpeditionHold"
    | "FighterBay"
    | "FighterTube0"
    | "FighterTube1"
    | "FighterTube2"
    | "FighterTube3"
    | "FighterTube4"
    | "FleetHangar"
    | "FrigateEscapeBay"
    | "Hangar"
    | "HangarAll"
    | "HiSlot0"
    | "HiSlot1"
    | "HiSlot2"
    | "HiSlot3"
    | "HiSlot4"
    | "HiSlot5"
    | "HiSlot6"
    | "HiSlot7"
    | "HiddenModifiers"
    | "Implant"
    | "Impounded"
    | "InfrastructureHangar"
    | "JunkyardReprocessed"
    | "JunkyardTrashed"
    | "LoSlot0"
    | "LoSlot1"
    | "LoSlot2"
    | "LoSlot3"
    | "LoSlot4"
    | "LoSlot5"
    | "LoSlot6"
    | "LoSlot7"
    | "Locked"
    | "MedSlot0"
    | "MedSlot1"
    | "MedSlot2"
    | "MedSlot3"
    | "MedSlot4"
    | "MedSlot5"
    | "MedSlot6"
    | "MedSlot7"
    | "MobileDepotHold"
    | "MoonMaterialBay"
    | "OfficeFolder"
    | "Pilot"
    | "PlanetSurface"
    | "QuafeBay"
    | "QuantumCoreRoom"
    | "Reward"
    | "RigSlot0"
    | "RigSlot1"
    | "RigSlot2"
    | "RigSlot3"
    | "RigSlot4"
    | "RigSlot5"
    | "RigSlot6"
    | "RigSlot7"
    | "SecondaryStorage"
    | "ServiceSlot0"
    | "ServiceSlot1"
    | "ServiceSlot2"
    | "ServiceSlot3"
    | "ServiceSlot4"
    | "ServiceSlot5"
    | "ServiceSlot6"
    | "ServiceSlot7"
    | "ShipHangar"
    | "ShipOffline"
    | "Skill"
    | "SkillInTraining"
    | "SpecializedAmmoHold"
    | "SpecializedAsteroidHold"
    | "SpecializedCommandCenterHold"
    | "SpecializedFuelBay"
    | "SpecializedGasHold"
    | "SpecializedIceHold"
    | "SpecializedIndustrialShipHold"
    | "SpecializedLargeShipHold"
    | "SpecializedMaterialBay"
    | "SpecializedMediumShipHold"
    | "SpecializedMineralHold"
    | "SpecializedOreHold"
    | "SpecializedPlanetaryCommoditiesHold"
    | "SpecializedSalvageHold"
    | "SpecializedShipHold"
    | "SpecializedSmallShipHold"
    | "StructureActive"
    | "StructureFuel"
    | "StructureInactive"
    | "StructureOffline"
    | "SubSystemBay"
    | "SubSystemSlot0"
    | "SubSystemSlot1"
    | "SubSystemSlot2"
    | "SubSystemSlot3"
    | "SubSystemSlot4"
    | "SubSystemSlot5"
    | "SubSystemSlot6"
    | "SubSystemSlot7"
    | "Unlocked"
    | "Wallet"
    | "Wardrobe";
  /** @format int64 */
  location_id: number;
  location_type: "station" | "solar_system" | "item" | "other";
  /** @format int64 */
  quantity: number;
  /** @format int64 */
  type_id: number;
}[];

export type CorporationsCorporationIdAssetsLocationsPost = {
  /** @format int64 */
  item_id: number;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
}[];

export type CorporationsCorporationIdAssetsNamesPost = {
  /** @format int64 */
  item_id: number;
  name: string;
}[];

export type CorporationsCorporationIdBlueprintsGet = {
  /**
   * Unique ID for this item.
   * @format int64
   */
  item_id: number;
  /** Type of the location_id */
  location_flag:
    | "AssetSafety"
    | "AutoFit"
    | "Bonus"
    | "Booster"
    | "BoosterBay"
    | "Capsule"
    | "CapsuleerDeliveries"
    | "Cargo"
    | "CorpDeliveries"
    | "CorpSAG1"
    | "CorpSAG2"
    | "CorpSAG3"
    | "CorpSAG4"
    | "CorpSAG5"
    | "CorpSAG6"
    | "CorpSAG7"
    | "CorporationGoalDeliveries"
    | "CrateLoot"
    | "Deliveries"
    | "DroneBay"
    | "DustBattle"
    | "DustDatabank"
    | "ExpeditionHold"
    | "FighterBay"
    | "FighterTube0"
    | "FighterTube1"
    | "FighterTube2"
    | "FighterTube3"
    | "FighterTube4"
    | "FleetHangar"
    | "FrigateEscapeBay"
    | "Hangar"
    | "HangarAll"
    | "HiSlot0"
    | "HiSlot1"
    | "HiSlot2"
    | "HiSlot3"
    | "HiSlot4"
    | "HiSlot5"
    | "HiSlot6"
    | "HiSlot7"
    | "HiddenModifiers"
    | "Implant"
    | "Impounded"
    | "InfrastructureHangar"
    | "JunkyardReprocessed"
    | "JunkyardTrashed"
    | "LoSlot0"
    | "LoSlot1"
    | "LoSlot2"
    | "LoSlot3"
    | "LoSlot4"
    | "LoSlot5"
    | "LoSlot6"
    | "LoSlot7"
    | "Locked"
    | "MedSlot0"
    | "MedSlot1"
    | "MedSlot2"
    | "MedSlot3"
    | "MedSlot4"
    | "MedSlot5"
    | "MedSlot6"
    | "MedSlot7"
    | "MobileDepotHold"
    | "MoonMaterialBay"
    | "OfficeFolder"
    | "Pilot"
    | "PlanetSurface"
    | "QuafeBay"
    | "QuantumCoreRoom"
    | "Reward"
    | "RigSlot0"
    | "RigSlot1"
    | "RigSlot2"
    | "RigSlot3"
    | "RigSlot4"
    | "RigSlot5"
    | "RigSlot6"
    | "RigSlot7"
    | "SecondaryStorage"
    | "ServiceSlot0"
    | "ServiceSlot1"
    | "ServiceSlot2"
    | "ServiceSlot3"
    | "ServiceSlot4"
    | "ServiceSlot5"
    | "ServiceSlot6"
    | "ServiceSlot7"
    | "ShipHangar"
    | "ShipOffline"
    | "Skill"
    | "SkillInTraining"
    | "SpecializedAmmoHold"
    | "SpecializedAsteroidHold"
    | "SpecializedCommandCenterHold"
    | "SpecializedFuelBay"
    | "SpecializedGasHold"
    | "SpecializedIceHold"
    | "SpecializedIndustrialShipHold"
    | "SpecializedLargeShipHold"
    | "SpecializedMaterialBay"
    | "SpecializedMediumShipHold"
    | "SpecializedMineralHold"
    | "SpecializedOreHold"
    | "SpecializedPlanetaryCommoditiesHold"
    | "SpecializedSalvageHold"
    | "SpecializedShipHold"
    | "SpecializedSmallShipHold"
    | "StructureActive"
    | "StructureFuel"
    | "StructureInactive"
    | "StructureOffline"
    | "SubSystemBay"
    | "SubSystemSlot0"
    | "SubSystemSlot1"
    | "SubSystemSlot2"
    | "SubSystemSlot3"
    | "SubSystemSlot4"
    | "SubSystemSlot5"
    | "SubSystemSlot6"
    | "SubSystemSlot7"
    | "Unlocked"
    | "Wallet"
    | "Wardrobe";
  /**
   * References a station, a ship or an item_id if this blueprint is located within a container.
   * @format int64
   */
  location_id: number;
  /**
   * Material Efficiency Level of the blueprint.
   * @format int64
   */
  material_efficiency: number;
  /**
   * A range of numbers with a minimum of -2 and no maximum value where -1 is an original and -2 is a copy. It can be a positive integer if it is a stack of blueprint originals fresh from the market (e.g. no activities performed on them yet).
   * @format int64
   */
  quantity: number;
  /**
   * Number of runs remaining if the blueprint is a copy, -1 if it is an original.
   * @format int64
   */
  runs: number;
  /**
   * Time Efficiency Level of the blueprint.
   * @format int64
   */
  time_efficiency: number;
  /** @format int64 */
  type_id: number;
}[];

export type CorporationsCorporationIdContactsGet = {
  /** @format int64 */
  contact_id: number;
  contact_type: "character" | "corporation" | "alliance" | "faction";
  /** Whether this contact is being watched */
  is_watched?: boolean;
  label_ids?: number[];
  /**
   * Standing of the contact
   * @format double
   */
  standing: number;
}[];

export type CorporationsCorporationIdContactsLabelsGet = {
  /** @format int64 */
  label_id: number;
  label_name: string;
}[];

export type CorporationsCorporationIdContainersLogsGet = {
  action:
    | "add"
    | "assemble"
    | "configure"
    | "enter_password"
    | "lock"
    | "move"
    | "repackage"
    | "set_name"
    | "set_password"
    | "unlock";
  /**
   * ID of the character who performed the action.
   * @format int64
   */
  character_id: number;
  /**
   * ID of the container
   * @format int64
   */
  container_id: number;
  /**
   * Type ID of the container
   * @format int64
   */
  container_type_id: number;
  location_flag:
    | "AssetSafety"
    | "AutoFit"
    | "Bonus"
    | "Booster"
    | "BoosterBay"
    | "Capsule"
    | "CapsuleerDeliveries"
    | "Cargo"
    | "CorpDeliveries"
    | "CorpSAG1"
    | "CorpSAG2"
    | "CorpSAG3"
    | "CorpSAG4"
    | "CorpSAG5"
    | "CorpSAG6"
    | "CorpSAG7"
    | "CorporationGoalDeliveries"
    | "CrateLoot"
    | "Deliveries"
    | "DroneBay"
    | "DustBattle"
    | "DustDatabank"
    | "ExpeditionHold"
    | "FighterBay"
    | "FighterTube0"
    | "FighterTube1"
    | "FighterTube2"
    | "FighterTube3"
    | "FighterTube4"
    | "FleetHangar"
    | "FrigateEscapeBay"
    | "Hangar"
    | "HangarAll"
    | "HiSlot0"
    | "HiSlot1"
    | "HiSlot2"
    | "HiSlot3"
    | "HiSlot4"
    | "HiSlot5"
    | "HiSlot6"
    | "HiSlot7"
    | "HiddenModifiers"
    | "Implant"
    | "Impounded"
    | "InfrastructureHangar"
    | "JunkyardReprocessed"
    | "JunkyardTrashed"
    | "LoSlot0"
    | "LoSlot1"
    | "LoSlot2"
    | "LoSlot3"
    | "LoSlot4"
    | "LoSlot5"
    | "LoSlot6"
    | "LoSlot7"
    | "Locked"
    | "MedSlot0"
    | "MedSlot1"
    | "MedSlot2"
    | "MedSlot3"
    | "MedSlot4"
    | "MedSlot5"
    | "MedSlot6"
    | "MedSlot7"
    | "MobileDepotHold"
    | "MoonMaterialBay"
    | "OfficeFolder"
    | "Pilot"
    | "PlanetSurface"
    | "QuafeBay"
    | "QuantumCoreRoom"
    | "Reward"
    | "RigSlot0"
    | "RigSlot1"
    | "RigSlot2"
    | "RigSlot3"
    | "RigSlot4"
    | "RigSlot5"
    | "RigSlot6"
    | "RigSlot7"
    | "SecondaryStorage"
    | "ServiceSlot0"
    | "ServiceSlot1"
    | "ServiceSlot2"
    | "ServiceSlot3"
    | "ServiceSlot4"
    | "ServiceSlot5"
    | "ServiceSlot6"
    | "ServiceSlot7"
    | "ShipHangar"
    | "ShipOffline"
    | "Skill"
    | "SkillInTraining"
    | "SpecializedAmmoHold"
    | "SpecializedAsteroidHold"
    | "SpecializedCommandCenterHold"
    | "SpecializedFuelBay"
    | "SpecializedGasHold"
    | "SpecializedIceHold"
    | "SpecializedIndustrialShipHold"
    | "SpecializedLargeShipHold"
    | "SpecializedMaterialBay"
    | "SpecializedMediumShipHold"
    | "SpecializedMineralHold"
    | "SpecializedOreHold"
    | "SpecializedPlanetaryCommoditiesHold"
    | "SpecializedSalvageHold"
    | "SpecializedShipHold"
    | "SpecializedSmallShipHold"
    | "StructureActive"
    | "StructureFuel"
    | "StructureInactive"
    | "StructureOffline"
    | "SubSystemBay"
    | "SubSystemSlot0"
    | "SubSystemSlot1"
    | "SubSystemSlot2"
    | "SubSystemSlot3"
    | "SubSystemSlot4"
    | "SubSystemSlot5"
    | "SubSystemSlot6"
    | "SubSystemSlot7"
    | "Unlocked"
    | "Wallet"
    | "Wardrobe";
  /** @format int64 */
  location_id: number;
  /**
   * Timestamp when this log was created
   * @format date-time
   */
  logged_at: string;
  /** @format int64 */
  new_config_bitmask?: number;
  /** @format int64 */
  old_config_bitmask?: number;
  /** Type of password set if action is of type SetPassword or EnterPassword */
  password_type?: "config" | "general";
  /**
   * Quantity of the item being acted upon
   * @format int64
   */
  quantity?: number;
  /**
   * Type ID of the item being acted upon
   * @format int64
   */
  type_id?: number;
}[];

export type CorporationsCorporationIdContractsContractIdBidsGet = {
  /**
   * The amount bid, in ISK
   * @format double
   */
  amount: number;
  /**
   * Unique ID for the bid
   * @format int64
   */
  bid_id: number;
  /**
   * Character ID of the bidder
   * @format int64
   */
  bidder_id: number;
  /**
   * Datetime when the bid was placed
   * @format date-time
   */
  date_bid: string;
}[];

export type CorporationsCorporationIdContractsContractIdItemsGet = {
  /** true if the contract issuer has submitted this item with the contract, false if the isser is asking for this item in the contract */
  is_included: boolean;
  is_singleton: boolean;
  /**
   * Number of items in the stack
   * @format int64
   */
  quantity: number;
  /**
   * -1 indicates that the item is a singleton (non-stackable). If the item happens to be a Blueprint, -1 is an Original and -2 is a Blueprint Copy
   * @format int64
   */
  raw_quantity?: number;
  /**
   * Unique ID for the item
   * @format int64
   */
  record_id: number;
  /**
   * Type ID for item
   * @format int64
   */
  type_id: number;
}[];

export type CorporationsCorporationIdContractsGet = {
  /**
   * Who will accept the contract
   * @format int64
   */
  acceptor_id: number;
  /**
   * ID to whom the contract is assigned, can be corporation or character ID
   * @format int64
   */
  assignee_id: number;
  /** To whom the contract is available */
  availability: "public" | "personal" | "corporation" | "alliance";
  /**
   * Buyout price (for Auctions only)
   * @format double
   */
  buyout?: number;
  /**
   * Collateral price (for Couriers only)
   * @format double
   */
  collateral?: number;
  /** @format int64 */
  contract_id: number;
  /**
   * Date of confirmation of contract
   * @format date-time
   */
  date_accepted?: string;
  /**
   * Date of completed of contract
   * @format date-time
   */
  date_completed?: string;
  /**
   * Expiration date of the contract
   * @format date-time
   */
  date_expired: string;
  /**
   * Сreation date of the contract
   * @format date-time
   */
  date_issued: string;
  /**
   * Number of days to perform the contract
   * @format int64
   */
  days_to_complete?: number;
  /**
   * End location ID (for Couriers contract)
   * @format int64
   */
  end_location_id?: number;
  /** true if the contract was issued on behalf of the issuer's corporation */
  for_corporation: boolean;
  /**
   * Character's corporation ID for the issuer
   * @format int64
   */
  issuer_corporation_id: number;
  /**
   * Character ID for the issuer
   * @format int64
   */
  issuer_id: number;
  /**
   * Price of contract (for ItemsExchange and Auctions)
   * @format double
   */
  price?: number;
  /**
   * Remuneration for contract (for Couriers only)
   * @format double
   */
  reward?: number;
  /**
   * Start location ID (for Couriers contract)
   * @format int64
   */
  start_location_id?: number;
  /** Status of the the contract */
  status:
    | "outstanding"
    | "in_progress"
    | "finished_issuer"
    | "finished_contractor"
    | "finished"
    | "cancelled"
    | "rejected"
    | "failed"
    | "deleted"
    | "reversed";
  /** Title of the contract */
  title?: string;
  /** Type of the contract */
  type: "unknown" | "item_exchange" | "auction" | "courier" | "loan";
  /**
   * Volume of items in the contract
   * @format double
   */
  volume?: number;
}[];

export type CorporationsCorporationIdCustomsOfficesGet = {
  /**
   * Only present if alliance access is allowed
   * @format double
   */
  alliance_tax_rate?: number;
  /** standing_level and any standing related tax rate only present when this is true */
  allow_access_with_standings: boolean;
  allow_alliance_access: boolean;
  /** @format double */
  bad_standing_tax_rate?: number;
  /** @format double */
  corporation_tax_rate?: number;
  /**
   * Tax rate for entities with excellent level of standing, only present if this level is allowed, same for all other standing related tax rates
   * @format double
   */
  excellent_standing_tax_rate?: number;
  /** @format double */
  good_standing_tax_rate?: number;
  /** @format double */
  neutral_standing_tax_rate?: number;
  /**
   * unique ID of this customs office
   * @format int64
   */
  office_id: number;
  /** @format int64 */
  reinforce_exit_end: number;
  /**
   * Together with reinforce_exit_end, marks a 2-hour or 6-hour (depending on the office type) period where this customs office could exit reinforcement mode during the day after initial attack
   * @format int64
   */
  reinforce_exit_start: number;
  /** Access is allowed only for entities with this level of standing or better */
  standing_level?: "bad" | "excellent" | "good" | "neutral" | "terrible";
  /**
   * ID of the solar system this customs office is located in
   * @format int64
   */
  system_id: number;
  /** @format double */
  terrible_standing_tax_rate?: number;
  /**
   * ID of the type of this customs office
   * @format int64
   */
  type_id?: number;
}[];

export interface CorporationsCorporationIdDivisionsGet {
  hangar?: {
    /** @format int64 */
    division?: number;
    name?: string;
  }[];
  wallet?: {
    /** @format int64 */
    division?: number;
    name?: string;
  }[];
}

export type CorporationsCorporationIdFacilitiesGet = {
  /** @format int64 */
  facility_id: number;
  /** @format int64 */
  system_id: number;
  /** @format int64 */
  type_id: number;
}[];

export interface CorporationsCorporationIdFwStatsGet {
  /**
   * The enlistment date of the given corporation into faction warfare. Will not be included if corporation is not enlisted in faction warfare
   * @format date-time
   */
  enlisted_on?: string;
  /**
   * The faction the given corporation is enlisted to fight for. Will not be included if corporation is not enlisted in faction warfare
   * @format int64
   */
  faction_id?: number;
  /** Summary of kills done by the given corporation against enemy factions */
  kills: {
    /**
     * Last week's total number of kills by members of the given corporation against enemy factions
     * @format int64
     */
    last_week: number;
    /**
     * Total number of kills by members of the given corporation against enemy factions since the corporation enlisted
     * @format int64
     */
    total: number;
    /**
     * Yesterday's total number of kills by members of the given corporation against enemy factions
     * @format int64
     */
    yesterday: number;
  };
  /**
   * How many pilots the enlisted corporation has. Will not be included if corporation is not enlisted in faction warfare
   * @format int64
   */
  pilots?: number;
  /** Summary of victory points gained by the given corporation for the enlisted faction */
  victory_points: {
    /**
     * Last week's victory points gained by members of the given corporation
     * @format int64
     */
    last_week: number;
    /**
     * Total victory points gained since the given corporation enlisted
     * @format int64
     */
    total: number;
    /**
     * Yesterday's victory points gained by members of the given corporation
     * @format int64
     */
    yesterday: number;
  };
}

export interface CorporationsCorporationIdIconsGet {
  px128x128?: string;
  px256x256?: string;
  px64x64?: string;
}

export type CorporationsCorporationIdIndustryJobsGet = {
  /**
   * Job activity ID
   * @format int64
   */
  activity_id: number;
  /** @format int64 */
  blueprint_id: number;
  /**
   * Location ID of the location from which the blueprint was installed. Normally a station ID, but can also be an asset (e.g. container) or corporation facility
   * @format int64
   */
  blueprint_location_id: number;
  /** @format int64 */
  blueprint_type_id: number;
  /**
   * ID of the character which completed this job
   * @format int64
   */
  completed_character_id?: number;
  /**
   * Date and time when this job was completed
   * @format date-time
   */
  completed_date?: string;
  /**
   * The sume of job installation fee and industry facility tax
   * @format double
   */
  cost?: number;
  /**
   * Job duration in seconds
   * @format int64
   */
  duration: number;
  /**
   * Date and time when this job finished
   * @format date-time
   */
  end_date: string;
  /**
   * ID of the facility where this job is running
   * @format int64
   */
  facility_id: number;
  /**
   * ID of the character which installed this job
   * @format int64
   */
  installer_id: number;
  /**
   * Unique job ID
   * @format int64
   */
  job_id: number;
  /**
   * Number of runs blueprint is licensed for
   * @format int64
   */
  licensed_runs?: number;
  /**
   * ID of the location for the industry facility
   * @format int64
   */
  location_id: number;
  /**
   * Location ID of the location to which the output of the job will be delivered. Normally a station ID, but can also be a corporation facility
   * @format int64
   */
  output_location_id: number;
  /**
   * Date and time when this job was paused (i.e. time when the facility where this job was installed went offline)
   * @format date-time
   */
  pause_date?: string;
  /**
   * Chance of success for invention
   * @format double
   */
  probability?: number;
  /**
   * Type ID of product (manufactured, copied or invented)
   * @format int64
   */
  product_type_id?: number;
  /**
   * Number of runs for a manufacturing job, or number of copies to make for a blueprint copy
   * @format int64
   */
  runs: number;
  /**
   * Date and time when this job started
   * @format date-time
   */
  start_date: string;
  status:
    | "active"
    | "cancelled"
    | "delivered"
    | "paused"
    | "ready"
    | "reverted";
  /**
   * Number of successful runs for this job. Equal to runs unless this is an invention job
   * @format int64
   */
  successful_runs?: number;
}[];

export type CorporationsCorporationIdKillmailsRecentGet = {
  /** A hash of this killmail */
  killmail_hash: string;
  /**
   * ID of this killmail
   * @format int64
   */
  killmail_id: number;
}[];

export type CorporationsCorporationIdMedalsGet = {
  /** @format date-time */
  created_at: string;
  /**
   * ID of the character who created this medal
   * @format int64
   */
  creator_id: number;
  description: string;
  /** @format int64 */
  medal_id: number;
  title: string;
}[];

export type CorporationsCorporationIdMedalsIssuedGet = {
  /**
   * ID of the character who was rewarded this medal
   * @format int64
   */
  character_id: number;
  /** @format date-time */
  issued_at: string;
  /**
   * ID of the character who issued the medal
   * @format int64
   */
  issuer_id: number;
  /** @format int64 */
  medal_id: number;
  reason: string;
  status: "private" | "public";
}[];

/** A list of character IDs */
export type CorporationsCorporationIdMembersGet = number[];

/** @format int64 */
export type CorporationsCorporationIdMembersLimitGet = number;

export type CorporationsCorporationIdMembersTitlesGet = {
  /** @format int64 */
  character_id: number;
  /** A list of title_id */
  titles: number[];
}[];

export type CorporationsCorporationIdMembertrackingGet = {
  /** @format int64 */
  base_id?: number;
  /** @format int64 */
  character_id: number;
  /** @format int64 */
  location_id?: number;
  /** @format date-time */
  logoff_date?: string;
  /** @format date-time */
  logon_date?: string;
  /** @format int64 */
  ship_type_id?: number;
  /** @format date-time */
  start_date?: string;
}[];

export type CorporationsCorporationIdOrdersGet = {
  /**
   * Number of days for which order is valid (starting from the issued date). An order expires at time issued + duration
   * @format int64
   */
  duration: number;
  /**
   * For buy orders, the amount of ISK in escrow
   * @format double
   */
  escrow?: number;
  /** True if the order is a bid (buy) order */
  is_buy_order?: boolean;
  /**
   * Date and time when this order was issued
   * @format date-time
   */
  issued: string;
  /**
   * The character who issued this order
   * @format int64
   */
  issued_by: number;
  /**
   * ID of the location where order was placed
   * @format int64
   */
  location_id: number;
  /**
   * For buy orders, the minimum quantity that will be accepted in a matching sell order
   * @format int64
   */
  min_volume?: number;
  /**
   * Unique order ID
   * @format int64
   */
  order_id: number;
  /**
   * Cost per unit for this order
   * @format double
   */
  price: number;
  /** Valid order range, numbers are ranges in jumps */
  range:
    | "1"
    | "10"
    | "2"
    | "20"
    | "3"
    | "30"
    | "4"
    | "40"
    | "5"
    | "region"
    | "solarsystem"
    | "station";
  /**
   * ID of the region where order was placed
   * @format int64
   */
  region_id: number;
  /**
   * The type ID of the item transacted in this order
   * @format int64
   */
  type_id: number;
  /**
   * Quantity of items still required or offered
   * @format int64
   */
  volume_remain: number;
  /**
   * Quantity of items required or offered at time order was placed
   * @format int64
   */
  volume_total: number;
  /**
   * The corporation wallet division used for this order.
   * @format int64
   */
  wallet_division: number;
}[];

export type CorporationsCorporationIdOrdersHistoryGet = {
  /**
   * Number of days the order was valid for (starting from the issued date). An order expires at time issued + duration
   * @format int64
   */
  duration: number;
  /**
   * For buy orders, the amount of ISK in escrow
   * @format double
   */
  escrow?: number;
  /** True if the order is a bid (buy) order */
  is_buy_order?: boolean;
  /**
   * Date and time when this order was issued
   * @format date-time
   */
  issued: string;
  /**
   * The character who issued this order
   * @format int64
   */
  issued_by?: number;
  /**
   * ID of the location where order was placed
   * @format int64
   */
  location_id: number;
  /**
   * For buy orders, the minimum quantity that will be accepted in a matching sell order
   * @format int64
   */
  min_volume?: number;
  /**
   * Unique order ID
   * @format int64
   */
  order_id: number;
  /**
   * Cost per unit for this order
   * @format double
   */
  price: number;
  /** Valid order range, numbers are ranges in jumps */
  range:
    | "1"
    | "10"
    | "2"
    | "20"
    | "3"
    | "30"
    | "4"
    | "40"
    | "5"
    | "region"
    | "solarsystem"
    | "station";
  /**
   * ID of the region where order was placed
   * @format int64
   */
  region_id: number;
  /** Current order state */
  state: "cancelled" | "expired";
  /**
   * The type ID of the item transacted in this order
   * @format int64
   */
  type_id: number;
  /**
   * Quantity of items still required or offered
   * @format int64
   */
  volume_remain: number;
  /**
   * Quantity of items required or offered at time order was placed
   * @format int64
   */
  volume_total: number;
  /**
   * The corporation wallet division used for this order
   * @format int64
   */
  wallet_division: number;
}[];

export type CorporationsCorporationIdRolesGet = {
  /** @format int64 */
  character_id: number;
  /** @uniqueItems true */
  grantable_roles?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  grantable_roles_at_base?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  grantable_roles_at_hq?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  grantable_roles_at_other?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_base?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_hq?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_other?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
}[];

export type CorporationsCorporationIdRolesHistoryGet = {
  /** @format date-time */
  changed_at: string;
  /**
   * The character whose roles are changed
   * @format int64
   */
  character_id: number;
  /**
   * ID of the character who issued this change
   * @format int64
   */
  issuer_id: number;
  /** @uniqueItems true */
  new_roles: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  old_roles: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  role_type:
    | "grantable_roles"
    | "grantable_roles_at_base"
    | "grantable_roles_at_hq"
    | "grantable_roles_at_other"
    | "roles"
    | "roles_at_base"
    | "roles_at_hq"
    | "roles_at_other";
}[];

/** List of shareholders */
export type CorporationsCorporationIdShareholdersGet = {
  /** @format int64 */
  share_count: number;
  /** @format int64 */
  shareholder_id: number;
  shareholder_type: "character" | "corporation";
}[];

export type CorporationsCorporationIdStandingsGet = {
  /** @format int64 */
  from_id: number;
  from_type: "agent" | "npc_corp" | "faction";
  /** @format double */
  standing: number;
}[];

export type CorporationsCorporationIdStarbasesGet = {
  /**
   * The moon this starbase (POS) is anchored on, unanchored POSes do not have this information
   * @format int64
   */
  moon_id?: number;
  /**
   * When the POS onlined, for starbases (POSes) in online state
   * @format date-time
   */
  onlined_since?: string;
  /**
   * When the POS will be out of reinforcement, for starbases (POSes) in reinforced state
   * @format date-time
   */
  reinforced_until?: string;
  /**
   * Unique ID for this starbase (POS)
   * @format int64
   */
  starbase_id: number;
  state?: "offline" | "online" | "onlining" | "reinforced" | "unanchoring";
  /**
   * The solar system this starbase (POS) is in, unanchored POSes have this information
   * @format int64
   */
  system_id: number;
  /**
   * Starbase (POS) type
   * @format int64
   */
  type_id: number;
  /**
   * When the POS started unanchoring, for starbases (POSes) in unanchoring state
   * @format date-time
   */
  unanchor_at?: string;
}[];

export interface CorporationsCorporationIdStarbasesStarbaseIdGet {
  allow_alliance_members: boolean;
  allow_corporation_members: boolean;
  /** Who can anchor starbase (POS) and its structures */
  anchor:
    | "alliance_member"
    | "config_starbase_equipment_role"
    | "corporation_member"
    | "starbase_fuel_technician_role";
  attack_if_at_war: boolean;
  attack_if_other_security_status_dropping: boolean;
  /**
   * Starbase (POS) will attack if target's security standing is lower than this value
   * @format double
   */
  attack_security_status_threshold?: number;
  /**
   * Starbase (POS) will attack if target's standing is lower than this value
   * @format double
   */
  attack_standing_threshold?: number;
  /** Who can take fuel blocks out of the starbase (POS)'s fuel bay */
  fuel_bay_take:
    | "alliance_member"
    | "config_starbase_equipment_role"
    | "corporation_member"
    | "starbase_fuel_technician_role";
  /** Who can view the starbase (POS)'s fule bay. Characters either need to have required role or belong to the starbase (POS) owner's corporation or alliance, as described by the enum, all other access settings follows the same scheme */
  fuel_bay_view:
    | "alliance_member"
    | "config_starbase_equipment_role"
    | "corporation_member"
    | "starbase_fuel_technician_role";
  /** Fuel blocks and other things that will be consumed when operating a starbase (POS) */
  fuels?: {
    /** @format int64 */
    quantity: number;
    /** @format int64 */
    type_id: number;
  }[];
  /** Who can offline starbase (POS) and its structures */
  offline:
    | "alliance_member"
    | "config_starbase_equipment_role"
    | "corporation_member"
    | "starbase_fuel_technician_role";
  /** Who can online starbase (POS) and its structures */
  online:
    | "alliance_member"
    | "config_starbase_equipment_role"
    | "corporation_member"
    | "starbase_fuel_technician_role";
  /** Who can unanchor starbase (POS) and its structures */
  unanchor:
    | "alliance_member"
    | "config_starbase_equipment_role"
    | "corporation_member"
    | "starbase_fuel_technician_role";
  /** True if the starbase (POS) is using alliance standings, otherwise using corporation's */
  use_alliance_standings: boolean;
}

export type CorporationsCorporationIdStructuresGet = {
  /**
   * ID of the corporation that owns the structure
   * @format int64
   */
  corporation_id: number;
  /**
   * Date on which the structure will run out of fuel
   * @format date-time
   */
  fuel_expires?: string;
  /** The structure name */
  name?: string;
  /**
   * The date and time when the structure's newly requested reinforcement times (e.g. next_reinforce_hour and next_reinforce_day) will take effect
   * @format date-time
   */
  next_reinforce_apply?: string;
  /**
   * The requested change to reinforce_hour that will take effect at the time shown by next_reinforce_apply
   * @format int64
   */
  next_reinforce_hour?: number;
  /**
   * The id of the ACL profile for this citadel
   * @format int64
   */
  profile_id: number;
  /**
   * The hour of day that determines the four hour window when the structure will randomly exit its reinforcement periods and become vulnerable to attack against its armor and/or hull. The structure will become vulnerable at a random time that is +/- 2 hours centered on the value of this property
   * @format int64
   */
  reinforce_hour?: number;
  /** Contains a list of service upgrades, and their state */
  services?: {
    name: string;
    state: "online" | "offline" | "cleanup";
  }[];
  state:
    | "anchor_vulnerable"
    | "anchoring"
    | "armor_reinforce"
    | "armor_vulnerable"
    | "deploy_vulnerable"
    | "fitting_invulnerable"
    | "hull_reinforce"
    | "hull_vulnerable"
    | "online_deprecated"
    | "onlining_vulnerable"
    | "shield_vulnerable"
    | "unanchored"
    | "unknown";
  /**
   * Date at which the structure will move to it's next state
   * @format date-time
   */
  state_timer_end?: string;
  /**
   * Date at which the structure entered it's current state
   * @format date-time
   */
  state_timer_start?: string;
  /**
   * The Item ID of the structure
   * @format int64
   */
  structure_id: number;
  /**
   * The solar system the structure is in
   * @format int64
   */
  system_id: number;
  /**
   * The type id of the structure
   * @format int64
   */
  type_id: number;
  /**
   * Date at which the structure will unanchor
   * @format date-time
   */
  unanchors_at?: string;
}[];

export type CorporationsCorporationIdTitlesGet = {
  /** @uniqueItems true */
  grantable_roles?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  grantable_roles_at_base?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  grantable_roles_at_hq?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  grantable_roles_at_other?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  name?: string;
  /** @uniqueItems true */
  roles?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_base?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_hq?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @uniqueItems true */
  roles_at_other?: (
    | "Account_Take_1"
    | "Account_Take_2"
    | "Account_Take_3"
    | "Account_Take_4"
    | "Account_Take_5"
    | "Account_Take_6"
    | "Account_Take_7"
    | "Accountant"
    | "Auditor"
    | "Brand_Manager"
    | "Communications_Officer"
    | "Config_Equipment"
    | "Config_Starbase_Equipment"
    | "Container_Take_1"
    | "Container_Take_2"
    | "Container_Take_3"
    | "Container_Take_4"
    | "Container_Take_5"
    | "Container_Take_6"
    | "Container_Take_7"
    | "Contract_Manager"
    | "Deliveries_Container_Take"
    | "Deliveries_Query"
    | "Deliveries_Take"
    | "Diplomat"
    | "Director"
    | "Factory_Manager"
    | "Fitting_Manager"
    | "Hangar_Query_1"
    | "Hangar_Query_2"
    | "Hangar_Query_3"
    | "Hangar_Query_4"
    | "Hangar_Query_5"
    | "Hangar_Query_6"
    | "Hangar_Query_7"
    | "Hangar_Take_1"
    | "Hangar_Take_2"
    | "Hangar_Take_3"
    | "Hangar_Take_4"
    | "Hangar_Take_5"
    | "Hangar_Take_6"
    | "Hangar_Take_7"
    | "Junior_Accountant"
    | "Personnel_Manager"
    | "Project_Manager"
    | "Rent_Factory_Facility"
    | "Rent_Office"
    | "Rent_Research_Facility"
    | "Security_Officer"
    | "Skill_Plan_Manager"
    | "Starbase_Defense_Operator"
    | "Starbase_Fuel_Technician"
    | "Station_Manager"
    | "Trader"
  )[];
  /** @format int64 */
  title_id?: number;
}[];

/** Journal entries */
export type CorporationsCorporationIdWalletsDivisionJournalGet = {
  /**
   * The amount of ISK given or taken from the wallet as a result of the given transaction. Positive when ISK is deposited into the wallet and negative when ISK is withdrawn
   * @format double
   */
  amount?: number;
  /**
   * Wallet balance after transaction occurred
   * @format double
   */
  balance?: number;
  /**
   * An ID that gives extra context to the particular transaction. Because of legacy reasons the context is completely different per ref_type and means different things. It is also possible to not have a context_id
   * @format int64
   */
  context_id?: number;
  /** The type of the given context_id if present */
  context_id_type?:
    | "structure_id"
    | "station_id"
    | "market_transaction_id"
    | "character_id"
    | "corporation_id"
    | "alliance_id"
    | "eve_system"
    | "industry_job_id"
    | "contract_id"
    | "planet_id"
    | "system_id"
    | "type_id";
  /**
   * Date and time of transaction
   * @format date-time
   */
  date: string;
  /** The reason for the transaction, mirrors what is seen in the client */
  description: string;
  /**
   * The id of the first party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
   * @format int64
   */
  first_party_id?: number;
  /**
   * Unique journal reference ID
   * @format int64
   */
  id: number;
  /** The user stated reason for the transaction. Only applies to some ref_types */
  reason?: string;
  /** "The transaction type for the given. transaction. Different transaction types will populate different attributes. Note: If you have an existing XML API application that is using ref_types, you will need to know which string ESI ref_type maps to which integer. You can look at the following file to see string->int mappings: https://github.com/ccpgames/eve-glue/blob/master/eve_glue/wallet_journal_ref.py" */
  ref_type:
    | "acceleration_gate_fee"
    | "achievement_category_milestone_reward"
    | "achievement_milestone_reward"
    | "advertisement_listing_fee"
    | "agent_donation"
    | "agent_location_services"
    | "agent_miscellaneous"
    | "agent_mission_collateral_paid"
    | "agent_mission_collateral_refunded"
    | "agent_mission_reward"
    | "agent_mission_reward_corporation_tax"
    | "agent_mission_security_tax"
    | "agent_mission_time_bonus_reward"
    | "agent_mission_time_bonus_reward_corporation_tax"
    | "agent_security_services"
    | "agent_services_rendered"
    | "agents_preward"
    | "air_career_program_reward"
    | "alliance_maintainance_fee"
    | "alliance_registration_fee"
    | "allignment_based_gate_toll"
    | "asset_safety_recovery_tax"
    | "bounty"
    | "bounty_prize"
    | "bounty_prize_corporation_tax"
    | "bounty_prizes"
    | "bounty_reimbursement"
    | "bounty_surcharge"
    | "brokers_fee"
    | "campaign_objective_isk_reward"
    | "clone_activation"
    | "clone_transfer"
    | "contraband_fine"
    | "contract_auction_bid"
    | "contract_auction_bid_corp"
    | "contract_auction_bid_refund"
    | "contract_auction_sold"
    | "contract_brokers_fee"
    | "contract_brokers_fee_corp"
    | "contract_collateral"
    | "contract_collateral_deposited_corp"
    | "contract_collateral_payout"
    | "contract_collateral_refund"
    | "contract_deposit"
    | "contract_deposit_corp"
    | "contract_deposit_refund"
    | "contract_deposit_sales_tax"
    | "contract_price"
    | "contract_price_payment_corp"
    | "contract_reversal"
    | "contract_reward"
    | "contract_reward_deposited"
    | "contract_reward_deposited_corp"
    | "contract_reward_refund"
    | "contract_sales_tax"
    | "copying"
    | "corporate_reward_payout"
    | "corporate_reward_tax"
    | "corporation_account_withdrawal"
    | "corporation_bulk_payment"
    | "corporation_dividend_payment"
    | "corporation_liquidation"
    | "corporation_logo_change_cost"
    | "corporation_payment"
    | "corporation_registration_fee"
    | "cosmetic_market_component_item_purchase"
    | "cosmetic_market_skin_purchase"
    | "cosmetic_market_skin_sale"
    | "cosmetic_market_skin_sale_broker_fee"
    | "cosmetic_market_skin_sale_tax"
    | "cosmetic_market_skin_transaction"
    | "courier_mission_escrow"
    | "cspa"
    | "cspaofflinerefund"
    | "daily_challenge_reward"
    | "daily_goal_payouts"
    | "daily_goal_payouts_tax"
    | "datacore_fee"
    | "dna_modification_fee"
    | "docking_fee"
    | "duel_wager_escrow"
    | "duel_wager_payment"
    | "duel_wager_refund"
    | "ess_escrow_transfer"
    | "external_trade_delivery"
    | "external_trade_freeze"
    | "external_trade_thaw"
    | "factory_slot_rental_fee"
    | "flux_payout"
    | "flux_tax"
    | "flux_ticket_repayment"
    | "flux_ticket_sale"
    | "freelance_jobs_broadcasting_fee"
    | "freelance_jobs_duration_fee"
    | "freelance_jobs_escrow_refund"
    | "freelance_jobs_reward"
    | "freelance_jobs_reward_corporation_tax"
    | "freelance_jobs_reward_escrow"
    | "gm_cash_transfer"
    | "gm_plex_fee_refund"
    | "industry_job_tax"
    | "industry_security_tax"
    | "infrastructure_hub_maintenance"
    | "inheritance"
    | "insurance"
    | "insurgency_corruption_contribution_reward"
    | "insurgency_suppression_contribution_reward"
    | "item_trader_payment"
    | "jump_clone_activation_fee"
    | "jump_clone_installation_fee"
    | "kill_right_fee"
    | "lp_store"
    | "manufacturing"
    | "market_escrow"
    | "market_fine_paid"
    | "market_provider_tax"
    | "market_security_tax"
    | "market_transaction"
    | "medal_creation"
    | "medal_issued"
    | "milestone_reward_payment"
    | "mission_completion"
    | "mission_cost"
    | "mission_expiration"
    | "mission_reward"
    | "npc_bounty_security_tax"
    | "office_rental_fee"
    | "operation_bonus"
    | "opportunity_reward"
    | "planetary_construction"
    | "planetary_export_tax"
    | "planetary_import_tax"
    | "player_donation"
    | "player_trading"
    | "project_discovery_reward"
    | "project_discovery_tax"
    | "project_payouts"
    | "reaction"
    | "redeemed_isk_token"
    | "release_of_impounded_property"
    | "repair_bill"
    | "reprocessing_tax"
    | "researching_material_productivity"
    | "researching_technology"
    | "researching_time_productivity"
    | "resource_wars_reward"
    | "reverse_engineering"
    | "season_challenge_reward"
    | "security_processing_fee"
    | "shares"
    | "skill_purchase"
    | "skyhook_claim_fee"
    | "sovereignity_bill"
    | "store_purchase"
    | "store_purchase_refund"
    | "structure_gate_jump"
    | "transaction_tax"
    | "under_construction"
    | "upkeep_adjustment_fee"
    | "war_ally_contract"
    | "war_fee"
    | "war_fee_surrender";
  /**
   * The id of the second party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
   * @format int64
   */
  second_party_id?: number;
  /**
   * Tax amount received. Only applies to tax related transactions
   * @format double
   */
  tax?: number;
  /**
   * The corporation ID receiving any tax paid. Only applies to tax related transactions
   * @format int64
   */
  tax_receiver_id?: number;
}[];

/** Wallet transactions */
export type CorporationsCorporationIdWalletsDivisionTransactionsGet = {
  /** @format int64 */
  client_id: number;
  /**
   * Date and time of transaction
   * @format date-time
   */
  date: string;
  is_buy: boolean;
  /**
   * -1 if there is no corresponding wallet journal entry
   * @format int64
   */
  journal_ref_id: number;
  /** @format int64 */
  location_id: number;
  /** @format int64 */
  quantity: number;
  /**
   * Unique transaction ID
   * @format int64
   */
  transaction_id: number;
  /** @format int64 */
  type_id: number;
  /**
   * Amount paid per unit
   * @format double
   */
  unit_price: number;
}[];

export type CorporationsCorporationIdWalletsGet = {
  /** @format double */
  balance: number;
  /** @format int64 */
  division: number;
}[];

export interface CorporationsDetail {
  /** Corporation's alliance ID */
  alliance_id?: AllianceID;
  /** Corporation's CEO ID */
  ceo_id: CharacterID;
  /** Corporation's creator ID */
  creator_id: CharacterID;
  /**
   * Corporation's founding date
   * @format date-time
   */
  date_founded?: string;
  /** Corporation's description */
  description?: string;
  /** Corporation's faction ID */
  faction_id?: FactionID;
  /** Corporation's home station ID */
  home_station_id?: StationID;
  /**
   * Corporation's member count
   * @format int64
   * @example 100
   */
  member_count: number;
  /** Corporation's name */
  name: string;
  /**
   * Corporation's shares
   * @format int64
   * @example 1000
   */
  shares?: number;
  /**
   * Corporation's tax rate (between 0.000 and 1.000)
   * @format double
   * @example 0.123
   */
  tax_rate: number;
  /** Corporation's short name */
  ticker: string;
  /** Corporation's URL */
  url?: string;
  /** Corporation's war eligible */
  war_eligible?: boolean;
}

export type CorporationsNpccorpsGet = number[];

export interface DogmaAttributesAttributeIdGet {
  /** @format int64 */
  attribute_id: number;
  /** @format double */
  default_value?: number;
  description?: string;
  display_name?: string;
  high_is_good?: boolean;
  /** @format int64 */
  icon_id?: number;
  name?: string;
  published?: boolean;
  stackable?: boolean;
  /** @format int64 */
  unit_id?: number;
}

export type DogmaAttributesGet = number[];

export interface DogmaDynamicItemsTypeIdItemIdGet {
  /**
   * The ID of the character who created the item
   * @format int64
   */
  created_by: number;
  dogma_attributes: {
    /** @format int64 */
    attribute_id: number;
    /** @format double */
    value: number;
  }[];
  dogma_effects: {
    /** @format int64 */
    effect_id: number;
    is_default: boolean;
  }[];
  /**
   * The type ID of the mutator used to generate the dynamic item.
   * @format int64
   */
  mutator_type_id: number;
  /**
   * The type ID of the source item the mutator was applied to create the dynamic item.
   * @format int64
   */
  source_type_id: number;
}

export interface DogmaEffectsEffectIdGet {
  description?: string;
  disallow_auto_repeat?: boolean;
  /** @format int64 */
  discharge_attribute_id?: number;
  display_name?: string;
  /** @format int64 */
  duration_attribute_id?: number;
  /** @format int64 */
  effect_category?: number;
  /** @format int64 */
  effect_id: number;
  electronic_chance?: boolean;
  /** @format int64 */
  falloff_attribute_id?: number;
  /** @format int64 */
  icon_id?: number;
  is_assistance?: boolean;
  is_offensive?: boolean;
  is_warp_safe?: boolean;
  modifiers?: {
    domain?: string;
    /** @format int64 */
    effect_id?: number;
    func: string;
    /** @format int64 */
    modified_attribute_id?: number;
    /** @format int64 */
    modifying_attribute_id?: number;
    /** @format int64 */
    operator?: number;
  }[];
  name?: string;
  /** @format int64 */
  post_expression?: number;
  /** @format int64 */
  pre_expression?: number;
  published?: boolean;
  /** @format int64 */
  range_attribute_id?: number;
  range_chance?: boolean;
  /** @format int64 */
  tracking_speed_attribute_id?: number;
}

export type DogmaEffectsGet = number[];

/**
 * @format int64
 * @example 12367
 */
export type DungeonID = number;

export interface Error {
  /** List of individual issues. */
  details?: ErrorDetail[];
  /** Error message. */
  error: string;
  /**
   * HTTP status code.
   * @format int64
   */
  status?: number;
}

export interface ErrorDetail {
  /** Where the error occurred, e.g. 'body.items[3].tags' or 'path.thing-id' */
  location?: string;
  /** Error message text */
  message?: string;
  /** The value at the given location */
  value?: any;
}

/**
 * @format int64
 * @example 500002
 */
export type FactionID = number;

export interface FleetsFleetIdGet {
  /** Is free-move enabled */
  is_free_move: boolean;
  /** Does the fleet have an active fleet advertisement */
  is_registered: boolean;
  /** Is EVE Voice enabled */
  is_voice_enabled: boolean;
  /** Fleet MOTD in CCP flavoured HTML */
  motd: string;
}

export type FleetsFleetIdMembersGet = {
  /** @format int64 */
  character_id: number;
  /** @format date-time */
  join_time: string;
  /** Member’s role in fleet */
  role:
    | "fleet_commander"
    | "wing_commander"
    | "squad_commander"
    | "squad_member";
  /** Localized role names */
  role_name: string;
  /** @format int64 */
  ship_type_id: number;
  /**
   * Solar system the member is located in
   * @format int64
   */
  solar_system_id: number;
  /**
   * ID of the squad the member is in. If not applicable, will be set to -1
   * @format int64
   */
  squad_id: number;
  /**
   * Station in which the member is docked in, if applicable
   * @format int64
   */
  station_id?: number;
  /** Whether the member take fleet warps */
  takes_fleet_warp: boolean;
  /**
   * ID of the wing the member is in. If not applicable, will be set to -1
   * @format int64
   */
  wing_id: number;
}[];

export type FleetsFleetIdWingsGet = {
  /** @format int64 */
  id: number;
  name: string;
  squads: {
    /** @format int64 */
    id: number;
    name: string;
  }[];
}[];

/** 201 created object */
export interface FleetsFleetIdWingsPost {
  /**
   * The wing_id of the newly created wing
   * @format int64
   */
  wing_id: number;
}

/** 201 created object */
export interface FleetsFleetIdWingsWingIdSquadsPost {
  /**
   * The squad_id of the newly created squad
   * @format int64
   */
  squad_id: number;
}

export interface FwLeaderboardsCharactersGet {
  /** Top 100 rankings of pilots by number of kills from yesterday, last week and in total */
  kills: {
    /** Top 100 ranking of pilots active in faction warfare by total kills. A pilot is considered "active" if they have participated in faction warfare in the past 14 days */
    active_total: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      character_id?: number;
    }[];
    /** Top 100 ranking of pilots by kills in the past week */
    last_week: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      character_id?: number;
    }[];
    /** Top 100 ranking of pilots by kills in the past day */
    yesterday: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      character_id?: number;
    }[];
  };
  /** Top 100 rankings of pilots by victory points from yesterday, last week and in total */
  victory_points: {
    /** Top 100 ranking of pilots active in faction warfare by total victory points. A pilot is considered "active" if they have participated in faction warfare in the past 14 days */
    active_total: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      character_id?: number;
    }[];
    /** Top 100 ranking of pilots by victory points in the past week */
    last_week: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      character_id?: number;
    }[];
    /** Top 100 ranking of pilots by victory points in the past day */
    yesterday: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      character_id?: number;
    }[];
  };
}

export interface FwLeaderboardsCorporationsGet {
  /** Top 10 rankings of corporations by number of kills from yesterday, last week and in total */
  kills: {
    /** Top 10 ranking of corporations active in faction warfare by total kills. A corporation is considered "active" if they have participated in faction warfare in the past 14 days */
    active_total: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      corporation_id?: number;
    }[];
    /** Top 10 ranking of corporations by kills in the past week */
    last_week: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      corporation_id?: number;
    }[];
    /** Top 10 ranking of corporations by kills in the past day */
    yesterday: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      corporation_id?: number;
    }[];
  };
  /** Top 10 rankings of corporations by victory points from yesterday, last week and in total */
  victory_points: {
    /** Top 10 ranking of corporations active in faction warfare by total victory points. A corporation is considered "active" if they have participated in faction warfare in the past 14 days */
    active_total: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      corporation_id?: number;
    }[];
    /** Top 10 ranking of corporations by victory points in the past week */
    last_week: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      corporation_id?: number;
    }[];
    /** Top 10 ranking of corporations by victory points in the past day */
    yesterday: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      corporation_id?: number;
    }[];
  };
}

export interface FwLeaderboardsGet {
  /** Top 4 rankings of factions by number of kills from yesterday, last week and in total */
  kills: {
    /** Top 4 ranking of factions active in faction warfare by total kills. A faction is considered "active" if they have participated in faction warfare in the past 14 days */
    active_total: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      faction_id?: number;
    }[];
    /** Top 4 ranking of factions by kills in the past week */
    last_week: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      faction_id?: number;
    }[];
    /** Top 4 ranking of factions by kills in the past day */
    yesterday: {
      /**
       * Amount of kills
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      faction_id?: number;
    }[];
  };
  /** Top 4 rankings of factions by victory points from yesterday, last week and in total */
  victory_points: {
    /** Top 4 ranking of factions active in faction warfare by total victory points. A faction is considered "active" if they have participated in faction warfare in the past 14 days */
    active_total: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      faction_id?: number;
    }[];
    /** Top 4 ranking of factions by victory points in the past week */
    last_week: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      faction_id?: number;
    }[];
    /** Top 4 ranking of factions by victory points in the past day */
    yesterday: {
      /**
       * Amount of victory points
       * @format int64
       */
      amount?: number;
      /** @format int64 */
      faction_id?: number;
    }[];
  };
}

export type FwStatsGet = {
  /** @format int64 */
  faction_id: number;
  /** Summary of kills against an enemy faction for the given faction */
  kills: {
    /**
     * Last week's total number of kills against enemy factions
     * @format int64
     */
    last_week: number;
    /**
     * Total number of kills against enemy factions since faction warfare began
     * @format int64
     */
    total: number;
    /**
     * Yesterday's total number of kills against enemy factions
     * @format int64
     */
    yesterday: number;
  };
  /**
   * How many pilots fight for the given faction
   * @format int64
   */
  pilots: number;
  /**
   * The number of solar systems controlled by the given faction
   * @format int64
   */
  systems_controlled: number;
  /** Summary of victory points gained for the given faction */
  victory_points: {
    /**
     * Last week's victory points gained
     * @format int64
     */
    last_week: number;
    /**
     * Total victory points gained since faction warfare began
     * @format int64
     */
    total: number;
    /**
     * Yesterday's victory points gained
     * @format int64
     */
    yesterday: number;
  };
}[];

export type FwSystemsGet = {
  contested: "captured" | "contested" | "uncontested" | "vulnerable";
  /** @format int64 */
  occupier_faction_id: number;
  /** @format int64 */
  owner_faction_id: number;
  /** @format int64 */
  solar_system_id: number;
  /** @format int64 */
  victory_points: number;
  /** @format int64 */
  victory_points_threshold: number;
}[];

/** List of factions at war */
export type FwWarsGet = {
  /**
   * The faction ID of the enemy faction.
   * @format int64
   */
  against_id: number;
  /** @format int64 */
  faction_id: number;
}[];

/**
 * @format int64
 * @example 1559
 */
export type GroupID = number;

export type IncursionsGet = {
  /**
   * The constellation id in which this incursion takes place
   * @format int64
   */
  constellation_id: number;
  /**
   * The attacking faction's id
   * @format int64
   */
  faction_id: number;
  /** Whether the final encounter has boss or not */
  has_boss: boolean;
  /** A list of infested solar system ids that are a part of this incursion */
  infested_solar_systems: number[];
  /**
   * Influence of this incursion as a float from 0 to 1
   * @format double
   */
  influence: number;
  /**
   * Staging solar system for this incursion
   * @format int64
   */
  staging_solar_system_id: number;
  /** The state of this incursion */
  state: "withdrawing" | "mobilizing" | "established";
  /** The type of this incursion */
  type: string;
}[];

export type IndustryFacilitiesGet = {
  /**
   * ID of the facility
   * @format int64
   */
  facility_id: number;
  /**
   * Owner of the facility
   * @format int64
   */
  owner_id: number;
  /**
   * Region ID where the facility is
   * @format int64
   */
  region_id: number;
  /**
   * Solar system ID where the facility is
   * @format int64
   */
  solar_system_id: number;
  /**
   * Tax imposed by the facility
   * @format double
   */
  tax?: number;
  /**
   * Type ID of the facility
   * @format int64
   */
  type_id: number;
}[];

export type IndustrySystemsGet = {
  cost_indices: {
    activity:
      | "copying"
      | "duplicating"
      | "invention"
      | "manufacturing"
      | "none"
      | "reaction"
      | "researching_material_efficiency"
      | "researching_technology"
      | "researching_time_efficiency"
      | "reverse_engineering";
    /** @format double */
    cost_index: number;
  }[];
  /** @format int64 */
  solar_system_id: number;
}[];

export type InsurancePricesGet = {
  /** A list of a available insurance levels for this ship type */
  levels: {
    /** @format double */
    cost: number;
    /** Localized insurance level */
    name: string;
    /** @format double */
    payout: number;
  }[];
  /** @format int64 */
  type_id: number;
}[];

/**
 * @format int64
 * @example 1000000000001
 */
export type ItemID = number;

export interface KillmailsKillmailIdKillmailHashGet {
  attackers: {
    /** @format int64 */
    alliance_id?: number;
    /** @format int64 */
    character_id?: number;
    /** @format int64 */
    corporation_id?: number;
    /** @format int64 */
    damage_done: number;
    /** @format int64 */
    faction_id?: number;
    /** Was the attacker the one to achieve the final blow */
    final_blow: boolean;
    /**
     * Security status for the attacker
     * @format double
     */
    security_status: number;
    /**
     * What ship was the attacker flying
     * @format int64
     */
    ship_type_id?: number;
    /**
     * What weapon was used by the attacker for the kill
     * @format int64
     */
    weapon_type_id?: number;
  }[];
  /**
   * ID of the killmail
   * @format int64
   */
  killmail_id: number;
  /**
   * Time that the victim was killed and the killmail generated
   * @format date-time
   */
  killmail_time: string;
  /**
   * Moon if the kill took place at one
   * @format int64
   */
  moon_id?: number;
  /**
   * Solar system that the kill took place in
   * @format int64
   */
  solar_system_id: number;
  victim: {
    /** @format int64 */
    alliance_id?: number;
    /** @format int64 */
    character_id?: number;
    /** @format int64 */
    corporation_id?: number;
    /**
     * How much total damage was taken by the victim
     * @format int64
     */
    damage_taken: number;
    /** @format int64 */
    faction_id?: number;
    items?: {
      /**
       * Flag for the location of the item
       * @format int64
       */
      flag: number;
      /** @format int64 */
      item_type_id: number;
      items?: {
        /** @format int64 */
        flag: number;
        /** @format int64 */
        item_type_id: number;
        /** @format int64 */
        quantity_destroyed?: number;
        /** @format int64 */
        quantity_dropped?: number;
        /** @format int64 */
        singleton: number;
      }[];
      /**
       * How many of the item were destroyed if any
       * @format int64
       */
      quantity_destroyed?: number;
      /**
       * How many of the item were dropped if any
       * @format int64
       */
      quantity_dropped?: number;
      /** @format int64 */
      singleton: number;
    }[];
    /** Coordinates of the victim in Cartesian space relative to the Sun */
    position?: {
      /** @format double */
      x: number;
      /** @format double */
      y: number;
      /** @format double */
      z: number;
    };
    /**
     * The ship that the victim was piloting and was destroyed
     * @format int64
     */
    ship_type_id: number;
  };
  /**
   * War if the killmail is generated in relation to an official war
   * @format int64
   */
  war_id?: number;
}

export type LoyaltyStoresCorporationIdOffersGet = {
  /**
   * Analysis kredit cost
   * @format int64
   */
  ak_cost?: number;
  /** @format int64 */
  isk_cost: number;
  /** @format int64 */
  lp_cost: number;
  /** @format int64 */
  offer_id: number;
  /** @format int64 */
  quantity: number;
  required_items: {
    /** @format int64 */
    quantity: number;
    /** @format int64 */
    type_id: number;
  }[];
  /** @format int64 */
  type_id: number;
}[];

export type MarketsGroupsGet = number[];

export interface MarketsGroupsMarketGroupIdGet {
  description: string;
  /** @format int64 */
  market_group_id: number;
  name: string;
  /** @format int64 */
  parent_group_id?: number;
  types: number[];
}

export type MarketsPricesGet = {
  /** @format double */
  adjusted_price?: number;
  /** @format double */
  average_price?: number;
  /** @format int64 */
  type_id: number;
}[];

export type MarketsRegionIdHistoryGet = {
  /** @format double */
  average: number;
  /**
   * The date of this historical statistic entry
   * @format date
   */
  date: string;
  /** @format double */
  highest: number;
  /** @format double */
  lowest: number;
  /**
   * Total number of orders happened that day
   * @format int64
   */
  order_count: number;
  /**
   * Total
   * @format int64
   */
  volume: number;
}[];

export type MarketsRegionIdOrdersGet = {
  /** @format int64 */
  duration: number;
  is_buy_order: boolean;
  /** @format date-time */
  issued: string;
  /** @format int64 */
  location_id: number;
  /** @format int64 */
  min_volume: number;
  /** @format int64 */
  order_id: number;
  /** @format double */
  price: number;
  range:
    | "station"
    | "region"
    | "solarsystem"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "10"
    | "20"
    | "30"
    | "40";
  /**
   * The solar system this order was placed
   * @format int64
   */
  system_id: number;
  /** @format int64 */
  type_id: number;
  /** @format int64 */
  volume_remain: number;
  /** @format int64 */
  volume_total: number;
}[];

export type MarketsRegionIdTypesGet = number[];

export type MarketsStructuresStructureIdGet = {
  /** @format int64 */
  duration: number;
  is_buy_order: boolean;
  /** @format date-time */
  issued: string;
  /** @format int64 */
  location_id: number;
  /** @format int64 */
  min_volume: number;
  /** @format int64 */
  order_id: number;
  /** @format double */
  price: number;
  range:
    | "station"
    | "region"
    | "solarsystem"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "10"
    | "20"
    | "30"
    | "40";
  /** @format int64 */
  type_id: number;
  /** @format int64 */
  volume_remain: number;
  /** @format int64 */
  volume_total: number;
}[];

export interface MetaChangelog {
  /** Per date, list changes for that date */
  changelog: Record<string, MetaChangelogEntry[]>;
}

export interface MetaChangelogEntry {
  /** Compatibility date of the route */
  compatibility_date: CompatibilityDate;
  /**
   * Description
   * @example "Updated response schema."
   */
  description: string;
  /**
   * Whether this is a breaking change
   * @example false
   */
  is_breaking: boolean;
  /**
   * HTTP method of the route
   * @example "GET"
   */
  method: "GET" | "POST" | "PUT" | "DELETE";
  /**
   * Path of the route
   * @example "/meta/changelog"
   */
  path: string;
}

export interface MetaCompatibilityDates {
  /** List of compatibility dates. */
  compatibility_dates: CompatibilityDate[];
}

/**
 * @format int64
 * @example 40000002
 */
export type PlanetID = number;

/**
 * @format int64
 * @example 1
 */
export type RaceID = number;

/**
 * @format int64
 * @example 10000001
 */
export type RegionID = number;

/** Solar systems in route */
export type RouteOriginDestinationGet = number[];

/**
 * Ship tree group identifier.
 * @format int64
 * @example 1559
 */
export type ShipTreeGroupID = number;

/**
 * @format int64
 * @example 30000001
 */
export type SolarSystemID = number;

export type SovereigntyCampaignsGet = {
  /**
   * Score for all attacking parties, only present in Defense Events.
   * @format double
   */
  attackers_score?: number;
  /**
   * Unique ID for this campaign.
   * @format int64
   */
  campaign_id: number;
  /**
   * The constellation in which the campaign will take place.
   * @format int64
   */
  constellation_id: number;
  /**
   * Defending alliance, only present in Defense Events
   * @format int64
   */
  defender_id?: number;
  /**
   * Score for the defending alliance, only present in Defense Events.
   * @format double
   */
  defender_score?: number;
  /** Type of event this campaign is for. tcu_defense, ihub_defense and station_defense are referred to as "Defense Events", station_freeport as "Freeport Events". */
  event_type:
    | "tcu_defense"
    | "ihub_defense"
    | "station_defense"
    | "station_freeport";
  /** Alliance participating and their respective scores, only present in Freeport Events. */
  participants?: {
    /** @format int64 */
    alliance_id: number;
    /** @format double */
    score: number;
  }[];
  /**
   * The solar system the structure is located in.
   * @format int64
   */
  solar_system_id: number;
  /**
   * Time the event is scheduled to start.
   * @format date-time
   */
  start_time: string;
  /**
   * The structure item ID that is related to this campaign.
   * @format int64
   */
  structure_id: number;
}[];

export type SovereigntyMapGet = {
  /** @format int64 */
  alliance_id?: number;
  /** @format int64 */
  corporation_id?: number;
  /** @format int64 */
  faction_id?: number;
  /** @format int64 */
  system_id: number;
}[];

export type SovereigntyStructuresGet = {
  /**
   * The alliance that owns the structure.
   * @format int64
   */
  alliance_id: number;
  /**
   * Solar system in which the structure is located.
   * @format int64
   */
  solar_system_id: number;
  /**
   * Unique item ID for this structure.
   * @format int64
   */
  structure_id: number;
  /**
   * A reference to the type of structure this is.
   * @format int64
   */
  structure_type_id: number;
  /**
   * The occupancy level for the next or current vulnerability window. This takes into account all development indexes and capital system bonuses. Also known as Activity Defense Multiplier from in the client. It increases the time that attackers must spend using their entosis links on the structure.
   * @format double
   */
  vulnerability_occupancy_level?: number;
  /**
   * The time at which the next or current vulnerability window ends. At the end of a vulnerability window the next window is recalculated and locked in along with the vulnerabilityOccupancyLevel. If the structure is not in 100% entosis control of the defender, it will go in to 'overtime' and stay vulnerable for as long as that situation persists. Only once the defenders have 100% entosis control and has the vulnerableEndTime passed does the vulnerability interval expire and a new one is calculated.
   * @format date-time
   */
  vulnerable_end_time?: string;
  /**
   * The next time at which the structure will become vulnerable. Or the start time of the current window if current time is between this and vulnerableEndTime.
   * @format date-time
   */
  vulnerable_start_time?: string;
}[];

/**
 * @format int64
 * @example 60000001
 */
export type StationID = number;

export interface Status {
  /**
   * Number of characters currently logged in
   * @format int64
   * @example 12345
   */
  players: number;
  /**
   * Build number of the cluster
   * @example "1132976"
   */
  server_version: string;
  /**
   * Moment the cluster started accepting connections
   * @format date-time
   * @example "2017-01-02T12:34:56Z"
   */
  start_time: string;
  /** Whether the cluster only accepts VIP logins */
  vip: boolean;
}

/**
 * @format int64
 * @example 587
 */
export type TypeID = number;

/**
 * @format uuid
 * @example "3868eaed-8278-4cb7-9709-7d7de9c20dc7"
 */
export type UUID = string;

export type UniverseAncestriesGet = {
  /**
   * The bloodline associated with this ancestry
   * @format int64
   */
  bloodline_id: number;
  description: string;
  /** @format int64 */
  icon_id?: number;
  /** @format int64 */
  id: number;
  name: string;
  short_description?: string;
}[];

export interface UniverseAsteroidBeltsAsteroidBeltIdGet {
  name: string;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  /**
   * The solar system this asteroid belt is in
   * @format int64
   */
  system_id: number;
}

export type UniverseBloodlinesGet = {
  /** @format int64 */
  bloodline_id: number;
  /** @format int64 */
  charisma: number;
  /** @format int64 */
  corporation_id: number;
  description: string;
  /** @format int64 */
  intelligence: number;
  /** @format int64 */
  memory: number;
  name: string;
  /** @format int64 */
  perception: number;
  /** @format int64 */
  race_id: number;
  /** @format int64 */
  ship_type_id: number;
  /** @format int64 */
  willpower: number;
}[];

export interface UniverseCategoriesCategoryIdGet {
  /** @format int64 */
  category_id: number;
  groups: number[];
  name: string;
  published: boolean;
}

export type UniverseCategoriesGet = number[];

export interface UniverseConstellationsConstellationIdGet {
  /** @format int64 */
  constellation_id: number;
  name: string;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  /**
   * The region this constellation is in
   * @format int64
   */
  region_id: number;
  systems: number[];
}

export type UniverseConstellationsGet = number[];

export type UniverseFactionsGet = {
  /** @format int64 */
  corporation_id?: number;
  description: string;
  /** @format int64 */
  faction_id: number;
  is_unique: boolean;
  /** @format int64 */
  militia_corporation_id?: number;
  name: string;
  /** @format double */
  size_factor: number;
  /** @format int64 */
  solar_system_id?: number;
  /** @format int64 */
  station_count: number;
  /** @format int64 */
  station_system_count: number;
}[];

export type UniverseGraphicsGet = number[];

export interface UniverseGraphicsGraphicIdGet {
  collision_file?: string;
  graphic_file?: string;
  /** @format int64 */
  graphic_id: number;
  icon_folder?: string;
  sof_dna?: string;
  sof_fation_name?: string;
  sof_hull_name?: string;
  sof_race_name?: string;
}

export type UniverseGroupsGet = number[];

export interface UniverseGroupsGroupIdGet {
  /** @format int64 */
  category_id: number;
  /** @format int64 */
  group_id: number;
  name: string;
  published: boolean;
  types: number[];
}

export interface UniverseIdsPost {
  agents?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  alliances?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  characters?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  constellations?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  corporations?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  factions?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  inventory_types?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  regions?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  stations?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
  systems?: {
    /** @format int64 */
    id?: number;
    name?: string;
  }[];
}

export interface UniverseMoonsMoonIdGet {
  /** @format int64 */
  moon_id: number;
  name: string;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  /**
   * The solar system this moon is in
   * @format int64
   */
  system_id: number;
}

export type UniverseNamesPost = {
  category:
    | "alliance"
    | "character"
    | "constellation"
    | "corporation"
    | "inventory_type"
    | "region"
    | "solar_system"
    | "station"
    | "faction";
  /** @format int64 */
  id: number;
  name: string;
}[];

export interface UniversePlanetsPlanetIdGet {
  name: string;
  /** @format int64 */
  planet_id: number;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  /**
   * The solar system this planet is in
   * @format int64
   */
  system_id: number;
  /** @format int64 */
  type_id: number;
}

export type UniverseRacesGet = {
  /**
   * The alliance generally associated with this race
   * @format int64
   */
  alliance_id: number;
  description: string;
  name: string;
  /** @format int64 */
  race_id: number;
}[];

export type UniverseRegionsGet = number[];

export interface UniverseRegionsRegionIdGet {
  constellations: number[];
  description?: string;
  name: string;
  /** @format int64 */
  region_id: number;
}

export interface UniverseSchematicsSchematicIdGet {
  /**
   * Time in seconds to process a run
   * @format int64
   */
  cycle_time: number;
  schematic_name: string;
}

export interface UniverseStargatesStargateIdGet {
  destination: {
    /**
     * The stargate this stargate connects to
     * @format int64
     */
    stargate_id: number;
    /**
     * The solar system this stargate connects to
     * @format int64
     */
    system_id: number;
  };
  name: string;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  /** @format int64 */
  stargate_id: number;
  /**
   * The solar system this stargate is in
   * @format int64
   */
  system_id: number;
  /** @format int64 */
  type_id: number;
}

export interface UniverseStarsStarIdGet {
  /**
   * Age of star in years
   * @format int64
   */
  age: number;
  /** @format double */
  luminosity: number;
  name: string;
  /** @format int64 */
  radius: number;
  /** @format int64 */
  solar_system_id: number;
  spectral_class:
    | "K2 V"
    | "K4 V"
    | "G2 V"
    | "G8 V"
    | "M7 V"
    | "K7 V"
    | "M2 V"
    | "K5 V"
    | "M3 V"
    | "G0 V"
    | "G7 V"
    | "G3 V"
    | "F9 V"
    | "G5 V"
    | "F6 V"
    | "K8 V"
    | "K9 V"
    | "K6 V"
    | "G9 V"
    | "G6 V"
    | "G4 VI"
    | "G4 V"
    | "F8 V"
    | "F2 V"
    | "F1 V"
    | "K3 V"
    | "F0 VI"
    | "G1 VI"
    | "G0 VI"
    | "K1 V"
    | "M4 V"
    | "M1 V"
    | "M6 V"
    | "M0 V"
    | "K2 IV"
    | "G2 VI"
    | "K0 V"
    | "K5 IV"
    | "F5 VI"
    | "G6 VI"
    | "F6 VI"
    | "F2 IV"
    | "G3 VI"
    | "M8 V"
    | "F1 VI"
    | "K1 IV"
    | "F7 V"
    | "G5 VI"
    | "M5 V"
    | "G7 VI"
    | "F5 V"
    | "F4 VI"
    | "F8 VI"
    | "K3 IV"
    | "F4 IV"
    | "F0 V"
    | "G7 IV"
    | "G8 VI"
    | "F2 VI"
    | "F4 V"
    | "F7 VI"
    | "F3 V"
    | "G1 V"
    | "G9 VI"
    | "F3 IV"
    | "F9 VI"
    | "M9 V"
    | "K0 IV"
    | "F1 IV"
    | "G4 IV"
    | "F3 VI"
    | "K4 IV"
    | "G5 IV"
    | "G3 IV"
    | "G1 IV"
    | "K7 IV"
    | "G0 IV"
    | "K6 IV"
    | "K9 IV"
    | "G2 IV"
    | "F9 IV"
    | "F0 IV"
    | "K8 IV"
    | "G8 IV"
    | "F6 IV"
    | "F5 IV"
    | "A0"
    | "A0IV"
    | "A0IV2";
  /** @format int64 */
  temperature: number;
  /** @format int64 */
  type_id: number;
}

export interface UniverseStationsStationIdGet {
  /** @format double */
  max_dockable_ship_volume: number;
  name: string;
  /** @format double */
  office_rental_cost: number;
  /**
   * ID of the corporation that controls this station
   * @format int64
   */
  owner?: number;
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  /** @format int64 */
  race_id?: number;
  /** @format double */
  reprocessing_efficiency: number;
  /** @format double */
  reprocessing_stations_take: number;
  services: (
    | "bounty-missions"
    | "assasination-missions"
    | "courier-missions"
    | "interbus"
    | "reprocessing-plant"
    | "refinery"
    | "market"
    | "black-market"
    | "stock-exchange"
    | "cloning"
    | "surgery"
    | "dna-therapy"
    | "repair-facilities"
    | "factory"
    | "labratory"
    | "gambling"
    | "fitting"
    | "paintshop"
    | "news"
    | "storage"
    | "insurance"
    | "docking"
    | "office-rental"
    | "jump-clone-facility"
    | "loyalty-point-store"
    | "navy-offices"
    | "security-offices"
  )[];
  /** @format int64 */
  station_id: number;
  /**
   * The solar system this station is in
   * @format int64
   */
  system_id: number;
  /** @format int64 */
  type_id: number;
}

/** @uniqueItems true */
export type UniverseStructuresGet = number[];

export interface UniverseStructuresStructureIdGet {
  /** The full name of the structure */
  name: string;
  /**
   * The ID of the corporation who owns this particular structure
   * @format int64
   */
  owner_id: number;
  /** Coordinates of the structure in Cartesian space relative to the Sun, in metres. */
  position?: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  /** @format int64 */
  solar_system_id: number;
  /** @format int64 */
  type_id?: number;
}

export type UniverseSystemJumpsGet = {
  /** @format int64 */
  ship_jumps: number;
  /** @format int64 */
  system_id: number;
}[];

export type UniverseSystemKillsGet = {
  /**
   * Number of NPC ships killed in this system
   * @format int64
   */
  npc_kills: number;
  /**
   * Number of pods killed in this system
   * @format int64
   */
  pod_kills: number;
  /**
   * Number of player ships killed in this system
   * @format int64
   */
  ship_kills: number;
  /** @format int64 */
  system_id: number;
}[];

export type UniverseSystemsGet = number[];

export interface UniverseSystemsSystemIdGet {
  /**
   * The constellation this solar system is in
   * @format int64
   */
  constellation_id: number;
  name: string;
  planets?: {
    asteroid_belts?: number[];
    moons?: number[];
    /** @format int64 */
    planet_id: number;
  }[];
  position: {
    /** @format double */
    x: number;
    /** @format double */
    y: number;
    /** @format double */
    z: number;
  };
  security_class?: string;
  /** @format double */
  security_status: number;
  /** @format int64 */
  star_id?: number;
  stargates?: number[];
  stations?: number[];
  /** @format int64 */
  system_id: number;
}

export type UniverseTypesGet = number[];

export interface UniverseTypesTypeIdGet {
  /** @format double */
  capacity?: number;
  description: string;
  dogma_attributes?: {
    /** @format int64 */
    attribute_id: number;
    /** @format double */
    value: number;
  }[];
  dogma_effects?: {
    /** @format int64 */
    effect_id: number;
    is_default: boolean;
  }[];
  /** @format int64 */
  graphic_id?: number;
  /** @format int64 */
  group_id: number;
  /** @format int64 */
  icon_id?: number;
  /**
   * This only exists for types that can be put on the market
   * @format int64
   */
  market_group_id?: number;
  /** @format double */
  mass?: number;
  name: string;
  /** @format double */
  packaged_volume?: number;
  /** @format int64 */
  portion_size?: number;
  published: boolean;
  /** @format double */
  radius?: number;
  /** @format int64 */
  type_id: number;
  /** @format double */
  volume?: number;
}

export type WarsGet = number[];

export interface WarsWarIdGet {
  /** The aggressor corporation or alliance that declared this war, only contains either corporation_id or alliance_id */
  aggressor: {
    /**
     * Alliance ID if and only if the aggressor is an alliance
     * @format int64
     */
    alliance_id?: number;
    /**
     * Corporation ID if and only if the aggressor is a corporation
     * @format int64
     */
    corporation_id?: number;
    /**
     * ISK value of ships the aggressor has destroyed
     * @format double
     */
    isk_destroyed: number;
    /**
     * The number of ships the aggressor has killed
     * @format int64
     */
    ships_killed: number;
  };
  /** allied corporations or alliances, each object contains either corporation_id or alliance_id */
  allies?: {
    /**
     * Alliance ID if and only if this ally is an alliance
     * @format int64
     */
    alliance_id?: number;
    /**
     * Corporation ID if and only if this ally is a corporation
     * @format int64
     */
    corporation_id?: number;
  }[];
  /**
   * Time that the war was declared
   * @format date-time
   */
  declared: string;
  /** The defending corporation or alliance that declared this war, only contains either corporation_id or alliance_id */
  defender: {
    /**
     * Alliance ID if and only if the defender is an alliance
     * @format int64
     */
    alliance_id?: number;
    /**
     * Corporation ID if and only if the defender is a corporation
     * @format int64
     */
    corporation_id?: number;
    /**
     * ISK value of ships the defender has killed
     * @format double
     */
    isk_destroyed: number;
    /**
     * The number of ships the defender has killed
     * @format int64
     */
    ships_killed: number;
  };
  /**
   * Time the war ended and shooting was no longer allowed
   * @format date-time
   */
  finished?: string;
  /**
   * ID of the specified war
   * @format int64
   */
  id: number;
  /** Was the war declared mutual by both parties */
  mutual: boolean;
  /** Is the war currently open for allies or not */
  open_for_allies: boolean;
  /**
   * Time the war was retracted but both sides could still shoot each other
   * @format date-time
   */
  retracted?: string;
  /**
   * Time when the war started and both sides could shoot each other
   * @format date-time
   */
  started?: string;
}

export type WarsWarIdKillmailsGet = {
  /** A hash of this killmail */
  killmail_hash: string;
  /**
   * ID of this killmail
   * @format int64
   */
  killmail_id: number;
}[];

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://esi.evetech.net";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title EVE Soldier Inspiration (ESI) - tranquility
 * @version 2020-01-01
 * @license EVE Developer License (https://developers.eveonline.com/license-agreement)
 * @termsOfService https://support.eveonline.com/hc/en-us/articles/8414770561948-EVE-Online-Terms-of-Service
 * @baseUrl https://esi.evetech.net
 * @contact ESI Support (https://developers.eveonline.com/docs/support/)
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  alliances = {
    /**
     * @description List all active player alliances
     *
     * @tags Alliance
     * @name GetAlliances
     * @summary List all alliances
     * @request GET:/alliances
     */
    getAlliances: (params: RequestParams = {}) =>
      this.request<AlliancesGet, Error>({
        path: `/alliances`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Public information about an alliance
     *
     * @tags Alliance
     * @name GetAlliancesAllianceId
     * @summary Get alliance's public information
     * @request GET:/alliances/{alliance_id}
     */
    getAlliancesAllianceId: (
      allianceId: AllianceID,
      params: RequestParams = {},
    ) =>
      this.request<AllianceDetail, Error>({
        path: `/alliances/${allianceId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return contacts of an alliance
     *
     * @tags Contacts
     * @name GetAlliancesAllianceIdContacts
     * @summary Get alliance contacts
     * @request GET:/alliances/{alliance_id}/contacts
     * @secure
     */
    getAlliancesAllianceIdContacts: (
      allianceId: AllianceID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AlliancesAllianceIdContactsGet, Error>({
        path: `/alliances/${allianceId}/contacts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return custom labels for an alliance's contacts
     *
     * @tags Contacts
     * @name GetAlliancesAllianceIdContactsLabels
     * @summary Get alliance contact labels
     * @request GET:/alliances/{alliance_id}/contacts/labels
     * @secure
     */
    getAlliancesAllianceIdContactsLabels: (
      allianceId: AllianceID,
      params: RequestParams = {},
    ) =>
      this.request<AlliancesAllianceIdContactsLabelsGet, Error>({
        path: `/alliances/${allianceId}/contacts/labels`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List all current member corporations of an alliance
     *
     * @tags Alliance
     * @name GetAlliancesAllianceIdCorporations
     * @summary List alliance's corporations
     * @request GET:/alliances/{alliance_id}/corporations
     */
    getAlliancesAllianceIdCorporations: (
      allianceId: AllianceID,
      params: RequestParams = {},
    ) =>
      this.request<AlliancesAllianceIdCorporationsGet, Error>({
        path: `/alliances/${allianceId}/corporations`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the icon urls for a alliance This route expires daily at 11:05
     *
     * @tags Alliance
     * @name GetAlliancesAllianceIdIcons
     * @summary Get alliance icon
     * @request GET:/alliances/{alliance_id}/icons
     */
    getAlliancesAllianceIdIcons: (
      allianceId: AllianceID,
      params: RequestParams = {},
    ) =>
      this.request<AlliancesAllianceIdIconsGet, Error>({
        path: `/alliances/${allianceId}/icons`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  characters = {
    /**
     * @description Bulk lookup of character IDs to corporation, alliance and faction
     *
     * @tags Character
     * @name PostCharactersAffiliation
     * @summary Character affiliation
     * @request POST:/characters/affiliation
     */
    postCharactersAffiliation: (
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<CharactersAffiliationPost, Error>({
        path: `/characters/affiliation`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Public information about a character
     *
     * @tags Character
     * @name GetCharactersCharacterId
     * @summary Get character's public information
     * @request GET:/characters/{character_id}
     */
    getCharactersCharacterId: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersDetail, Error>({
        path: `/characters/${characterId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of agents research information for a character. The formula for finding the current research points with an agent is: currentPoints = remainderPoints + pointsPerDay * days(currentTime - researchStartDate)
     *
     * @tags Character
     * @name GetCharactersCharacterIdAgentsResearch
     * @summary Get agents research
     * @request GET:/characters/{character_id}/agents_research
     * @secure
     */
    getCharactersCharacterIdAgentsResearch: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdAgentsResearchGet, Error>({
        path: `/characters/${characterId}/agents_research`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of the characters assets
     *
     * @tags Assets
     * @name GetCharactersCharacterIdAssets
     * @summary Get character assets
     * @request GET:/characters/{character_id}/assets
     * @secure
     */
    getCharactersCharacterIdAssets: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdAssetsGet, Error>({
        path: `/characters/${characterId}/assets`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return locations for a set of item ids, which you can get from character assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0)
     *
     * @tags Assets
     * @name PostCharactersCharacterIdAssetsLocations
     * @summary Get character asset locations
     * @request POST:/characters/{character_id}/assets/locations
     * @secure
     */
    postCharactersCharacterIdAssetsLocations: (
      characterId: CharacterID,
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdAssetsLocationsPost, Error>({
        path: `/characters/${characterId}/assets/locations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return names for a set of item ids, which you can get from character assets endpoint. Typically used for items that can customize names, like containers or ships.
     *
     * @tags Assets
     * @name PostCharactersCharacterIdAssetsNames
     * @summary Get character asset names
     * @request POST:/characters/{character_id}/assets/names
     * @secure
     */
    postCharactersCharacterIdAssetsNames: (
      characterId: CharacterID,
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdAssetsNamesPost, Error>({
        path: `/characters/${characterId}/assets/names`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return attributes of a character
     *
     * @tags Skills
     * @name GetCharactersCharacterIdAttributes
     * @summary Get character attributes
     * @request GET:/characters/{character_id}/attributes
     * @secure
     */
    getCharactersCharacterIdAttributes: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdAttributesGet, Error>({
        path: `/characters/${characterId}/attributes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of blueprints the character owns
     *
     * @tags Character
     * @name GetCharactersCharacterIdBlueprints
     * @summary Get blueprints
     * @request GET:/characters/{character_id}/blueprints
     * @secure
     */
    getCharactersCharacterIdBlueprints: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdBlueprintsGet, Error>({
        path: `/characters/${characterId}/blueprints`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get 50 event summaries from the calendar. If no from_event ID is given, the resource will return the next 50 chronological event summaries from now. If a from_event ID is specified, it will return the next 50 chronological event summaries from after that event
     *
     * @tags Calendar
     * @name GetCharactersCharacterIdCalendar
     * @summary List calendar event summaries
     * @request GET:/characters/{character_id}/calendar
     * @secure
     */
    getCharactersCharacterIdCalendar: (
      characterId: CharacterID,
      query?: {
        /**
         * The event ID to retrieve events from
         * @format int64
         */
        from_event?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdCalendarGet, Error>({
        path: `/characters/${characterId}/calendar`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all the information for a specific event
     *
     * @tags Calendar
     * @name GetCharactersCharacterIdCalendarEventId
     * @summary Get an event
     * @request GET:/characters/{character_id}/calendar/{event_id}
     * @secure
     */
    getCharactersCharacterIdCalendarEventId: (
      characterId: CharacterID,
      eventId: number,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdCalendarEventIdGet, Error>({
        path: `/characters/${characterId}/calendar/${eventId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Set your response status to an event
     *
     * @tags Calendar
     * @name PutCharactersCharacterIdCalendarEventId
     * @summary Respond to an event
     * @request PUT:/characters/{character_id}/calendar/{event_id}
     * @secure
     */
    putCharactersCharacterIdCalendarEventId: (
      characterId: CharacterID,
      eventId: number,
      data: {
        response: "accepted" | "declined" | "tentative";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/characters/${characterId}/calendar/${eventId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get all invited attendees for a given event
     *
     * @tags Calendar
     * @name GetCharactersCharacterIdCalendarEventIdAttendees
     * @summary Get attendees
     * @request GET:/characters/{character_id}/calendar/{event_id}/attendees
     * @secure
     */
    getCharactersCharacterIdCalendarEventIdAttendees: (
      characterId: CharacterID,
      eventId: number,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdCalendarEventIdAttendeesGet, Error>({
        path: `/characters/${characterId}/calendar/${eventId}/attendees`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A list of the character's clones
     *
     * @tags Clones
     * @name GetCharactersCharacterIdClones
     * @summary Get clones
     * @request GET:/characters/{character_id}/clones
     * @secure
     */
    getCharactersCharacterIdClones: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdClonesGet, Error>({
        path: `/characters/${characterId}/clones`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Bulk delete contacts
     *
     * @tags Contacts
     * @name DeleteCharactersCharacterIdContacts
     * @summary Delete contacts
     * @request DELETE:/characters/{character_id}/contacts
     * @secure
     */
    deleteCharactersCharacterIdContacts: (
      characterId: CharacterID,
      query: {
        /**
         * A list of contacts to delete
         * @maxItems 20
         * @minItems 1
         */
        contact_ids: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/characters/${characterId}/contacts`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Return contacts of a character
     *
     * @tags Contacts
     * @name GetCharactersCharacterIdContacts
     * @summary Get contacts
     * @request GET:/characters/{character_id}/contacts
     * @secure
     */
    getCharactersCharacterIdContacts: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdContactsGet, Error>({
        path: `/characters/${characterId}/contacts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Bulk add contacts with same settings
     *
     * @tags Contacts
     * @name PostCharactersCharacterIdContacts
     * @summary Add contacts
     * @request POST:/characters/{character_id}/contacts
     * @secure
     */
    postCharactersCharacterIdContacts: (
      characterId: CharacterID,
      query: {
        /**
         * Add custom labels to the new contact
         * @maxItems 63
         */
        label_ids?: number[];
        /**
         * Standing for the contact
         * @format double
         */
        standing: number;
        /**
         * Whether the contact should be watched, note this is only effective on characters
         * @default false
         */
        watched?: boolean;
      },
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdContactsPost, Error>({
        path: `/characters/${characterId}/contacts`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Bulk edit contacts with same settings
     *
     * @tags Contacts
     * @name PutCharactersCharacterIdContacts
     * @summary Edit contacts
     * @request PUT:/characters/{character_id}/contacts
     * @secure
     */
    putCharactersCharacterIdContacts: (
      characterId: CharacterID,
      query: {
        /**
         * Add custom labels to the contact
         * @maxItems 63
         */
        label_ids?: number[];
        /**
         * Standing for the contact
         * @format double
         */
        standing: number;
        /**
         * Whether the contact should be watched, note this is only effective on characters
         * @default false
         */
        watched?: boolean;
      },
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/characters/${characterId}/contacts`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return custom labels for a character's contacts
     *
     * @tags Contacts
     * @name GetCharactersCharacterIdContactsLabels
     * @summary Get contact labels
     * @request GET:/characters/{character_id}/contacts/labels
     * @secure
     */
    getCharactersCharacterIdContactsLabels: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdContactsLabelsGet, Error>({
        path: `/characters/${characterId}/contacts/labels`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns contracts available to a character, only if the character is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress".
     *
     * @tags Contracts
     * @name GetCharactersCharacterIdContracts
     * @summary Get contracts
     * @request GET:/characters/{character_id}/contracts
     * @secure
     */
    getCharactersCharacterIdContracts: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdContractsGet, Error>({
        path: `/characters/${characterId}/contracts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists bids on a particular auction contract
     *
     * @tags Contracts
     * @name GetCharactersCharacterIdContractsContractIdBids
     * @summary Get contract bids
     * @request GET:/characters/{character_id}/contracts/{contract_id}/bids
     * @secure
     */
    getCharactersCharacterIdContractsContractIdBids: (
      characterId: CharacterID,
      contractId: number,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdContractsContractIdBidsGet, Error>({
        path: `/characters/${characterId}/contracts/${contractId}/bids`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists items of a particular contract
     *
     * @tags Contracts
     * @name GetCharactersCharacterIdContractsContractIdItems
     * @summary Get contract items
     * @request GET:/characters/{character_id}/contracts/{contract_id}/items
     * @secure
     */
    getCharactersCharacterIdContractsContractIdItems: (
      characterId: CharacterID,
      contractId: number,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdContractsContractIdItemsGet, Error>({
        path: `/characters/${characterId}/contracts/${contractId}/items`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of all the corporations a character has been a member of
     *
     * @tags Character
     * @name GetCharactersCharacterIdCorporationhistory
     * @summary Get corporation history
     * @request GET:/characters/{character_id}/corporationhistory
     */
    getCharactersCharacterIdCorporationhistory: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdCorporationhistoryGet, Error>({
        path: `/characters/${characterId}/corporationhistory`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a source character ID in the url and a set of target character ID's in the body, returns a CSPA charge cost
     *
     * @tags Character
     * @name PostCharactersCharacterIdCspa
     * @summary Calculate a CSPA charge cost
     * @request POST:/characters/{character_id}/cspa
     * @secure
     */
    postCharactersCharacterIdCspa: (
      characterId: CharacterID,
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdCspaPost, Error>({
        path: `/characters/${characterId}/cspa`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a character's jump activation and fatigue information
     *
     * @tags Character
     * @name GetCharactersCharacterIdFatigue
     * @summary Get jump fatigue
     * @request GET:/characters/{character_id}/fatigue
     * @secure
     */
    getCharactersCharacterIdFatigue: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdFatigueGet, Error>({
        path: `/characters/${characterId}/fatigue`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return fittings of a character
     *
     * @tags Fittings
     * @name GetCharactersCharacterIdFittings
     * @summary Get fittings
     * @request GET:/characters/{character_id}/fittings
     * @secure
     */
    getCharactersCharacterIdFittings: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdFittingsGet, Error>({
        path: `/characters/${characterId}/fittings`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Save a new fitting for a character
     *
     * @tags Fittings
     * @name PostCharactersCharacterIdFittings
     * @summary Create fitting
     * @request POST:/characters/{character_id}/fittings
     * @secure
     */
    postCharactersCharacterIdFittings: (
      characterId: CharacterID,
      data: {
        /** @maxLength 500 */
        description: string;
        /**
         * @maxItems 512
         * @minItems 1
         */
        items: {
          /** Fitting location for the item. Entries placed in 'Invalid' will be discarded. If this leaves the fitting with nothing, it will cause an error. */
          flag:
            | "Cargo"
            | "DroneBay"
            | "FighterBay"
            | "HiSlot0"
            | "HiSlot1"
            | "HiSlot2"
            | "HiSlot3"
            | "HiSlot4"
            | "HiSlot5"
            | "HiSlot6"
            | "HiSlot7"
            | "Invalid"
            | "LoSlot0"
            | "LoSlot1"
            | "LoSlot2"
            | "LoSlot3"
            | "LoSlot4"
            | "LoSlot5"
            | "LoSlot6"
            | "LoSlot7"
            | "MedSlot0"
            | "MedSlot1"
            | "MedSlot2"
            | "MedSlot3"
            | "MedSlot4"
            | "MedSlot5"
            | "MedSlot6"
            | "MedSlot7"
            | "RigSlot0"
            | "RigSlot1"
            | "RigSlot2"
            | "ServiceSlot0"
            | "ServiceSlot1"
            | "ServiceSlot2"
            | "ServiceSlot3"
            | "ServiceSlot4"
            | "ServiceSlot5"
            | "ServiceSlot6"
            | "ServiceSlot7"
            | "SubSystemSlot0"
            | "SubSystemSlot1"
            | "SubSystemSlot2"
            | "SubSystemSlot3";
          /** @format int64 */
          quantity: number;
          /** @format int64 */
          type_id: number;
        }[];
        /**
         * @minLength 1
         * @maxLength 50
         */
        name: string;
        /** @format int64 */
        ship_type_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdFittingsPost, Error>({
        path: `/characters/${characterId}/fittings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a fitting from a character
     *
     * @tags Fittings
     * @name DeleteCharactersCharacterIdFittingsFittingId
     * @summary Delete fitting
     * @request DELETE:/characters/{character_id}/fittings/{fitting_id}
     * @secure
     */
    deleteCharactersCharacterIdFittingsFittingId: (
      characterId: CharacterID,
      fittingId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/characters/${characterId}/fittings/${fittingId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return the fleet ID the character is in, if any.
     *
     * @tags Fleets
     * @name GetCharactersCharacterIdFleet
     * @summary Get character fleet info
     * @request GET:/characters/{character_id}/fleet
     * @secure
     */
    getCharactersCharacterIdFleet: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdFleetGet, Error>({
        path: `/characters/${characterId}/fleet`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Statistical overview of a character involved in faction warfare This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetCharactersCharacterIdFwStats
     * @summary Overview of a character involved in faction warfare
     * @request GET:/characters/{character_id}/fw/stats
     * @secure
     */
    getCharactersCharacterIdFwStats: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdFwStatsGet, Error>({
        path: `/characters/${characterId}/fw/stats`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return implants on the active clone of a character
     *
     * @tags Clones
     * @name GetCharactersCharacterIdImplants
     * @summary Get active implants
     * @request GET:/characters/{character_id}/implants
     * @secure
     */
    getCharactersCharacterIdImplants: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdImplantsGet, Error>({
        path: `/characters/${characterId}/implants`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List industry jobs placed by a character
     *
     * @tags Industry
     * @name GetCharactersCharacterIdIndustryJobs
     * @summary List character industry jobs
     * @request GET:/characters/{character_id}/industry/jobs
     * @secure
     */
    getCharactersCharacterIdIndustryJobs: (
      characterId: CharacterID,
      query?: {
        /** Whether to retrieve completed character industry jobs. Only includes jobs from the past 90 days */
        include_completed?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdIndustryJobsGet, Error>({
        path: `/characters/${characterId}/industry/jobs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of a character's kills and losses going back 90 days
     *
     * @tags Killmails
     * @name GetCharactersCharacterIdKillmailsRecent
     * @summary Get a character's recent kills and losses
     * @request GET:/characters/{character_id}/killmails/recent
     * @secure
     */
    getCharactersCharacterIdKillmailsRecent: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdKillmailsRecentGet, Error>({
        path: `/characters/${characterId}/killmails/recent`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable
     *
     * @tags Location
     * @name GetCharactersCharacterIdLocation
     * @summary Get character location
     * @request GET:/characters/{character_id}/location
     * @secure
     */
    getCharactersCharacterIdLocation: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdLocationGet, Error>({
        path: `/characters/${characterId}/location`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of loyalty points for all corporations the character has worked for
     *
     * @tags Loyalty
     * @name GetCharactersCharacterIdLoyaltyPoints
     * @summary Get loyalty points
     * @request GET:/characters/{character_id}/loyalty/points
     * @secure
     */
    getCharactersCharacterIdLoyaltyPoints: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdLoyaltyPointsGet, Error>({
        path: `/characters/${characterId}/loyalty/points`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the 50 most recent mail headers belonging to the character that match the query criteria. Queries can be filtered by label, and last_mail_id can be used to paginate backwards
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMail
     * @summary Return mail headers
     * @request GET:/characters/{character_id}/mail
     * @secure
     */
    getCharactersCharacterIdMail: (
      characterId: CharacterID,
      query?: {
        /**
         * Fetch only mails that match one or more of the given labels
         * @maxItems 25
         * @minItems 1
         * @uniqueItems true
         */
        labels?: number[];
        /**
         * List only mail with an ID lower than the given ID, if present
         * @format int64
         */
        last_mail_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMailGet, Error>({
        path: `/characters/${characterId}/mail`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create and send a new mail
     *
     * @tags Mail
     * @name PostCharactersCharacterIdMail
     * @summary Send a new mail
     * @request POST:/characters/{character_id}/mail
     * @secure
     */
    postCharactersCharacterIdMail: (
      characterId: CharacterID,
      data: {
        /**
         * @format int64
         * @default 0
         */
        approved_cost?: number;
        /** @maxLength 10000 */
        body: string;
        /**
         * @maxItems 50
         * @minItems 1
         */
        recipients: {
          /** @format int64 */
          recipient_id: number;
          recipient_type:
            | "alliance"
            | "character"
            | "corporation"
            | "mailing_list";
        }[];
        /** @maxLength 1000 */
        subject: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMailPost, Error>({
        path: `/characters/${characterId}/mail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of the users mail labels, unread counts for each label and a total unread count.
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMailLabels
     * @summary Get mail labels and unread counts
     * @request GET:/characters/{character_id}/mail/labels
     * @secure
     */
    getCharactersCharacterIdMailLabels: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMailLabelsGet, Error>({
        path: `/characters/${characterId}/mail/labels`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a mail label
     *
     * @tags Mail
     * @name PostCharactersCharacterIdMailLabels
     * @summary Create a mail label
     * @request POST:/characters/{character_id}/mail/labels
     * @secure
     */
    postCharactersCharacterIdMailLabels: (
      characterId: CharacterID,
      data: {
        /**
         * Hexadecimal string representing label color, in RGB format
         * @default "#ffffff"
         */
        color?:
          | "#0000fe"
          | "#006634"
          | "#0099ff"
          | "#00ff33"
          | "#01ffff"
          | "#349800"
          | "#660066"
          | "#666666"
          | "#999999"
          | "#99ffff"
          | "#9a0000"
          | "#ccff9a"
          | "#e6e6e6"
          | "#fe0000"
          | "#ff6600"
          | "#ffff01"
          | "#ffffcd"
          | "#ffffff";
        /**
         * @minLength 1
         * @maxLength 40
         */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMailLabelsPost, Error>({
        path: `/characters/${characterId}/mail/labels`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a mail label
     *
     * @tags Mail
     * @name DeleteCharactersCharacterIdMailLabelsLabelId
     * @summary Delete a mail label
     * @request DELETE:/characters/{character_id}/mail/labels/{label_id}
     * @secure
     */
    deleteCharactersCharacterIdMailLabelsLabelId: (
      characterId: CharacterID,
      labelId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/characters/${characterId}/mail/labels/${labelId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return all mailing lists that the character is subscribed to
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMailLists
     * @summary Return mailing list subscriptions
     * @request GET:/characters/{character_id}/mail/lists
     * @secure
     */
    getCharactersCharacterIdMailLists: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMailListsGet, Error>({
        path: `/characters/${characterId}/mail/lists`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a mail
     *
     * @tags Mail
     * @name DeleteCharactersCharacterIdMailMailId
     * @summary Delete a mail
     * @request DELETE:/characters/{character_id}/mail/{mail_id}
     * @secure
     */
    deleteCharactersCharacterIdMailMailId: (
      characterId: CharacterID,
      mailId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/characters/${characterId}/mail/${mailId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Return the contents of an EVE mail
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMailMailId
     * @summary Return a mail
     * @request GET:/characters/{character_id}/mail/{mail_id}
     * @secure
     */
    getCharactersCharacterIdMailMailId: (
      characterId: CharacterID,
      mailId: number,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMailMailIdGet, Error>({
        path: `/characters/${characterId}/mail/${mailId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update metadata about a mail
     *
     * @tags Mail
     * @name PutCharactersCharacterIdMailMailId
     * @summary Update metadata about a mail
     * @request PUT:/characters/{character_id}/mail/{mail_id}
     * @secure
     */
    putCharactersCharacterIdMailMailId: (
      characterId: CharacterID,
      mailId: number,
      data: {
        /**
         * Labels to assign to the mail. Pre-existing labels are unassigned.
         * @maxItems 25
         * @uniqueItems true
         */
        labels?: number[];
        /** Whether the mail is flagged as read */
        read?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/characters/${characterId}/mail/${mailId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return a list of medals the character has
     *
     * @tags Character
     * @name GetCharactersCharacterIdMedals
     * @summary Get medals
     * @request GET:/characters/{character_id}/medals
     * @secure
     */
    getCharactersCharacterIdMedals: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMedalsGet, Error>({
        path: `/characters/${characterId}/medals`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Paginated record of all mining done by a character for the past 30 days
     *
     * @tags Industry
     * @name GetCharactersCharacterIdMining
     * @summary Character mining ledger
     * @request GET:/characters/{character_id}/mining
     * @secure
     */
    getCharactersCharacterIdMining: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdMiningGet, Error>({
        path: `/characters/${characterId}/mining`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return character notifications
     *
     * @tags Character
     * @name GetCharactersCharacterIdNotifications
     * @summary Get character notifications
     * @request GET:/characters/{character_id}/notifications
     * @secure
     */
    getCharactersCharacterIdNotifications: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdNotificationsGet, Error>({
        path: `/characters/${characterId}/notifications`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return notifications about having been added to someone's contact list
     *
     * @tags Character
     * @name GetCharactersCharacterIdNotificationsContacts
     * @summary Get new contact notifications
     * @request GET:/characters/{character_id}/notifications/contacts
     * @secure
     */
    getCharactersCharacterIdNotificationsContacts: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdNotificationsContactsGet, Error>({
        path: `/characters/${characterId}/notifications/contacts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Checks if the character is currently online
     *
     * @tags Location
     * @name GetCharactersCharacterIdOnline
     * @summary Get character online
     * @request GET:/characters/{character_id}/online
     * @secure
     */
    getCharactersCharacterIdOnline: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdOnlineGet, Error>({
        path: `/characters/${characterId}/online`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List open market orders placed by a character
     *
     * @tags Market
     * @name GetCharactersCharacterIdOrders
     * @summary List open orders from a character
     * @request GET:/characters/{character_id}/orders
     * @secure
     */
    getCharactersCharacterIdOrders: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdOrdersGet, Error>({
        path: `/characters/${characterId}/orders`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List cancelled and expired market orders placed by a character up to 90 days in the past.
     *
     * @tags Market
     * @name GetCharactersCharacterIdOrdersHistory
     * @summary List historical orders by a character
     * @request GET:/characters/{character_id}/orders/history
     * @secure
     */
    getCharactersCharacterIdOrdersHistory: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdOrdersHistoryGet, Error>({
        path: `/characters/${characterId}/orders/history`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of all planetary colonies owned by a character.
     *
     * @tags Planetary Interaction
     * @name GetCharactersCharacterIdPlanets
     * @summary Get colonies
     * @request GET:/characters/{character_id}/planets
     * @secure
     */
    getCharactersCharacterIdPlanets: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdPlanetsGet, Error>({
        path: `/characters/${characterId}/planets`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns full details on the layout of a single planetary colony, including links, pins and routes. Note: Planetary information is only recalculated when the colony is viewed through the client. Information will not update until this criteria is met.
     *
     * @tags Planetary Interaction
     * @name GetCharactersCharacterIdPlanetsPlanetId
     * @summary Get colony layout
     * @request GET:/characters/{character_id}/planets/{planet_id}
     * @secure
     */
    getCharactersCharacterIdPlanetsPlanetId: (
      characterId: CharacterID,
      planetId: number,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdPlanetsPlanetIdGet, Error>({
        path: `/characters/${characterId}/planets/${planetId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get portrait urls for a character This route expires daily at 11:05
     *
     * @tags Character
     * @name GetCharactersCharacterIdPortrait
     * @summary Get character portraits
     * @request GET:/characters/{character_id}/portrait
     */
    getCharactersCharacterIdPortrait: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdPortraitGet, Error>({
        path: `/characters/${characterId}/portrait`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a character's corporation roles
     *
     * @tags Character
     * @name GetCharactersCharacterIdRoles
     * @summary Get character corporation roles
     * @request GET:/characters/{character_id}/roles
     * @secure
     */
    getCharactersCharacterIdRoles: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdRolesGet, Error>({
        path: `/characters/${characterId}/roles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Search for entities that match a given sub-string.
     *
     * @tags Search
     * @name GetCharactersCharacterIdSearch
     * @summary Search on a string
     * @request GET:/characters/{character_id}/search
     * @secure
     */
    getCharactersCharacterIdSearch: (
      characterId: CharacterID,
      query: {
        /**
         * Type of entities to search for
         * @maxItems 11
         * @minItems 1
         * @uniqueItems true
         */
        categories: (
          | "agent"
          | "alliance"
          | "character"
          | "constellation"
          | "corporation"
          | "faction"
          | "inventory_type"
          | "region"
          | "solar_system"
          | "station"
          | "structure"
        )[];
        /**
         * The string to search on
         * @minLength 3
         */
        search: string;
        /**
         * Whether the search should be a strict match
         * @default false
         */
        strict?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdSearchGet, Error>({
        path: `/characters/${characterId}/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the current ship type, name and id
     *
     * @tags Location
     * @name GetCharactersCharacterIdShip
     * @summary Get current ship
     * @request GET:/characters/{character_id}/ship
     * @secure
     */
    getCharactersCharacterIdShip: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdShipGet, Error>({
        path: `/characters/${characterId}/ship`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List the configured skill queue for the given character. Entries that have their finish time in the past are completed, but aren't updated in the "/skills" route yet. This will happen the next time the character logs in.
     *
     * @tags Skills
     * @name GetCharactersCharacterIdSkillqueue
     * @summary Get character's skill queue
     * @request GET:/characters/{character_id}/skillqueue
     * @secure
     */
    getCharactersCharacterIdSkillqueue: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersSkillqueueSkill[], Error>({
        path: `/characters/${characterId}/skillqueue`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List all trained skills for the given character. Skills returned by this route can be out-of-date if the character hasn't logged in since one or more skills completed training. Use the /skillqueue route to check for skills that completed training. Entries that are in the past need to be applied on top of this list to get an accurate view of the character's current skills.
     *
     * @tags Skills
     * @name GetCharactersCharacterIdSkills
     * @summary Get character skills
     * @request GET:/characters/{character_id}/skills
     * @secure
     */
    getCharactersCharacterIdSkills: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersSkills, Error>({
        path: `/characters/${characterId}/skills`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return character standings from agents, NPC corporations, and factions
     *
     * @tags Character
     * @name GetCharactersCharacterIdStandings
     * @summary Get standings
     * @request GET:/characters/{character_id}/standings
     * @secure
     */
    getCharactersCharacterIdStandings: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdStandingsGet, Error>({
        path: `/characters/${characterId}/standings`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a character's titles
     *
     * @tags Character
     * @name GetCharactersCharacterIdTitles
     * @summary Get character corporation titles
     * @request GET:/characters/{character_id}/titles
     * @secure
     */
    getCharactersCharacterIdTitles: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdTitlesGet, Error>({
        path: `/characters/${characterId}/titles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a character's wallet balance
     *
     * @tags Wallet
     * @name GetCharactersCharacterIdWallet
     * @summary Get a character's wallet balance
     * @request GET:/characters/{character_id}/wallet
     * @secure
     */
    getCharactersCharacterIdWallet: (
      characterId: CharacterID,
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdWalletGet, Error>({
        path: `/characters/${characterId}/wallet`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the given character's wallet journal going 30 days back
     *
     * @tags Wallet
     * @name GetCharactersCharacterIdWalletJournal
     * @summary Get character wallet journal
     * @request GET:/characters/{character_id}/wallet/journal
     * @secure
     */
    getCharactersCharacterIdWalletJournal: (
      characterId: CharacterID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdWalletJournalGet, Error>({
        path: `/characters/${characterId}/wallet/journal`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get wallet transactions of a character
     *
     * @tags Wallet
     * @name GetCharactersCharacterIdWalletTransactions
     * @summary Get wallet transactions
     * @request GET:/characters/{character_id}/wallet/transactions
     * @secure
     */
    getCharactersCharacterIdWalletTransactions: (
      characterId: CharacterID,
      query?: {
        /**
         * Only show transactions happened before the one referenced by this id
         * @format int64
         */
        from_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharactersCharacterIdWalletTransactionsGet, Error>({
        path: `/characters/${characterId}/wallet/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  contracts = {
    /**
     * @description Lists bids on a public auction contract
     *
     * @tags Contracts
     * @name GetContractsPublicBidsContractId
     * @summary Get public contract bids
     * @request GET:/contracts/public/bids/{contract_id}
     */
    getContractsPublicBidsContractId: (
      contractId: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContractsPublicBidsContractIdGet, any>({
        path: `/contracts/public/bids/${contractId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists items of a public contract
     *
     * @tags Contracts
     * @name GetContractsPublicItemsContractId
     * @summary Get public contract items
     * @request GET:/contracts/public/items/{contract_id}
     */
    getContractsPublicItemsContractId: (
      contractId: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContractsPublicItemsContractIdGet, any>({
        path: `/contracts/public/items/${contractId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of all public contracts in the given region
     *
     * @tags Contracts
     * @name GetContractsPublicRegionId
     * @summary Get public contracts
     * @request GET:/contracts/public/{region_id}
     */
    getContractsPublicRegionId: (
      regionId: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContractsPublicRegionIdGet, Error>({
        path: `/contracts/public/${regionId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  corporation = {
    /**
     * @description Extraction timers for all moon chunks being extracted by refineries belonging to a corporation.
     *
     * @tags Industry
     * @name GetCorporationCorporationIdMiningExtractions
     * @summary Moon extraction timers
     * @request GET:/corporation/{corporation_id}/mining/extractions
     * @secure
     */
    getCorporationCorporationIdMiningExtractions: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationCorporationIdMiningExtractionsGet, Error>({
        path: `/corporation/${corporationId}/mining/extractions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Paginated list of all entities capable of observing and recording mining for a corporation
     *
     * @tags Industry
     * @name GetCorporationCorporationIdMiningObservers
     * @summary Corporation mining observers
     * @request GET:/corporation/{corporation_id}/mining/observers
     * @secure
     */
    getCorporationCorporationIdMiningObservers: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationCorporationIdMiningObserversGet, Error>({
        path: `/corporation/${corporationId}/mining/observers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Paginated record of all mining seen by an observer
     *
     * @tags Industry
     * @name GetCorporationCorporationIdMiningObserversObserverId
     * @summary Observed corporation mining
     * @request GET:/corporation/{corporation_id}/mining/observers/{observer_id}
     * @secure
     */
    getCorporationCorporationIdMiningObserversObserverId: (
      corporationId: CorporationID,
      observerId: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationCorporationIdMiningObserversObserverIdGet, Error>(
        {
          path: `/corporation/${corporationId}/mining/observers/${observerId}`,
          method: "GET",
          query: query,
          secure: true,
          format: "json",
          ...params,
        },
      ),
  };
  corporations = {
    /**
     * @description Get a list of npc corporations This route expires daily at 11:05
     *
     * @tags Corporation
     * @name GetCorporationsNpccorps
     * @summary Get npc corporations
     * @request GET:/corporations/npccorps
     */
    getCorporationsNpccorps: (params: RequestParams = {}) =>
      this.request<CorporationsNpccorpsGet, Error>({
        path: `/corporations/npccorps`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Public information about a corporation
     *
     * @tags Corporation
     * @name GetCorporationsCorporationId
     * @summary Get corporation's public information
     * @request GET:/corporations/{corporation_id}
     */
    getCorporationsCorporationId: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsDetail, Error>({
        path: `/corporations/${corporationId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of all the alliances a corporation has been a member of
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdAlliancehistory
     * @summary Get alliance history
     * @request GET:/corporations/{corporation_id}/alliancehistory
     */
    getCorporationsCorporationIdAlliancehistory: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdAlliancehistoryGet, Error>({
        path: `/corporations/${corporationId}/alliancehistory`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of the corporation assets
     *
     * @tags Assets
     * @name GetCorporationsCorporationIdAssets
     * @summary Get corporation assets
     * @request GET:/corporations/{corporation_id}/assets
     * @secure
     */
    getCorporationsCorporationIdAssets: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdAssetsGet, Error>({
        path: `/corporations/${corporationId}/assets`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return locations for a set of item ids, which you can get from corporation assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0)
     *
     * @tags Assets
     * @name PostCorporationsCorporationIdAssetsLocations
     * @summary Get corporation asset locations
     * @request POST:/corporations/{corporation_id}/assets/locations
     * @secure
     */
    postCorporationsCorporationIdAssetsLocations: (
      corporationId: CorporationID,
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdAssetsLocationsPost, Error>({
        path: `/corporations/${corporationId}/assets/locations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return names for a set of item ids, which you can get from corporation assets endpoint. Only valid for items that can customize names, like containers or ships
     *
     * @tags Assets
     * @name PostCorporationsCorporationIdAssetsNames
     * @summary Get corporation asset names
     * @request POST:/corporations/{corporation_id}/assets/names
     * @secure
     */
    postCorporationsCorporationIdAssetsNames: (
      corporationId: CorporationID,
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdAssetsNamesPost, Error>({
        path: `/corporations/${corporationId}/assets/names`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of blueprints the corporation owns
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdBlueprints
     * @summary Get corporation blueprints
     * @request GET:/corporations/{corporation_id}/blueprints
     * @secure
     */
    getCorporationsCorporationIdBlueprints: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdBlueprintsGet, Error>({
        path: `/corporations/${corporationId}/blueprints`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return contacts of a corporation
     *
     * @tags Contacts
     * @name GetCorporationsCorporationIdContacts
     * @summary Get corporation contacts
     * @request GET:/corporations/{corporation_id}/contacts
     * @secure
     */
    getCorporationsCorporationIdContacts: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdContactsGet, Error>({
        path: `/corporations/${corporationId}/contacts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return custom labels for a corporation's contacts
     *
     * @tags Contacts
     * @name GetCorporationsCorporationIdContactsLabels
     * @summary Get corporation contact labels
     * @request GET:/corporations/{corporation_id}/contacts/labels
     * @secure
     */
    getCorporationsCorporationIdContactsLabels: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdContactsLabelsGet, Error>({
        path: `/corporations/${corporationId}/contacts/labels`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns logs recorded in the past seven days from all audit log secure containers (ALSC) owned by a given corporation
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdContainersLogs
     * @summary Get all corporation ALSC logs
     * @request GET:/corporations/{corporation_id}/containers/logs
     * @secure
     */
    getCorporationsCorporationIdContainersLogs: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdContainersLogsGet, Error>({
        path: `/corporations/${corporationId}/containers/logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns contracts available to a corporation, only if the corporation is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress".
     *
     * @tags Contracts
     * @name GetCorporationsCorporationIdContracts
     * @summary Get corporation contracts
     * @request GET:/corporations/{corporation_id}/contracts
     * @secure
     */
    getCorporationsCorporationIdContracts: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdContractsGet, Error>({
        path: `/corporations/${corporationId}/contracts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists bids on a particular auction contract
     *
     * @tags Contracts
     * @name GetCorporationsCorporationIdContractsContractIdBids
     * @summary Get corporation contract bids
     * @request GET:/corporations/{corporation_id}/contracts/{contract_id}/bids
     * @secure
     */
    getCorporationsCorporationIdContractsContractIdBids: (
      contractId: number,
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdContractsContractIdBidsGet, Error>({
        path: `/corporations/${corporationId}/contracts/${contractId}/bids`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists items of a particular contract
     *
     * @tags Contracts
     * @name GetCorporationsCorporationIdContractsContractIdItems
     * @summary Get corporation contract items
     * @request GET:/corporations/{corporation_id}/contracts/{contract_id}/items
     * @secure
     */
    getCorporationsCorporationIdContractsContractIdItems: (
      contractId: number,
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdContractsContractIdItemsGet, Error>(
        {
          path: `/corporations/${corporationId}/contracts/${contractId}/items`,
          method: "GET",
          secure: true,
          format: "json",
          ...params,
        },
      ),

    /**
     * @description List customs offices owned by a corporation
     *
     * @tags Planetary Interaction
     * @name GetCorporationsCorporationIdCustomsOffices
     * @summary List corporation customs offices
     * @request GET:/corporations/{corporation_id}/customs_offices
     * @secure
     */
    getCorporationsCorporationIdCustomsOffices: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdCustomsOfficesGet, Error>({
        path: `/corporations/${corporationId}/customs_offices`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return corporation hangar and wallet division names, only show if a division is not using the default name
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdDivisions
     * @summary Get corporation divisions
     * @request GET:/corporations/{corporation_id}/divisions
     * @secure
     */
    getCorporationsCorporationIdDivisions: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdDivisionsGet, Error>({
        path: `/corporations/${corporationId}/divisions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a corporation's facilities
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdFacilities
     * @summary Get corporation facilities
     * @request GET:/corporations/{corporation_id}/facilities
     * @secure
     */
    getCorporationsCorporationIdFacilities: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdFacilitiesGet, Error>({
        path: `/corporations/${corporationId}/facilities`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Statistics about a corporation involved in faction warfare This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetCorporationsCorporationIdFwStats
     * @summary Overview of a corporation involved in faction warfare
     * @request GET:/corporations/{corporation_id}/fw/stats
     * @secure
     */
    getCorporationsCorporationIdFwStats: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdFwStatsGet, Error>({
        path: `/corporations/${corporationId}/fw/stats`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the icon urls for a corporation
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdIcons
     * @summary Get corporation icon
     * @request GET:/corporations/{corporation_id}/icons
     */
    getCorporationsCorporationIdIcons: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdIconsGet, Error>({
        path: `/corporations/${corporationId}/icons`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List industry jobs run by a corporation
     *
     * @tags Industry
     * @name GetCorporationsCorporationIdIndustryJobs
     * @summary List corporation industry jobs
     * @request GET:/corporations/{corporation_id}/industry/jobs
     * @secure
     */
    getCorporationsCorporationIdIndustryJobs: (
      corporationId: CorporationID,
      query?: {
        /**
         * Whether to retrieve completed corporation industry jobs. Only includes jobs from the past 90 days
         * @default false
         */
        include_completed?: boolean;
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdIndustryJobsGet, Error>({
        path: `/corporations/${corporationId}/industry/jobs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of a corporation's kills and losses going back 90 days
     *
     * @tags Killmails
     * @name GetCorporationsCorporationIdKillmailsRecent
     * @summary Get a corporation's recent kills and losses
     * @request GET:/corporations/{corporation_id}/killmails/recent
     * @secure
     */
    getCorporationsCorporationIdKillmailsRecent: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdKillmailsRecentGet, Error>({
        path: `/corporations/${corporationId}/killmails/recent`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a corporation's medals
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMedals
     * @summary Get corporation medals
     * @request GET:/corporations/{corporation_id}/medals
     * @secure
     */
    getCorporationsCorporationIdMedals: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdMedalsGet, Error>({
        path: `/corporations/${corporationId}/medals`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns medals issued by a corporation
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMedalsIssued
     * @summary Get corporation issued medals
     * @request GET:/corporations/{corporation_id}/medals/issued
     * @secure
     */
    getCorporationsCorporationIdMedalsIssued: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdMedalsIssuedGet, Error>({
        path: `/corporations/${corporationId}/medals/issued`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the current member list of a corporation, the token's character need to be a member of the corporation.
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembers
     * @summary Get corporation members
     * @request GET:/corporations/{corporation_id}/members
     * @secure
     */
    getCorporationsCorporationIdMembers: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdMembersGet, Error>({
        path: `/corporations/${corporationId}/members`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a corporation's member limit, not including CEO himself
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembersLimit
     * @summary Get corporation member limit
     * @request GET:/corporations/{corporation_id}/members/limit
     * @secure
     */
    getCorporationsCorporationIdMembersLimit: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdMembersLimitGet, Error>({
        path: `/corporations/${corporationId}/members/limit`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a corporation's members' titles
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembersTitles
     * @summary Get corporation's members' titles
     * @request GET:/corporations/{corporation_id}/members/titles
     * @secure
     */
    getCorporationsCorporationIdMembersTitles: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdMembersTitlesGet, Error>({
        path: `/corporations/${corporationId}/members/titles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns additional information about a corporation's members which helps tracking their activities
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembertracking
     * @summary Track corporation members
     * @request GET:/corporations/{corporation_id}/membertracking
     * @secure
     */
    getCorporationsCorporationIdMembertracking: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdMembertrackingGet, Error>({
        path: `/corporations/${corporationId}/membertracking`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List open market orders placed on behalf of a corporation
     *
     * @tags Market
     * @name GetCorporationsCorporationIdOrders
     * @summary List open orders from a corporation
     * @request GET:/corporations/{corporation_id}/orders
     * @secure
     */
    getCorporationsCorporationIdOrders: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdOrdersGet, Error>({
        path: `/corporations/${corporationId}/orders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List cancelled and expired market orders placed on behalf of a corporation up to 90 days in the past.
     *
     * @tags Market
     * @name GetCorporationsCorporationIdOrdersHistory
     * @summary List historical orders from a corporation
     * @request GET:/corporations/{corporation_id}/orders/history
     * @secure
     */
    getCorporationsCorporationIdOrdersHistory: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdOrdersHistoryGet, Error>({
        path: `/corporations/${corporationId}/orders/history`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the roles of all members if the character has the personnel manager role or any grantable role.
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdRoles
     * @summary Get corporation member roles
     * @request GET:/corporations/{corporation_id}/roles
     * @secure
     */
    getCorporationsCorporationIdRoles: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdRolesGet, Error>({
        path: `/corporations/${corporationId}/roles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return how roles have changed for a coporation's members, up to a month
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdRolesHistory
     * @summary Get corporation member roles history
     * @request GET:/corporations/{corporation_id}/roles/history
     * @secure
     */
    getCorporationsCorporationIdRolesHistory: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdRolesHistoryGet, Error>({
        path: `/corporations/${corporationId}/roles/history`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the current shareholders of a corporation.
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdShareholders
     * @summary Get corporation shareholders
     * @request GET:/corporations/{corporation_id}/shareholders
     * @secure
     */
    getCorporationsCorporationIdShareholders: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdShareholdersGet, Error>({
        path: `/corporations/${corporationId}/shareholders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return corporation standings from agents, NPC corporations, and factions
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStandings
     * @summary Get corporation standings
     * @request GET:/corporations/{corporation_id}/standings
     * @secure
     */
    getCorporationsCorporationIdStandings: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdStandingsGet, Error>({
        path: `/corporations/${corporationId}/standings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of corporation starbases (POSes)
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStarbases
     * @summary Get corporation starbases (POSes)
     * @request GET:/corporations/{corporation_id}/starbases
     * @secure
     */
    getCorporationsCorporationIdStarbases: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdStarbasesGet, Error>({
        path: `/corporations/${corporationId}/starbases`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns various settings and fuels of a starbase (POS)
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStarbasesStarbaseId
     * @summary Get starbase (POS) detail
     * @request GET:/corporations/{corporation_id}/starbases/{starbase_id}
     * @secure
     */
    getCorporationsCorporationIdStarbasesStarbaseId: (
      corporationId: CorporationID,
      starbaseId: number,
      query: {
        /**
         * The solar system this starbase (POS) is located in,
         * @format int64
         */
        system_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdStarbasesStarbaseIdGet, Error>({
        path: `/corporations/${corporationId}/starbases/${starbaseId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of corporation structures. This route's version includes the changes to structures detailed in this blog: https://www.eveonline.com/article/upwell-2.0-structures-changes-coming-on-february-13th
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStructures
     * @summary Get corporation structures
     * @request GET:/corporations/{corporation_id}/structures
     * @secure
     */
    getCorporationsCorporationIdStructures: (
      corporationId: CorporationID,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdStructuresGet, Error>({
        path: `/corporations/${corporationId}/structures`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a corporation's titles
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdTitles
     * @summary Get corporation titles
     * @request GET:/corporations/{corporation_id}/titles
     * @secure
     */
    getCorporationsCorporationIdTitles: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdTitlesGet, Error>({
        path: `/corporations/${corporationId}/titles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a corporation's wallets
     *
     * @tags Wallet
     * @name GetCorporationsCorporationIdWallets
     * @summary Returns a corporation's wallet balance
     * @request GET:/corporations/{corporation_id}/wallets
     * @secure
     */
    getCorporationsCorporationIdWallets: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdWalletsGet, Error>({
        path: `/corporations/${corporationId}/wallets`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the given corporation's wallet journal for the given division going 30 days back
     *
     * @tags Wallet
     * @name GetCorporationsCorporationIdWalletsDivisionJournal
     * @summary Get corporation wallet journal
     * @request GET:/corporations/{corporation_id}/wallets/{division}/journal
     * @secure
     */
    getCorporationsCorporationIdWalletsDivisionJournal: (
      corporationId: CorporationID,
      division: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CorporationsCorporationIdWalletsDivisionJournalGet, Error>({
        path: `/corporations/${corporationId}/wallets/${division}/journal`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get wallet transactions of a corporation
     *
     * @tags Wallet
     * @name GetCorporationsCorporationIdWalletsDivisionTransactions
     * @summary Get corporation wallet transactions
     * @request GET:/corporations/{corporation_id}/wallets/{division}/transactions
     * @secure
     */
    getCorporationsCorporationIdWalletsDivisionTransactions: (
      corporationId: CorporationID,
      division: number,
      query?: {
        /**
         * Only show journal entries happened before the transaction referenced by this id
         * @format int64
         */
        from_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CorporationsCorporationIdWalletsDivisionTransactionsGet,
        Error
      >({
        path: `/corporations/${corporationId}/wallets/${division}/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  dogma = {
    /**
     * @description Get a list of dogma attribute ids This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaAttributes
     * @summary Get attributes
     * @request GET:/dogma/attributes
     */
    getDogmaAttributes: (params: RequestParams = {}) =>
      this.request<DogmaAttributesGet, Error>({
        path: `/dogma/attributes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a dogma attribute This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaAttributesAttributeId
     * @summary Get attribute information
     * @request GET:/dogma/attributes/{attribute_id}
     */
    getDogmaAttributesAttributeId: (
      attributeId: number,
      params: RequestParams = {},
    ) =>
      this.request<DogmaAttributesAttributeIdGet, Error>({
        path: `/dogma/attributes/${attributeId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns info about a dynamic item resulting from mutation with a mutaplasmid. This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaDynamicItemsTypeIdItemId
     * @summary Get dynamic item information
     * @request GET:/dogma/dynamic/items/{type_id}/{item_id}
     */
    getDogmaDynamicItemsTypeIdItemId: (
      itemId: number,
      typeId: number,
      params: RequestParams = {},
    ) =>
      this.request<DogmaDynamicItemsTypeIdItemIdGet, Error>({
        path: `/dogma/dynamic/items/${typeId}/${itemId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of dogma effect ids This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaEffects
     * @summary Get effects
     * @request GET:/dogma/effects
     */
    getDogmaEffects: (params: RequestParams = {}) =>
      this.request<DogmaEffectsGet, Error>({
        path: `/dogma/effects`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a dogma effect This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaEffectsEffectId
     * @summary Get effect information
     * @request GET:/dogma/effects/{effect_id}
     */
    getDogmaEffectsEffectId: (effectId: number, params: RequestParams = {}) =>
      this.request<DogmaEffectsEffectIdGet, Error>({
        path: `/dogma/effects/${effectId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  fleets = {
    /**
     * @description Return details about a fleet
     *
     * @tags Fleets
     * @name GetFleetsFleetId
     * @summary Get fleet information
     * @request GET:/fleets/{fleet_id}
     * @secure
     */
    getFleetsFleetId: (fleetId: number, params: RequestParams = {}) =>
      this.request<FleetsFleetIdGet, Error>({
        path: `/fleets/${fleetId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update settings about a fleet
     *
     * @tags Fleets
     * @name PutFleetsFleetId
     * @summary Update fleet
     * @request PUT:/fleets/{fleet_id}
     * @secure
     */
    putFleetsFleetId: (
      fleetId: number,
      data: {
        /** Should free-move be enabled in the fleet */
        is_free_move?: boolean;
        /** New fleet MOTD in CCP flavoured HTML */
        motd?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return information about fleet members
     *
     * @tags Fleets
     * @name GetFleetsFleetIdMembers
     * @summary Get fleet members
     * @request GET:/fleets/{fleet_id}/members
     * @secure
     */
    getFleetsFleetIdMembers: (fleetId: number, params: RequestParams = {}) =>
      this.request<FleetsFleetIdMembersGet, Error>({
        path: `/fleets/${fleetId}/members`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Invite a character into the fleet. If a character has a CSPA charge set it is not possible to invite them to the fleet using ESI
     *
     * @tags Fleets
     * @name PostFleetsFleetIdMembers
     * @summary Create fleet invitation
     * @request POST:/fleets/{fleet_id}/members
     * @secure
     */
    postFleetsFleetIdMembers: (
      fleetId: number,
      data: {
        /**
         * The character you want to invite
         * @format int64
         */
        character_id: number;
        /** If a character is invited with the `fleet_commander` role, neither `wing_id` or `squad_id` should be specified. If a character is invited with the `wing_commander` role, only `wing_id` should be specified. If a character is invited with the `squad_commander` role, both `wing_id` and `squad_id` should be specified. If a character is invited with the `squad_member` role, `wing_id` and `squad_id` should either both be specified or not specified at all. If they aren’t specified, the invited character will join any squad with available positions. */
        role:
          | "fleet_commander"
          | "wing_commander"
          | "squad_commander"
          | "squad_member";
        /** @format int64 */
        squad_id?: number;
        /** @format int64 */
        wing_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}/members`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Kick a fleet member
     *
     * @tags Fleets
     * @name DeleteFleetsFleetIdMembersMemberId
     * @summary Kick fleet member
     * @request DELETE:/fleets/{fleet_id}/members/{member_id}
     * @secure
     */
    deleteFleetsFleetIdMembersMemberId: (
      fleetId: number,
      memberId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}/members/${memberId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Move a fleet member around
     *
     * @tags Fleets
     * @name PutFleetsFleetIdMembersMemberId
     * @summary Move fleet member
     * @request PUT:/fleets/{fleet_id}/members/{member_id}
     * @secure
     */
    putFleetsFleetIdMembersMemberId: (
      fleetId: number,
      memberId: number,
      data: {
        /** If a character is moved to the `fleet_commander` role, neither `wing_id` or `squad_id` should be specified. If a character is moved to the `wing_commander` role, only `wing_id` should be specified. If a character is moved to the `squad_commander` role, both `wing_id` and `squad_id` should be specified. If a character is moved to the `squad_member` role, both `wing_id` and `squad_id` should be specified. */
        role:
          | "fleet_commander"
          | "wing_commander"
          | "squad_commander"
          | "squad_member";
        /** @format int64 */
        squad_id?: number;
        /** @format int64 */
        wing_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}/members/${memberId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete a fleet squad, only empty squads can be deleted
     *
     * @tags Fleets
     * @name DeleteFleetsFleetIdSquadsSquadId
     * @summary Delete fleet squad
     * @request DELETE:/fleets/{fleet_id}/squads/{squad_id}
     * @secure
     */
    deleteFleetsFleetIdSquadsSquadId: (
      fleetId: number,
      squadId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}/squads/${squadId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Rename a fleet squad
     *
     * @tags Fleets
     * @name PutFleetsFleetIdSquadsSquadId
     * @summary Rename fleet squad
     * @request PUT:/fleets/{fleet_id}/squads/{squad_id}
     * @secure
     */
    putFleetsFleetIdSquadsSquadId: (
      fleetId: number,
      squadId: number,
      data: {
        /** @maxLength 10 */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}/squads/${squadId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return information about wings in a fleet
     *
     * @tags Fleets
     * @name GetFleetsFleetIdWings
     * @summary Get fleet wings
     * @request GET:/fleets/{fleet_id}/wings
     * @secure
     */
    getFleetsFleetIdWings: (fleetId: number, params: RequestParams = {}) =>
      this.request<FleetsFleetIdWingsGet, Error>({
        path: `/fleets/${fleetId}/wings`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new wing in a fleet
     *
     * @tags Fleets
     * @name PostFleetsFleetIdWings
     * @summary Create fleet wing
     * @request POST:/fleets/{fleet_id}/wings
     * @secure
     */
    postFleetsFleetIdWings: (fleetId: number, params: RequestParams = {}) =>
      this.request<FleetsFleetIdWingsPost, Error>({
        path: `/fleets/${fleetId}/wings`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a fleet wing, only empty wings can be deleted. The wing may contain squads, but the squads must be empty
     *
     * @tags Fleets
     * @name DeleteFleetsFleetIdWingsWingId
     * @summary Delete fleet wing
     * @request DELETE:/fleets/{fleet_id}/wings/{wing_id}
     * @secure
     */
    deleteFleetsFleetIdWingsWingId: (
      fleetId: number,
      wingId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}/wings/${wingId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Rename a fleet wing
     *
     * @tags Fleets
     * @name PutFleetsFleetIdWingsWingId
     * @summary Rename fleet wing
     * @request PUT:/fleets/{fleet_id}/wings/{wing_id}
     * @secure
     */
    putFleetsFleetIdWingsWingId: (
      fleetId: number,
      wingId: number,
      data: {
        /** @maxLength 10 */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/fleets/${fleetId}/wings/${wingId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create a new squad in a fleet
     *
     * @tags Fleets
     * @name PostFleetsFleetIdWingsWingIdSquads
     * @summary Create fleet squad
     * @request POST:/fleets/{fleet_id}/wings/{wing_id}/squads
     * @secure
     */
    postFleetsFleetIdWingsWingIdSquads: (
      fleetId: number,
      wingId: number,
      params: RequestParams = {},
    ) =>
      this.request<FleetsFleetIdWingsWingIdSquadsPost, Error>({
        path: `/fleets/${fleetId}/wings/${wingId}/squads`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  fw = {
    /**
     * @description Top 4 leaderboard of factions for kills and victory points separated by total, last week and yesterday This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwLeaderboards
     * @summary List of the top factions in faction warfare
     * @request GET:/fw/leaderboards
     */
    getFwLeaderboards: (params: RequestParams = {}) =>
      this.request<FwLeaderboardsGet, Error>({
        path: `/fw/leaderboards`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Top 100 leaderboard of pilots for kills and victory points separated by total, last week and yesterday This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwLeaderboardsCharacters
     * @summary List of the top pilots in faction warfare
     * @request GET:/fw/leaderboards/characters
     */
    getFwLeaderboardsCharacters: (params: RequestParams = {}) =>
      this.request<FwLeaderboardsCharactersGet, Error>({
        path: `/fw/leaderboards/characters`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Top 10 leaderboard of corporations for kills and victory points separated by total, last week and yesterday This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwLeaderboardsCorporations
     * @summary List of the top corporations in faction warfare
     * @request GET:/fw/leaderboards/corporations
     */
    getFwLeaderboardsCorporations: (params: RequestParams = {}) =>
      this.request<FwLeaderboardsCorporationsGet, Error>({
        path: `/fw/leaderboards/corporations`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Statistical overviews of factions involved in faction warfare This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwStats
     * @summary An overview of statistics about factions involved in faction warfare
     * @request GET:/fw/stats
     */
    getFwStats: (params: RequestParams = {}) =>
      this.request<FwStatsGet, Error>({
        path: `/fw/stats`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description An overview of the current ownership of faction warfare solar systems
     *
     * @tags Faction Warfare
     * @name GetFwSystems
     * @summary Ownership of faction warfare systems
     * @request GET:/fw/systems
     */
    getFwSystems: (params: RequestParams = {}) =>
      this.request<FwSystemsGet, Error>({
        path: `/fw/systems`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Data about which NPC factions are at war This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwWars
     * @summary Data about which NPC factions are at war
     * @request GET:/fw/wars
     */
    getFwWars: (params: RequestParams = {}) =>
      this.request<FwWarsGet, Error>({
        path: `/fw/wars`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  incursions = {
    /**
     * @description Return a list of current incursions
     *
     * @tags Incursions
     * @name GetIncursions
     * @summary List incursions
     * @request GET:/incursions
     */
    getIncursions: (params: RequestParams = {}) =>
      this.request<IncursionsGet, Error>({
        path: `/incursions`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  industry = {
    /**
     * @description Return a list of industry facilities
     *
     * @tags Industry
     * @name GetIndustryFacilities
     * @summary List industry facilities
     * @request GET:/industry/facilities
     */
    getIndustryFacilities: (params: RequestParams = {}) =>
      this.request<IndustryFacilitiesGet, Error>({
        path: `/industry/facilities`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return cost indices for solar systems
     *
     * @tags Industry
     * @name GetIndustrySystems
     * @summary List solar system cost indices
     * @request GET:/industry/systems
     */
    getIndustrySystems: (params: RequestParams = {}) =>
      this.request<IndustrySystemsGet, Error>({
        path: `/industry/systems`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  insurance = {
    /**
     * @description Return available insurance levels for all ship types
     *
     * @tags Insurance
     * @name GetInsurancePrices
     * @summary List insurance levels
     * @request GET:/insurance/prices
     */
    getInsurancePrices: (params: RequestParams = {}) =>
      this.request<InsurancePricesGet, Error>({
        path: `/insurance/prices`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  killmails = {
    /**
     * @description Return a single killmail from its ID and hash
     *
     * @tags Killmails
     * @name GetKillmailsKillmailIdKillmailHash
     * @summary Get a single killmail
     * @request GET:/killmails/{killmail_id}/{killmail_hash}
     */
    getKillmailsKillmailIdKillmailHash: (
      killmailHash: string,
      killmailId: number,
      params: RequestParams = {},
    ) =>
      this.request<KillmailsKillmailIdKillmailHashGet, Error>({
        path: `/killmails/${killmailId}/${killmailHash}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  loyalty = {
    /**
     * @description Return a list of offers from a specific corporation's loyalty store This route expires daily at 11:05
     *
     * @tags Loyalty
     * @name GetLoyaltyStoresCorporationIdOffers
     * @summary List loyalty store offers
     * @request GET:/loyalty/stores/{corporation_id}/offers
     */
    getLoyaltyStoresCorporationIdOffers: (
      corporationId: CorporationID,
      params: RequestParams = {},
    ) =>
      this.request<LoyaltyStoresCorporationIdOffersGet, Error>({
        path: `/loyalty/stores/${corporationId}/offers`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  markets = {
    /**
     * @description Get a list of item groups This route expires daily at 11:05
     *
     * @tags Market
     * @name GetMarketsGroups
     * @summary Get item groups
     * @request GET:/markets/groups
     */
    getMarketsGroups: (params: RequestParams = {}) =>
      this.request<MarketsGroupsGet, Error>({
        path: `/markets/groups`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on an item group This route expires daily at 11:05
     *
     * @tags Market
     * @name GetMarketsGroupsMarketGroupId
     * @summary Get item group information
     * @request GET:/markets/groups/{market_group_id}
     */
    getMarketsGroupsMarketGroupId: (
      marketGroupId: number,
      params: RequestParams = {},
    ) =>
      this.request<MarketsGroupsMarketGroupIdGet, Error>({
        path: `/markets/groups/${marketGroupId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of prices
     *
     * @tags Market
     * @name GetMarketsPrices
     * @summary List market prices
     * @request GET:/markets/prices
     */
    getMarketsPrices: (params: RequestParams = {}) =>
      this.request<MarketsPricesGet, Error>({
        path: `/markets/prices`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return all orders in a structure
     *
     * @tags Market
     * @name GetMarketsStructuresStructureId
     * @summary List orders in a structure
     * @request GET:/markets/structures/{structure_id}
     * @secure
     */
    getMarketsStructuresStructureId: (
      structureId: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MarketsStructuresStructureIdGet, Error>({
        path: `/markets/structures/${structureId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of historical market statistics for the specified type in a region This route expires daily at 11:05
     *
     * @tags Market
     * @name GetMarketsRegionIdHistory
     * @summary List historical market statistics in a region
     * @request GET:/markets/{region_id}/history
     */
    getMarketsRegionIdHistory: (
      regionId: number,
      query: {
        /**
         * Return statistics for this type
         * @format int64
         */
        type_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MarketsRegionIdHistoryGet, Error>({
        path: `/markets/${regionId}/history`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of orders in a region
     *
     * @tags Market
     * @name GetMarketsRegionIdOrders
     * @summary List orders in a region
     * @request GET:/markets/{region_id}/orders
     */
    getMarketsRegionIdOrders: (
      regionId: number,
      query: {
        /**
         * Filter buy/sell orders, return all orders by default. If you query without type_id, we always return both buy and sell orders
         * @default "all"
         */
        order_type: "buy" | "sell" | "all";
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
        /**
         * Return orders only for this type
         * @format int64
         */
        type_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MarketsRegionIdOrdersGet, Error>({
        path: `/markets/${regionId}/orders`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of type IDs that have active orders in the region, for efficient market indexing.
     *
     * @tags Market
     * @name GetMarketsRegionIdTypes
     * @summary List type IDs relevant to a market
     * @request GET:/markets/{region_id}/types
     */
    getMarketsRegionIdTypes: (
      regionId: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MarketsRegionIdTypesGet, Error>({
        path: `/markets/${regionId}/types`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  meta = {
    /**
     * @description Get the changelog of this API.
     *
     * @tags Meta
     * @name GetMetaChangelog
     * @summary Get changelog
     * @request GET:/meta/changelog
     */
    getMetaChangelog: (params: RequestParams = {}) =>
      this.request<MetaChangelog, Error>({
        path: `/meta/changelog`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of compatibility dates.
     *
     * @tags Meta
     * @name GetMetaCompatibilityDates
     * @summary Get compatibility dates
     * @request GET:/meta/compatibility-dates
     */
    getMetaCompatibilityDates: (params: RequestParams = {}) =>
      this.request<MetaCompatibilityDates, Error>({
        path: `/meta/compatibility-dates`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  route = {
    /**
     * @description Get the systems between origin and destination
     *
     * @tags Routes
     * @name GetRouteOriginDestination
     * @summary Get route
     * @request GET:/route/{origin}/{destination}
     */
    getRouteOriginDestination: (
      destination: number,
      origin: number,
      query?: {
        /**
         * avoid solar system ID(s)
         * @maxItems 100
         * @uniqueItems true
         */
        avoid?: number[];
        /**
         * connected solar system pairs
         * @maxItems 100
         * @uniqueItems true
         */
        connections?: number[][];
        /**
         * route security preference
         * @default "shortest"
         */
        flag?: "shortest" | "secure" | "insecure";
      },
      params: RequestParams = {},
    ) =>
      this.request<RouteOriginDestinationGet, Error>({
        path: `/route/${origin}/${destination}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  sovereignty = {
    /**
     * @description Shows sovereignty data for campaigns.
     *
     * @tags Sovereignty
     * @name GetSovereigntyCampaigns
     * @summary List sovereignty campaigns
     * @request GET:/sovereignty/campaigns
     */
    getSovereigntyCampaigns: (params: RequestParams = {}) =>
      this.request<SovereigntyCampaignsGet, Error>({
        path: `/sovereignty/campaigns`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Shows sovereignty information for solar systems
     *
     * @tags Sovereignty
     * @name GetSovereigntyMap
     * @summary List sovereignty of systems
     * @request GET:/sovereignty/map
     */
    getSovereigntyMap: (params: RequestParams = {}) =>
      this.request<SovereigntyMapGet, Error>({
        path: `/sovereignty/map`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Shows sovereignty data for structures.
     *
     * @tags Sovereignty
     * @name GetSovereigntyStructures
     * @summary List sovereignty structures
     * @request GET:/sovereignty/structures
     */
    getSovereigntyStructures: (params: RequestParams = {}) =>
      this.request<SovereigntyStructuresGet, Error>({
        path: `/sovereignty/structures`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  status = {
    /**
     * @description Current status of the EVE Online cluster
     *
     * @tags Status
     * @name GetStatus
     * @summary Get the server's status
     * @request GET:/status
     */
    getStatus: (params: RequestParams = {}) =>
      this.request<Status, Error>({
        path: `/status`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  ui = {
    /**
     * @description Set a solar system as autopilot waypoint
     *
     * @tags User Interface
     * @name PostUiAutopilotWaypoint
     * @summary Set Autopilot Waypoint
     * @request POST:/ui/autopilot/waypoint
     * @secure
     */
    postUiAutopilotWaypoint: (
      query: {
        /**
         * Whether this solar system should be added to the beginning of all waypoints
         * @default false
         */
        add_to_beginning: boolean;
        /**
         * Whether clean other waypoints beforing adding this one
         * @default false
         */
        clear_other_waypoints: boolean;
        /**
         * The destination to travel to, can be solar system, station or structure's id
         * @format int64
         */
        destination_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/ui/autopilot/waypoint`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the contract window inside the client
     *
     * @tags User Interface
     * @name PostUiOpenwindowContract
     * @summary Open Contract Window
     * @request POST:/ui/openwindow/contract
     * @secure
     */
    postUiOpenwindowContract: (
      query: {
        /**
         * The contract to open
         * @format int64
         */
        contract_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/ui/openwindow/contract`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the information window for a character, corporation or alliance inside the client
     *
     * @tags User Interface
     * @name PostUiOpenwindowInformation
     * @summary Open Information Window
     * @request POST:/ui/openwindow/information
     * @secure
     */
    postUiOpenwindowInformation: (
      query: {
        /**
         * The target to open
         * @format int64
         */
        target_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/ui/openwindow/information`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the market details window for a specific typeID inside the client
     *
     * @tags User Interface
     * @name PostUiOpenwindowMarketdetails
     * @summary Open Market Details
     * @request POST:/ui/openwindow/marketdetails
     * @secure
     */
    postUiOpenwindowMarketdetails: (
      query: {
        /**
         * The item type to open in market window
         * @format int64
         */
        type_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/ui/openwindow/marketdetails`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the New Mail window, according to settings from the request if applicable
     *
     * @tags User Interface
     * @name PostUiOpenwindowNewmail
     * @summary Open New Mail Window
     * @request POST:/ui/openwindow/newmail
     * @secure
     */
    postUiOpenwindowNewmail: (
      data: {
        /** @maxLength 10000 */
        body: string;
        /**
         * @maxItems 50
         * @minItems 1
         */
        recipients: number[];
        /** @maxLength 1000 */
        subject: string;
        /** @format int64 */
        to_corp_or_alliance_id?: number;
        /**
         * Corporations, alliances and mailing lists are all types of mailing groups. You may only send to one mailing group, at a time, so you may fill out either this field or the to_corp_or_alliance_ids field
         * @format int64
         */
        to_mailing_list_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/ui/openwindow/newmail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  universe = {
    /**
     * @description Get all character ancestries This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseAncestries
     * @summary Get ancestries
     * @request GET:/universe/ancestries
     */
    getUniverseAncestries: (params: RequestParams = {}) =>
      this.request<UniverseAncestriesGet, Error>({
        path: `/universe/ancestries`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on an asteroid belt This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseAsteroidBeltsAsteroidBeltId
     * @summary Get asteroid belt information
     * @request GET:/universe/asteroid_belts/{asteroid_belt_id}
     */
    getUniverseAsteroidBeltsAsteroidBeltId: (
      asteroidBeltId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseAsteroidBeltsAsteroidBeltIdGet, Error>({
        path: `/universe/asteroid_belts/${asteroidBeltId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of bloodlines This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseBloodlines
     * @summary Get bloodlines
     * @request GET:/universe/bloodlines
     */
    getUniverseBloodlines: (params: RequestParams = {}) =>
      this.request<UniverseBloodlinesGet, Error>({
        path: `/universe/bloodlines`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of item categories This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseCategories
     * @summary Get item categories
     * @request GET:/universe/categories
     */
    getUniverseCategories: (params: RequestParams = {}) =>
      this.request<UniverseCategoriesGet, Error>({
        path: `/universe/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information of an item category This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseCategoriesCategoryId
     * @summary Get item category information
     * @request GET:/universe/categories/{category_id}
     */
    getUniverseCategoriesCategoryId: (
      categoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseCategoriesCategoryIdGet, Error>({
        path: `/universe/categories/${categoryId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of constellations This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseConstellations
     * @summary Get constellations
     * @request GET:/universe/constellations
     */
    getUniverseConstellations: (params: RequestParams = {}) =>
      this.request<UniverseConstellationsGet, Error>({
        path: `/universe/constellations`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a constellation This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseConstellationsConstellationId
     * @summary Get constellation information
     * @request GET:/universe/constellations/{constellation_id}
     */
    getUniverseConstellationsConstellationId: (
      constellationId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseConstellationsConstellationIdGet, Error>({
        path: `/universe/constellations/${constellationId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of factions This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseFactions
     * @summary Get factions
     * @request GET:/universe/factions
     */
    getUniverseFactions: (params: RequestParams = {}) =>
      this.request<UniverseFactionsGet, Error>({
        path: `/universe/factions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of graphics This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGraphics
     * @summary Get graphics
     * @request GET:/universe/graphics
     */
    getUniverseGraphics: (params: RequestParams = {}) =>
      this.request<UniverseGraphicsGet, Error>({
        path: `/universe/graphics`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a graphic This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGraphicsGraphicId
     * @summary Get graphic information
     * @request GET:/universe/graphics/{graphic_id}
     */
    getUniverseGraphicsGraphicId: (
      graphicId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseGraphicsGraphicIdGet, Error>({
        path: `/universe/graphics/${graphicId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of item groups This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGroups
     * @summary Get item groups
     * @request GET:/universe/groups
     */
    getUniverseGroups: (
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<UniverseGroupsGet, Error>({
        path: `/universe/groups`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on an item group This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGroupsGroupId
     * @summary Get item group information
     * @request GET:/universe/groups/{group_id}
     */
    getUniverseGroupsGroupId: (groupId: number, params: RequestParams = {}) =>
      this.request<UniverseGroupsGroupIdGet, Error>({
        path: `/universe/groups/${groupId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Resolve a set of names to IDs in the following categories: agents, alliances, characters, constellations, corporations factions, inventory_types, regions, stations, and systems. Only exact matches will be returned. All names searched for are cached for 12 hours
     *
     * @tags Universe
     * @name PostUniverseIds
     * @summary Bulk names to IDs
     * @request POST:/universe/ids
     */
    postUniverseIds: (data: string[], params: RequestParams = {}) =>
      this.request<UniverseIdsPost, Error>({
        path: `/universe/ids`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a moon This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseMoonsMoonId
     * @summary Get moon information
     * @request GET:/universe/moons/{moon_id}
     */
    getUniverseMoonsMoonId: (moonId: number, params: RequestParams = {}) =>
      this.request<UniverseMoonsMoonIdGet, Error>({
        path: `/universe/moons/${moonId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Resolve a set of IDs to names and categories. Supported ID's for resolving are: Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions
     *
     * @tags Universe
     * @name PostUniverseNames
     * @summary Get names and categories for a set of IDs
     * @request POST:/universe/names
     */
    postUniverseNames: (
      data: AlliancesAllianceIdCorporationsGet,
      params: RequestParams = {},
    ) =>
      this.request<UniverseNamesPost, Error>({
        path: `/universe/names`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a planet This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniversePlanetsPlanetId
     * @summary Get planet information
     * @request GET:/universe/planets/{planet_id}
     */
    getUniversePlanetsPlanetId: (
      planetId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniversePlanetsPlanetIdGet, Error>({
        path: `/universe/planets/${planetId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of character races This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseRaces
     * @summary Get character races
     * @request GET:/universe/races
     */
    getUniverseRaces: (params: RequestParams = {}) =>
      this.request<UniverseRacesGet, Error>({
        path: `/universe/races`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of regions This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseRegions
     * @summary Get regions
     * @request GET:/universe/regions
     */
    getUniverseRegions: (params: RequestParams = {}) =>
      this.request<UniverseRegionsGet, Error>({
        path: `/universe/regions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a region This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseRegionsRegionId
     * @summary Get region information
     * @request GET:/universe/regions/{region_id}
     */
    getUniverseRegionsRegionId: (
      regionId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseRegionsRegionIdGet, Error>({
        path: `/universe/regions/${regionId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a planetary factory schematic
     *
     * @tags Planetary Interaction
     * @name GetUniverseSchematicsSchematicId
     * @summary Get schematic information
     * @request GET:/universe/schematics/{schematic_id}
     */
    getUniverseSchematicsSchematicId: (
      schematicId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseSchematicsSchematicIdGet, Error>({
        path: `/universe/schematics/${schematicId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a stargate This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseStargatesStargateId
     * @summary Get stargate information
     * @request GET:/universe/stargates/{stargate_id}
     */
    getUniverseStargatesStargateId: (
      stargateId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseStargatesStargateIdGet, Error>({
        path: `/universe/stargates/${stargateId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a star This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseStarsStarId
     * @summary Get star information
     * @request GET:/universe/stars/{star_id}
     */
    getUniverseStarsStarId: (starId: number, params: RequestParams = {}) =>
      this.request<UniverseStarsStarIdGet, Error>({
        path: `/universe/stars/${starId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a station This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseStationsStationId
     * @summary Get station information
     * @request GET:/universe/stations/{station_id}
     */
    getUniverseStationsStationId: (
      stationId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseStationsStationIdGet, Error>({
        path: `/universe/stations/${stationId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List all public structures
     *
     * @tags Universe
     * @name GetUniverseStructures
     * @summary List all public structures
     * @request GET:/universe/structures
     */
    getUniverseStructures: (
      query?: {
        /** Only list public structures that have this service online */
        filter?: "market" | "manufacturing_basic";
      },
      params: RequestParams = {},
    ) =>
      this.request<UniverseStructuresGet, Error>({
        path: `/universe/structures`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns information on requested structure if you are on the ACL. Otherwise, returns "Forbidden" for all inputs.
     *
     * @tags Universe
     * @name GetUniverseStructuresStructureId
     * @summary Get structure information
     * @request GET:/universe/structures/{structure_id}
     * @secure
     */
    getUniverseStructuresStructureId: (
      structureId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseStructuresStructureIdGet, Error>({
        path: `/universe/structures/${structureId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with jumps will be listed
     *
     * @tags Universe
     * @name GetUniverseSystemJumps
     * @summary Get system jumps
     * @request GET:/universe/system_jumps
     */
    getUniverseSystemJumps: (params: RequestParams = {}) =>
      this.request<UniverseSystemJumpsGet, Error>({
        path: `/universe/system_jumps`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with kills will be listed
     *
     * @tags Universe
     * @name GetUniverseSystemKills
     * @summary Get system kills
     * @request GET:/universe/system_kills
     */
    getUniverseSystemKills: (params: RequestParams = {}) =>
      this.request<UniverseSystemKillsGet, Error>({
        path: `/universe/system_kills`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of solar systems This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseSystems
     * @summary Get solar systems
     * @request GET:/universe/systems
     */
    getUniverseSystems: (params: RequestParams = {}) =>
      this.request<UniverseSystemsGet, Error>({
        path: `/universe/systems`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a solar system. This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseSystemsSystemId
     * @summary Get solar system information
     * @request GET:/universe/systems/{system_id}
     */
    getUniverseSystemsSystemId: (
      systemId: number,
      params: RequestParams = {},
    ) =>
      this.request<UniverseSystemsSystemIdGet, Error>({
        path: `/universe/systems/${systemId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of type ids This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseTypes
     * @summary Get types
     * @request GET:/universe/types
     */
    getUniverseTypes: (
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<UniverseTypesGet, Error>({
        path: `/universe/types`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a type This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseTypesTypeId
     * @summary Get type information
     * @request GET:/universe/types/{type_id}
     */
    getUniverseTypesTypeId: (typeId: number, params: RequestParams = {}) =>
      this.request<UniverseTypesTypeIdGet, Error>({
        path: `/universe/types/${typeId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  wars = {
    /**
     * @description Return a list of wars
     *
     * @tags Wars
     * @name GetWars
     * @summary List wars
     * @request GET:/wars
     */
    getWars: (
      query?: {
        /**
         * Only return wars with ID smaller than this
         * @format int64
         */
        max_war_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WarsGet, Error>({
        path: `/wars`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return details about a war
     *
     * @tags Wars
     * @name GetWarsWarId
     * @summary Get war information
     * @request GET:/wars/{war_id}
     */
    getWarsWarId: (warId: number, params: RequestParams = {}) =>
      this.request<WarsWarIdGet, Error>({
        path: `/wars/${warId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of kills related to a war
     *
     * @tags Wars
     * @name GetWarsWarIdKillmails
     * @summary List kills for a war
     * @request GET:/wars/{war_id}/killmails
     */
    getWarsWarIdKillmails: (
      warId: number,
      query?: {
        /**
         * Which page of results to return.
         * @format int32
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WarsWarIdKillmailsGet, Error>({
        path: `/wars/${warId}/killmails`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
