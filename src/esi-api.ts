/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * Bad request
 * Bad request model
 */
export interface BadRequest {
  /** Bad request message */
  error: string;
}

/**
 * Error limited
 * Error limited model
 */
export interface ErrorLimited {
  /** Error limited message */
  error: string;
}

/**
 * Forbidden
 * Forbidden model
 */
export interface Forbidden {
  /** Forbidden message */
  error: string;
  /** status code received from SSO */
  sso_status?: number;
}

/**
 * Gateway timeout
 * Gateway timeout model
 */
export interface GatewayTimeout {
  /** Gateway timeout message */
  error: string;
  /** number of seconds the request was given */
  timeout?: number;
}

/**
 * Internal server error
 * Internal server error model
 */
export interface InternalServerError {
  /** Internal server error message */
  error: string;
}

/**
 * Service unavailable
 * Service unavailable model
 */
export interface ServiceUnavailable {
  /** Service unavailable message */
  error: string;
}

/**
 * Unauthorized
 * Unauthorized model
 */
export interface Unauthorized {
  /** Unauthorized message */
  error: string;
}

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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://esi.evetech.net/latest";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

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
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
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
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
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

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
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
 * @title EVE Swagger Interface
 * @version 1.17
 * @baseUrl https://esi.evetech.net/latest
 *
 * An OpenAPI for EVE Online
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  alliances = {
    /**
     * @description List all active player alliances --- Alternate route: `/dev/alliances/` Alternate route: `/legacy/alliances/` Alternate route: `/v1/alliances/` Alternate route: `/v2/alliances/` --- This route is cached for up to 3600 seconds
     *
     * @tags Alliance
     * @name GetAlliances
     * @summary List all alliances
     * @request GET:/alliances/
     */
    getAlliances: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/alliances/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Public information about an alliance --- Alternate route: `/dev/alliances/{alliance_id}/` Alternate route: `/legacy/alliances/{alliance_id}/` Alternate route: `/v3/alliances/{alliance_id}/` Alternate route: `/v4/alliances/{alliance_id}/` --- This route is cached for up to 3600 seconds
     *
     * @tags Alliance
     * @name GetAlliancesAllianceId
     * @summary Get alliance information
     * @request GET:/alliances/{alliance_id}/
     */
    getAlliancesAllianceId: (
      allianceId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_alliances_alliance_id_creator_corporation_id
           * ID of the corporation that created the alliance
           * @format int32
           */
          creator_corporation_id: number;
          /**
           * get_alliances_alliance_id_creator_id
           * ID of the character that created the alliance
           * @format int32
           */
          creator_id: number;
          /**
           * get_alliances_alliance_id_date_founded
           * date_founded string
           * @format date-time
           */
          date_founded: string;
          /**
           * get_alliances_alliance_id_executor_corporation_id
           * the executor corporation ID, if this alliance is not closed
           * @format int32
           */
          executor_corporation_id?: number;
          /**
           * get_alliances_alliance_id_faction_id
           * Faction ID this alliance is fighting for, if this alliance is enlisted in factional warfare
           * @format int32
           */
          faction_id?: number;
          /**
           * get_alliances_alliance_id_name
           * the full name of the alliance
           */
          name: string;
          /**
           * get_alliances_alliance_id_ticker
           * the short name of the alliance
           */
          ticker: string;
        },
        | void
        | BadRequest
        | {
            /**
             * get_alliances_alliance_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/alliances/${allianceId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return contacts of an alliance --- Alternate route: `/dev/alliances/{alliance_id}/contacts/` Alternate route: `/v2/alliances/{alliance_id}/contacts/` --- This route is cached for up to 300 seconds
     *
     * @tags Contacts
     * @name GetAlliancesAllianceIdContacts
     * @summary Get alliance contacts
     * @request GET:/alliances/{alliance_id}/contacts/
     * @secure
     */
    getAlliancesAllianceIdContacts: (
      allianceId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_alliances_alliance_id_contacts_contact_id
           * contact_id integer
           * @format int32
           */
          contact_id: number;
          /**
           * get_alliances_alliance_id_contacts_contact_type
           * contact_type string
           */
          contact_type: "character" | "corporation" | "alliance" | "faction";
          /**
           * get_alliances_alliance_id_contacts_label_ids
           * label_ids array
           * @maxItems 63
           */
          label_ids?: number[];
          /**
           * get_alliances_alliance_id_contacts_standing
           * Standing of the contact
           * @format float
           */
          standing: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/alliances/${allianceId}/contacts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return custom labels for an alliance's contacts --- Alternate route: `/dev/alliances/{alliance_id}/contacts/labels/` Alternate route: `/legacy/alliances/{alliance_id}/contacts/labels/` Alternate route: `/v1/alliances/{alliance_id}/contacts/labels/` --- This route is cached for up to 300 seconds
     *
     * @tags Contacts
     * @name GetAlliancesAllianceIdContactsLabels
     * @summary Get alliance contact labels
     * @request GET:/alliances/{alliance_id}/contacts/labels/
     * @secure
     */
    getAlliancesAllianceIdContactsLabels: (
      allianceId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_alliances_alliance_id_contacts_labels_label_id
           * label_id integer
           * @format int64
           */
          label_id: number;
          /**
           * get_alliances_alliance_id_contacts_labels_label_name
           * label_name string
           */
          label_name: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/alliances/${allianceId}/contacts/labels/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List all current member corporations of an alliance --- Alternate route: `/dev/alliances/{alliance_id}/corporations/` Alternate route: `/legacy/alliances/{alliance_id}/corporations/` Alternate route: `/v1/alliances/{alliance_id}/corporations/` Alternate route: `/v2/alliances/{alliance_id}/corporations/` --- This route is cached for up to 3600 seconds
     *
     * @tags Alliance
     * @name GetAlliancesAllianceIdCorporations
     * @summary List alliance's corporations
     * @request GET:/alliances/{alliance_id}/corporations/
     */
    getAlliancesAllianceIdCorporations: (
      allianceId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/alliances/${allianceId}/corporations/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the icon urls for a alliance --- Alternate route: `/legacy/alliances/{alliance_id}/icons/` Alternate route: `/v1/alliances/{alliance_id}/icons/` --- This route expires daily at 11:05 --- [Diff of the upcoming changes](https://esi.evetech.net/diff/latest/dev/#GET-/alliances/{alliance_id}/icons/)
     *
     * @tags Alliance
     * @name GetAlliancesAllianceIdIcons
     * @summary Get alliance icon
     * @request GET:/alliances/{alliance_id}/icons/
     */
    getAlliancesAllianceIdIcons: (
      allianceId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_alliances_alliance_id_icons_px128x128
           * px128x128 string
           */
          px128x128?: string;
          /**
           * get_alliances_alliance_id_icons_px64x64
           * px64x64 string
           */
          px64x64?: string;
        },
        | void
        | BadRequest
        | {
            /**
             * get_alliances_alliance_id_icons_error
             * error message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/alliances/${allianceId}/icons/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  characters = {
    /**
     * @description Bulk lookup of character IDs to corporation, alliance and faction --- Alternate route: `/dev/characters/affiliation/` Alternate route: `/v2/characters/affiliation/` --- This route is cached for up to 3600 seconds
     *
     * @tags Character
     * @name PostCharactersAffiliation
     * @summary Character affiliation
     * @request POST:/characters/affiliation/
     */
    postCharactersAffiliation: (
      characters: number[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_characters_affiliation_alliance_id
           * The character's alliance ID, if their corporation is in an alliance
           * @format int32
           */
          alliance_id?: number;
          /**
           * post_characters_affiliation_character_id
           * The character's ID
           * @format int32
           */
          character_id: number;
          /**
           * post_characters_affiliation_corporation_id
           * The character's corporation ID
           * @format int32
           */
          corporation_id: number;
          /**
           * post_characters_affiliation_faction_id
           * The character's faction ID, if their corporation is in a faction
           * @format int32
           */
          faction_id?: number;
        }[],
        BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/affiliation/`,
        method: "POST",
        query: query,
        body: characters,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Public information about a character --- Alternate route: `/dev/characters/{character_id}/` Alternate route: `/legacy/characters/{character_id}/` Alternate route: `/v5/characters/{character_id}/` --- This route is cached for up to 86400 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterId
     * @summary Get character's public information
     * @request GET:/characters/{character_id}/
     */
    getCharactersCharacterId: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_alliance_id
           * The character's alliance ID
           * @format int32
           */
          alliance_id?: number;
          /**
           * get_characters_character_id_birthday
           * Creation date of the character
           * @format date-time
           */
          birthday: string;
          /**
           * get_characters_character_id_bloodline_id
           * bloodline_id integer
           * @format int32
           */
          bloodline_id: number;
          /**
           * get_characters_character_id_corporation_id
           * The character's corporation ID
           * @format int32
           */
          corporation_id: number;
          /**
           * get_characters_character_id_description
           * description string
           */
          description?: string;
          /**
           * get_characters_character_id_faction_id
           * ID of the faction the character is fighting for, if the character is enlisted in Factional Warfare
           * @format int32
           */
          faction_id?: number;
          /**
           * get_characters_character_id_gender
           * gender string
           */
          gender: "female" | "male";
          /**
           * get_characters_character_id_name
           * name string
           */
          name: string;
          /**
           * get_characters_character_id_race_id
           * race_id integer
           * @format int32
           */
          race_id: number;
          /**
           * get_characters_character_id_security_status
           * security_status number
           * @format float
           * @min -10
           * @max 10
           */
          security_status?: number;
          /**
           * get_characters_character_id_title
           * The individual title of the character
           */
          title?: string;
        },
        | void
        | BadRequest
        | {
            /**
             * get_characters_character_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of agents research information for a character. The formula for finding the current research points with an agent is: currentPoints = remainderPoints + pointsPerDay * days(currentTime - researchStartDate) --- Alternate route: `/dev/characters/{character_id}/agents_research/` Alternate route: `/v2/characters/{character_id}/agents_research/` --- This route is cached for up to 3600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdAgentsResearch
     * @summary Get agents research
     * @request GET:/characters/{character_id}/agents_research/
     * @secure
     */
    getCharactersCharacterIdAgentsResearch: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_agents_research_agent_id
           * agent_id integer
           * @format int32
           */
          agent_id: number;
          /**
           * get_characters_character_id_agents_research_points_per_day
           * points_per_day number
           * @format float
           */
          points_per_day: number;
          /**
           * get_characters_character_id_agents_research_remainder_points
           * remainder_points number
           * @format float
           */
          remainder_points: number;
          /**
           * get_characters_character_id_agents_research_skill_type_id
           * skill_type_id integer
           * @format int32
           */
          skill_type_id: number;
          /**
           * get_characters_character_id_agents_research_started_at
           * started_at string
           * @format date-time
           */
          started_at: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/agents_research/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of the characters assets --- Alternate route: `/dev/characters/{character_id}/assets/` Alternate route: `/v5/characters/{character_id}/assets/` --- This route is cached for up to 3600 seconds
     *
     * @tags Assets
     * @name GetCharactersCharacterIdAssets
     * @summary Get character assets
     * @request GET:/characters/{character_id}/assets/
     * @secure
     */
    getCharactersCharacterIdAssets: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_assets_is_blueprint_copy
           * is_blueprint_copy boolean
           */
          is_blueprint_copy?: boolean;
          /**
           * get_characters_character_id_assets_is_singleton
           * is_singleton boolean
           */
          is_singleton: boolean;
          /**
           * get_characters_character_id_assets_item_id
           * item_id integer
           * @format int64
           */
          item_id: number;
          /**
           * get_characters_character_id_assets_location_flag
           * location_flag string
           */
          location_flag:
            | "AssetSafety"
            | "AutoFit"
            | "BoosterBay"
            | "Cargo"
            | "CorpseBay"
            | "Deliveries"
            | "DroneBay"
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
          /**
           * get_characters_character_id_assets_location_id
           * location_id integer
           * @format int64
           */
          location_id: number;
          /**
           * get_characters_character_id_assets_location_type
           * location_type string
           */
          location_type: "station" | "solar_system" | "item" | "other";
          /**
           * get_characters_character_id_assets_quantity
           * quantity integer
           * @format int32
           */
          quantity: number;
          /**
           * get_characters_character_id_assets_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_assets_error
             * error message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/assets/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return locations for a set of item ids, which you can get from character assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0) --- Alternate route: `/dev/characters/{character_id}/assets/locations/` Alternate route: `/v2/characters/{character_id}/assets/locations/`
     *
     * @tags Assets
     * @name PostCharactersCharacterIdAssetsLocations
     * @summary Get character asset locations
     * @request POST:/characters/{character_id}/assets/locations/
     * @secure
     */
    postCharactersCharacterIdAssetsLocations: (
      characterId: number,
      item_ids: number[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_characters_character_id_assets_locations_item_id
           * item_id integer
           * @format int64
           */
          item_id: number;
          /**
           * post_characters_character_id_assets_locations_position
           * position object
           */
          position: {
            /**
             * post_characters_character_id_assets_locations_x
             * x number
             * @format double
             */
            x: number;
            /**
             * post_characters_character_id_assets_locations_y
             * y number
             * @format double
             */
            y: number;
            /**
             * post_characters_character_id_assets_locations_z
             * z number
             * @format double
             */
            z: number;
          };
        }[],
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/assets/locations/`,
        method: "POST",
        query: query,
        body: item_ids,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return names for a set of item ids, which you can get from character assets endpoint. Typically used for items that can customize names, like containers or ships. --- Alternate route: `/dev/characters/{character_id}/assets/names/` Alternate route: `/legacy/characters/{character_id}/assets/names/` Alternate route: `/v1/characters/{character_id}/assets/names/`
     *
     * @tags Assets
     * @name PostCharactersCharacterIdAssetsNames
     * @summary Get character asset names
     * @request POST:/characters/{character_id}/assets/names/
     * @secure
     */
    postCharactersCharacterIdAssetsNames: (
      characterId: number,
      item_ids: number[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_characters_character_id_assets_names_item_id
           * item_id integer
           * @format int64
           */
          item_id: number;
          /**
           * post_characters_character_id_assets_names_name
           * name string
           */
          name: string;
        }[],
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/assets/names/`,
        method: "POST",
        query: query,
        body: item_ids,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return attributes of a character --- Alternate route: `/dev/characters/{character_id}/attributes/` Alternate route: `/legacy/characters/{character_id}/attributes/` Alternate route: `/v1/characters/{character_id}/attributes/` --- This route is cached for up to 120 seconds
     *
     * @tags Skills
     * @name GetCharactersCharacterIdAttributes
     * @summary Get character attributes
     * @request GET:/characters/{character_id}/attributes/
     * @secure
     */
    getCharactersCharacterIdAttributes: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_attributes_accrued_remap_cooldown_date
           * Neural remapping cooldown after a character uses remap accrued over time
           * @format date-time
           */
          accrued_remap_cooldown_date?: string;
          /**
           * get_characters_character_id_attributes_bonus_remaps
           * Number of available bonus character neural remaps
           * @format int32
           */
          bonus_remaps?: number;
          /**
           * get_characters_character_id_attributes_charisma
           * charisma integer
           * @format int32
           */
          charisma: number;
          /**
           * get_characters_character_id_attributes_intelligence
           * intelligence integer
           * @format int32
           */
          intelligence: number;
          /**
           * get_characters_character_id_attributes_last_remap_date
           * Datetime of last neural remap, including usage of bonus remaps
           * @format date-time
           */
          last_remap_date?: string;
          /**
           * get_characters_character_id_attributes_memory
           * memory integer
           * @format int32
           */
          memory: number;
          /**
           * get_characters_character_id_attributes_perception
           * perception integer
           * @format int32
           */
          perception: number;
          /**
           * get_characters_character_id_attributes_willpower
           * willpower integer
           * @format int32
           */
          willpower: number;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/attributes/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of blueprints the character owns --- Alternate route: `/dev/characters/{character_id}/blueprints/` Alternate route: `/v3/characters/{character_id}/blueprints/` --- This route is cached for up to 3600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdBlueprints
     * @summary Get blueprints
     * @request GET:/characters/{character_id}/blueprints/
     * @secure
     */
    getCharactersCharacterIdBlueprints: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_blueprints_item_id
           * Unique ID for this item.
           * @format int64
           */
          item_id: number;
          /**
           * get_characters_character_id_blueprints_location_flag
           * Type of the location_id
           */
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
           * get_characters_character_id_blueprints_location_id
           * References a station, a ship or an item_id if this blueprint is located within a container. If the return value is an item_id, then the Character AssetList API must be queried to find the container using the given item_id to determine the correct location of the Blueprint.
           * @format int64
           */
          location_id: number;
          /**
           * get_characters_character_id_blueprints_material_efficiency
           * Material Efficiency Level of the blueprint.
           * @format int32
           * @min 0
           * @max 25
           */
          material_efficiency: number;
          /**
           * get_characters_character_id_blueprints_quantity
           * A range of numbers with a minimum of -2 and no maximum value where -1 is an original and -2 is a copy. It can be a positive integer if it is a stack of blueprint originals fresh from the market (e.g. no activities performed on them yet).
           * @format int32
           * @min -2
           */
          quantity: number;
          /**
           * get_characters_character_id_blueprints_runs
           * Number of runs remaining if the blueprint is a copy, -1 if it is an original.
           * @format int32
           * @min -1
           */
          runs: number;
          /**
           * get_characters_character_id_blueprints_time_efficiency
           * Time Efficiency Level of the blueprint.
           * @format int32
           * @min 0
           * @max 20
           */
          time_efficiency: number;
          /**
           * get_characters_character_id_blueprints_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/blueprints/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A list of your character's personal bookmarks --- Alternate route: `/dev/characters/{character_id}/bookmarks/` Alternate route: `/v2/characters/{character_id}/bookmarks/` --- This route is cached for up to 3600 seconds
     *
     * @tags Bookmarks
     * @name GetCharactersCharacterIdBookmarks
     * @summary List bookmarks
     * @request GET:/characters/{character_id}/bookmarks/
     * @secure
     */
    getCharactersCharacterIdBookmarks: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_bookmarks_bookmark_id
           * bookmark_id integer
           * @format int32
           */
          bookmark_id: number;
          /**
           * get_characters_character_id_bookmarks_coordinates
           * Optional object that is returned if a bookmark was made on a planet or a random location in space.
           */
          coordinates?: {
            /**
             * get_characters_character_id_bookmarks_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_characters_character_id_bookmarks_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_characters_character_id_bookmarks_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_characters_character_id_bookmarks_created
           * created string
           * @format date-time
           */
          created: string;
          /**
           * get_characters_character_id_bookmarks_creator_id
           * creator_id integer
           * @format int32
           */
          creator_id: number;
          /**
           * get_characters_character_id_bookmarks_folder_id
           * folder_id integer
           * @format int32
           */
          folder_id?: number;
          /**
           * get_characters_character_id_bookmarks_item
           * Optional object that is returned if a bookmark was made on a particular item.
           */
          item?: {
            /**
             * get_characters_character_id_bookmarks_item_id
             * item_id integer
             * @format int64
             */
            item_id: number;
            /**
             * get_characters_character_id_bookmarks_type_id
             * type_id integer
             * @format int32
             */
            type_id: number;
          };
          /**
           * get_characters_character_id_bookmarks_label
           * label string
           */
          label: string;
          /**
           * get_characters_character_id_bookmarks_location_id
           * location_id integer
           * @format int32
           */
          location_id: number;
          /**
           * get_characters_character_id_bookmarks_notes
           * notes string
           */
          notes: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/bookmarks/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A list of your character's personal bookmark folders --- Alternate route: `/dev/characters/{character_id}/bookmarks/folders/` Alternate route: `/v2/characters/{character_id}/bookmarks/folders/` --- This route is cached for up to 3600 seconds
     *
     * @tags Bookmarks
     * @name GetCharactersCharacterIdBookmarksFolders
     * @summary List bookmark folders
     * @request GET:/characters/{character_id}/bookmarks/folders/
     * @secure
     */
    getCharactersCharacterIdBookmarksFolders: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_bookmarks_folders_folder_id
           * folder_id integer
           * @format int32
           */
          folder_id: number;
          /**
           * get_characters_character_id_bookmarks_folders_name
           * name string
           */
          name: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/bookmarks/folders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get 50 event summaries from the calendar. If no from_event ID is given, the resource will return the next 50 chronological event summaries from now. If a from_event ID is specified, it will return the next 50 chronological event summaries from after that event --- Alternate route: `/dev/characters/{character_id}/calendar/` Alternate route: `/legacy/characters/{character_id}/calendar/` Alternate route: `/v1/characters/{character_id}/calendar/` Alternate route: `/v2/characters/{character_id}/calendar/` --- This route is cached for up to 5 seconds
     *
     * @tags Calendar
     * @name GetCharactersCharacterIdCalendar
     * @summary List calendar event summaries
     * @request GET:/characters/{character_id}/calendar/
     * @secure
     */
    getCharactersCharacterIdCalendar: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * The event ID to retrieve events from
         * @format int32
         */
        from_event?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_calendar_event_date
           * event_date string
           * @format date-time
           */
          event_date?: string;
          /**
           * get_characters_character_id_calendar_event_id
           * event_id integer
           * @format int32
           */
          event_id?: number;
          /**
           * get_characters_character_id_calendar_event_response
           * event_response string
           */
          event_response?: "declined" | "not_responded" | "accepted" | "tentative";
          /**
           * get_characters_character_id_calendar_importance
           * importance integer
           * @format int32
           */
          importance?: number;
          /**
           * get_characters_character_id_calendar_title
           * title string
           */
          title?: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/calendar/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all the information for a specific event --- Alternate route: `/dev/characters/{character_id}/calendar/{event_id}/` Alternate route: `/legacy/characters/{character_id}/calendar/{event_id}/` Alternate route: `/v3/characters/{character_id}/calendar/{event_id}/` Alternate route: `/v4/characters/{character_id}/calendar/{event_id}/` --- This route is cached for up to 5 seconds
     *
     * @tags Calendar
     * @name GetCharactersCharacterIdCalendarEventId
     * @summary Get an event
     * @request GET:/characters/{character_id}/calendar/{event_id}/
     * @secure
     */
    getCharactersCharacterIdCalendarEventId: (
      characterId: number,
      eventId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_calendar_event_id_date
           * date string
           * @format date-time
           */
          date: string;
          /**
           * get_characters_character_id_calendar_event_id_duration
           * Length in minutes
           * @format int32
           */
          duration: number;
          /**
           * get_characters_character_id_calendar_event_id_event_id
           * event_id integer
           * @format int32
           */
          event_id: number;
          /**
           * get_characters_character_id_calendar_event_id_importance
           * importance integer
           * @format int32
           */
          importance: number;
          /**
           * get_characters_character_id_calendar_event_id_owner_id
           * owner_id integer
           * @format int32
           */
          owner_id: number;
          /**
           * get_characters_character_id_calendar_event_id_owner_name
           * owner_name string
           */
          owner_name: string;
          /**
           * get_characters_character_id_calendar_event_id_owner_type
           * owner_type string
           */
          owner_type: "eve_server" | "corporation" | "faction" | "character" | "alliance";
          /**
           * get_characters_character_id_calendar_event_id_response
           * response string
           */
          response: string;
          /**
           * get_characters_character_id_calendar_event_id_text
           * text string
           */
          text: string;
          /**
           * get_characters_character_id_calendar_event_id_title
           * title string
           */
          title: string;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_calendar_event_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/calendar/${eventId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Set your response status to an event --- Alternate route: `/dev/characters/{character_id}/calendar/{event_id}/` Alternate route: `/legacy/characters/{character_id}/calendar/{event_id}/` Alternate route: `/v3/characters/{character_id}/calendar/{event_id}/` Alternate route: `/v4/characters/{character_id}/calendar/{event_id}/` --- This route is cached for up to 5 seconds
     *
     * @tags Calendar
     * @name PutCharactersCharacterIdCalendarEventId
     * @summary Respond to an event
     * @request PUT:/characters/{character_id}/calendar/{event_id}/
     * @secure
     */
    putCharactersCharacterIdCalendarEventId: (
      characterId: number,
      eventId: number,
      response: {
        /**
         * put_characters_character_id_calendar_event_id_response_response
         * response string
         */
        response: "accepted" | "declined" | "tentative";
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/calendar/${eventId}/`,
        method: "PUT",
        query: query,
        body: response,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get all invited attendees for a given event --- Alternate route: `/dev/characters/{character_id}/calendar/{event_id}/attendees/` Alternate route: `/legacy/characters/{character_id}/calendar/{event_id}/attendees/` Alternate route: `/v1/characters/{character_id}/calendar/{event_id}/attendees/` Alternate route: `/v2/characters/{character_id}/calendar/{event_id}/attendees/` --- This route is cached for up to 600 seconds
     *
     * @tags Calendar
     * @name GetCharactersCharacterIdCalendarEventIdAttendees
     * @summary Get attendees
     * @request GET:/characters/{character_id}/calendar/{event_id}/attendees/
     * @secure
     */
    getCharactersCharacterIdCalendarEventIdAttendees: (
      characterId: number,
      eventId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_calendar_event_id_attendees_character_id
           * character_id integer
           * @format int32
           */
          character_id?: number;
          /**
           * get_characters_character_id_calendar_event_id_attendees_event_response
           * event_response string
           */
          event_response?: "declined" | "not_responded" | "accepted" | "tentative";
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_calendar_event_id_attendees_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/calendar/${eventId}/attendees/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A list of the character's clones --- Alternate route: `/dev/characters/{character_id}/clones/` Alternate route: `/v3/characters/{character_id}/clones/` Alternate route: `/v4/characters/{character_id}/clones/` --- This route is cached for up to 120 seconds
     *
     * @tags Clones
     * @name GetCharactersCharacterIdClones
     * @summary Get clones
     * @request GET:/characters/{character_id}/clones/
     * @secure
     */
    getCharactersCharacterIdClones: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_clones_home_location
           * home_location object
           */
          home_location?: {
            /**
             * get_characters_character_id_clones_location_id
             * location_id integer
             * @format int64
             */
            location_id?: number;
            /**
             * get_characters_character_id_clones_location_type
             * location_type string
             */
            location_type?: "station" | "structure";
          };
          /**
           * get_characters_character_id_clones_jump_clones
           * jump_clones array
           * @maxItems 64
           */
          jump_clones: {
            /**
             * get_characters_character_id_clones_implants
             * implants array
             * @maxItems 64
             */
            implants: number[];
            /**
             * get_characters_character_id_clones_jump_clone_id
             * jump_clone_id integer
             * @format int32
             */
            jump_clone_id: number;
            /**
             * get_characters_character_id_clones_jump_clone_location_id
             * location_id integer
             * @format int64
             */
            location_id: number;
            /**
             * get_characters_character_id_clones_jump_clone_location_type
             * location_type string
             */
            location_type: "station" | "structure";
            /**
             * get_characters_character_id_clones_name
             * name string
             */
            name?: string;
          }[];
          /**
           * get_characters_character_id_clones_last_clone_jump_date
           * last_clone_jump_date string
           * @format date-time
           */
          last_clone_jump_date?: string;
          /**
           * get_characters_character_id_clones_last_station_change_date
           * last_station_change_date string
           * @format date-time
           */
          last_station_change_date?: string;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/clones/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Bulk delete contacts --- Alternate route: `/dev/characters/{character_id}/contacts/` Alternate route: `/v2/characters/{character_id}/contacts/`
     *
     * @tags Contacts
     * @name DeleteCharactersCharacterIdContacts
     * @summary Delete contacts
     * @request DELETE:/characters/{character_id}/contacts/
     * @secure
     */
    deleteCharactersCharacterIdContacts: (
      characterId: number,
      query: {
        /**
         * A list of contacts to delete
         * @maxItems 20
         * @minItems 1
         */
        contact_ids: number[];
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/contacts/`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Return contacts of a character --- Alternate route: `/dev/characters/{character_id}/contacts/` Alternate route: `/v2/characters/{character_id}/contacts/` --- This route is cached for up to 300 seconds
     *
     * @tags Contacts
     * @name GetCharactersCharacterIdContacts
     * @summary Get contacts
     * @request GET:/characters/{character_id}/contacts/
     * @secure
     */
    getCharactersCharacterIdContacts: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_contacts_contact_id
           * contact_id integer
           * @format int32
           */
          contact_id: number;
          /**
           * get_characters_character_id_contacts_contact_type
           * contact_type string
           */
          contact_type: "character" | "corporation" | "alliance" | "faction";
          /**
           * get_characters_character_id_contacts_is_blocked
           * Whether this contact is in the blocked list. Note a missing value denotes unknown, not true or false
           */
          is_blocked?: boolean;
          /**
           * get_characters_character_id_contacts_is_watched
           * Whether this contact is being watched
           */
          is_watched?: boolean;
          /**
           * get_characters_character_id_contacts_label_ids
           * label_ids array
           * @maxItems 63
           */
          label_ids?: number[];
          /**
           * get_characters_character_id_contacts_standing
           * Standing of the contact
           * @format float
           */
          standing: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/contacts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Bulk add contacts with same settings --- Alternate route: `/dev/characters/{character_id}/contacts/` Alternate route: `/v2/characters/{character_id}/contacts/`
     *
     * @tags Contacts
     * @name PostCharactersCharacterIdContacts
     * @summary Add contacts
     * @request POST:/characters/{character_id}/contacts/
     * @secure
     */
    postCharactersCharacterIdContacts: (
      characterId: number,
      query: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Add custom labels to the new contact
         * @maxItems 63
         */
        label_ids?: number[];
        /**
         * Standing for the contact
         * @format float
         * @min -10
         * @max 10
         */
        standing: number;
        /** Access token to use if unable to set a header */
        token?: string;
        /**
         * Whether the contact should be watched, note this is only effective on characters
         * @default false
         */
        watched?: boolean;
      },
      contact_ids: number[],
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
        | {
            /**
             * post_characters_character_id_contacts_520_error_520
             * Error 520 message
             */
            error?: string;
          }
      >({
        path: `/characters/${characterId}/contacts/`,
        method: "POST",
        query: query,
        body: contact_ids,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Bulk edit contacts with same settings --- Alternate route: `/dev/characters/{character_id}/contacts/` Alternate route: `/v2/characters/{character_id}/contacts/`
     *
     * @tags Contacts
     * @name PutCharactersCharacterIdContacts
     * @summary Edit contacts
     * @request PUT:/characters/{character_id}/contacts/
     * @secure
     */
    putCharactersCharacterIdContacts: (
      characterId: number,
      query: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Add custom labels to the contact
         * @maxItems 63
         */
        label_ids?: number[];
        /**
         * Standing for the contact
         * @format float
         * @min -10
         * @max 10
         */
        standing: number;
        /** Access token to use if unable to set a header */
        token?: string;
        /**
         * Whether the contact should be watched, note this is only effective on characters
         * @default false
         */
        watched?: boolean;
      },
      contact_ids: number[],
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/contacts/`,
        method: "PUT",
        query: query,
        body: contact_ids,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return custom labels for a character's contacts --- Alternate route: `/dev/characters/{character_id}/contacts/labels/` Alternate route: `/legacy/characters/{character_id}/contacts/labels/` Alternate route: `/v1/characters/{character_id}/contacts/labels/` --- This route is cached for up to 300 seconds
     *
     * @tags Contacts
     * @name GetCharactersCharacterIdContactsLabels
     * @summary Get contact labels
     * @request GET:/characters/{character_id}/contacts/labels/
     * @secure
     */
    getCharactersCharacterIdContactsLabels: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_contacts_labels_label_id
           * label_id integer
           * @format int64
           */
          label_id: number;
          /**
           * get_characters_character_id_contacts_labels_label_name
           * label_name string
           */
          label_name: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/contacts/labels/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns contracts available to a character, only if the character is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress". --- Alternate route: `/dev/characters/{character_id}/contracts/` Alternate route: `/legacy/characters/{character_id}/contracts/` Alternate route: `/v1/characters/{character_id}/contracts/` --- This route is cached for up to 300 seconds
     *
     * @tags Contracts
     * @name GetCharactersCharacterIdContracts
     * @summary Get contracts
     * @request GET:/characters/{character_id}/contracts/
     * @secure
     */
    getCharactersCharacterIdContracts: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_contracts_acceptor_id
           * Who will accept the contract
           * @format int32
           */
          acceptor_id: number;
          /**
           * get_characters_character_id_contracts_assignee_id
           * ID to whom the contract is assigned, can be alliance, corporation or character ID
           * @format int32
           */
          assignee_id: number;
          /**
           * get_characters_character_id_contracts_availability
           * To whom the contract is available
           */
          availability: "public" | "personal" | "corporation" | "alliance";
          /**
           * get_characters_character_id_contracts_buyout
           * Buyout price (for Auctions only)
           * @format double
           */
          buyout?: number;
          /**
           * get_characters_character_id_contracts_collateral
           * Collateral price (for Couriers only)
           * @format double
           */
          collateral?: number;
          /**
           * get_characters_character_id_contracts_contract_id
           * contract_id integer
           * @format int32
           */
          contract_id: number;
          /**
           * get_characters_character_id_contracts_date_accepted
           * Date of confirmation of contract
           * @format date-time
           */
          date_accepted?: string;
          /**
           * get_characters_character_id_contracts_date_completed
           * Date of completed of contract
           * @format date-time
           */
          date_completed?: string;
          /**
           * get_characters_character_id_contracts_date_expired
           * Expiration date of the contract
           * @format date-time
           */
          date_expired: string;
          /**
           * get_characters_character_id_contracts_date_issued
           * Сreation date of the contract
           * @format date-time
           */
          date_issued: string;
          /**
           * get_characters_character_id_contracts_days_to_complete
           * Number of days to perform the contract
           * @format int32
           */
          days_to_complete?: number;
          /**
           * get_characters_character_id_contracts_end_location_id
           * End location ID (for Couriers contract)
           * @format int64
           */
          end_location_id?: number;
          /**
           * get_characters_character_id_contracts_for_corporation
           * true if the contract was issued on behalf of the issuer's corporation
           */
          for_corporation: boolean;
          /**
           * get_characters_character_id_contracts_issuer_corporation_id
           * Character's corporation ID for the issuer
           * @format int32
           */
          issuer_corporation_id: number;
          /**
           * get_characters_character_id_contracts_issuer_id
           * Character ID for the issuer
           * @format int32
           */
          issuer_id: number;
          /**
           * get_characters_character_id_contracts_price
           * Price of contract (for ItemsExchange and Auctions)
           * @format double
           */
          price?: number;
          /**
           * get_characters_character_id_contracts_reward
           * Remuneration for contract (for Couriers only)
           * @format double
           */
          reward?: number;
          /**
           * get_characters_character_id_contracts_start_location_id
           * Start location ID (for Couriers contract)
           * @format int64
           */
          start_location_id?: number;
          /**
           * get_characters_character_id_contracts_status
           * Status of the the contract
           */
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
          /**
           * get_characters_character_id_contracts_title
           * Title of the contract
           */
          title?: string;
          /**
           * get_characters_character_id_contracts_type
           * Type of the contract
           */
          type: "unknown" | "item_exchange" | "auction" | "courier" | "loan";
          /**
           * get_characters_character_id_contracts_volume
           * Volume of items in the contract
           * @format double
           */
          volume?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/contracts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists bids on a particular auction contract --- Alternate route: `/dev/characters/{character_id}/contracts/{contract_id}/bids/` Alternate route: `/legacy/characters/{character_id}/contracts/{contract_id}/bids/` Alternate route: `/v1/characters/{character_id}/contracts/{contract_id}/bids/` --- This route is cached for up to 300 seconds
     *
     * @tags Contracts
     * @name GetCharactersCharacterIdContractsContractIdBids
     * @summary Get contract bids
     * @request GET:/characters/{character_id}/contracts/{contract_id}/bids/
     * @secure
     */
    getCharactersCharacterIdContractsContractIdBids: (
      characterId: number,
      contractId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_contracts_contract_id_bids_amount
           * The amount bid, in ISK
           * @format float
           */
          amount: number;
          /**
           * get_characters_character_id_contracts_contract_id_bids_bid_id
           * Unique ID for the bid
           * @format int32
           */
          bid_id: number;
          /**
           * get_characters_character_id_contracts_contract_id_bids_bidder_id
           * Character ID of the bidder
           * @format int32
           */
          bidder_id: number;
          /**
           * get_characters_character_id_contracts_contract_id_bids_date_bid
           * Datetime when the bid was placed
           * @format date-time
           */
          date_bid: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_contracts_contract_id_bids_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/contracts/${contractId}/bids/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists items of a particular contract --- Alternate route: `/dev/characters/{character_id}/contracts/{contract_id}/items/` Alternate route: `/legacy/characters/{character_id}/contracts/{contract_id}/items/` Alternate route: `/v1/characters/{character_id}/contracts/{contract_id}/items/` --- This route is cached for up to 3600 seconds
     *
     * @tags Contracts
     * @name GetCharactersCharacterIdContractsContractIdItems
     * @summary Get contract items
     * @request GET:/characters/{character_id}/contracts/{contract_id}/items/
     * @secure
     */
    getCharactersCharacterIdContractsContractIdItems: (
      characterId: number,
      contractId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_contracts_contract_id_items_is_included
           * true if the contract issuer has submitted this item with the contract, false if the isser is asking for this item in the contract
           */
          is_included: boolean;
          /**
           * get_characters_character_id_contracts_contract_id_items_is_singleton
           * is_singleton boolean
           */
          is_singleton: boolean;
          /**
           * get_characters_character_id_contracts_contract_id_items_quantity
           * Number of items in the stack
           * @format int32
           */
          quantity: number;
          /**
           * get_characters_character_id_contracts_contract_id_items_raw_quantity
           * -1 indicates that the item is a singleton (non-stackable). If the item happens to be a Blueprint, -1 is an Original and -2 is a Blueprint Copy
           * @format int32
           */
          raw_quantity?: number;
          /**
           * get_characters_character_id_contracts_contract_id_items_record_id
           * Unique ID for the item
           * @format int64
           */
          record_id: number;
          /**
           * get_characters_character_id_contracts_contract_id_items_type_id
           * Type ID for item
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_contracts_contract_id_items_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/contracts/${contractId}/items/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of all the corporations a character has been a member of --- Alternate route: `/dev/characters/{character_id}/corporationhistory/` Alternate route: `/v2/characters/{character_id}/corporationhistory/` --- This route is cached for up to 86400 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdCorporationhistory
     * @summary Get corporation history
     * @request GET:/characters/{character_id}/corporationhistory/
     */
    getCharactersCharacterIdCorporationhistory: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_corporationhistory_corporation_id
           * corporation_id integer
           * @format int32
           */
          corporation_id: number;
          /**
           * get_characters_character_id_corporationhistory_is_deleted
           * True if the corporation has been deleted
           */
          is_deleted?: boolean;
          /**
           * get_characters_character_id_corporationhistory_record_id
           * An incrementing ID that can be used to canonically establish order of records in cases where dates may be ambiguous
           * @format int32
           */
          record_id: number;
          /**
           * get_characters_character_id_corporationhistory_start_date
           * start_date string
           * @format date-time
           */
          start_date: string;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/corporationhistory/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a source character ID in the url and a set of target character ID's in the body, returns a CSPA charge cost --- Alternate route: `/dev/characters/{character_id}/cspa/` Alternate route: `/v5/characters/{character_id}/cspa/`
     *
     * @tags Character
     * @name PostCharactersCharacterIdCspa
     * @summary Calculate a CSPA charge cost
     * @request POST:/characters/{character_id}/cspa/
     * @secure
     */
    postCharactersCharacterIdCspa: (
      characterId: number,
      characters: number[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/cspa/`,
        method: "POST",
        query: query,
        body: characters,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a character's jump activation and fatigue information --- Alternate route: `/dev/characters/{character_id}/fatigue/` Alternate route: `/v2/characters/{character_id}/fatigue/` --- This route is cached for up to 300 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdFatigue
     * @summary Get jump fatigue
     * @request GET:/characters/{character_id}/fatigue/
     * @secure
     */
    getCharactersCharacterIdFatigue: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_fatigue_jump_fatigue_expire_date
           * Character's jump fatigue expiry
           * @format date-time
           */
          jump_fatigue_expire_date?: string;
          /**
           * get_characters_character_id_fatigue_last_jump_date
           * Character's last jump activation
           * @format date-time
           */
          last_jump_date?: string;
          /**
           * get_characters_character_id_fatigue_last_update_date
           * Character's last jump update
           * @format date-time
           */
          last_update_date?: string;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/fatigue/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return fittings of a character --- Alternate route: `/dev/characters/{character_id}/fittings/` Alternate route: `/v2/characters/{character_id}/fittings/` --- This route is cached for up to 300 seconds
     *
     * @tags Fittings
     * @name GetCharactersCharacterIdFittings
     * @summary Get fittings
     * @request GET:/characters/{character_id}/fittings/
     * @secure
     */
    getCharactersCharacterIdFittings: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_fittings_description
           * description string
           */
          description: string;
          /**
           * get_characters_character_id_fittings_fitting_id
           * fitting_id integer
           * @format int32
           */
          fitting_id: number;
          /**
           * get_characters_character_id_fittings_items
           * items array
           * @maxItems 512
           */
          items: {
            /**
             * get_characters_character_id_fittings_flag
             * flag string
             */
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
            /**
             * get_characters_character_id_fittings_quantity
             * quantity integer
             * @format int32
             */
            quantity: number;
            /**
             * get_characters_character_id_fittings_type_id
             * type_id integer
             * @format int32
             */
            type_id: number;
          }[];
          /**
           * get_characters_character_id_fittings_name
           * name string
           */
          name: string;
          /**
           * get_characters_character_id_fittings_ship_type_id
           * ship_type_id integer
           * @format int32
           */
          ship_type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/fittings/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Save a new fitting for a character --- Alternate route: `/dev/characters/{character_id}/fittings/` Alternate route: `/v2/characters/{character_id}/fittings/`
     *
     * @tags Fittings
     * @name PostCharactersCharacterIdFittings
     * @summary Create fitting
     * @request POST:/characters/{character_id}/fittings/
     * @secure
     */
    postCharactersCharacterIdFittings: (
      characterId: number,
      fitting: {
        /**
         * post_characters_character_id_fittings_description
         * description string
         * @minLength 0
         * @maxLength 500
         */
        description: string;
        /**
         * post_characters_character_id_fittings_items
         * items array
         * @maxItems 512
         * @minItems 1
         */
        items: {
          /**
           * post_characters_character_id_fittings_flag
           * Fitting location for the item. Entries placed in 'Invalid' will be discarded. If this leaves the fitting with nothing, it will cause an error.
           */
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
          /**
           * post_characters_character_id_fittings_quantity
           * quantity integer
           * @format int32
           */
          quantity: number;
          /**
           * post_characters_character_id_fittings_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[];
        /**
         * post_characters_character_id_fittings_name
         * name string
         * @minLength 1
         * @maxLength 50
         */
        name: string;
        /**
         * post_characters_character_id_fittings_ship_type_id
         * ship_type_id integer
         * @format int32
         */
        ship_type_id: number;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_characters_character_id_fittings_fitting_id
           * fitting_id integer
           * @format int32
           */
          fitting_id: number;
        },
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/fittings/`,
        method: "POST",
        query: query,
        body: fitting,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a fitting from a character --- Alternate route: `/dev/characters/{character_id}/fittings/{fitting_id}/` Alternate route: `/legacy/characters/{character_id}/fittings/{fitting_id}/` Alternate route: `/v1/characters/{character_id}/fittings/{fitting_id}/`
     *
     * @tags Fittings
     * @name DeleteCharactersCharacterIdFittingsFittingId
     * @summary Delete fitting
     * @request DELETE:/characters/{character_id}/fittings/{fitting_id}/
     * @secure
     */
    deleteCharactersCharacterIdFittingsFittingId: (
      characterId: number,
      fittingId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/fittings/${fittingId}/`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Return the fleet ID the character is in, if any. --- Alternate route: `/legacy/characters/{character_id}/fleet/` Alternate route: `/v1/characters/{character_id}/fleet/` --- This route is cached for up to 60 seconds --- Warning: This route has an upgrade available --- [Diff of the upcoming changes](https://esi.evetech.net/diff/latest/dev/#GET-/characters/{character_id}/fleet/)
     *
     * @tags Fleets
     * @name GetCharactersCharacterIdFleet
     * @summary Get character fleet info
     * @request GET:/characters/{character_id}/fleet/
     * @secure
     */
    getCharactersCharacterIdFleet: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_fleet_fleet_id
           * The character's current fleet ID
           * @format int64
           */
          fleet_id: number;
          /**
           * get_characters_character_id_fleet_role
           * Member’s role in fleet
           */
          role: "fleet_commander" | "squad_commander" | "squad_member" | "wing_commander";
          /**
           * get_characters_character_id_fleet_squad_id
           * ID of the squad the member is in. If not applicable, will be set to -1
           * @format int64
           */
          squad_id: number;
          /**
           * get_characters_character_id_fleet_wing_id
           * ID of the wing the member is in. If not applicable, will be set to -1
           * @format int64
           */
          wing_id: number;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_fleet_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/fleet/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Statistical overview of a character involved in faction warfare --- Alternate route: `/dev/characters/{character_id}/fw/stats/` Alternate route: `/legacy/characters/{character_id}/fw/stats/` Alternate route: `/v1/characters/{character_id}/fw/stats/` Alternate route: `/v2/characters/{character_id}/fw/stats/` --- This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetCharactersCharacterIdFwStats
     * @summary Overview of a character involved in faction warfare
     * @request GET:/characters/{character_id}/fw/stats/
     * @secure
     */
    getCharactersCharacterIdFwStats: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_fw_stats_current_rank
           * The given character's current faction rank
           * @format int32
           * @min 0
           * @max 9
           */
          current_rank?: number;
          /**
           * get_characters_character_id_fw_stats_enlisted_on
           * The enlistment date of the given character into faction warfare. Will not be included if character is not enlisted in faction warfare
           * @format date-time
           */
          enlisted_on?: string;
          /**
           * get_characters_character_id_fw_stats_faction_id
           * The faction the given character is enlisted to fight for. Will not be included if character is not enlisted in faction warfare
           * @format int32
           */
          faction_id?: number;
          /**
           * get_characters_character_id_fw_stats_highest_rank
           * The given character's highest faction rank achieved
           * @format int32
           * @min 0
           * @max 9
           */
          highest_rank?: number;
          /**
           * get_characters_character_id_fw_stats_kills
           * Summary of kills done by the given character against enemy factions
           */
          kills: {
            /**
             * get_characters_character_id_fw_stats_last_week
             * Last week's total number of kills by a given character against enemy factions
             * @format int32
             */
            last_week: number;
            /**
             * get_characters_character_id_fw_stats_total
             * Total number of kills by a given character against enemy factions since the character enlisted
             * @format int32
             */
            total: number;
            /**
             * get_characters_character_id_fw_stats_yesterday
             * Yesterday's total number of kills by a given character against enemy factions
             * @format int32
             */
            yesterday: number;
          };
          /**
           * get_characters_character_id_fw_stats_victory_points
           * Summary of victory points gained by the given character for the enlisted faction
           */
          victory_points: {
            /**
             * get_characters_character_id_fw_stats_victory_points_last_week
             * Last week's victory points gained by the given character
             * @format int32
             */
            last_week: number;
            /**
             * get_characters_character_id_fw_stats_victory_points_total
             * Total victory points gained since the given character enlisted
             * @format int32
             */
            total: number;
            /**
             * get_characters_character_id_fw_stats_victory_points_yesterday
             * Yesterday's victory points gained by the given character
             * @format int32
             */
            yesterday: number;
          };
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/fw/stats/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return implants on the active clone of a character --- Alternate route: `/dev/characters/{character_id}/implants/` Alternate route: `/legacy/characters/{character_id}/implants/` Alternate route: `/v1/characters/{character_id}/implants/` Alternate route: `/v2/characters/{character_id}/implants/` --- This route is cached for up to 120 seconds
     *
     * @tags Clones
     * @name GetCharactersCharacterIdImplants
     * @summary Get active implants
     * @request GET:/characters/{character_id}/implants/
     * @secure
     */
    getCharactersCharacterIdImplants: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/implants/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List industry jobs placed by a character --- Alternate route: `/dev/characters/{character_id}/industry/jobs/` Alternate route: `/legacy/characters/{character_id}/industry/jobs/` Alternate route: `/v1/characters/{character_id}/industry/jobs/` --- This route is cached for up to 300 seconds
     *
     * @tags Industry
     * @name GetCharactersCharacterIdIndustryJobs
     * @summary List character industry jobs
     * @request GET:/characters/{character_id}/industry/jobs/
     * @secure
     */
    getCharactersCharacterIdIndustryJobs: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Whether to retrieve completed character industry jobs. Only includes jobs from the past 90 days */
        include_completed?: boolean;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_industry_jobs_activity_id
           * Job activity ID
           * @format int32
           */
          activity_id: number;
          /**
           * get_characters_character_id_industry_jobs_blueprint_id
           * blueprint_id integer
           * @format int64
           */
          blueprint_id: number;
          /**
           * get_characters_character_id_industry_jobs_blueprint_location_id
           * Location ID of the location from which the blueprint was installed. Normally a station ID, but can also be an asset (e.g. container) or corporation facility
           * @format int64
           */
          blueprint_location_id: number;
          /**
           * get_characters_character_id_industry_jobs_blueprint_type_id
           * blueprint_type_id integer
           * @format int32
           */
          blueprint_type_id: number;
          /**
           * get_characters_character_id_industry_jobs_completed_character_id
           * ID of the character which completed this job
           * @format int32
           */
          completed_character_id?: number;
          /**
           * get_characters_character_id_industry_jobs_completed_date
           * Date and time when this job was completed
           * @format date-time
           */
          completed_date?: string;
          /**
           * get_characters_character_id_industry_jobs_cost
           * The sume of job installation fee and industry facility tax
           * @format double
           */
          cost?: number;
          /**
           * get_characters_character_id_industry_jobs_duration
           * Job duration in seconds
           * @format int32
           */
          duration: number;
          /**
           * get_characters_character_id_industry_jobs_end_date
           * Date and time when this job finished
           * @format date-time
           */
          end_date: string;
          /**
           * get_characters_character_id_industry_jobs_facility_id
           * ID of the facility where this job is running
           * @format int64
           */
          facility_id: number;
          /**
           * get_characters_character_id_industry_jobs_installer_id
           * ID of the character which installed this job
           * @format int32
           */
          installer_id: number;
          /**
           * get_characters_character_id_industry_jobs_job_id
           * Unique job ID
           * @format int32
           */
          job_id: number;
          /**
           * get_characters_character_id_industry_jobs_licensed_runs
           * Number of runs blueprint is licensed for
           * @format int32
           */
          licensed_runs?: number;
          /**
           * get_characters_character_id_industry_jobs_output_location_id
           * Location ID of the location to which the output of the job will be delivered. Normally a station ID, but can also be a corporation facility
           * @format int64
           */
          output_location_id: number;
          /**
           * get_characters_character_id_industry_jobs_pause_date
           * Date and time when this job was paused (i.e. time when the facility where this job was installed went offline)
           * @format date-time
           */
          pause_date?: string;
          /**
           * get_characters_character_id_industry_jobs_probability
           * Chance of success for invention
           * @format float
           */
          probability?: number;
          /**
           * get_characters_character_id_industry_jobs_product_type_id
           * Type ID of product (manufactured, copied or invented)
           * @format int32
           */
          product_type_id?: number;
          /**
           * get_characters_character_id_industry_jobs_runs
           * Number of runs for a manufacturing job, or number of copies to make for a blueprint copy
           * @format int32
           */
          runs: number;
          /**
           * get_characters_character_id_industry_jobs_start_date
           * Date and time when this job started
           * @format date-time
           */
          start_date: string;
          /**
           * get_characters_character_id_industry_jobs_station_id
           * ID of the station where industry facility is located
           * @format int64
           */
          station_id: number;
          /**
           * get_characters_character_id_industry_jobs_status
           * status string
           */
          status: "active" | "cancelled" | "delivered" | "paused" | "ready" | "reverted";
          /**
           * get_characters_character_id_industry_jobs_successful_runs
           * Number of successful runs for this job. Equal to runs unless this is an invention job
           * @format int32
           */
          successful_runs?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/industry/jobs/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of a character's kills and losses going back 90 days --- Alternate route: `/dev/characters/{character_id}/killmails/recent/` Alternate route: `/legacy/characters/{character_id}/killmails/recent/` Alternate route: `/v1/characters/{character_id}/killmails/recent/` --- This route is cached for up to 300 seconds
     *
     * @tags Killmails
     * @name GetCharactersCharacterIdKillmailsRecent
     * @summary Get a character's recent kills and losses
     * @request GET:/characters/{character_id}/killmails/recent/
     * @secure
     */
    getCharactersCharacterIdKillmailsRecent: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_killmails_recent_killmail_hash
           * A hash of this killmail
           */
          killmail_hash: string;
          /**
           * get_characters_character_id_killmails_recent_killmail_id
           * ID of this killmail
           * @format int32
           */
          killmail_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/killmails/recent/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable --- Alternate route: `/dev/characters/{character_id}/location/` Alternate route: `/legacy/characters/{character_id}/location/` Alternate route: `/v1/characters/{character_id}/location/` Alternate route: `/v2/characters/{character_id}/location/` --- This route is cached for up to 5 seconds
     *
     * @tags Location
     * @name GetCharactersCharacterIdLocation
     * @summary Get character location
     * @request GET:/characters/{character_id}/location/
     * @secure
     */
    getCharactersCharacterIdLocation: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_location_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_characters_character_id_location_station_id
           * station_id integer
           * @format int32
           */
          station_id?: number;
          /**
           * get_characters_character_id_location_structure_id
           * structure_id integer
           * @format int64
           */
          structure_id?: number;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/location/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of loyalty points for all corporations the character has worked for --- Alternate route: `/dev/characters/{character_id}/loyalty/points/` Alternate route: `/legacy/characters/{character_id}/loyalty/points/` Alternate route: `/v1/characters/{character_id}/loyalty/points/` --- This route is cached for up to 3600 seconds
     *
     * @tags Loyalty
     * @name GetCharactersCharacterIdLoyaltyPoints
     * @summary Get loyalty points
     * @request GET:/characters/{character_id}/loyalty/points/
     * @secure
     */
    getCharactersCharacterIdLoyaltyPoints: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_loyalty_points_corporation_id
           * corporation_id integer
           * @format int32
           */
          corporation_id: number;
          /**
           * get_characters_character_id_loyalty_points_loyalty_points
           * loyalty_points integer
           * @format int32
           */
          loyalty_points: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/loyalty/points/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the 50 most recent mail headers belonging to the character that match the query criteria. Queries can be filtered by label, and last_mail_id can be used to paginate backwards --- Alternate route: `/dev/characters/{character_id}/mail/` Alternate route: `/legacy/characters/{character_id}/mail/` Alternate route: `/v1/characters/{character_id}/mail/` --- This route is cached for up to 30 seconds
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMail
     * @summary Return mail headers
     * @request GET:/characters/{character_id}/mail/
     * @secure
     */
    getCharactersCharacterIdMail: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Fetch only mails that match one or more of the given labels
         * @maxItems 25
         * @minItems 1
         * @uniqueItems true
         */
        labels?: number[];
        /**
         * List only mail with an ID lower than the given ID, if present
         * @format int32
         */
        last_mail_id?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_mail_from
           * From whom the mail was sent
           * @format int32
           */
          from?: number;
          /**
           * get_characters_character_id_mail_is_read
           * is_read boolean
           */
          is_read?: boolean;
          /**
           * get_characters_character_id_mail_labels
           * labels array
           * @min 0
           * @maxItems 25
           * @uniqueItems true
           */
          labels?: number[];
          /**
           * get_characters_character_id_mail_mail_id
           * mail_id integer
           * @format int32
           */
          mail_id?: number;
          /**
           * get_characters_character_id_mail_recipients
           * Recipients of the mail
           * @maxItems 52
           * @minItems 0
           * @uniqueItems true
           */
          recipients?: {
            /**
             * get_characters_character_id_mail_recipient_id
             * recipient_id integer
             * @format int32
             */
            recipient_id: number;
            /**
             * get_characters_character_id_mail_recipient_type
             * recipient_type string
             */
            recipient_type: "alliance" | "character" | "corporation" | "mailing_list";
          }[];
          /**
           * get_characters_character_id_mail_subject
           * Mail subject
           */
          subject?: string;
          /**
           * get_characters_character_id_mail_timestamp
           * When the mail was sent
           * @format date-time
           */
          timestamp?: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create and send a new mail --- Alternate route: `/dev/characters/{character_id}/mail/` Alternate route: `/legacy/characters/{character_id}/mail/` Alternate route: `/v1/characters/{character_id}/mail/`
     *
     * @tags Mail
     * @name PostCharactersCharacterIdMail
     * @summary Send a new mail
     * @request POST:/characters/{character_id}/mail/
     * @secure
     */
    postCharactersCharacterIdMail: (
      characterId: number,
      mail: {
        /**
         * post_characters_character_id_mail_approved_cost
         * approved_cost integer
         * @format int64
         * @default 0
         */
        approved_cost?: number;
        /**
         * post_characters_character_id_mail_body
         * body string
         * @maxLength 10000
         */
        body: string;
        /**
         * post_characters_character_id_mail_recipients
         * recipients array
         * @maxItems 50
         * @minItems 1
         */
        recipients: {
          /**
           * post_characters_character_id_mail_recipient_id
           * recipient_id integer
           * @format int32
           */
          recipient_id: number;
          /**
           * post_characters_character_id_mail_recipient_type
           * recipient_type string
           */
          recipient_type: "alliance" | "character" | "corporation" | "mailing_list";
        }[];
        /**
         * post_characters_character_id_mail_subject
         * subject string
         * @maxLength 1000
         */
        subject: string;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number,
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
        | {
            /**
             * post_characters_character_id_mail_520_error_520
             * Error 520 message
             */
            error?: string;
          }
      >({
        path: `/characters/${characterId}/mail/`,
        method: "POST",
        query: query,
        body: mail,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of the users mail labels, unread counts for each label and a total unread count. --- Alternate route: `/dev/characters/{character_id}/mail/labels/` Alternate route: `/v3/characters/{character_id}/mail/labels/` --- This route is cached for up to 30 seconds
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMailLabels
     * @summary Get mail labels and unread counts
     * @request GET:/characters/{character_id}/mail/labels/
     * @secure
     */
    getCharactersCharacterIdMailLabels: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_mail_labels_labels
           * labels array
           * @maxItems 30
           */
          labels?: {
            /**
             * get_characters_character_id_mail_labels_color
             * color string
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
             * get_characters_character_id_mail_labels_label_id
             * label_id integer
             * @format int32
             * @min 0
             */
            label_id?: number;
            /**
             * get_characters_character_id_mail_labels_name
             * name string
             * @maxLength 40
             */
            name?: string;
            /**
             * get_characters_character_id_mail_labels_unread_count
             * unread_count integer
             * @format int32
             * @min 0
             */
            unread_count?: number;
          }[];
          /**
           * get_characters_character_id_mail_labels_total_unread_count
           * total_unread_count integer
           * @format int32
           * @min 0
           */
          total_unread_count?: number;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/labels/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a mail label --- Alternate route: `/dev/characters/{character_id}/mail/labels/` Alternate route: `/legacy/characters/{character_id}/mail/labels/` Alternate route: `/v2/characters/{character_id}/mail/labels/`
     *
     * @tags Mail
     * @name PostCharactersCharacterIdMailLabels
     * @summary Create a mail label
     * @request POST:/characters/{character_id}/mail/labels/
     * @secure
     */
    postCharactersCharacterIdMailLabels: (
      characterId: number,
      label: {
        /**
         * post_characters_character_id_mail_labels_color
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
         * post_characters_character_id_mail_labels_name
         * name string
         * @minLength 1
         * @maxLength 40
         */
        name: string;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/labels/`,
        method: "POST",
        query: query,
        body: label,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a mail label --- Alternate route: `/dev/characters/{character_id}/mail/labels/{label_id}/` Alternate route: `/legacy/characters/{character_id}/mail/labels/{label_id}/` Alternate route: `/v1/characters/{character_id}/mail/labels/{label_id}/`
     *
     * @tags Mail
     * @name DeleteCharactersCharacterIdMailLabelsLabelId
     * @summary Delete a mail label
     * @request DELETE:/characters/{character_id}/mail/labels/{label_id}/
     * @secure
     */
    deleteCharactersCharacterIdMailLabelsLabelId: (
      characterId: number,
      labelId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | {
            /**
             * delete_characters_character_id_mail_labels_label_id_422_unprocessable_entity
             * Unprocessable entity message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/labels/${labelId}/`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Return all mailing lists that the character is subscribed to --- Alternate route: `/dev/characters/{character_id}/mail/lists/` Alternate route: `/legacy/characters/{character_id}/mail/lists/` Alternate route: `/v1/characters/{character_id}/mail/lists/` --- This route is cached for up to 120 seconds
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMailLists
     * @summary Return mailing list subscriptions
     * @request GET:/characters/{character_id}/mail/lists/
     * @secure
     */
    getCharactersCharacterIdMailLists: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_mail_lists_mailing_list_id
           * Mailing list ID
           * @format int32
           */
          mailing_list_id: number;
          /**
           * get_characters_character_id_mail_lists_name
           * name string
           */
          name: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/lists/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a mail --- Alternate route: `/dev/characters/{character_id}/mail/{mail_id}/` Alternate route: `/legacy/characters/{character_id}/mail/{mail_id}/` Alternate route: `/v1/characters/{character_id}/mail/{mail_id}/`
     *
     * @tags Mail
     * @name DeleteCharactersCharacterIdMailMailId
     * @summary Delete a mail
     * @request DELETE:/characters/{character_id}/mail/{mail_id}/
     * @secure
     */
    deleteCharactersCharacterIdMailMailId: (
      characterId: number,
      mailId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/${mailId}/`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Return the contents of an EVE mail --- Alternate route: `/dev/characters/{character_id}/mail/{mail_id}/` Alternate route: `/legacy/characters/{character_id}/mail/{mail_id}/` Alternate route: `/v1/characters/{character_id}/mail/{mail_id}/` --- This route is cached for up to 30 seconds
     *
     * @tags Mail
     * @name GetCharactersCharacterIdMailMailId
     * @summary Return a mail
     * @request GET:/characters/{character_id}/mail/{mail_id}/
     * @secure
     */
    getCharactersCharacterIdMailMailId: (
      characterId: number,
      mailId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_mail_mail_id_body
           * Mail's body
           */
          body?: string;
          /**
           * get_characters_character_id_mail_mail_id_from
           * From whom the mail was sent
           * @format int32
           */
          from?: number;
          /**
           * get_characters_character_id_mail_mail_id_labels
           * Labels attached to the mail
           * @maxItems 25
           */
          labels?: number[];
          /**
           * get_characters_character_id_mail_mail_id_read
           * Whether the mail is flagged as read
           */
          read?: boolean;
          /**
           * get_characters_character_id_mail_mail_id_recipients
           * Recipients of the mail
           * @maxItems 52
           * @minItems 0
           * @uniqueItems true
           */
          recipients?: {
            /**
             * get_characters_character_id_mail_mail_id_recipient_id
             * recipient_id integer
             * @format int32
             */
            recipient_id: number;
            /**
             * get_characters_character_id_mail_mail_id_recipient_type
             * recipient_type string
             */
            recipient_type: "alliance" | "character" | "corporation" | "mailing_list";
          }[];
          /**
           * get_characters_character_id_mail_mail_id_subject
           * Mail subject
           */
          subject?: string;
          /**
           * get_characters_character_id_mail_mail_id_timestamp
           * When the mail was sent
           * @format date-time
           */
          timestamp?: string;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_mail_mail_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/${mailId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update metadata about a mail --- Alternate route: `/dev/characters/{character_id}/mail/{mail_id}/` Alternate route: `/legacy/characters/{character_id}/mail/{mail_id}/` Alternate route: `/v1/characters/{character_id}/mail/{mail_id}/`
     *
     * @tags Mail
     * @name PutCharactersCharacterIdMailMailId
     * @summary Update metadata about a mail
     * @request PUT:/characters/{character_id}/mail/{mail_id}/
     * @secure
     */
    putCharactersCharacterIdMailMailId: (
      characterId: number,
      mailId: number,
      contents: {
        /**
         * put_characters_character_id_mail_mail_id_labels
         * Labels to assign to the mail. Pre-existing labels are unassigned.
         * @maxItems 25
         */
        labels?: number[];
        /**
         * put_characters_character_id_mail_mail_id_read
         * Whether the mail is flagged as read
         */
        read?: boolean;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/characters/${characterId}/mail/${mailId}/`,
        method: "PUT",
        query: query,
        body: contents,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return a list of medals the character has --- Alternate route: `/dev/characters/{character_id}/medals/` Alternate route: `/v2/characters/{character_id}/medals/` --- This route is cached for up to 3600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdMedals
     * @summary Get medals
     * @request GET:/characters/{character_id}/medals/
     * @secure
     */
    getCharactersCharacterIdMedals: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_medals_corporation_id
           * corporation_id integer
           * @format int32
           */
          corporation_id: number;
          /**
           * get_characters_character_id_medals_date
           * date string
           * @format date-time
           */
          date: string;
          /**
           * get_characters_character_id_medals_description
           * description string
           */
          description: string;
          /**
           * get_characters_character_id_medals_graphics
           * graphics array
           * @maxItems 9
           * @minItems 3
           */
          graphics: {
            /**
             * get_characters_character_id_medals_color
             * color integer
             * @format int32
             */
            color?: number;
            /**
             * get_characters_character_id_medals_graphic_graphic
             * graphic string
             */
            graphic: string;
            /**
             * get_characters_character_id_medals_layer
             * layer integer
             * @format int32
             */
            layer: number;
            /**
             * get_characters_character_id_medals_part
             * part integer
             * @format int32
             */
            part: number;
          }[];
          /**
           * get_characters_character_id_medals_issuer_id
           * issuer_id integer
           * @format int32
           */
          issuer_id: number;
          /**
           * get_characters_character_id_medals_medal_id
           * medal_id integer
           * @format int32
           */
          medal_id: number;
          /**
           * get_characters_character_id_medals_reason
           * reason string
           */
          reason: string;
          /**
           * get_characters_character_id_medals_status
           * status string
           */
          status: "public" | "private";
          /**
           * get_characters_character_id_medals_title
           * title string
           */
          title: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/medals/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Paginated record of all mining done by a character for the past 30 days --- Alternate route: `/dev/characters/{character_id}/mining/` Alternate route: `/legacy/characters/{character_id}/mining/` Alternate route: `/v1/characters/{character_id}/mining/` --- This route is cached for up to 600 seconds
     *
     * @tags Industry
     * @name GetCharactersCharacterIdMining
     * @summary Character mining ledger
     * @request GET:/characters/{character_id}/mining/
     * @secure
     */
    getCharactersCharacterIdMining: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_mining_date
           * date string
           * @format date
           */
          date: string;
          /**
           * get_characters_character_id_mining_quantity
           * quantity integer
           * @format int64
           */
          quantity: number;
          /**
           * get_characters_character_id_mining_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_characters_character_id_mining_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/mining/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return character notifications --- Alternate route: `/dev/characters/{character_id}/notifications/` Alternate route: `/v5/characters/{character_id}/notifications/` Alternate route: `/v6/characters/{character_id}/notifications/` --- This route is cached for up to 600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdNotifications
     * @summary Get character notifications
     * @request GET:/characters/{character_id}/notifications/
     * @secure
     */
    getCharactersCharacterIdNotifications: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_notifications_is_read
           * is_read boolean
           */
          is_read?: boolean;
          /**
           * get_characters_character_id_notifications_notification_id
           * notification_id integer
           * @format int64
           */
          notification_id: number;
          /**
           * get_characters_character_id_notifications_sender_id
           * sender_id integer
           * @format int32
           */
          sender_id: number;
          /**
           * get_characters_character_id_notifications_sender_type
           * sender_type string
           */
          sender_type: "character" | "corporation" | "alliance" | "faction" | "other";
          /**
           * get_characters_character_id_notifications_text
           * text string
           */
          text?: string;
          /**
           * get_characters_character_id_notifications_timestamp
           * timestamp string
           * @format date-time
           */
          timestamp: string;
          /**
           * get_characters_character_id_notifications_type
           * type string
           */
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
            | "CustomsMsg"
            | "DeclareWar"
            | "DistrictAttacked"
            | "DustAppAcceptedMsg"
            | "ESSMainBankLink"
            | "EntosisCaptureStarted"
            | "ExpertSystemExpired"
            | "ExpertSystemExpiryImminent"
            | "FWAllianceKickMsg"
            | "FWAllianceWarningMsg"
            | "FWCharKickMsg"
            | "FWCharRankGainMsg"
            | "FWCharRankLossMsg"
            | "FWCharWarningMsg"
            | "FWCorpJoinMsg"
            | "FWCorpKickMsg"
            | "FWCorpLeaveMsg"
            | "FWCorpWarningMsg"
            | "FacWarCorpJoinRequestMsg"
            | "FacWarCorpJoinWithdrawMsg"
            | "FacWarCorpLeaveRequestMsg"
            | "FacWarCorpLeaveWithdrawMsg"
            | "FacWarLPDisqualifiedEvent"
            | "FacWarLPDisqualifiedKill"
            | "FacWarLPPayoutEvent"
            | "FacWarLPPayoutKill"
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
            | "LocateCharMsg"
            | "MadeWarMutual"
            | "MercOfferRetractedMsg"
            | "MercOfferedNegotiationMsg"
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
            | "SeasonalChallengeCompleted"
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
            | "StructureOnline"
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
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/notifications/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return notifications about having been added to someone's contact list --- Alternate route: `/dev/characters/{character_id}/notifications/contacts/` Alternate route: `/v2/characters/{character_id}/notifications/contacts/` --- This route is cached for up to 600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdNotificationsContacts
     * @summary Get new contact notifications
     * @request GET:/characters/{character_id}/notifications/contacts/
     * @secure
     */
    getCharactersCharacterIdNotificationsContacts: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_notifications_contacts_message
           * message string
           */
          message: string;
          /**
           * get_characters_character_id_notifications_contacts_notification_id
           * notification_id integer
           * @format int32
           */
          notification_id: number;
          /**
           * get_characters_character_id_notifications_contacts_send_date
           * send_date string
           * @format date-time
           */
          send_date: string;
          /**
           * get_characters_character_id_notifications_contacts_sender_character_id
           * sender_character_id integer
           * @format int32
           */
          sender_character_id: number;
          /**
           * get_characters_character_id_notifications_contacts_standing_level
           * A number representing the standing level the receiver has been added at by the sender. The standing levels are as follows: -10 -> Terrible | -5 -> Bad |  0 -> Neutral |  5 -> Good |  10 -> Excellent
           * @format float
           */
          standing_level: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/notifications/contacts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Checks if the character is currently online --- Alternate route: `/dev/characters/{character_id}/online/` Alternate route: `/v2/characters/{character_id}/online/` Alternate route: `/v3/characters/{character_id}/online/` --- This route is cached for up to 60 seconds
     *
     * @tags Location
     * @name GetCharactersCharacterIdOnline
     * @summary Get character online
     * @request GET:/characters/{character_id}/online/
     * @secure
     */
    getCharactersCharacterIdOnline: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_online_last_login
           * Timestamp of the last login
           * @format date-time
           */
          last_login?: string;
          /**
           * get_characters_character_id_online_last_logout
           * Timestamp of the last logout
           * @format date-time
           */
          last_logout?: string;
          /**
           * get_characters_character_id_online_logins
           * Total number of times the character has logged in
           * @format int32
           */
          logins?: number;
          /**
           * get_characters_character_id_online_online
           * If the character is online
           */
          online: boolean;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/online/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of tasks finished by a character --- Alternate route: `/dev/characters/{character_id}/opportunities/` Alternate route: `/legacy/characters/{character_id}/opportunities/` Alternate route: `/v1/characters/{character_id}/opportunities/` --- This route is cached for up to 3600 seconds
     *
     * @tags Opportunities
     * @name GetCharactersCharacterIdOpportunities
     * @summary Get a character's completed tasks
     * @request GET:/characters/{character_id}/opportunities/
     * @secure
     */
    getCharactersCharacterIdOpportunities: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_opportunities_completed_at
           * completed_at string
           * @format date-time
           */
          completed_at: string;
          /**
           * get_characters_character_id_opportunities_task_id
           * task_id integer
           * @format int32
           */
          task_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/opportunities/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List open market orders placed by a character --- Alternate route: `/dev/characters/{character_id}/orders/` Alternate route: `/v2/characters/{character_id}/orders/` --- This route is cached for up to 1200 seconds
     *
     * @tags Market
     * @name GetCharactersCharacterIdOrders
     * @summary List open orders from a character
     * @request GET:/characters/{character_id}/orders/
     * @secure
     */
    getCharactersCharacterIdOrders: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_orders_duration
           * Number of days for which order is valid (starting from the issued date). An order expires at time issued + duration
           * @format int32
           */
          duration: number;
          /**
           * get_characters_character_id_orders_escrow
           * For buy orders, the amount of ISK in escrow
           * @format double
           */
          escrow?: number;
          /**
           * get_characters_character_id_orders_is_buy_order
           * True if the order is a bid (buy) order
           */
          is_buy_order?: boolean;
          /**
           * get_characters_character_id_orders_is_corporation
           * Signifies whether the buy/sell order was placed on behalf of a corporation.
           */
          is_corporation: boolean;
          /**
           * get_characters_character_id_orders_issued
           * Date and time when this order was issued
           * @format date-time
           */
          issued: string;
          /**
           * get_characters_character_id_orders_location_id
           * ID of the location where order was placed
           * @format int64
           */
          location_id: number;
          /**
           * get_characters_character_id_orders_min_volume
           * For buy orders, the minimum quantity that will be accepted in a matching sell order
           * @format int32
           */
          min_volume?: number;
          /**
           * get_characters_character_id_orders_order_id
           * Unique order ID
           * @format int64
           */
          order_id: number;
          /**
           * get_characters_character_id_orders_price
           * Cost per unit for this order
           * @format double
           */
          price: number;
          /**
           * get_characters_character_id_orders_range
           * Valid order range, numbers are ranges in jumps
           */
          range: "1" | "10" | "2" | "20" | "3" | "30" | "4" | "40" | "5" | "region" | "solarsystem" | "station";
          /**
           * get_characters_character_id_orders_region_id
           * ID of the region where order was placed
           * @format int32
           */
          region_id: number;
          /**
           * get_characters_character_id_orders_type_id
           * The type ID of the item transacted in this order
           * @format int32
           */
          type_id: number;
          /**
           * get_characters_character_id_orders_volume_remain
           * Quantity of items still required or offered
           * @format int32
           */
          volume_remain: number;
          /**
           * get_characters_character_id_orders_volume_total
           * Quantity of items required or offered at time order was placed
           * @format int32
           */
          volume_total: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/orders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List cancelled and expired market orders placed by a character up to 90 days in the past. --- Alternate route: `/dev/characters/{character_id}/orders/history/` Alternate route: `/legacy/characters/{character_id}/orders/history/` Alternate route: `/v1/characters/{character_id}/orders/history/` --- This route is cached for up to 3600 seconds
     *
     * @tags Market
     * @name GetCharactersCharacterIdOrdersHistory
     * @summary List historical orders by a character
     * @request GET:/characters/{character_id}/orders/history/
     * @secure
     */
    getCharactersCharacterIdOrdersHistory: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_orders_history_duration
           * Number of days the order was valid for (starting from the issued date). An order expires at time issued + duration
           * @format int32
           */
          duration: number;
          /**
           * get_characters_character_id_orders_history_escrow
           * For buy orders, the amount of ISK in escrow
           * @format double
           */
          escrow?: number;
          /**
           * get_characters_character_id_orders_history_is_buy_order
           * True if the order is a bid (buy) order
           */
          is_buy_order?: boolean;
          /**
           * get_characters_character_id_orders_history_is_corporation
           * Signifies whether the buy/sell order was placed on behalf of a corporation.
           */
          is_corporation: boolean;
          /**
           * get_characters_character_id_orders_history_issued
           * Date and time when this order was issued
           * @format date-time
           */
          issued: string;
          /**
           * get_characters_character_id_orders_history_location_id
           * ID of the location where order was placed
           * @format int64
           */
          location_id: number;
          /**
           * get_characters_character_id_orders_history_min_volume
           * For buy orders, the minimum quantity that will be accepted in a matching sell order
           * @format int32
           */
          min_volume?: number;
          /**
           * get_characters_character_id_orders_history_order_id
           * Unique order ID
           * @format int64
           */
          order_id: number;
          /**
           * get_characters_character_id_orders_history_price
           * Cost per unit for this order
           * @format double
           */
          price: number;
          /**
           * get_characters_character_id_orders_history_range
           * Valid order range, numbers are ranges in jumps
           */
          range: "1" | "10" | "2" | "20" | "3" | "30" | "4" | "40" | "5" | "region" | "solarsystem" | "station";
          /**
           * get_characters_character_id_orders_history_region_id
           * ID of the region where order was placed
           * @format int32
           */
          region_id: number;
          /**
           * get_characters_character_id_orders_history_state
           * Current order state
           */
          state: "cancelled" | "expired";
          /**
           * get_characters_character_id_orders_history_type_id
           * The type ID of the item transacted in this order
           * @format int32
           */
          type_id: number;
          /**
           * get_characters_character_id_orders_history_volume_remain
           * Quantity of items still required or offered
           * @format int32
           */
          volume_remain: number;
          /**
           * get_characters_character_id_orders_history_volume_total
           * Quantity of items required or offered at time order was placed
           * @format int32
           */
          volume_total: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/orders/history/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of all planetary colonies owned by a character. --- Alternate route: `/dev/characters/{character_id}/planets/` Alternate route: `/legacy/characters/{character_id}/planets/` Alternate route: `/v1/characters/{character_id}/planets/` --- This route is cached for up to 600 seconds
     *
     * @tags Planetary Interaction
     * @name GetCharactersCharacterIdPlanets
     * @summary Get colonies
     * @request GET:/characters/{character_id}/planets/
     * @secure
     */
    getCharactersCharacterIdPlanets: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_planets_last_update
           * last_update string
           * @format date-time
           */
          last_update: string;
          /**
           * get_characters_character_id_planets_num_pins
           * num_pins integer
           * @format int32
           * @min 1
           */
          num_pins: number;
          /**
           * get_characters_character_id_planets_owner_id
           * owner_id integer
           * @format int32
           */
          owner_id: number;
          /**
           * get_characters_character_id_planets_planet_id
           * planet_id integer
           * @format int32
           */
          planet_id: number;
          /**
           * get_characters_character_id_planets_planet_type
           * planet_type string
           */
          planet_type: "temperate" | "barren" | "oceanic" | "ice" | "gas" | "lava" | "storm" | "plasma";
          /**
           * get_characters_character_id_planets_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_characters_character_id_planets_upgrade_level
           * upgrade_level integer
           * @format int32
           * @min 0
           * @max 5
           */
          upgrade_level: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/planets/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns full details on the layout of a single planetary colony, including links, pins and routes. Note: Planetary information is only recalculated when the colony is viewed through the client. Information will not update until this criteria is met. --- Alternate route: `/dev/characters/{character_id}/planets/{planet_id}/` Alternate route: `/v3/characters/{character_id}/planets/{planet_id}/`
     *
     * @tags Planetary Interaction
     * @name GetCharactersCharacterIdPlanetsPlanetId
     * @summary Get colony layout
     * @request GET:/characters/{character_id}/planets/{planet_id}/
     * @secure
     */
    getCharactersCharacterIdPlanetsPlanetId: (
      characterId: number,
      planetId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_planets_planet_id_links
           * links array
           * @maxItems 500
           */
          links: {
            /**
             * get_characters_character_id_planets_planet_id_destination_pin_id
             * destination_pin_id integer
             * @format int64
             */
            destination_pin_id: number;
            /**
             * get_characters_character_id_planets_planet_id_link_level
             * link_level integer
             * @format int32
             * @min 0
             * @max 10
             */
            link_level: number;
            /**
             * get_characters_character_id_planets_planet_id_source_pin_id
             * source_pin_id integer
             * @format int64
             */
            source_pin_id: number;
          }[];
          /**
           * get_characters_character_id_planets_planet_id_pins
           * pins array
           * @maxItems 100
           */
          pins: {
            /**
             * get_characters_character_id_planets_planet_id_contents
             * contents array
             * @maxItems 90
             */
            contents?: {
              /**
               * get_characters_character_id_planets_planet_id_amount
               * amount integer
               * @format int64
               */
              amount: number;
              /**
               * get_characters_character_id_planets_planet_id_content_type_id
               * type_id integer
               * @format int32
               */
              type_id: number;
            }[];
            /**
             * get_characters_character_id_planets_planet_id_expiry_time
             * expiry_time string
             * @format date-time
             */
            expiry_time?: string;
            /**
             * get_characters_character_id_planets_planet_id_extractor_details
             * extractor_details object
             */
            extractor_details?: {
              /**
               * get_characters_character_id_planets_planet_id_cycle_time
               * in seconds
               * @format int32
               */
              cycle_time?: number;
              /**
               * get_characters_character_id_planets_planet_id_head_radius
               * head_radius number
               * @format float
               */
              head_radius?: number;
              /**
               * get_characters_character_id_planets_planet_id_heads
               * heads array
               * @maxItems 10
               */
              heads: {
                /**
                 * get_characters_character_id_planets_planet_id_head_id
                 * head_id integer
                 * @format int32
                 * @min 0
                 * @max 9
                 */
                head_id: number;
                /**
                 * get_characters_character_id_planets_planet_id_head_latitude
                 * latitude number
                 * @format float
                 */
                latitude: number;
                /**
                 * get_characters_character_id_planets_planet_id_head_longitude
                 * longitude number
                 * @format float
                 */
                longitude: number;
              }[];
              /**
               * get_characters_character_id_planets_planet_id_product_type_id
               * product_type_id integer
               * @format int32
               */
              product_type_id?: number;
              /**
               * get_characters_character_id_planets_planet_id_qty_per_cycle
               * qty_per_cycle integer
               * @format int32
               */
              qty_per_cycle?: number;
            };
            /**
             * get_characters_character_id_planets_planet_id_factory_details
             * factory_details object
             */
            factory_details?: {
              /**
               * get_characters_character_id_planets_planet_id_factory_details_schematic_id
               * schematic_id integer
               * @format int32
               */
              schematic_id: number;
            };
            /**
             * get_characters_character_id_planets_planet_id_install_time
             * install_time string
             * @format date-time
             */
            install_time?: string;
            /**
             * get_characters_character_id_planets_planet_id_last_cycle_start
             * last_cycle_start string
             * @format date-time
             */
            last_cycle_start?: string;
            /**
             * get_characters_character_id_planets_planet_id_latitude
             * latitude number
             * @format float
             */
            latitude: number;
            /**
             * get_characters_character_id_planets_planet_id_longitude
             * longitude number
             * @format float
             */
            longitude: number;
            /**
             * get_characters_character_id_planets_planet_id_pin_id
             * pin_id integer
             * @format int64
             */
            pin_id: number;
            /**
             * get_characters_character_id_planets_planet_id_schematic_id
             * schematic_id integer
             * @format int32
             */
            schematic_id?: number;
            /**
             * get_characters_character_id_planets_planet_id_type_id
             * type_id integer
             * @format int32
             */
            type_id: number;
          }[];
          /**
           * get_characters_character_id_planets_planet_id_routes
           * routes array
           * @maxItems 1000
           */
          routes: {
            /**
             * get_characters_character_id_planets_planet_id_route_content_type_id
             * content_type_id integer
             * @format int32
             */
            content_type_id: number;
            /**
             * get_characters_character_id_planets_planet_id_route_destination_pin_id
             * destination_pin_id integer
             * @format int64
             */
            destination_pin_id: number;
            /**
             * get_characters_character_id_planets_planet_id_quantity
             * quantity number
             * @format float
             */
            quantity: number;
            /**
             * get_characters_character_id_planets_planet_id_route_id
             * route_id integer
             * @format int64
             */
            route_id: number;
            /**
             * get_characters_character_id_planets_planet_id_route_source_pin_id
             * source_pin_id integer
             * @format int64
             */
            source_pin_id: number;
            /**
             * get_characters_character_id_planets_planet_id_waypoints
             * list of pin ID waypoints
             * @maxItems 5
             */
            waypoints?: number[];
          }[];
        },
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_characters_character_id_planets_planet_id_error
             * error message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/planets/${planetId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get portrait urls for a character --- Alternate route: `/dev/characters/{character_id}/portrait/` Alternate route: `/v2/characters/{character_id}/portrait/` Alternate route: `/v3/characters/{character_id}/portrait/` --- This route expires daily at 11:05
     *
     * @tags Character
     * @name GetCharactersCharacterIdPortrait
     * @summary Get character portraits
     * @request GET:/characters/{character_id}/portrait/
     */
    getCharactersCharacterIdPortrait: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_portrait_px128x128
           * px128x128 string
           */
          px128x128?: string;
          /**
           * get_characters_character_id_portrait_px256x256
           * px256x256 string
           */
          px256x256?: string;
          /**
           * get_characters_character_id_portrait_px512x512
           * px512x512 string
           */
          px512x512?: string;
          /**
           * get_characters_character_id_portrait_px64x64
           * px64x64 string
           */
          px64x64?: string;
        },
        | void
        | BadRequest
        | {
            /**
             * get_characters_character_id_portrait_error
             * error message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/portrait/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a character's corporation roles --- Alternate route: `/dev/characters/{character_id}/roles/` Alternate route: `/v3/characters/{character_id}/roles/` --- This route is cached for up to 3600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdRoles
     * @summary Get character corporation roles
     * @request GET:/characters/{character_id}/roles/
     * @secure
     */
    getCharactersCharacterIdRoles: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_roles_roles
           * roles array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_characters_character_id_roles_roles_at_base
           * roles_at_base array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_characters_character_id_roles_roles_at_hq
           * roles_at_hq array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_characters_character_id_roles_roles_at_other
           * roles_at_other array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/roles/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Search for entities that match a given sub-string. --- Alternate route: `/dev/characters/{character_id}/search/` Alternate route: `/legacy/characters/{character_id}/search/` Alternate route: `/v3/characters/{character_id}/search/` --- This route is cached for up to 3600 seconds
     *
     * @tags Search
     * @name GetCharactersCharacterIdSearch
     * @summary Search on a string
     * @request GET:/characters/{character_id}/search/
     * @secure
     */
    getCharactersCharacterIdSearch: (
      characterId: number,
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
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
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
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_search_agent
           * agent array
           * @maxItems 500
           */
          agent?: number[];
          /**
           * get_characters_character_id_search_alliance
           * alliance array
           * @maxItems 500
           */
          alliance?: number[];
          /**
           * get_characters_character_id_search_character
           * character array
           * @maxItems 500
           */
          character?: number[];
          /**
           * get_characters_character_id_search_constellation
           * constellation array
           * @maxItems 500
           */
          constellation?: number[];
          /**
           * get_characters_character_id_search_corporation
           * corporation array
           * @maxItems 500
           */
          corporation?: number[];
          /**
           * get_characters_character_id_search_faction
           * faction array
           * @maxItems 500
           */
          faction?: number[];
          /**
           * get_characters_character_id_search_inventory_type
           * inventory_type array
           * @maxItems 500
           */
          inventory_type?: number[];
          /**
           * get_characters_character_id_search_region
           * region array
           * @maxItems 500
           */
          region?: number[];
          /**
           * get_characters_character_id_search_solar_system
           * solar_system array
           * @maxItems 500
           */
          solar_system?: number[];
          /**
           * get_characters_character_id_search_station
           * station array
           * @maxItems 500
           */
          station?: number[];
          /**
           * get_characters_character_id_search_structure
           * structure array
           * @maxItems 500
           */
          structure?: number[];
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/search/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the current ship type, name and id --- Alternate route: `/dev/characters/{character_id}/ship/` Alternate route: `/legacy/characters/{character_id}/ship/` Alternate route: `/v1/characters/{character_id}/ship/` Alternate route: `/v2/characters/{character_id}/ship/` --- This route is cached for up to 5 seconds
     *
     * @tags Location
     * @name GetCharactersCharacterIdShip
     * @summary Get current ship
     * @request GET:/characters/{character_id}/ship/
     * @secure
     */
    getCharactersCharacterIdShip: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_ship_ship_item_id
           * Item id's are unique to a ship and persist until it is repackaged. This value can be used to track repeated uses of a ship, or detect when a pilot changes into a different instance of the same ship type.
           * @format int64
           */
          ship_item_id: number;
          /**
           * get_characters_character_id_ship_ship_name
           * ship_name string
           */
          ship_name: string;
          /**
           * get_characters_character_id_ship_ship_type_id
           * ship_type_id integer
           * @format int32
           */
          ship_type_id: number;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/ship/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List the configured skill queue for the given character --- Alternate route: `/dev/characters/{character_id}/skillqueue/` Alternate route: `/legacy/characters/{character_id}/skillqueue/` Alternate route: `/v2/characters/{character_id}/skillqueue/` --- This route is cached for up to 120 seconds
     *
     * @tags Skills
     * @name GetCharactersCharacterIdSkillqueue
     * @summary Get character's skill queue
     * @request GET:/characters/{character_id}/skillqueue/
     * @secure
     */
    getCharactersCharacterIdSkillqueue: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_skillqueue_finish_date
           * Date on which training of the skill will complete. Omitted if the skill queue is paused.
           * @format date-time
           */
          finish_date?: string;
          /**
           * get_characters_character_id_skillqueue_finished_level
           * finished_level integer
           * @format int32
           * @min 0
           * @max 5
           */
          finished_level: number;
          /**
           * get_characters_character_id_skillqueue_level_end_sp
           * level_end_sp integer
           * @format int32
           */
          level_end_sp?: number;
          /**
           * get_characters_character_id_skillqueue_level_start_sp
           * Amount of SP that was in the skill when it started training it's current level. Used to calculate % of current level complete.
           * @format int32
           */
          level_start_sp?: number;
          /**
           * get_characters_character_id_skillqueue_queue_position
           * queue_position integer
           * @format int32
           */
          queue_position: number;
          /**
           * get_characters_character_id_skillqueue_skill_id
           * skill_id integer
           * @format int32
           */
          skill_id: number;
          /**
           * get_characters_character_id_skillqueue_start_date
           * start_date string
           * @format date-time
           */
          start_date?: string;
          /**
           * get_characters_character_id_skillqueue_training_start_sp
           * training_start_sp integer
           * @format int32
           */
          training_start_sp?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/skillqueue/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List all trained skills for the given character --- Alternate route: `/dev/characters/{character_id}/skills/` Alternate route: `/v4/characters/{character_id}/skills/` --- This route is cached for up to 120 seconds
     *
     * @tags Skills
     * @name GetCharactersCharacterIdSkills
     * @summary Get character skills
     * @request GET:/characters/{character_id}/skills/
     * @secure
     */
    getCharactersCharacterIdSkills: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_skills_skills
           * skills array
           * @maxItems 1000
           */
          skills: {
            /**
             * get_characters_character_id_skills_active_skill_level
             * active_skill_level integer
             * @format int32
             */
            active_skill_level: number;
            /**
             * get_characters_character_id_skills_skill_id
             * skill_id integer
             * @format int32
             */
            skill_id: number;
            /**
             * get_characters_character_id_skills_skillpoints_in_skill
             * skillpoints_in_skill integer
             * @format int64
             */
            skillpoints_in_skill: number;
            /**
             * get_characters_character_id_skills_trained_skill_level
             * trained_skill_level integer
             * @format int32
             */
            trained_skill_level: number;
          }[];
          /**
           * get_characters_character_id_skills_total_sp
           * total_sp integer
           * @format int64
           */
          total_sp: number;
          /**
           * get_characters_character_id_skills_unallocated_sp
           * Skill points available to be assigned
           * @format int32
           */
          unallocated_sp?: number;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/skills/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return character standings from agents, NPC corporations, and factions --- Alternate route: `/dev/characters/{character_id}/standings/` Alternate route: `/v2/characters/{character_id}/standings/` --- This route is cached for up to 3600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdStandings
     * @summary Get standings
     * @request GET:/characters/{character_id}/standings/
     * @secure
     */
    getCharactersCharacterIdStandings: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_standings_from_id
           * from_id integer
           * @format int32
           */
          from_id: number;
          /**
           * get_characters_character_id_standings_from_type
           * from_type string
           */
          from_type: "agent" | "npc_corp" | "faction";
          /**
           * get_characters_character_id_standings_standing
           * standing number
           * @format float
           */
          standing: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/standings/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a character's titles --- Alternate route: `/dev/characters/{character_id}/titles/` Alternate route: `/v2/characters/{character_id}/titles/` --- This route is cached for up to 3600 seconds
     *
     * @tags Character
     * @name GetCharactersCharacterIdTitles
     * @summary Get character corporation titles
     * @request GET:/characters/{character_id}/titles/
     * @secure
     */
    getCharactersCharacterIdTitles: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_titles_name
           * name string
           */
          name?: string;
          /**
           * get_characters_character_id_titles_title_id
           * title_id integer
           * @format int32
           */
          title_id?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/titles/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a character's wallet balance --- Alternate route: `/legacy/characters/{character_id}/wallet/` Alternate route: `/v1/characters/{character_id}/wallet/` --- This route is cached for up to 120 seconds --- [Diff of the upcoming changes](https://esi.evetech.net/diff/latest/dev/#GET-/characters/{character_id}/wallet/)
     *
     * @tags Wallet
     * @name GetCharactersCharacterIdWallet
     * @summary Get a character's wallet balance
     * @request GET:/characters/{character_id}/wallet/
     * @secure
     */
    getCharactersCharacterIdWallet: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number,
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/wallet/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the given character's wallet journal going 30 days back --- Alternate route: `/dev/characters/{character_id}/wallet/journal/` Alternate route: `/v6/characters/{character_id}/wallet/journal/` --- This route is cached for up to 3600 seconds
     *
     * @tags Wallet
     * @name GetCharactersCharacterIdWalletJournal
     * @summary Get character wallet journal
     * @request GET:/characters/{character_id}/wallet/journal/
     * @secure
     */
    getCharactersCharacterIdWalletJournal: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_wallet_journal_amount
           * The amount of ISK given or taken from the wallet as a result of the given transaction. Positive when ISK is deposited into the wallet and negative when ISK is withdrawn
           * @format double
           */
          amount?: number;
          /**
           * get_characters_character_id_wallet_journal_balance
           * Wallet balance after transaction occurred
           * @format double
           */
          balance?: number;
          /**
           * get_characters_character_id_wallet_journal_context_id
           * An ID that gives extra context to the particular transaction. Because of legacy reasons the context is completely different per ref_type and means different things. It is also possible to not have a context_id
           * @format int64
           */
          context_id?: number;
          /**
           * get_characters_character_id_wallet_journal_context_id_type
           * The type of the given context_id if present
           */
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
           * get_characters_character_id_wallet_journal_date
           * Date and time of transaction
           * @format date-time
           */
          date: string;
          /**
           * get_characters_character_id_wallet_journal_description
           * The reason for the transaction, mirrors what is seen in the client
           */
          description: string;
          /**
           * get_characters_character_id_wallet_journal_first_party_id
           * The id of the first party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
           * @format int32
           */
          first_party_id?: number;
          /**
           * get_characters_character_id_wallet_journal_id
           * Unique journal reference ID
           * @format int64
           */
          id: number;
          /**
           * get_characters_character_id_wallet_journal_reason
           * The user stated reason for the transaction. Only applies to some ref_types
           */
          reason?: string;
          /**
           * get_characters_character_id_wallet_journal_ref_type
           * "The transaction type for the given. transaction. Different transaction types will populate different attributes."
           */
          ref_type:
            | "acceleration_gate_fee"
            | "advertisement_listing_fee"
            | "agent_donation"
            | "agent_location_services"
            | "agent_miscellaneous"
            | "agent_mission_collateral_paid"
            | "agent_mission_collateral_refunded"
            | "agent_mission_reward"
            | "agent_mission_reward_corporation_tax"
            | "agent_mission_time_bonus_reward"
            | "agent_mission_time_bonus_reward_corporation_tax"
            | "agent_security_services"
            | "agent_services_rendered"
            | "agents_preward"
            | "alliance_maintainance_fee"
            | "alliance_registration_fee"
            | "asset_safety_recovery_tax"
            | "bounty"
            | "bounty_prize"
            | "bounty_prize_corporation_tax"
            | "bounty_prizes"
            | "bounty_reimbursement"
            | "bounty_surcharge"
            | "brokers_fee"
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
            | "courier_mission_escrow"
            | "cspa"
            | "cspaofflinerefund"
            | "daily_challenge_reward"
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
            | "gm_cash_transfer"
            | "industry_job_tax"
            | "infrastructure_hub_maintenance"
            | "inheritance"
            | "insurance"
            | "item_trader_payment"
            | "jump_clone_activation_fee"
            | "jump_clone_installation_fee"
            | "kill_right_fee"
            | "lp_store"
            | "manufacturing"
            | "market_escrow"
            | "market_fine_paid"
            | "market_provider_tax"
            | "market_transaction"
            | "medal_creation"
            | "medal_issued"
            | "milestone_reward_payment"
            | "mission_completion"
            | "mission_cost"
            | "mission_expiration"
            | "mission_reward"
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
            | "sovereignity_bill"
            | "store_purchase"
            | "store_purchase_refund"
            | "structure_gate_jump"
            | "transaction_tax"
            | "upkeep_adjustment_fee"
            | "war_ally_contract"
            | "war_fee"
            | "war_fee_surrender";
          /**
           * get_characters_character_id_wallet_journal_second_party_id
           * The id of the second party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
           * @format int32
           */
          second_party_id?: number;
          /**
           * get_characters_character_id_wallet_journal_tax
           * Tax amount received. Only applies to tax related transactions
           * @format double
           */
          tax?: number;
          /**
           * get_characters_character_id_wallet_journal_tax_receiver_id
           * The corporation ID receiving any tax paid. Only applies to tax related transactions
           * @format int32
           */
          tax_receiver_id?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/wallet/journal/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get wallet transactions of a character --- Alternate route: `/dev/characters/{character_id}/wallet/transactions/` Alternate route: `/legacy/characters/{character_id}/wallet/transactions/` Alternate route: `/v1/characters/{character_id}/wallet/transactions/` --- This route is cached for up to 3600 seconds
     *
     * @tags Wallet
     * @name GetCharactersCharacterIdWalletTransactions
     * @summary Get wallet transactions
     * @request GET:/characters/{character_id}/wallet/transactions/
     * @secure
     */
    getCharactersCharacterIdWalletTransactions: (
      characterId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Only show transactions happened before the one referenced by this id
         * @format int64
         */
        from_id?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_characters_character_id_wallet_transactions_client_id
           * client_id integer
           * @format int32
           */
          client_id: number;
          /**
           * get_characters_character_id_wallet_transactions_date
           * Date and time of transaction
           * @format date-time
           */
          date: string;
          /**
           * get_characters_character_id_wallet_transactions_is_buy
           * is_buy boolean
           */
          is_buy: boolean;
          /**
           * get_characters_character_id_wallet_transactions_is_personal
           * is_personal boolean
           */
          is_personal: boolean;
          /**
           * get_characters_character_id_wallet_transactions_journal_ref_id
           * journal_ref_id integer
           * @format int64
           */
          journal_ref_id: number;
          /**
           * get_characters_character_id_wallet_transactions_location_id
           * location_id integer
           * @format int64
           */
          location_id: number;
          /**
           * get_characters_character_id_wallet_transactions_quantity
           * quantity integer
           * @format int32
           */
          quantity: number;
          /**
           * get_characters_character_id_wallet_transactions_transaction_id
           * Unique transaction ID
           * @format int64
           */
          transaction_id: number;
          /**
           * get_characters_character_id_wallet_transactions_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
          /**
           * get_characters_character_id_wallet_transactions_unit_price
           * Amount paid per unit
           * @format double
           */
          unit_price: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/characters/${characterId}/wallet/transactions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  contracts = {
    /**
     * @description Lists bids on a public auction contract --- Alternate route: `/dev/contracts/public/bids/{contract_id}/` Alternate route: `/legacy/contracts/public/bids/{contract_id}/` Alternate route: `/v1/contracts/public/bids/{contract_id}/` --- This route is cached for up to 300 seconds
     *
     * @tags Contracts
     * @name GetContractsPublicBidsContractId
     * @summary Get public contract bids
     * @request GET:/contracts/public/bids/{contract_id}/
     */
    getContractsPublicBidsContractId: (
      contractId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_contracts_public_bids_contract_id_amount
           * The amount bid, in ISK
           * @format float
           */
          amount: number;
          /**
           * get_contracts_public_bids_contract_id_bid_id
           * Unique ID for the bid
           * @format int32
           */
          bid_id: number;
          /**
           * get_contracts_public_bids_contract_id_date_bid
           * Datetime when the bid was placed
           * @format date-time
           */
          date_bid: string;
        }[],
        | void
        | BadRequest
        | {
            /**
             * get_contracts_public_bids_contract_id_403_forbidden
             * Forbidden message
             */
            error?: string;
          }
        | {
            /**
             * get_contracts_public_bids_contract_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/contracts/public/bids/${contractId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists items of a public contract --- Alternate route: `/dev/contracts/public/items/{contract_id}/` Alternate route: `/legacy/contracts/public/items/{contract_id}/` Alternate route: `/v1/contracts/public/items/{contract_id}/` --- This route is cached for up to 3600 seconds
     *
     * @tags Contracts
     * @name GetContractsPublicItemsContractId
     * @summary Get public contract items
     * @request GET:/contracts/public/items/{contract_id}/
     */
    getContractsPublicItemsContractId: (
      contractId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_contracts_public_items_contract_id_is_blueprint_copy
           * is_blueprint_copy boolean
           */
          is_blueprint_copy?: boolean;
          /**
           * get_contracts_public_items_contract_id_is_included
           * true if the contract issuer has submitted this item with the contract, false if the isser is asking for this item in the contract
           */
          is_included: boolean;
          /**
           * get_contracts_public_items_contract_id_item_id
           * Unique ID for the item being sold. Not present if item is being requested by contract rather than sold with contract
           * @format int64
           */
          item_id?: number;
          /**
           * get_contracts_public_items_contract_id_material_efficiency
           * Material Efficiency Level of the blueprint
           * @format int32
           * @min 0
           * @max 25
           */
          material_efficiency?: number;
          /**
           * get_contracts_public_items_contract_id_quantity
           * Number of items in the stack
           * @format int32
           */
          quantity: number;
          /**
           * get_contracts_public_items_contract_id_record_id
           * Unique ID for the item, used by the contract system
           * @format int64
           */
          record_id: number;
          /**
           * get_contracts_public_items_contract_id_runs
           * Number of runs remaining if the blueprint is a copy, -1 if it is an original
           * @format int32
           * @min -1
           */
          runs?: number;
          /**
           * get_contracts_public_items_contract_id_time_efficiency
           * Time Efficiency Level of the blueprint
           * @format int32
           * @min 0
           * @max 20
           */
          time_efficiency?: number;
          /**
           * get_contracts_public_items_contract_id_type_id
           * Type ID for item
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | {
            /**
             * get_contracts_public_items_contract_id_403_forbidden
             * Forbidden message
             */
            error?: string;
          }
        | {
            /**
             * get_contracts_public_items_contract_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/contracts/public/items/${contractId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of all public contracts in the given region --- Alternate route: `/dev/contracts/public/{region_id}/` Alternate route: `/legacy/contracts/public/{region_id}/` Alternate route: `/v1/contracts/public/{region_id}/` --- This route is cached for up to 1800 seconds
     *
     * @tags Contracts
     * @name GetContractsPublicRegionId
     * @summary Get public contracts
     * @request GET:/contracts/public/{region_id}/
     */
    getContractsPublicRegionId: (
      regionId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_contracts_public_region_id_buyout
           * Buyout price (for Auctions only)
           * @format double
           */
          buyout?: number;
          /**
           * get_contracts_public_region_id_collateral
           * Collateral price (for Couriers only)
           * @format double
           */
          collateral?: number;
          /**
           * get_contracts_public_region_id_contract_id
           * contract_id integer
           * @format int32
           */
          contract_id: number;
          /**
           * get_contracts_public_region_id_date_expired
           * Expiration date of the contract
           * @format date-time
           */
          date_expired: string;
          /**
           * get_contracts_public_region_id_date_issued
           * Сreation date of the contract
           * @format date-time
           */
          date_issued: string;
          /**
           * get_contracts_public_region_id_days_to_complete
           * Number of days to perform the contract
           * @format int32
           */
          days_to_complete?: number;
          /**
           * get_contracts_public_region_id_end_location_id
           * End location ID (for Couriers contract)
           * @format int64
           */
          end_location_id?: number;
          /**
           * get_contracts_public_region_id_for_corporation
           * true if the contract was issued on behalf of the issuer's corporation
           */
          for_corporation?: boolean;
          /**
           * get_contracts_public_region_id_issuer_corporation_id
           * Character's corporation ID for the issuer
           * @format int32
           */
          issuer_corporation_id: number;
          /**
           * get_contracts_public_region_id_issuer_id
           * Character ID for the issuer
           * @format int32
           */
          issuer_id: number;
          /**
           * get_contracts_public_region_id_price
           * Price of contract (for ItemsExchange and Auctions)
           * @format double
           */
          price?: number;
          /**
           * get_contracts_public_region_id_reward
           * Remuneration for contract (for Couriers only)
           * @format double
           */
          reward?: number;
          /**
           * get_contracts_public_region_id_start_location_id
           * Start location ID (for Couriers contract)
           * @format int64
           */
          start_location_id?: number;
          /**
           * get_contracts_public_region_id_title
           * Title of the contract
           */
          title?: string;
          /**
           * get_contracts_public_region_id_type
           * Type of the contract
           */
          type: "unknown" | "item_exchange" | "auction" | "courier" | "loan";
          /**
           * get_contracts_public_region_id_volume
           * Volume of items in the contract
           * @format double
           */
          volume?: number;
        }[],
        | void
        | BadRequest
        | {
            /**
             * get_contracts_public_region_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/contracts/public/${regionId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  corporation = {
    /**
     * @description Extraction timers for all moon chunks being extracted by refineries belonging to a corporation. --- Alternate route: `/dev/corporation/{corporation_id}/mining/extractions/` Alternate route: `/legacy/corporation/{corporation_id}/mining/extractions/` Alternate route: `/v1/corporation/{corporation_id}/mining/extractions/` --- This route is cached for up to 1800 seconds --- Requires one of the following EVE corporation role(s): Station_Manager
     *
     * @tags Industry
     * @name GetCorporationCorporationIdMiningExtractions
     * @summary Moon extraction timers
     * @request GET:/corporation/{corporation_id}/mining/extractions/
     * @secure
     */
    getCorporationCorporationIdMiningExtractions: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporation_corporation_id_mining_extractions_chunk_arrival_time
           * The time at which the chunk being extracted will arrive and can be fractured by the moon mining drill.
           * @format date-time
           */
          chunk_arrival_time: string;
          /**
           * get_corporation_corporation_id_mining_extractions_extraction_start_time
           * The time at which the current extraction was initiated.
           * @format date-time
           */
          extraction_start_time: string;
          /**
           * get_corporation_corporation_id_mining_extractions_moon_id
           * moon_id integer
           * @format int32
           */
          moon_id: number;
          /**
           * get_corporation_corporation_id_mining_extractions_natural_decay_time
           * The time at which the chunk being extracted will naturally fracture if it is not first fractured by the moon mining drill.
           * @format date-time
           */
          natural_decay_time: string;
          /**
           * get_corporation_corporation_id_mining_extractions_structure_id
           * structure_id integer
           * @format int64
           */
          structure_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporation/${corporationId}/mining/extractions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Paginated list of all entities capable of observing and recording mining for a corporation --- Alternate route: `/dev/corporation/{corporation_id}/mining/observers/` Alternate route: `/legacy/corporation/{corporation_id}/mining/observers/` Alternate route: `/v1/corporation/{corporation_id}/mining/observers/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Accountant
     *
     * @tags Industry
     * @name GetCorporationCorporationIdMiningObservers
     * @summary Corporation mining observers
     * @request GET:/corporation/{corporation_id}/mining/observers/
     * @secure
     */
    getCorporationCorporationIdMiningObservers: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporation_corporation_id_mining_observers_last_updated
           * last_updated string
           * @format date
           */
          last_updated: string;
          /**
           * get_corporation_corporation_id_mining_observers_observer_id
           * The entity that was observing the asteroid field when it was mined.
           * @format int64
           */
          observer_id: number;
          /**
           * get_corporation_corporation_id_mining_observers_observer_type
           * The category of the observing entity
           */
          observer_type: "structure";
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporation/${corporationId}/mining/observers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Paginated record of all mining seen by an observer --- Alternate route: `/dev/corporation/{corporation_id}/mining/observers/{observer_id}/` Alternate route: `/legacy/corporation/{corporation_id}/mining/observers/{observer_id}/` Alternate route: `/v1/corporation/{corporation_id}/mining/observers/{observer_id}/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Accountant
     *
     * @tags Industry
     * @name GetCorporationCorporationIdMiningObserversObserverId
     * @summary Observed corporation mining
     * @request GET:/corporation/{corporation_id}/mining/observers/{observer_id}/
     * @secure
     */
    getCorporationCorporationIdMiningObserversObserverId: (
      corporationId: number,
      observerId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporation_corporation_id_mining_observers_observer_id_character_id
           * The character that did the mining
           * @format int32
           */
          character_id: number;
          /**
           * get_corporation_corporation_id_mining_observers_observer_id_last_updated
           * last_updated string
           * @format date
           */
          last_updated: string;
          /**
           * get_corporation_corporation_id_mining_observers_observer_id_quantity
           * quantity integer
           * @format int64
           */
          quantity: number;
          /**
           * get_corporation_corporation_id_mining_observers_observer_id_recorded_corporation_id
           * The corporation id of the character at the time data was recorded.
           * @format int32
           */
          recorded_corporation_id: number;
          /**
           * get_corporation_corporation_id_mining_observers_observer_id_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporation/${corporationId}/mining/observers/${observerId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  corporations = {
    /**
     * @description Get a list of npc corporations --- Alternate route: `/dev/corporations/npccorps/` Alternate route: `/v2/corporations/npccorps/` --- This route expires daily at 11:05
     *
     * @tags Corporation
     * @name GetCorporationsNpccorps
     * @summary Get npc corporations
     * @request GET:/corporations/npccorps/
     */
    getCorporationsNpccorps: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/corporations/npccorps/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Public information about a corporation --- Alternate route: `/dev/corporations/{corporation_id}/` Alternate route: `/v5/corporations/{corporation_id}/` --- This route is cached for up to 3600 seconds
     *
     * @tags Corporation
     * @name GetCorporationsCorporationId
     * @summary Get corporation information
     * @request GET:/corporations/{corporation_id}/
     */
    getCorporationsCorporationId: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_alliance_id
           * ID of the alliance that corporation is a member of, if any
           * @format int32
           */
          alliance_id?: number;
          /**
           * get_corporations_corporation_id_ceo_id
           * ceo_id integer
           * @format int32
           */
          ceo_id: number;
          /**
           * get_corporations_corporation_id_creator_id
           * creator_id integer
           * @format int32
           */
          creator_id: number;
          /**
           * get_corporations_corporation_id_date_founded
           * date_founded string
           * @format date-time
           */
          date_founded?: string;
          /**
           * get_corporations_corporation_id_description
           * description string
           */
          description?: string;
          /**
           * get_corporations_corporation_id_faction_id
           * faction_id integer
           * @format int32
           */
          faction_id?: number;
          /**
           * get_corporations_corporation_id_home_station_id
           * home_station_id integer
           * @format int32
           */
          home_station_id?: number;
          /**
           * get_corporations_corporation_id_member_count
           * member_count integer
           * @format int32
           */
          member_count: number;
          /**
           * get_corporations_corporation_id_name
           * the full name of the corporation
           */
          name: string;
          /**
           * get_corporations_corporation_id_shares
           * shares integer
           * @format int64
           */
          shares?: number;
          /**
           * get_corporations_corporation_id_tax_rate
           * tax_rate number
           * @format float
           * @min 0
           * @max 1
           */
          tax_rate: number;
          /**
           * get_corporations_corporation_id_ticker
           * the short name of the corporation
           */
          ticker: string;
          /**
           * get_corporations_corporation_id_url
           * url string
           */
          url?: string;
          /**
           * get_corporations_corporation_id_war_eligible
           * war_eligible boolean
           */
          war_eligible?: boolean;
        },
        | void
        | BadRequest
        | {
            /**
             * get_corporations_corporation_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of all the alliances a corporation has been a member of --- Alternate route: `/dev/corporations/{corporation_id}/alliancehistory/` Alternate route: `/v3/corporations/{corporation_id}/alliancehistory/` --- This route is cached for up to 3600 seconds
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdAlliancehistory
     * @summary Get alliance history
     * @request GET:/corporations/{corporation_id}/alliancehistory/
     */
    getCorporationsCorporationIdAlliancehistory: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_alliancehistory_alliance_id
           * alliance_id integer
           * @format int32
           */
          alliance_id?: number;
          /**
           * get_corporations_corporation_id_alliancehistory_is_deleted
           * True if the alliance has been closed
           */
          is_deleted?: boolean;
          /**
           * get_corporations_corporation_id_alliancehistory_record_id
           * An incrementing ID that can be used to canonically establish order of records in cases where dates may be ambiguous
           * @format int32
           */
          record_id: number;
          /**
           * get_corporations_corporation_id_alliancehistory_start_date
           * start_date string
           * @format date-time
           */
          start_date: string;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/alliancehistory/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of the corporation assets --- Alternate route: `/dev/corporations/{corporation_id}/assets/` Alternate route: `/v5/corporations/{corporation_id}/assets/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Assets
     * @name GetCorporationsCorporationIdAssets
     * @summary Get corporation assets
     * @request GET:/corporations/{corporation_id}/assets/
     * @secure
     */
    getCorporationsCorporationIdAssets: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_assets_is_blueprint_copy
           * is_blueprint_copy boolean
           */
          is_blueprint_copy?: boolean;
          /**
           * get_corporations_corporation_id_assets_is_singleton
           * is_singleton boolean
           */
          is_singleton: boolean;
          /**
           * get_corporations_corporation_id_assets_item_id
           * item_id integer
           * @format int64
           */
          item_id: number;
          /**
           * get_corporations_corporation_id_assets_location_flag
           * location_flag string
           */
          location_flag:
            | "AssetSafety"
            | "AutoFit"
            | "Bonus"
            | "Booster"
            | "BoosterBay"
            | "Capsule"
            | "Cargo"
            | "CorpDeliveries"
            | "CorpSAG1"
            | "CorpSAG2"
            | "CorpSAG3"
            | "CorpSAG4"
            | "CorpSAG5"
            | "CorpSAG6"
            | "CorpSAG7"
            | "CrateLoot"
            | "Deliveries"
            | "DroneBay"
            | "DustBattle"
            | "DustDatabank"
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
           * get_corporations_corporation_id_assets_location_id
           * location_id integer
           * @format int64
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_assets_location_type
           * location_type string
           */
          location_type: "station" | "solar_system" | "item" | "other";
          /**
           * get_corporations_corporation_id_assets_quantity
           * quantity integer
           * @format int32
           */
          quantity: number;
          /**
           * get_corporations_corporation_id_assets_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/assets/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return locations for a set of item ids, which you can get from corporation assets endpoint. Coordinates for items in hangars or stations are set to (0,0,0) --- Alternate route: `/dev/corporations/{corporation_id}/assets/locations/` Alternate route: `/v2/corporations/{corporation_id}/assets/locations/` --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Assets
     * @name PostCorporationsCorporationIdAssetsLocations
     * @summary Get corporation asset locations
     * @request POST:/corporations/{corporation_id}/assets/locations/
     * @secure
     */
    postCorporationsCorporationIdAssetsLocations: (
      corporationId: number,
      item_ids: number[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_corporations_corporation_id_assets_locations_item_id
           * item_id integer
           * @format int64
           */
          item_id: number;
          /**
           * post_corporations_corporation_id_assets_locations_position
           * position object
           */
          position: {
            /**
             * post_corporations_corporation_id_assets_locations_x
             * x number
             * @format double
             */
            x: number;
            /**
             * post_corporations_corporation_id_assets_locations_y
             * y number
             * @format double
             */
            y: number;
            /**
             * post_corporations_corporation_id_assets_locations_z
             * z number
             * @format double
             */
            z: number;
          };
        }[],
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * post_corporations_corporation_id_assets_locations_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/assets/locations/`,
        method: "POST",
        query: query,
        body: item_ids,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Return names for a set of item ids, which you can get from corporation assets endpoint. Only valid for items that can customize names, like containers or ships --- Alternate route: `/dev/corporations/{corporation_id}/assets/names/` Alternate route: `/legacy/corporations/{corporation_id}/assets/names/` Alternate route: `/v1/corporations/{corporation_id}/assets/names/` --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Assets
     * @name PostCorporationsCorporationIdAssetsNames
     * @summary Get corporation asset names
     * @request POST:/corporations/{corporation_id}/assets/names/
     * @secure
     */
    postCorporationsCorporationIdAssetsNames: (
      corporationId: number,
      item_ids: number[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_corporations_corporation_id_assets_names_item_id
           * item_id integer
           * @format int64
           */
          item_id: number;
          /**
           * post_corporations_corporation_id_assets_names_name
           * name string
           */
          name: string;
        }[],
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * post_corporations_corporation_id_assets_names_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/assets/names/`,
        method: "POST",
        query: query,
        body: item_ids,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of blueprints the corporation owns --- Alternate route: `/dev/corporations/{corporation_id}/blueprints/` Alternate route: `/v3/corporations/{corporation_id}/blueprints/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdBlueprints
     * @summary Get corporation blueprints
     * @request GET:/corporations/{corporation_id}/blueprints/
     * @secure
     */
    getCorporationsCorporationIdBlueprints: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_blueprints_item_id
           * Unique ID for this item.
           * @format int64
           */
          item_id: number;
          /**
           * get_corporations_corporation_id_blueprints_location_flag
           * Type of the location_id
           */
          location_flag:
            | "AssetSafety"
            | "AutoFit"
            | "Bonus"
            | "Booster"
            | "BoosterBay"
            | "Capsule"
            | "Cargo"
            | "CorpDeliveries"
            | "CorpSAG1"
            | "CorpSAG2"
            | "CorpSAG3"
            | "CorpSAG4"
            | "CorpSAG5"
            | "CorpSAG6"
            | "CorpSAG7"
            | "CrateLoot"
            | "Deliveries"
            | "DroneBay"
            | "DustBattle"
            | "DustDatabank"
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
            | "SpecializedCommandCenterHold"
            | "SpecializedFuelBay"
            | "SpecializedGasHold"
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
           * get_corporations_corporation_id_blueprints_location_id
           * References a station, a ship or an item_id if this blueprint is located within a container.
           * @format int64
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_blueprints_material_efficiency
           * Material Efficiency Level of the blueprint.
           * @format int32
           * @min 0
           * @max 25
           */
          material_efficiency: number;
          /**
           * get_corporations_corporation_id_blueprints_quantity
           * A range of numbers with a minimum of -2 and no maximum value where -1 is an original and -2 is a copy. It can be a positive integer if it is a stack of blueprint originals fresh from the market (e.g. no activities performed on them yet).
           * @format int32
           * @min -2
           */
          quantity: number;
          /**
           * get_corporations_corporation_id_blueprints_runs
           * Number of runs remaining if the blueprint is a copy, -1 if it is an original.
           * @format int32
           * @min -1
           */
          runs: number;
          /**
           * get_corporations_corporation_id_blueprints_time_efficiency
           * Time Efficiency Level of the blueprint.
           * @format int32
           * @min 0
           * @max 20
           */
          time_efficiency: number;
          /**
           * get_corporations_corporation_id_blueprints_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/blueprints/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A list of your corporation's bookmarks --- Alternate route: `/dev/corporations/{corporation_id}/bookmarks/` Alternate route: `/legacy/corporations/{corporation_id}/bookmarks/` Alternate route: `/v1/corporations/{corporation_id}/bookmarks/` --- This route is cached for up to 3600 seconds
     *
     * @tags Bookmarks
     * @name GetCorporationsCorporationIdBookmarks
     * @summary List corporation bookmarks
     * @request GET:/corporations/{corporation_id}/bookmarks/
     * @secure
     */
    getCorporationsCorporationIdBookmarks: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_bookmarks_bookmark_id
           * bookmark_id integer
           * @format int32
           */
          bookmark_id: number;
          /**
           * get_corporations_corporation_id_bookmarks_coordinates
           * Optional object that is returned if a bookmark was made on a planet or a random location in space.
           */
          coordinates?: {
            /**
             * get_corporations_corporation_id_bookmarks_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_corporations_corporation_id_bookmarks_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_corporations_corporation_id_bookmarks_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_corporations_corporation_id_bookmarks_created
           * created string
           * @format date-time
           */
          created: string;
          /**
           * get_corporations_corporation_id_bookmarks_creator_id
           * creator_id integer
           * @format int32
           */
          creator_id: number;
          /**
           * get_corporations_corporation_id_bookmarks_folder_id
           * folder_id integer
           * @format int32
           */
          folder_id?: number;
          /**
           * get_corporations_corporation_id_bookmarks_item
           * Optional object that is returned if a bookmark was made on a particular item.
           */
          item?: {
            /**
             * get_corporations_corporation_id_bookmarks_item_id
             * item_id integer
             * @format int64
             */
            item_id: number;
            /**
             * get_corporations_corporation_id_bookmarks_type_id
             * type_id integer
             * @format int32
             */
            type_id: number;
          };
          /**
           * get_corporations_corporation_id_bookmarks_label
           * label string
           */
          label: string;
          /**
           * get_corporations_corporation_id_bookmarks_location_id
           * location_id integer
           * @format int32
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_bookmarks_notes
           * notes string
           */
          notes: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/bookmarks/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A list of your corporation's bookmark folders --- Alternate route: `/dev/corporations/{corporation_id}/bookmarks/folders/` Alternate route: `/legacy/corporations/{corporation_id}/bookmarks/folders/` Alternate route: `/v1/corporations/{corporation_id}/bookmarks/folders/` --- This route is cached for up to 3600 seconds
     *
     * @tags Bookmarks
     * @name GetCorporationsCorporationIdBookmarksFolders
     * @summary List corporation bookmark folders
     * @request GET:/corporations/{corporation_id}/bookmarks/folders/
     * @secure
     */
    getCorporationsCorporationIdBookmarksFolders: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_bookmarks_folders_creator_id
           * creator_id integer
           * @format int32
           */
          creator_id?: number;
          /**
           * get_corporations_corporation_id_bookmarks_folders_folder_id
           * folder_id integer
           * @format int32
           */
          folder_id: number;
          /**
           * get_corporations_corporation_id_bookmarks_folders_name
           * name string
           */
          name: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/bookmarks/folders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return contacts of a corporation --- Alternate route: `/dev/corporations/{corporation_id}/contacts/` Alternate route: `/v2/corporations/{corporation_id}/contacts/` --- This route is cached for up to 300 seconds
     *
     * @tags Contacts
     * @name GetCorporationsCorporationIdContacts
     * @summary Get corporation contacts
     * @request GET:/corporations/{corporation_id}/contacts/
     * @secure
     */
    getCorporationsCorporationIdContacts: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_contacts_contact_id
           * contact_id integer
           * @format int32
           */
          contact_id: number;
          /**
           * get_corporations_corporation_id_contacts_contact_type
           * contact_type string
           */
          contact_type: "character" | "corporation" | "alliance" | "faction";
          /**
           * get_corporations_corporation_id_contacts_is_watched
           * Whether this contact is being watched
           */
          is_watched?: boolean;
          /**
           * get_corporations_corporation_id_contacts_label_ids
           * label_ids array
           * @maxItems 63
           */
          label_ids?: number[];
          /**
           * get_corporations_corporation_id_contacts_standing
           * Standing of the contact
           * @format float
           */
          standing: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/contacts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return custom labels for a corporation's contacts --- Alternate route: `/dev/corporations/{corporation_id}/contacts/labels/` Alternate route: `/legacy/corporations/{corporation_id}/contacts/labels/` Alternate route: `/v1/corporations/{corporation_id}/contacts/labels/` --- This route is cached for up to 300 seconds
     *
     * @tags Contacts
     * @name GetCorporationsCorporationIdContactsLabels
     * @summary Get corporation contact labels
     * @request GET:/corporations/{corporation_id}/contacts/labels/
     * @secure
     */
    getCorporationsCorporationIdContactsLabels: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_contacts_labels_label_id
           * label_id integer
           * @format int64
           */
          label_id: number;
          /**
           * get_corporations_corporation_id_contacts_labels_label_name
           * label_name string
           */
          label_name: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/contacts/labels/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns logs recorded in the past seven days from all audit log secure containers (ALSC) owned by a given corporation --- Alternate route: `/dev/corporations/{corporation_id}/containers/logs/` Alternate route: `/v3/corporations/{corporation_id}/containers/logs/` --- This route is cached for up to 600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdContainersLogs
     * @summary Get all corporation ALSC logs
     * @request GET:/corporations/{corporation_id}/containers/logs/
     * @secure
     */
    getCorporationsCorporationIdContainersLogs: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_containers_logs_action
           * action string
           */
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
           * get_corporations_corporation_id_containers_logs_character_id
           * ID of the character who performed the action.
           * @format int32
           */
          character_id: number;
          /**
           * get_corporations_corporation_id_containers_logs_container_id
           * ID of the container
           * @format int64
           */
          container_id: number;
          /**
           * get_corporations_corporation_id_containers_logs_container_type_id
           * Type ID of the container
           * @format int32
           */
          container_type_id: number;
          /**
           * get_corporations_corporation_id_containers_logs_location_flag
           * location_flag string
           */
          location_flag:
            | "AssetSafety"
            | "AutoFit"
            | "Bonus"
            | "Booster"
            | "BoosterBay"
            | "Capsule"
            | "Cargo"
            | "CorpDeliveries"
            | "CorpSAG1"
            | "CorpSAG2"
            | "CorpSAG3"
            | "CorpSAG4"
            | "CorpSAG5"
            | "CorpSAG6"
            | "CorpSAG7"
            | "CrateLoot"
            | "Deliveries"
            | "DroneBay"
            | "DustBattle"
            | "DustDatabank"
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
            | "SpecializedCommandCenterHold"
            | "SpecializedFuelBay"
            | "SpecializedGasHold"
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
           * get_corporations_corporation_id_containers_logs_location_id
           * location_id integer
           * @format int64
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_containers_logs_logged_at
           * Timestamp when this log was created
           * @format date-time
           */
          logged_at: string;
          /**
           * get_corporations_corporation_id_containers_logs_new_config_bitmask
           * new_config_bitmask integer
           * @format int32
           */
          new_config_bitmask?: number;
          /**
           * get_corporations_corporation_id_containers_logs_old_config_bitmask
           * old_config_bitmask integer
           * @format int32
           */
          old_config_bitmask?: number;
          /**
           * get_corporations_corporation_id_containers_logs_password_type
           * Type of password set if action is of type SetPassword or EnterPassword
           */
          password_type?: "config" | "general";
          /**
           * get_corporations_corporation_id_containers_logs_quantity
           * Quantity of the item being acted upon
           * @format int32
           */
          quantity?: number;
          /**
           * get_corporations_corporation_id_containers_logs_type_id
           * Type ID of the item being acted upon
           * @format int32
           */
          type_id?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/containers/logs/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns contracts available to a corporation, only if the corporation is issuer, acceptor or assignee. Only returns contracts no older than 30 days, or if the status is "in_progress". --- Alternate route: `/dev/corporations/{corporation_id}/contracts/` Alternate route: `/legacy/corporations/{corporation_id}/contracts/` Alternate route: `/v1/corporations/{corporation_id}/contracts/` --- This route is cached for up to 300 seconds
     *
     * @tags Contracts
     * @name GetCorporationsCorporationIdContracts
     * @summary Get corporation contracts
     * @request GET:/corporations/{corporation_id}/contracts/
     * @secure
     */
    getCorporationsCorporationIdContracts: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_contracts_acceptor_id
           * Who will accept the contract
           * @format int32
           */
          acceptor_id: number;
          /**
           * get_corporations_corporation_id_contracts_assignee_id
           * ID to whom the contract is assigned, can be corporation or character ID
           * @format int32
           */
          assignee_id: number;
          /**
           * get_corporations_corporation_id_contracts_availability
           * To whom the contract is available
           */
          availability: "public" | "personal" | "corporation" | "alliance";
          /**
           * get_corporations_corporation_id_contracts_buyout
           * Buyout price (for Auctions only)
           * @format double
           */
          buyout?: number;
          /**
           * get_corporations_corporation_id_contracts_collateral
           * Collateral price (for Couriers only)
           * @format double
           */
          collateral?: number;
          /**
           * get_corporations_corporation_id_contracts_contract_id
           * contract_id integer
           * @format int32
           */
          contract_id: number;
          /**
           * get_corporations_corporation_id_contracts_date_accepted
           * Date of confirmation of contract
           * @format date-time
           */
          date_accepted?: string;
          /**
           * get_corporations_corporation_id_contracts_date_completed
           * Date of completed of contract
           * @format date-time
           */
          date_completed?: string;
          /**
           * get_corporations_corporation_id_contracts_date_expired
           * Expiration date of the contract
           * @format date-time
           */
          date_expired: string;
          /**
           * get_corporations_corporation_id_contracts_date_issued
           * Сreation date of the contract
           * @format date-time
           */
          date_issued: string;
          /**
           * get_corporations_corporation_id_contracts_days_to_complete
           * Number of days to perform the contract
           * @format int32
           */
          days_to_complete?: number;
          /**
           * get_corporations_corporation_id_contracts_end_location_id
           * End location ID (for Couriers contract)
           * @format int64
           */
          end_location_id?: number;
          /**
           * get_corporations_corporation_id_contracts_for_corporation
           * true if the contract was issued on behalf of the issuer's corporation
           */
          for_corporation: boolean;
          /**
           * get_corporations_corporation_id_contracts_issuer_corporation_id
           * Character's corporation ID for the issuer
           * @format int32
           */
          issuer_corporation_id: number;
          /**
           * get_corporations_corporation_id_contracts_issuer_id
           * Character ID for the issuer
           * @format int32
           */
          issuer_id: number;
          /**
           * get_corporations_corporation_id_contracts_price
           * Price of contract (for ItemsExchange and Auctions)
           * @format double
           */
          price?: number;
          /**
           * get_corporations_corporation_id_contracts_reward
           * Remuneration for contract (for Couriers only)
           * @format double
           */
          reward?: number;
          /**
           * get_corporations_corporation_id_contracts_start_location_id
           * Start location ID (for Couriers contract)
           * @format int64
           */
          start_location_id?: number;
          /**
           * get_corporations_corporation_id_contracts_status
           * Status of the the contract
           */
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
          /**
           * get_corporations_corporation_id_contracts_title
           * Title of the contract
           */
          title?: string;
          /**
           * get_corporations_corporation_id_contracts_type
           * Type of the contract
           */
          type: "unknown" | "item_exchange" | "auction" | "courier" | "loan";
          /**
           * get_corporations_corporation_id_contracts_volume
           * Volume of items in the contract
           * @format double
           */
          volume?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/contracts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists bids on a particular auction contract --- Alternate route: `/dev/corporations/{corporation_id}/contracts/{contract_id}/bids/` Alternate route: `/legacy/corporations/{corporation_id}/contracts/{contract_id}/bids/` Alternate route: `/v1/corporations/{corporation_id}/contracts/{contract_id}/bids/` --- This route is cached for up to 3600 seconds
     *
     * @tags Contracts
     * @name GetCorporationsCorporationIdContractsContractIdBids
     * @summary Get corporation contract bids
     * @request GET:/corporations/{corporation_id}/contracts/{contract_id}/bids/
     * @secure
     */
    getCorporationsCorporationIdContractsContractIdBids: (
      contractId: number,
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_contracts_contract_id_bids_amount
           * The amount bid, in ISK
           * @format float
           */
          amount: number;
          /**
           * get_corporations_corporation_id_contracts_contract_id_bids_bid_id
           * Unique ID for the bid
           * @format int32
           */
          bid_id: number;
          /**
           * get_corporations_corporation_id_contracts_contract_id_bids_bidder_id
           * Character ID of the bidder
           * @format int32
           */
          bidder_id: number;
          /**
           * get_corporations_corporation_id_contracts_contract_id_bids_date_bid
           * Datetime when the bid was placed
           * @format date-time
           */
          date_bid: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_corporations_corporation_id_contracts_contract_id_bids_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/contracts/${contractId}/bids/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists items of a particular contract --- Alternate route: `/dev/corporations/{corporation_id}/contracts/{contract_id}/items/` Alternate route: `/legacy/corporations/{corporation_id}/contracts/{contract_id}/items/` Alternate route: `/v1/corporations/{corporation_id}/contracts/{contract_id}/items/` --- This route is cached for up to 3600 seconds
     *
     * @tags Contracts
     * @name GetCorporationsCorporationIdContractsContractIdItems
     * @summary Get corporation contract items
     * @request GET:/corporations/{corporation_id}/contracts/{contract_id}/items/
     * @secure
     */
    getCorporationsCorporationIdContractsContractIdItems: (
      contractId: number,
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_contracts_contract_id_items_is_included
           * true if the contract issuer has submitted this item with the contract, false if the isser is asking for this item in the contract
           */
          is_included: boolean;
          /**
           * get_corporations_corporation_id_contracts_contract_id_items_is_singleton
           * is_singleton boolean
           */
          is_singleton: boolean;
          /**
           * get_corporations_corporation_id_contracts_contract_id_items_quantity
           * Number of items in the stack
           * @format int32
           */
          quantity: number;
          /**
           * get_corporations_corporation_id_contracts_contract_id_items_raw_quantity
           * -1 indicates that the item is a singleton (non-stackable). If the item happens to be a Blueprint, -1 is an Original and -2 is a Blueprint Copy
           * @format int32
           */
          raw_quantity?: number;
          /**
           * get_corporations_corporation_id_contracts_contract_id_items_record_id
           * Unique ID for the item
           * @format int64
           */
          record_id: number;
          /**
           * get_corporations_corporation_id_contracts_contract_id_items_type_id
           * Type ID for item
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_corporations_corporation_id_contracts_contract_id_items_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
        | {
            /**
             * get_corporations_corporation_id_contracts_contract_id_items_520_error_520
             * Error 520 message
             */
            error?: string;
          }
      >({
        path: `/corporations/${corporationId}/contracts/${contractId}/items/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List customs offices owned by a corporation --- Alternate route: `/dev/corporations/{corporation_id}/customs_offices/` Alternate route: `/legacy/corporations/{corporation_id}/customs_offices/` Alternate route: `/v1/corporations/{corporation_id}/customs_offices/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Planetary Interaction
     * @name GetCorporationsCorporationIdCustomsOffices
     * @summary List corporation customs offices
     * @request GET:/corporations/{corporation_id}/customs_offices/
     * @secure
     */
    getCorporationsCorporationIdCustomsOffices: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_customs_offices_alliance_tax_rate
           * Only present if alliance access is allowed
           * @format float
           */
          alliance_tax_rate?: number;
          /**
           * get_corporations_corporation_id_customs_offices_allow_access_with_standings
           * standing_level and any standing related tax rate only present when this is true
           */
          allow_access_with_standings: boolean;
          /**
           * get_corporations_corporation_id_customs_offices_allow_alliance_access
           * allow_alliance_access boolean
           */
          allow_alliance_access: boolean;
          /**
           * get_corporations_corporation_id_customs_offices_bad_standing_tax_rate
           * bad_standing_tax_rate number
           * @format float
           */
          bad_standing_tax_rate?: number;
          /**
           * get_corporations_corporation_id_customs_offices_corporation_tax_rate
           * corporation_tax_rate number
           * @format float
           */
          corporation_tax_rate?: number;
          /**
           * get_corporations_corporation_id_customs_offices_excellent_standing_tax_rate
           * Tax rate for entities with excellent level of standing, only present if this level is allowed, same for all other standing related tax rates
           * @format float
           */
          excellent_standing_tax_rate?: number;
          /**
           * get_corporations_corporation_id_customs_offices_good_standing_tax_rate
           * good_standing_tax_rate number
           * @format float
           */
          good_standing_tax_rate?: number;
          /**
           * get_corporations_corporation_id_customs_offices_neutral_standing_tax_rate
           * neutral_standing_tax_rate number
           * @format float
           */
          neutral_standing_tax_rate?: number;
          /**
           * get_corporations_corporation_id_customs_offices_office_id
           * unique ID of this customs office
           * @format int64
           */
          office_id: number;
          /**
           * get_corporations_corporation_id_customs_offices_reinforce_exit_end
           * reinforce_exit_end integer
           * @format int32
           * @min 0
           * @max 23
           */
          reinforce_exit_end: number;
          /**
           * get_corporations_corporation_id_customs_offices_reinforce_exit_start
           * Together with reinforce_exit_end, marks a 2-hour period where this customs office could exit reinforcement mode during the day after initial attack
           * @format int32
           * @min 0
           * @max 23
           */
          reinforce_exit_start: number;
          /**
           * get_corporations_corporation_id_customs_offices_standing_level
           * Access is allowed only for entities with this level of standing or better
           */
          standing_level?: "bad" | "excellent" | "good" | "neutral" | "terrible";
          /**
           * get_corporations_corporation_id_customs_offices_system_id
           * ID of the solar system this customs office is located in
           * @format int32
           */
          system_id: number;
          /**
           * get_corporations_corporation_id_customs_offices_terrible_standing_tax_rate
           * terrible_standing_tax_rate number
           * @format float
           */
          terrible_standing_tax_rate?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/customs_offices/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return corporation hangar and wallet division names, only show if a division is not using the default name --- Alternate route: `/dev/corporations/{corporation_id}/divisions/` Alternate route: `/v2/corporations/{corporation_id}/divisions/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdDivisions
     * @summary Get corporation divisions
     * @request GET:/corporations/{corporation_id}/divisions/
     * @secure
     */
    getCorporationsCorporationIdDivisions: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_divisions_hangar
           * hangar array
           * @maxItems 7
           */
          hangar?: {
            /**
             * get_corporations_corporation_id_divisions_division
             * division integer
             * @format int32
             * @min 1
             * @max 7
             */
            division?: number;
            /**
             * get_corporations_corporation_id_divisions_name
             * name string
             * @maxLength 50
             */
            name?: string;
          }[];
          /**
           * get_corporations_corporation_id_divisions_wallet
           * wallet array
           * @maxItems 7
           */
          wallet?: {
            /**
             * get_corporations_corporation_id_divisions_wallet_division
             * division integer
             * @format int32
             * @min 1
             * @max 7
             */
            division?: number;
            /**
             * get_corporations_corporation_id_divisions_wallet_name
             * name string
             * @maxLength 50
             */
            name?: string;
          }[];
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/divisions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a corporation's facilities --- Alternate route: `/dev/corporations/{corporation_id}/facilities/` Alternate route: `/v2/corporations/{corporation_id}/facilities/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Factory_Manager
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdFacilities
     * @summary Get corporation facilities
     * @request GET:/corporations/{corporation_id}/facilities/
     * @secure
     */
    getCorporationsCorporationIdFacilities: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_facilities_facility_id
           * facility_id integer
           * @format int64
           */
          facility_id: number;
          /**
           * get_corporations_corporation_id_facilities_system_id
           * system_id integer
           * @format int32
           */
          system_id: number;
          /**
           * get_corporations_corporation_id_facilities_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/facilities/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Statistics about a corporation involved in faction warfare --- Alternate route: `/dev/corporations/{corporation_id}/fw/stats/` Alternate route: `/legacy/corporations/{corporation_id}/fw/stats/` Alternate route: `/v1/corporations/{corporation_id}/fw/stats/` Alternate route: `/v2/corporations/{corporation_id}/fw/stats/` --- This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetCorporationsCorporationIdFwStats
     * @summary Overview of a corporation involved in faction warfare
     * @request GET:/corporations/{corporation_id}/fw/stats/
     * @secure
     */
    getCorporationsCorporationIdFwStats: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_fw_stats_enlisted_on
           * The enlistment date of the given corporation into faction warfare. Will not be included if corporation is not enlisted in faction warfare
           * @format date-time
           */
          enlisted_on?: string;
          /**
           * get_corporations_corporation_id_fw_stats_faction_id
           * The faction the given corporation is enlisted to fight for. Will not be included if corporation is not enlisted in faction warfare
           * @format int32
           */
          faction_id?: number;
          /**
           * get_corporations_corporation_id_fw_stats_kills
           * Summary of kills done by the given corporation against enemy factions
           */
          kills: {
            /**
             * get_corporations_corporation_id_fw_stats_last_week
             * Last week's total number of kills by members of the given corporation against enemy factions
             * @format int32
             */
            last_week: number;
            /**
             * get_corporations_corporation_id_fw_stats_total
             * Total number of kills by members of the given corporation against enemy factions since the corporation enlisted
             * @format int32
             */
            total: number;
            /**
             * get_corporations_corporation_id_fw_stats_yesterday
             * Yesterday's total number of kills by members of the given corporation against enemy factions
             * @format int32
             */
            yesterday: number;
          };
          /**
           * get_corporations_corporation_id_fw_stats_pilots
           * How many pilots the enlisted corporation has. Will not be included if corporation is not enlisted in faction warfare
           * @format int32
           */
          pilots?: number;
          /**
           * get_corporations_corporation_id_fw_stats_victory_points
           * Summary of victory points gained by the given corporation for the enlisted faction
           */
          victory_points: {
            /**
             * get_corporations_corporation_id_fw_stats_victory_points_last_week
             * Last week's victory points gained by members of the given corporation
             * @format int32
             */
            last_week: number;
            /**
             * get_corporations_corporation_id_fw_stats_victory_points_total
             * Total victory points gained since the given corporation enlisted
             * @format int32
             */
            total: number;
            /**
             * get_corporations_corporation_id_fw_stats_victory_points_yesterday
             * Yesterday's victory points gained by members of the given corporation
             * @format int32
             */
            yesterday: number;
          };
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/fw/stats/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the icon urls for a corporation --- Alternate route: `/dev/corporations/{corporation_id}/icons/` Alternate route: `/v2/corporations/{corporation_id}/icons/` --- This route is cached for up to 3600 seconds
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdIcons
     * @summary Get corporation icon
     * @request GET:/corporations/{corporation_id}/icons/
     */
    getCorporationsCorporationIdIcons: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_icons_px128x128
           * px128x128 string
           */
          px128x128?: string;
          /**
           * get_corporations_corporation_id_icons_px256x256
           * px256x256 string
           */
          px256x256?: string;
          /**
           * get_corporations_corporation_id_icons_px64x64
           * px64x64 string
           */
          px64x64?: string;
        },
        | void
        | BadRequest
        | {
            /**
             * get_corporations_corporation_id_icons_error
             * error message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/icons/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List industry jobs run by a corporation --- Alternate route: `/dev/corporations/{corporation_id}/industry/jobs/` Alternate route: `/legacy/corporations/{corporation_id}/industry/jobs/` Alternate route: `/v1/corporations/{corporation_id}/industry/jobs/` --- This route is cached for up to 300 seconds --- Requires one of the following EVE corporation role(s): Factory_Manager
     *
     * @tags Industry
     * @name GetCorporationsCorporationIdIndustryJobs
     * @summary List corporation industry jobs
     * @request GET:/corporations/{corporation_id}/industry/jobs/
     * @secure
     */
    getCorporationsCorporationIdIndustryJobs: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Whether to retrieve completed corporation industry jobs. Only includes jobs from the past 90 days
         * @default false
         */
        include_completed?: boolean;
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_industry_jobs_activity_id
           * Job activity ID
           * @format int32
           */
          activity_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_blueprint_id
           * blueprint_id integer
           * @format int64
           */
          blueprint_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_blueprint_location_id
           * Location ID of the location from which the blueprint was installed. Normally a station ID, but can also be an asset (e.g. container) or corporation facility
           * @format int64
           */
          blueprint_location_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_blueprint_type_id
           * blueprint_type_id integer
           * @format int32
           */
          blueprint_type_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_completed_character_id
           * ID of the character which completed this job
           * @format int32
           */
          completed_character_id?: number;
          /**
           * get_corporations_corporation_id_industry_jobs_completed_date
           * Date and time when this job was completed
           * @format date-time
           */
          completed_date?: string;
          /**
           * get_corporations_corporation_id_industry_jobs_cost
           * The sume of job installation fee and industry facility tax
           * @format double
           */
          cost?: number;
          /**
           * get_corporations_corporation_id_industry_jobs_duration
           * Job duration in seconds
           * @format int32
           */
          duration: number;
          /**
           * get_corporations_corporation_id_industry_jobs_end_date
           * Date and time when this job finished
           * @format date-time
           */
          end_date: string;
          /**
           * get_corporations_corporation_id_industry_jobs_facility_id
           * ID of the facility where this job is running
           * @format int64
           */
          facility_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_installer_id
           * ID of the character which installed this job
           * @format int32
           */
          installer_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_job_id
           * Unique job ID
           * @format int32
           */
          job_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_licensed_runs
           * Number of runs blueprint is licensed for
           * @format int32
           */
          licensed_runs?: number;
          /**
           * get_corporations_corporation_id_industry_jobs_location_id
           * ID of the location for the industry facility
           * @format int64
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_output_location_id
           * Location ID of the location to which the output of the job will be delivered. Normally a station ID, but can also be a corporation facility
           * @format int64
           */
          output_location_id: number;
          /**
           * get_corporations_corporation_id_industry_jobs_pause_date
           * Date and time when this job was paused (i.e. time when the facility where this job was installed went offline)
           * @format date-time
           */
          pause_date?: string;
          /**
           * get_corporations_corporation_id_industry_jobs_probability
           * Chance of success for invention
           * @format float
           */
          probability?: number;
          /**
           * get_corporations_corporation_id_industry_jobs_product_type_id
           * Type ID of product (manufactured, copied or invented)
           * @format int32
           */
          product_type_id?: number;
          /**
           * get_corporations_corporation_id_industry_jobs_runs
           * Number of runs for a manufacturing job, or number of copies to make for a blueprint copy
           * @format int32
           */
          runs: number;
          /**
           * get_corporations_corporation_id_industry_jobs_start_date
           * Date and time when this job started
           * @format date-time
           */
          start_date: string;
          /**
           * get_corporations_corporation_id_industry_jobs_status
           * status string
           */
          status: "active" | "cancelled" | "delivered" | "paused" | "ready" | "reverted";
          /**
           * get_corporations_corporation_id_industry_jobs_successful_runs
           * Number of successful runs for this job. Equal to runs unless this is an invention job
           * @format int32
           */
          successful_runs?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/industry/jobs/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of a corporation's kills and losses going back 90 days --- Alternate route: `/dev/corporations/{corporation_id}/killmails/recent/` Alternate route: `/legacy/corporations/{corporation_id}/killmails/recent/` Alternate route: `/v1/corporations/{corporation_id}/killmails/recent/` --- This route is cached for up to 300 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Killmails
     * @name GetCorporationsCorporationIdKillmailsRecent
     * @summary Get a corporation's recent kills and losses
     * @request GET:/corporations/{corporation_id}/killmails/recent/
     * @secure
     */
    getCorporationsCorporationIdKillmailsRecent: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_killmails_recent_killmail_hash
           * A hash of this killmail
           */
          killmail_hash: string;
          /**
           * get_corporations_corporation_id_killmails_recent_killmail_id
           * ID of this killmail
           * @format int32
           */
          killmail_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/killmails/recent/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a corporation's medals --- Alternate route: `/dev/corporations/{corporation_id}/medals/` Alternate route: `/v2/corporations/{corporation_id}/medals/` --- This route is cached for up to 3600 seconds
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMedals
     * @summary Get corporation medals
     * @request GET:/corporations/{corporation_id}/medals/
     * @secure
     */
    getCorporationsCorporationIdMedals: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_medals_created_at
           * created_at string
           * @format date-time
           */
          created_at: string;
          /**
           * get_corporations_corporation_id_medals_creator_id
           * ID of the character who created this medal
           * @format int32
           */
          creator_id: number;
          /**
           * get_corporations_corporation_id_medals_description
           * description string
           * @maxLength 1000
           */
          description: string;
          /**
           * get_corporations_corporation_id_medals_medal_id
           * medal_id integer
           * @format int32
           */
          medal_id: number;
          /**
           * get_corporations_corporation_id_medals_title
           * title string
           * @maxLength 100
           */
          title: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/medals/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns medals issued by a corporation --- Alternate route: `/dev/corporations/{corporation_id}/medals/issued/` Alternate route: `/v2/corporations/{corporation_id}/medals/issued/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMedalsIssued
     * @summary Get corporation issued medals
     * @request GET:/corporations/{corporation_id}/medals/issued/
     * @secure
     */
    getCorporationsCorporationIdMedalsIssued: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_medals_issued_character_id
           * ID of the character who was rewarded this medal
           * @format int32
           */
          character_id: number;
          /**
           * get_corporations_corporation_id_medals_issued_issued_at
           * issued_at string
           * @format date-time
           */
          issued_at: string;
          /**
           * get_corporations_corporation_id_medals_issued_issuer_id
           * ID of the character who issued the medal
           * @format int32
           */
          issuer_id: number;
          /**
           * get_corporations_corporation_id_medals_issued_medal_id
           * medal_id integer
           * @format int32
           */
          medal_id: number;
          /**
           * get_corporations_corporation_id_medals_issued_reason
           * reason string
           * @maxLength 1000
           */
          reason: string;
          /**
           * get_corporations_corporation_id_medals_issued_status
           * status string
           */
          status: "private" | "public";
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/medals/issued/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the current member list of a corporation, the token's character need to be a member of the corporation. --- Alternate route: `/dev/corporations/{corporation_id}/members/` Alternate route: `/v4/corporations/{corporation_id}/members/` --- This route is cached for up to 3600 seconds
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembers
     * @summary Get corporation members
     * @request GET:/corporations/{corporation_id}/members/
     * @secure
     */
    getCorporationsCorporationIdMembers: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/members/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a corporation's member limit, not including CEO himself --- Alternate route: `/dev/corporations/{corporation_id}/members/limit/` Alternate route: `/v2/corporations/{corporation_id}/members/limit/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembersLimit
     * @summary Get corporation member limit
     * @request GET:/corporations/{corporation_id}/members/limit/
     * @secure
     */
    getCorporationsCorporationIdMembersLimit: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number,
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/members/limit/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a corporation's members' titles --- Alternate route: `/dev/corporations/{corporation_id}/members/titles/` Alternate route: `/v2/corporations/{corporation_id}/members/titles/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembersTitles
     * @summary Get corporation's members' titles
     * @request GET:/corporations/{corporation_id}/members/titles/
     * @secure
     */
    getCorporationsCorporationIdMembersTitles: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_members_titles_character_id
           * character_id integer
           * @format int32
           */
          character_id: number;
          /**
           * get_corporations_corporation_id_members_titles_titles
           * A list of title_id
           * @maxItems 16
           */
          titles: number[];
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/members/titles/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns additional information about a corporation's members which helps tracking their activities --- Alternate route: `/dev/corporations/{corporation_id}/membertracking/` Alternate route: `/v2/corporations/{corporation_id}/membertracking/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdMembertracking
     * @summary Track corporation members
     * @request GET:/corporations/{corporation_id}/membertracking/
     * @secure
     */
    getCorporationsCorporationIdMembertracking: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_membertracking_base_id
           * base_id integer
           * @format int32
           */
          base_id?: number;
          /**
           * get_corporations_corporation_id_membertracking_character_id
           * character_id integer
           * @format int32
           */
          character_id: number;
          /**
           * get_corporations_corporation_id_membertracking_location_id
           * location_id integer
           * @format int64
           */
          location_id?: number;
          /**
           * get_corporations_corporation_id_membertracking_logoff_date
           * logoff_date string
           * @format date-time
           */
          logoff_date?: string;
          /**
           * get_corporations_corporation_id_membertracking_logon_date
           * logon_date string
           * @format date-time
           */
          logon_date?: string;
          /**
           * get_corporations_corporation_id_membertracking_ship_type_id
           * ship_type_id integer
           * @format int32
           */
          ship_type_id?: number;
          /**
           * get_corporations_corporation_id_membertracking_start_date
           * start_date string
           * @format date-time
           */
          start_date?: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/membertracking/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List open market orders placed on behalf of a corporation --- Alternate route: `/dev/corporations/{corporation_id}/orders/` Alternate route: `/v3/corporations/{corporation_id}/orders/` --- This route is cached for up to 1200 seconds --- Requires one of the following EVE corporation role(s): Accountant, Trader
     *
     * @tags Market
     * @name GetCorporationsCorporationIdOrders
     * @summary List open orders from a corporation
     * @request GET:/corporations/{corporation_id}/orders/
     * @secure
     */
    getCorporationsCorporationIdOrders: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_orders_duration
           * Number of days for which order is valid (starting from the issued date). An order expires at time issued + duration
           * @format int32
           */
          duration: number;
          /**
           * get_corporations_corporation_id_orders_escrow
           * For buy orders, the amount of ISK in escrow
           * @format double
           */
          escrow?: number;
          /**
           * get_corporations_corporation_id_orders_is_buy_order
           * True if the order is a bid (buy) order
           */
          is_buy_order?: boolean;
          /**
           * get_corporations_corporation_id_orders_issued
           * Date and time when this order was issued
           * @format date-time
           */
          issued: string;
          /**
           * get_corporations_corporation_id_orders_issued_by
           * The character who issued this order
           * @format int32
           */
          issued_by: number;
          /**
           * get_corporations_corporation_id_orders_location_id
           * ID of the location where order was placed
           * @format int64
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_orders_min_volume
           * For buy orders, the minimum quantity that will be accepted in a matching sell order
           * @format int32
           */
          min_volume?: number;
          /**
           * get_corporations_corporation_id_orders_order_id
           * Unique order ID
           * @format int64
           */
          order_id: number;
          /**
           * get_corporations_corporation_id_orders_price
           * Cost per unit for this order
           * @format double
           */
          price: number;
          /**
           * get_corporations_corporation_id_orders_range
           * Valid order range, numbers are ranges in jumps
           */
          range: "1" | "10" | "2" | "20" | "3" | "30" | "4" | "40" | "5" | "region" | "solarsystem" | "station";
          /**
           * get_corporations_corporation_id_orders_region_id
           * ID of the region where order was placed
           * @format int32
           */
          region_id: number;
          /**
           * get_corporations_corporation_id_orders_type_id
           * The type ID of the item transacted in this order
           * @format int32
           */
          type_id: number;
          /**
           * get_corporations_corporation_id_orders_volume_remain
           * Quantity of items still required or offered
           * @format int32
           */
          volume_remain: number;
          /**
           * get_corporations_corporation_id_orders_volume_total
           * Quantity of items required or offered at time order was placed
           * @format int32
           */
          volume_total: number;
          /**
           * get_corporations_corporation_id_orders_wallet_division
           * The corporation wallet division used for this order.
           * @format int32
           * @min 1
           * @max 7
           */
          wallet_division: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/orders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List cancelled and expired market orders placed on behalf of a corporation up to 90 days in the past. --- Alternate route: `/dev/corporations/{corporation_id}/orders/history/` Alternate route: `/v2/corporations/{corporation_id}/orders/history/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Accountant, Trader
     *
     * @tags Market
     * @name GetCorporationsCorporationIdOrdersHistory
     * @summary List historical orders from a corporation
     * @request GET:/corporations/{corporation_id}/orders/history/
     * @secure
     */
    getCorporationsCorporationIdOrdersHistory: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_orders_history_duration
           * Number of days the order was valid for (starting from the issued date). An order expires at time issued + duration
           * @format int32
           */
          duration: number;
          /**
           * get_corporations_corporation_id_orders_history_escrow
           * For buy orders, the amount of ISK in escrow
           * @format double
           */
          escrow?: number;
          /**
           * get_corporations_corporation_id_orders_history_is_buy_order
           * True if the order is a bid (buy) order
           */
          is_buy_order?: boolean;
          /**
           * get_corporations_corporation_id_orders_history_issued
           * Date and time when this order was issued
           * @format date-time
           */
          issued: string;
          /**
           * get_corporations_corporation_id_orders_history_issued_by
           * The character who issued this order
           * @format int32
           */
          issued_by?: number;
          /**
           * get_corporations_corporation_id_orders_history_location_id
           * ID of the location where order was placed
           * @format int64
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_orders_history_min_volume
           * For buy orders, the minimum quantity that will be accepted in a matching sell order
           * @format int32
           */
          min_volume?: number;
          /**
           * get_corporations_corporation_id_orders_history_order_id
           * Unique order ID
           * @format int64
           */
          order_id: number;
          /**
           * get_corporations_corporation_id_orders_history_price
           * Cost per unit for this order
           * @format double
           */
          price: number;
          /**
           * get_corporations_corporation_id_orders_history_range
           * Valid order range, numbers are ranges in jumps
           */
          range: "1" | "10" | "2" | "20" | "3" | "30" | "4" | "40" | "5" | "region" | "solarsystem" | "station";
          /**
           * get_corporations_corporation_id_orders_history_region_id
           * ID of the region where order was placed
           * @format int32
           */
          region_id: number;
          /**
           * get_corporations_corporation_id_orders_history_state
           * Current order state
           */
          state: "cancelled" | "expired";
          /**
           * get_corporations_corporation_id_orders_history_type_id
           * The type ID of the item transacted in this order
           * @format int32
           */
          type_id: number;
          /**
           * get_corporations_corporation_id_orders_history_volume_remain
           * Quantity of items still required or offered
           * @format int32
           */
          volume_remain: number;
          /**
           * get_corporations_corporation_id_orders_history_volume_total
           * Quantity of items required or offered at time order was placed
           * @format int32
           */
          volume_total: number;
          /**
           * get_corporations_corporation_id_orders_history_wallet_division
           * The corporation wallet division used for this order
           * @format int32
           * @min 1
           * @max 7
           */
          wallet_division: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/orders/history/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the roles of all members if the character has the personnel manager role or any grantable role. --- Alternate route: `/dev/corporations/{corporation_id}/roles/` Alternate route: `/v2/corporations/{corporation_id}/roles/` --- This route is cached for up to 3600 seconds
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdRoles
     * @summary Get corporation member roles
     * @request GET:/corporations/{corporation_id}/roles/
     * @secure
     */
    getCorporationsCorporationIdRoles: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_roles_character_id
           * character_id integer
           * @format int32
           */
          character_id: number;
          /**
           * get_corporations_corporation_id_roles_grantable_roles
           * grantable_roles array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_grantable_roles_at_base
           * grantable_roles_at_base array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_grantable_roles_at_hq
           * grantable_roles_at_hq array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_grantable_roles_at_other
           * grantable_roles_at_other array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_roles
           * roles array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_roles_at_base
           * roles_at_base array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_roles_at_hq
           * roles_at_hq array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_roles_at_other
           * roles_at_other array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/roles/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return how roles have changed for a coporation's members, up to a month --- Alternate route: `/dev/corporations/{corporation_id}/roles/history/` Alternate route: `/v2/corporations/{corporation_id}/roles/history/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdRolesHistory
     * @summary Get corporation member roles history
     * @request GET:/corporations/{corporation_id}/roles/history/
     * @secure
     */
    getCorporationsCorporationIdRolesHistory: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_roles_history_changed_at
           * changed_at string
           * @format date-time
           */
          changed_at: string;
          /**
           * get_corporations_corporation_id_roles_history_character_id
           * The character whose roles are changed
           * @format int32
           */
          character_id: number;
          /**
           * get_corporations_corporation_id_roles_history_issuer_id
           * ID of the character who issued this change
           * @format int32
           */
          issuer_id: number;
          /**
           * get_corporations_corporation_id_roles_history_new_roles
           * new_roles array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_history_old_roles
           * old_roles array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_roles_history_role_type
           * role_type string
           */
          role_type:
            | "grantable_roles"
            | "grantable_roles_at_base"
            | "grantable_roles_at_hq"
            | "grantable_roles_at_other"
            | "roles"
            | "roles_at_base"
            | "roles_at_hq"
            | "roles_at_other";
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/roles/history/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return the current shareholders of a corporation. --- Alternate route: `/dev/corporations/{corporation_id}/shareholders/` Alternate route: `/legacy/corporations/{corporation_id}/shareholders/` Alternate route: `/v1/corporations/{corporation_id}/shareholders/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdShareholders
     * @summary Get corporation shareholders
     * @request GET:/corporations/{corporation_id}/shareholders/
     * @secure
     */
    getCorporationsCorporationIdShareholders: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_shareholders_share_count
           * share_count integer
           * @format int64
           */
          share_count: number;
          /**
           * get_corporations_corporation_id_shareholders_shareholder_id
           * shareholder_id integer
           * @format int32
           */
          shareholder_id: number;
          /**
           * get_corporations_corporation_id_shareholders_shareholder_type
           * shareholder_type string
           */
          shareholder_type: "character" | "corporation";
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/shareholders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return corporation standings from agents, NPC corporations, and factions --- Alternate route: `/dev/corporations/{corporation_id}/standings/` Alternate route: `/v2/corporations/{corporation_id}/standings/` --- This route is cached for up to 3600 seconds
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStandings
     * @summary Get corporation standings
     * @request GET:/corporations/{corporation_id}/standings/
     * @secure
     */
    getCorporationsCorporationIdStandings: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_standings_from_id
           * from_id integer
           * @format int32
           */
          from_id: number;
          /**
           * get_corporations_corporation_id_standings_from_type
           * from_type string
           */
          from_type: "agent" | "npc_corp" | "faction";
          /**
           * get_corporations_corporation_id_standings_standing
           * standing number
           * @format float
           */
          standing: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/standings/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of corporation starbases (POSes) --- Alternate route: `/dev/corporations/{corporation_id}/starbases/` Alternate route: `/v2/corporations/{corporation_id}/starbases/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStarbases
     * @summary Get corporation starbases (POSes)
     * @request GET:/corporations/{corporation_id}/starbases/
     * @secure
     */
    getCorporationsCorporationIdStarbases: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_starbases_moon_id
           * The moon this starbase (POS) is anchored on, unanchored POSes do not have this information
           * @format int32
           */
          moon_id?: number;
          /**
           * get_corporations_corporation_id_starbases_onlined_since
           * When the POS onlined, for starbases (POSes) in online state
           * @format date-time
           */
          onlined_since?: string;
          /**
           * get_corporations_corporation_id_starbases_reinforced_until
           * When the POS will be out of reinforcement, for starbases (POSes) in reinforced state
           * @format date-time
           */
          reinforced_until?: string;
          /**
           * get_corporations_corporation_id_starbases_starbase_id
           * Unique ID for this starbase (POS)
           * @format int64
           */
          starbase_id: number;
          /**
           * get_corporations_corporation_id_starbases_state
           * state string
           */
          state?: "offline" | "online" | "onlining" | "reinforced" | "unanchoring";
          /**
           * get_corporations_corporation_id_starbases_system_id
           * The solar system this starbase (POS) is in, unanchored POSes have this information
           * @format int32
           */
          system_id: number;
          /**
           * get_corporations_corporation_id_starbases_type_id
           * Starbase (POS) type
           * @format int32
           */
          type_id: number;
          /**
           * get_corporations_corporation_id_starbases_unanchor_at
           * When the POS started unanchoring, for starbases (POSes) in unanchoring state
           * @format date-time
           */
          unanchor_at?: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/starbases/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns various settings and fuels of a starbase (POS) --- Alternate route: `/dev/corporations/{corporation_id}/starbases/{starbase_id}/` Alternate route: `/v2/corporations/{corporation_id}/starbases/{starbase_id}/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStarbasesStarbaseId
     * @summary Get starbase (POS) detail
     * @request GET:/corporations/{corporation_id}/starbases/{starbase_id}/
     * @secure
     */
    getCorporationsCorporationIdStarbasesStarbaseId: (
      corporationId: number,
      starbaseId: number,
      query: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * The solar system this starbase (POS) is located in,
         * @format int32
         */
        system_id: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_starbases_starbase_id_allow_alliance_members
           * allow_alliance_members boolean
           */
          allow_alliance_members: boolean;
          /**
           * get_corporations_corporation_id_starbases_starbase_id_allow_corporation_members
           * allow_corporation_members boolean
           */
          allow_corporation_members: boolean;
          /**
           * get_corporations_corporation_id_starbases_starbase_id_anchor
           * Who can anchor starbase (POS) and its structures
           */
          anchor:
            | "alliance_member"
            | "config_starbase_equipment_role"
            | "corporation_member"
            | "starbase_fuel_technician_role";
          /**
           * get_corporations_corporation_id_starbases_starbase_id_attack_if_at_war
           * attack_if_at_war boolean
           */
          attack_if_at_war: boolean;
          /**
           * get_corporations_corporation_id_starbases_starbase_id_attack_if_other_security_status_dropping
           * attack_if_other_security_status_dropping boolean
           */
          attack_if_other_security_status_dropping: boolean;
          /**
           * get_corporations_corporation_id_starbases_starbase_id_attack_security_status_threshold
           * Starbase (POS) will attack if target's security standing is lower than this value
           * @format float
           */
          attack_security_status_threshold?: number;
          /**
           * get_corporations_corporation_id_starbases_starbase_id_attack_standing_threshold
           * Starbase (POS) will attack if target's standing is lower than this value
           * @format float
           */
          attack_standing_threshold?: number;
          /**
           * get_corporations_corporation_id_starbases_starbase_id_fuel_bay_take
           * Who can take fuel blocks out of the starbase (POS)'s fuel bay
           */
          fuel_bay_take:
            | "alliance_member"
            | "config_starbase_equipment_role"
            | "corporation_member"
            | "starbase_fuel_technician_role";
          /**
           * get_corporations_corporation_id_starbases_starbase_id_fuel_bay_view
           * Who can view the starbase (POS)'s fule bay. Characters either need to have required role or belong to the starbase (POS) owner's corporation or alliance, as described by the enum, all other access settings follows the same scheme
           */
          fuel_bay_view:
            | "alliance_member"
            | "config_starbase_equipment_role"
            | "corporation_member"
            | "starbase_fuel_technician_role";
          /**
           * get_corporations_corporation_id_starbases_starbase_id_fuels
           * Fuel blocks and other things that will be consumed when operating a starbase (POS)
           * @maxItems 20
           */
          fuels?: {
            /**
             * get_corporations_corporation_id_starbases_starbase_id_quantity
             * quantity integer
             * @format int32
             */
            quantity: number;
            /**
             * get_corporations_corporation_id_starbases_starbase_id_type_id
             * type_id integer
             * @format int32
             */
            type_id: number;
          }[];
          /**
           * get_corporations_corporation_id_starbases_starbase_id_offline
           * Who can offline starbase (POS) and its structures
           */
          offline:
            | "alliance_member"
            | "config_starbase_equipment_role"
            | "corporation_member"
            | "starbase_fuel_technician_role";
          /**
           * get_corporations_corporation_id_starbases_starbase_id_online
           * Who can online starbase (POS) and its structures
           */
          online:
            | "alliance_member"
            | "config_starbase_equipment_role"
            | "corporation_member"
            | "starbase_fuel_technician_role";
          /**
           * get_corporations_corporation_id_starbases_starbase_id_unanchor
           * Who can unanchor starbase (POS) and its structures
           */
          unanchor:
            | "alliance_member"
            | "config_starbase_equipment_role"
            | "corporation_member"
            | "starbase_fuel_technician_role";
          /**
           * get_corporations_corporation_id_starbases_starbase_id_use_alliance_standings
           * True if the starbase (POS) is using alliance standings, otherwise using corporation's
           */
          use_alliance_standings: boolean;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/starbases/${starbaseId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of corporation structures. This route's version includes the changes to structures detailed in this blog: https://www.eveonline.com/article/upwell-2.0-structures-changes-coming-on-february-13th --- Alternate route: `/dev/corporations/{corporation_id}/structures/` Alternate route: `/v4/corporations/{corporation_id}/structures/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Station_Manager
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdStructures
     * @summary Get corporation structures
     * @request GET:/corporations/{corporation_id}/structures/
     * @secure
     */
    getCorporationsCorporationIdStructures: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_structures_corporation_id
           * ID of the corporation that owns the structure
           * @format int32
           */
          corporation_id: number;
          /**
           * get_corporations_corporation_id_structures_fuel_expires
           * Date on which the structure will run out of fuel
           * @format date-time
           */
          fuel_expires?: string;
          /**
           * get_corporations_corporation_id_structures_name
           * The structure name
           */
          name?: string;
          /**
           * get_corporations_corporation_id_structures_next_reinforce_apply
           * The date and time when the structure's newly requested reinforcement times (e.g. next_reinforce_hour and next_reinforce_day) will take effect
           * @format date-time
           */
          next_reinforce_apply?: string;
          /**
           * get_corporations_corporation_id_structures_next_reinforce_hour
           * The requested change to reinforce_hour that will take effect at the time shown by next_reinforce_apply
           * @format int32
           * @min 0
           * @max 23
           */
          next_reinforce_hour?: number;
          /**
           * get_corporations_corporation_id_structures_profile_id
           * The id of the ACL profile for this citadel
           * @format int32
           */
          profile_id: number;
          /**
           * get_corporations_corporation_id_structures_reinforce_hour
           * The hour of day that determines the four hour window when the structure will randomly exit its reinforcement periods and become vulnerable to attack against its armor and/or hull. The structure will become vulnerable at a random time that is +/- 2 hours centered on the value of this property
           * @format int32
           * @min 0
           * @max 23
           */
          reinforce_hour?: number;
          /**
           * get_corporations_corporation_id_structures_services
           * Contains a list of service upgrades, and their state
           * @maxItems 10
           */
          services?: {
            /**
             * get_corporations_corporation_id_structures_service_name
             * name string
             */
            name: string;
            /**
             * get_corporations_corporation_id_structures_service_state
             * state string
             */
            state: "online" | "offline" | "cleanup";
          }[];
          /**
           * get_corporations_corporation_id_structures_state
           * state string
           */
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
           * get_corporations_corporation_id_structures_state_timer_end
           * Date at which the structure will move to it's next state
           * @format date-time
           */
          state_timer_end?: string;
          /**
           * get_corporations_corporation_id_structures_state_timer_start
           * Date at which the structure entered it's current state
           * @format date-time
           */
          state_timer_start?: string;
          /**
           * get_corporations_corporation_id_structures_structure_id
           * The Item ID of the structure
           * @format int64
           */
          structure_id: number;
          /**
           * get_corporations_corporation_id_structures_system_id
           * The solar system the structure is in
           * @format int32
           */
          system_id: number;
          /**
           * get_corporations_corporation_id_structures_type_id
           * The type id of the structure
           * @format int32
           */
          type_id: number;
          /**
           * get_corporations_corporation_id_structures_unanchors_at
           * Date at which the structure will unanchor
           * @format date-time
           */
          unanchors_at?: string;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/structures/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a corporation's titles --- Alternate route: `/dev/corporations/{corporation_id}/titles/` Alternate route: `/v2/corporations/{corporation_id}/titles/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Director
     *
     * @tags Corporation
     * @name GetCorporationsCorporationIdTitles
     * @summary Get corporation titles
     * @request GET:/corporations/{corporation_id}/titles/
     * @secure
     */
    getCorporationsCorporationIdTitles: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_titles_grantable_roles
           * grantable_roles array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_grantable_roles_at_base
           * grantable_roles_at_base array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_grantable_roles_at_hq
           * grantable_roles_at_hq array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_grantable_roles_at_other
           * grantable_roles_at_other array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_name
           * name string
           */
          name?: string;
          /**
           * get_corporations_corporation_id_titles_roles
           * roles array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_roles_at_base
           * roles_at_base array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_roles_at_hq
           * roles_at_hq array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_roles_at_other
           * roles_at_other array
           * @maxItems 50
           */
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
            | "Rent_Factory_Facility"
            | "Rent_Office"
            | "Rent_Research_Facility"
            | "Security_Officer"
            | "Starbase_Defense_Operator"
            | "Starbase_Fuel_Technician"
            | "Station_Manager"
            | "Trader"
          )[];
          /**
           * get_corporations_corporation_id_titles_title_id
           * title_id integer
           * @format int32
           */
          title_id?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/titles/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a corporation's wallets --- Alternate route: `/dev/corporations/{corporation_id}/wallets/` Alternate route: `/legacy/corporations/{corporation_id}/wallets/` Alternate route: `/v1/corporations/{corporation_id}/wallets/` --- This route is cached for up to 300 seconds --- Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant
     *
     * @tags Wallet
     * @name GetCorporationsCorporationIdWallets
     * @summary Returns a corporation's wallet balance
     * @request GET:/corporations/{corporation_id}/wallets/
     * @secure
     */
    getCorporationsCorporationIdWallets: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_wallets_balance
           * balance number
           * @format double
           */
          balance: number;
          /**
           * get_corporations_corporation_id_wallets_division
           * division integer
           * @format int32
           * @min 1
           * @max 7
           */
          division: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/wallets/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the given corporation's wallet journal for the given division going 30 days back --- Alternate route: `/dev/corporations/{corporation_id}/wallets/{division}/journal/` Alternate route: `/v4/corporations/{corporation_id}/wallets/{division}/journal/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant
     *
     * @tags Wallet
     * @name GetCorporationsCorporationIdWalletsDivisionJournal
     * @summary Get corporation wallet journal
     * @request GET:/corporations/{corporation_id}/wallets/{division}/journal/
     * @secure
     */
    getCorporationsCorporationIdWalletsDivisionJournal: (
      corporationId: number,
      division: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_wallets_division_journal_amount
           * The amount of ISK given or taken from the wallet as a result of the given transaction. Positive when ISK is deposited into the wallet and negative when ISK is withdrawn
           * @format double
           */
          amount?: number;
          /**
           * get_corporations_corporation_id_wallets_division_journal_balance
           * Wallet balance after transaction occurred
           * @format double
           */
          balance?: number;
          /**
           * get_corporations_corporation_id_wallets_division_journal_context_id
           * An ID that gives extra context to the particular transaction. Because of legacy reasons the context is completely different per ref_type and means different things. It is also possible to not have a context_id
           * @format int64
           */
          context_id?: number;
          /**
           * get_corporations_corporation_id_wallets_division_journal_context_id_type
           * The type of the given context_id if present
           */
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
           * get_corporations_corporation_id_wallets_division_journal_date
           * Date and time of transaction
           * @format date-time
           */
          date: string;
          /**
           * get_corporations_corporation_id_wallets_division_journal_description
           * The reason for the transaction, mirrors what is seen in the client
           */
          description: string;
          /**
           * get_corporations_corporation_id_wallets_division_journal_first_party_id
           * The id of the first party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
           * @format int32
           */
          first_party_id?: number;
          /**
           * get_corporations_corporation_id_wallets_division_journal_id
           * Unique journal reference ID
           * @format int64
           */
          id: number;
          /**
           * get_corporations_corporation_id_wallets_division_journal_reason
           * The user stated reason for the transaction. Only applies to some ref_types
           */
          reason?: string;
          /**
           * get_corporations_corporation_id_wallets_division_journal_ref_type
           * "The transaction type for the given. transaction. Different transaction types will populate different attributes. Note: If you have an existing XML API application that is using ref_types, you will need to know which string ESI ref_type maps to which integer. You can look at the following file to see string->int mappings: https://github.com/ccpgames/eve-glue/blob/master/eve_glue/wallet_journal_ref.py"
           */
          ref_type:
            | "acceleration_gate_fee"
            | "advertisement_listing_fee"
            | "agent_donation"
            | "agent_location_services"
            | "agent_miscellaneous"
            | "agent_mission_collateral_paid"
            | "agent_mission_collateral_refunded"
            | "agent_mission_reward"
            | "agent_mission_reward_corporation_tax"
            | "agent_mission_time_bonus_reward"
            | "agent_mission_time_bonus_reward_corporation_tax"
            | "agent_security_services"
            | "agent_services_rendered"
            | "agents_preward"
            | "alliance_maintainance_fee"
            | "alliance_registration_fee"
            | "asset_safety_recovery_tax"
            | "bounty"
            | "bounty_prize"
            | "bounty_prize_corporation_tax"
            | "bounty_prizes"
            | "bounty_reimbursement"
            | "bounty_surcharge"
            | "brokers_fee"
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
            | "courier_mission_escrow"
            | "cspa"
            | "cspaofflinerefund"
            | "daily_challenge_reward"
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
            | "gm_cash_transfer"
            | "industry_job_tax"
            | "infrastructure_hub_maintenance"
            | "inheritance"
            | "insurance"
            | "item_trader_payment"
            | "jump_clone_activation_fee"
            | "jump_clone_installation_fee"
            | "kill_right_fee"
            | "lp_store"
            | "manufacturing"
            | "market_escrow"
            | "market_fine_paid"
            | "market_provider_tax"
            | "market_transaction"
            | "medal_creation"
            | "medal_issued"
            | "milestone_reward_payment"
            | "mission_completion"
            | "mission_cost"
            | "mission_expiration"
            | "mission_reward"
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
            | "sovereignity_bill"
            | "store_purchase"
            | "store_purchase_refund"
            | "structure_gate_jump"
            | "transaction_tax"
            | "upkeep_adjustment_fee"
            | "war_ally_contract"
            | "war_fee"
            | "war_fee_surrender";
          /**
           * get_corporations_corporation_id_wallets_division_journal_second_party_id
           * The id of the second party involved in the transaction. This attribute has no consistency and is different or non existant for particular ref_types. The description attribute will help make sense of what this attribute means. For more info about the given ID it can be dropped into the /universe/names/ ESI route to determine its type and name
           * @format int32
           */
          second_party_id?: number;
          /**
           * get_corporations_corporation_id_wallets_division_journal_tax
           * Tax amount received. Only applies to tax related transactions
           * @format double
           */
          tax?: number;
          /**
           * get_corporations_corporation_id_wallets_division_journal_tax_receiver_id
           * The corporation ID receiving any tax paid. Only applies to tax related transactions
           * @format int32
           */
          tax_receiver_id?: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/wallets/${division}/journal/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get wallet transactions of a corporation --- Alternate route: `/dev/corporations/{corporation_id}/wallets/{division}/transactions/` Alternate route: `/legacy/corporations/{corporation_id}/wallets/{division}/transactions/` Alternate route: `/v1/corporations/{corporation_id}/wallets/{division}/transactions/` --- This route is cached for up to 3600 seconds --- Requires one of the following EVE corporation role(s): Accountant, Junior_Accountant
     *
     * @tags Wallet
     * @name GetCorporationsCorporationIdWalletsDivisionTransactions
     * @summary Get corporation wallet transactions
     * @request GET:/corporations/{corporation_id}/wallets/{division}/transactions/
     * @secure
     */
    getCorporationsCorporationIdWalletsDivisionTransactions: (
      corporationId: number,
      division: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Only show journal entries happened before the transaction referenced by this id
         * @format int64
         */
        from_id?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_corporations_corporation_id_wallets_division_transactions_client_id
           * client_id integer
           * @format int32
           */
          client_id: number;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_date
           * Date and time of transaction
           * @format date-time
           */
          date: string;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_is_buy
           * is_buy boolean
           */
          is_buy: boolean;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_journal_ref_id
           * -1 if there is no corresponding wallet journal entry
           * @format int64
           */
          journal_ref_id: number;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_location_id
           * location_id integer
           * @format int64
           */
          location_id: number;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_quantity
           * quantity integer
           * @format int32
           */
          quantity: number;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_transaction_id
           * Unique transaction ID
           * @format int64
           */
          transaction_id: number;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
          /**
           * get_corporations_corporation_id_wallets_division_transactions_unit_price
           * Amount paid per unit
           * @format double
           */
          unit_price: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/corporations/${corporationId}/wallets/${division}/transactions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  dogma = {
    /**
     * @description Get a list of dogma attribute ids --- Alternate route: `/dev/dogma/attributes/` Alternate route: `/legacy/dogma/attributes/` Alternate route: `/v1/dogma/attributes/` --- This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaAttributes
     * @summary Get attributes
     * @request GET:/dogma/attributes/
     */
    getDogmaAttributes: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/dogma/attributes/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a dogma attribute --- Alternate route: `/dev/dogma/attributes/{attribute_id}/` Alternate route: `/legacy/dogma/attributes/{attribute_id}/` Alternate route: `/v1/dogma/attributes/{attribute_id}/` --- This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaAttributesAttributeId
     * @summary Get attribute information
     * @request GET:/dogma/attributes/{attribute_id}/
     */
    getDogmaAttributesAttributeId: (
      attributeId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_dogma_attributes_attribute_id_attribute_id
           * attribute_id integer
           * @format int32
           */
          attribute_id: number;
          /**
           * get_dogma_attributes_attribute_id_default_value
           * default_value number
           * @format float
           */
          default_value?: number;
          /**
           * get_dogma_attributes_attribute_id_description
           * description string
           */
          description?: string;
          /**
           * get_dogma_attributes_attribute_id_display_name
           * display_name string
           */
          display_name?: string;
          /**
           * get_dogma_attributes_attribute_id_high_is_good
           * high_is_good boolean
           */
          high_is_good?: boolean;
          /**
           * get_dogma_attributes_attribute_id_icon_id
           * icon_id integer
           * @format int32
           */
          icon_id?: number;
          /**
           * get_dogma_attributes_attribute_id_name
           * name string
           */
          name?: string;
          /**
           * get_dogma_attributes_attribute_id_published
           * published boolean
           */
          published?: boolean;
          /**
           * get_dogma_attributes_attribute_id_stackable
           * stackable boolean
           */
          stackable?: boolean;
          /**
           * get_dogma_attributes_attribute_id_unit_id
           * unit_id integer
           * @format int32
           */
          unit_id?: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_dogma_attributes_attribute_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/dogma/attributes/${attributeId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns info about a dynamic item resulting from mutation with a mutaplasmid. --- Alternate route: `/dev/dogma/dynamic/items/{type_id}/{item_id}/` Alternate route: `/legacy/dogma/dynamic/items/{type_id}/{item_id}/` Alternate route: `/v1/dogma/dynamic/items/{type_id}/{item_id}/` --- This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaDynamicItemsTypeIdItemId
     * @summary Get dynamic item information
     * @request GET:/dogma/dynamic/items/{type_id}/{item_id}/
     */
    getDogmaDynamicItemsTypeIdItemId: (
      itemId: number,
      typeId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_dogma_dynamic_items_type_id_item_id_created_by
           * The ID of the character who created the item
           * @format int32
           */
          created_by: number;
          /**
           * get_dogma_dynamic_items_type_id_item_id_dogma_attributes
           * dogma_attributes array
           * @maxItems 1000
           */
          dogma_attributes: {
            /**
             * get_dogma_dynamic_items_type_id_item_id_attribute_id
             * attribute_id integer
             * @format int32
             */
            attribute_id: number;
            /**
             * get_dogma_dynamic_items_type_id_item_id_value
             * value number
             * @format float
             */
            value: number;
          }[];
          /**
           * get_dogma_dynamic_items_type_id_item_id_dogma_effects
           * dogma_effects array
           * @maxItems 1000
           */
          dogma_effects: {
            /**
             * get_dogma_dynamic_items_type_id_item_id_effect_id
             * effect_id integer
             * @format int32
             */
            effect_id: number;
            /**
             * get_dogma_dynamic_items_type_id_item_id_is_default
             * is_default boolean
             */
            is_default: boolean;
          }[];
          /**
           * get_dogma_dynamic_items_type_id_item_id_mutator_type_id
           * The type ID of the mutator used to generate the dynamic item.
           * @format int32
           */
          mutator_type_id: number;
          /**
           * get_dogma_dynamic_items_type_id_item_id_source_type_id
           * The type ID of the source item the mutator was applied to create the dynamic item.
           * @format int32
           */
          source_type_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_dogma_dynamic_items_type_id_item_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/dogma/dynamic/items/${typeId}/${itemId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of dogma effect ids --- Alternate route: `/dev/dogma/effects/` Alternate route: `/legacy/dogma/effects/` Alternate route: `/v1/dogma/effects/` --- This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaEffects
     * @summary Get effects
     * @request GET:/dogma/effects/
     */
    getDogmaEffects: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/dogma/effects/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a dogma effect --- Alternate route: `/dev/dogma/effects/{effect_id}/` Alternate route: `/v2/dogma/effects/{effect_id}/` --- This route expires daily at 11:05
     *
     * @tags Dogma
     * @name GetDogmaEffectsEffectId
     * @summary Get effect information
     * @request GET:/dogma/effects/{effect_id}/
     */
    getDogmaEffectsEffectId: (
      effectId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_dogma_effects_effect_id_description
           * description string
           */
          description?: string;
          /**
           * get_dogma_effects_effect_id_disallow_auto_repeat
           * disallow_auto_repeat boolean
           */
          disallow_auto_repeat?: boolean;
          /**
           * get_dogma_effects_effect_id_discharge_attribute_id
           * discharge_attribute_id integer
           * @format int32
           */
          discharge_attribute_id?: number;
          /**
           * get_dogma_effects_effect_id_display_name
           * display_name string
           */
          display_name?: string;
          /**
           * get_dogma_effects_effect_id_duration_attribute_id
           * duration_attribute_id integer
           * @format int32
           */
          duration_attribute_id?: number;
          /**
           * get_dogma_effects_effect_id_effect_category
           * effect_category integer
           * @format int32
           */
          effect_category?: number;
          /**
           * get_dogma_effects_effect_id_effect_id
           * effect_id integer
           * @format int32
           */
          effect_id: number;
          /**
           * get_dogma_effects_effect_id_electronic_chance
           * electronic_chance boolean
           */
          electronic_chance?: boolean;
          /**
           * get_dogma_effects_effect_id_falloff_attribute_id
           * falloff_attribute_id integer
           * @format int32
           */
          falloff_attribute_id?: number;
          /**
           * get_dogma_effects_effect_id_icon_id
           * icon_id integer
           * @format int32
           */
          icon_id?: number;
          /**
           * get_dogma_effects_effect_id_is_assistance
           * is_assistance boolean
           */
          is_assistance?: boolean;
          /**
           * get_dogma_effects_effect_id_is_offensive
           * is_offensive boolean
           */
          is_offensive?: boolean;
          /**
           * get_dogma_effects_effect_id_is_warp_safe
           * is_warp_safe boolean
           */
          is_warp_safe?: boolean;
          /**
           * get_dogma_effects_effect_id_modifiers
           * modifiers array
           * @maxItems 100
           */
          modifiers?: {
            /**
             * get_dogma_effects_effect_id_domain
             * domain string
             */
            domain?: string;
            /**
             * get_dogma_effects_effect_id_modifier_effect_id
             * effect_id integer
             * @format int32
             */
            effect_id?: number;
            /**
             * get_dogma_effects_effect_id_func
             * func string
             */
            func: string;
            /**
             * get_dogma_effects_effect_id_modified_attribute_id
             * modified_attribute_id integer
             * @format int32
             */
            modified_attribute_id?: number;
            /**
             * get_dogma_effects_effect_id_modifying_attribute_id
             * modifying_attribute_id integer
             * @format int32
             */
            modifying_attribute_id?: number;
            /**
             * get_dogma_effects_effect_id_operator
             * operator integer
             * @format int32
             */
            operator?: number;
          }[];
          /**
           * get_dogma_effects_effect_id_name
           * name string
           */
          name?: string;
          /**
           * get_dogma_effects_effect_id_post_expression
           * post_expression integer
           * @format int32
           */
          post_expression?: number;
          /**
           * get_dogma_effects_effect_id_pre_expression
           * pre_expression integer
           * @format int32
           */
          pre_expression?: number;
          /**
           * get_dogma_effects_effect_id_published
           * published boolean
           */
          published?: boolean;
          /**
           * get_dogma_effects_effect_id_range_attribute_id
           * range_attribute_id integer
           * @format int32
           */
          range_attribute_id?: number;
          /**
           * get_dogma_effects_effect_id_range_chance
           * range_chance boolean
           */
          range_chance?: boolean;
          /**
           * get_dogma_effects_effect_id_tracking_speed_attribute_id
           * tracking_speed_attribute_id integer
           * @format int32
           */
          tracking_speed_attribute_id?: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_dogma_effects_effect_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/dogma/effects/${effectId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  fleets = {
    /**
     * @description Return details about a fleet --- Alternate route: `/dev/fleets/{fleet_id}/` Alternate route: `/legacy/fleets/{fleet_id}/` Alternate route: `/v1/fleets/{fleet_id}/` --- This route is cached for up to 5 seconds
     *
     * @tags Fleets
     * @name GetFleetsFleetId
     * @summary Get fleet information
     * @request GET:/fleets/{fleet_id}/
     * @secure
     */
    getFleetsFleetId: (
      fleetId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fleets_fleet_id_is_free_move
           * Is free-move enabled
           */
          is_free_move: boolean;
          /**
           * get_fleets_fleet_id_is_registered
           * Does the fleet have an active fleet advertisement
           */
          is_registered: boolean;
          /**
           * get_fleets_fleet_id_is_voice_enabled
           * Is EVE Voice enabled
           */
          is_voice_enabled: boolean;
          /**
           * get_fleets_fleet_id_motd
           * Fleet MOTD in CCP flavoured HTML
           */
          motd: string;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_fleets_fleet_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update settings about a fleet --- Alternate route: `/dev/fleets/{fleet_id}/` Alternate route: `/legacy/fleets/{fleet_id}/` Alternate route: `/v1/fleets/{fleet_id}/`
     *
     * @tags Fleets
     * @name PutFleetsFleetId
     * @summary Update fleet
     * @request PUT:/fleets/{fleet_id}/
     * @secure
     */
    putFleetsFleetId: (
      fleetId: number,
      new_settings: {
        /**
         * put_fleets_fleet_id_is_free_move
         * Should free-move be enabled in the fleet
         */
        is_free_move?: boolean;
        /**
         * put_fleets_fleet_id_motd
         * New fleet MOTD in CCP flavoured HTML
         */
        motd?: string;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * put_fleets_fleet_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/`,
        method: "PUT",
        query: query,
        body: new_settings,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return information about fleet members --- Alternate route: `/dev/fleets/{fleet_id}/members/` Alternate route: `/legacy/fleets/{fleet_id}/members/` Alternate route: `/v1/fleets/{fleet_id}/members/` --- This route is cached for up to 5 seconds
     *
     * @tags Fleets
     * @name GetFleetsFleetIdMembers
     * @summary Get fleet members
     * @request GET:/fleets/{fleet_id}/members/
     * @secure
     */
    getFleetsFleetIdMembers: (
      fleetId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fleets_fleet_id_members_character_id
           * character_id integer
           * @format int32
           */
          character_id: number;
          /**
           * get_fleets_fleet_id_members_join_time
           * join_time string
           * @format date-time
           */
          join_time: string;
          /**
           * get_fleets_fleet_id_members_role
           * Member’s role in fleet
           */
          role: "fleet_commander" | "wing_commander" | "squad_commander" | "squad_member";
          /**
           * get_fleets_fleet_id_members_role_name
           * Localized role names
           */
          role_name: string;
          /**
           * get_fleets_fleet_id_members_ship_type_id
           * ship_type_id integer
           * @format int32
           */
          ship_type_id: number;
          /**
           * get_fleets_fleet_id_members_solar_system_id
           * Solar system the member is located in
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_fleets_fleet_id_members_squad_id
           * ID of the squad the member is in. If not applicable, will be set to -1
           * @format int64
           */
          squad_id: number;
          /**
           * get_fleets_fleet_id_members_station_id
           * Station in which the member is docked in, if applicable
           * @format int64
           */
          station_id?: number;
          /**
           * get_fleets_fleet_id_members_takes_fleet_warp
           * Whether the member take fleet warps
           */
          takes_fleet_warp: boolean;
          /**
           * get_fleets_fleet_id_members_wing_id
           * ID of the wing the member is in. If not applicable, will be set to -1
           * @format int64
           */
          wing_id: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_fleets_fleet_id_members_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/members/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Invite a character into the fleet. If a character has a CSPA charge set it is not possible to invite them to the fleet using ESI --- Alternate route: `/dev/fleets/{fleet_id}/members/` Alternate route: `/legacy/fleets/{fleet_id}/members/` Alternate route: `/v1/fleets/{fleet_id}/members/`
     *
     * @tags Fleets
     * @name PostFleetsFleetIdMembers
     * @summary Create fleet invitation
     * @request POST:/fleets/{fleet_id}/members/
     * @secure
     */
    postFleetsFleetIdMembers: (
      fleetId: number,
      invitation: {
        /**
         * post_fleets_fleet_id_members_character_id
         * The character you want to invite
         * @format int32
         */
        character_id: number;
        /**
         * post_fleets_fleet_id_members_role
         * If a character is invited with the `fleet_commander` role, neither `wing_id` or `squad_id` should be specified. If a character is invited with the `wing_commander` role, only `wing_id` should be specified. If a character is invited with the `squad_commander` role, both `wing_id` and `squad_id` should be specified. If a character is invited with the `squad_member` role, `wing_id` and `squad_id` should either both be specified or not specified at all. If they aren’t specified, the invited character will join any squad with available positions.
         */
        role: "fleet_commander" | "wing_commander" | "squad_commander" | "squad_member";
        /**
         * post_fleets_fleet_id_members_squad_id
         * squad_id integer
         * @format int64
         * @min 0
         */
        squad_id?: number;
        /**
         * post_fleets_fleet_id_members_wing_id
         * wing_id integer
         * @format int64
         * @min 0
         */
        wing_id?: number;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * post_fleets_fleet_id_members_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | {
            /**
             * post_fleets_fleet_id_members_error
             * error message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/members/`,
        method: "POST",
        query: query,
        body: invitation,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Kick a fleet member --- Alternate route: `/dev/fleets/{fleet_id}/members/{member_id}/` Alternate route: `/legacy/fleets/{fleet_id}/members/{member_id}/` Alternate route: `/v1/fleets/{fleet_id}/members/{member_id}/`
     *
     * @tags Fleets
     * @name DeleteFleetsFleetIdMembersMemberId
     * @summary Kick fleet member
     * @request DELETE:/fleets/{fleet_id}/members/{member_id}/
     * @secure
     */
    deleteFleetsFleetIdMembersMemberId: (
      fleetId: number,
      memberId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * delete_fleets_fleet_id_members_member_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/members/${memberId}/`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Move a fleet member around --- Alternate route: `/dev/fleets/{fleet_id}/members/{member_id}/` Alternate route: `/legacy/fleets/{fleet_id}/members/{member_id}/` Alternate route: `/v1/fleets/{fleet_id}/members/{member_id}/`
     *
     * @tags Fleets
     * @name PutFleetsFleetIdMembersMemberId
     * @summary Move fleet member
     * @request PUT:/fleets/{fleet_id}/members/{member_id}/
     * @secure
     */
    putFleetsFleetIdMembersMemberId: (
      fleetId: number,
      memberId: number,
      movement: {
        /**
         * put_fleets_fleet_id_members_member_id_role
         * If a character is moved to the `fleet_commander` role, neither `wing_id` or `squad_id` should be specified. If a character is moved to the `wing_commander` role, only `wing_id` should be specified. If a character is moved to the `squad_commander` role, both `wing_id` and `squad_id` should be specified. If a character is moved to the `squad_member` role, both `wing_id` and `squad_id` should be specified.
         */
        role: "fleet_commander" | "wing_commander" | "squad_commander" | "squad_member";
        /**
         * put_fleets_fleet_id_members_member_id_squad_id
         * squad_id integer
         * @format int64
         * @min 0
         */
        squad_id?: number;
        /**
         * put_fleets_fleet_id_members_member_id_wing_id
         * wing_id integer
         * @format int64
         * @min 0
         */
        wing_id?: number;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * put_fleets_fleet_id_members_member_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | {
            /**
             * put_fleets_fleet_id_members_member_id_error
             * error message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/members/${memberId}/`,
        method: "PUT",
        query: query,
        body: movement,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete a fleet squad, only empty squads can be deleted --- Alternate route: `/dev/fleets/{fleet_id}/squads/{squad_id}/` Alternate route: `/legacy/fleets/{fleet_id}/squads/{squad_id}/` Alternate route: `/v1/fleets/{fleet_id}/squads/{squad_id}/`
     *
     * @tags Fleets
     * @name DeleteFleetsFleetIdSquadsSquadId
     * @summary Delete fleet squad
     * @request DELETE:/fleets/{fleet_id}/squads/{squad_id}/
     * @secure
     */
    deleteFleetsFleetIdSquadsSquadId: (
      fleetId: number,
      squadId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * delete_fleets_fleet_id_squads_squad_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/squads/${squadId}/`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Rename a fleet squad --- Alternate route: `/dev/fleets/{fleet_id}/squads/{squad_id}/` Alternate route: `/legacy/fleets/{fleet_id}/squads/{squad_id}/` Alternate route: `/v1/fleets/{fleet_id}/squads/{squad_id}/`
     *
     * @tags Fleets
     * @name PutFleetsFleetIdSquadsSquadId
     * @summary Rename fleet squad
     * @request PUT:/fleets/{fleet_id}/squads/{squad_id}/
     * @secure
     */
    putFleetsFleetIdSquadsSquadId: (
      fleetId: number,
      squadId: number,
      naming: {
        /**
         * put_fleets_fleet_id_squads_squad_id_name
         * name string
         * @maxLength 10
         */
        name: string;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * put_fleets_fleet_id_squads_squad_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/squads/${squadId}/`,
        method: "PUT",
        query: query,
        body: naming,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Return information about wings in a fleet --- Alternate route: `/dev/fleets/{fleet_id}/wings/` Alternate route: `/legacy/fleets/{fleet_id}/wings/` Alternate route: `/v1/fleets/{fleet_id}/wings/` --- This route is cached for up to 5 seconds
     *
     * @tags Fleets
     * @name GetFleetsFleetIdWings
     * @summary Get fleet wings
     * @request GET:/fleets/{fleet_id}/wings/
     * @secure
     */
    getFleetsFleetIdWings: (
      fleetId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fleets_fleet_id_wings_id
           * id integer
           * @format int64
           */
          id: number;
          /**
           * get_fleets_fleet_id_wings_name
           * name string
           */
          name: string;
          /**
           * get_fleets_fleet_id_wings_squads
           * squads array
           * @maxItems 25
           */
          squads: {
            /**
             * get_fleets_fleet_id_wings_squad_id
             * id integer
             * @format int64
             */
            id: number;
            /**
             * get_fleets_fleet_id_wings_squad_name
             * name string
             */
            name: string;
          }[];
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_fleets_fleet_id_wings_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/wings/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new wing in a fleet --- Alternate route: `/dev/fleets/{fleet_id}/wings/` Alternate route: `/legacy/fleets/{fleet_id}/wings/` Alternate route: `/v1/fleets/{fleet_id}/wings/`
     *
     * @tags Fleets
     * @name PostFleetsFleetIdWings
     * @summary Create fleet wing
     * @request POST:/fleets/{fleet_id}/wings/
     * @secure
     */
    postFleetsFleetIdWings: (
      fleetId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_fleets_fleet_id_wings_wing_id
           * The wing_id of the newly created wing
           * @format int64
           */
          wing_id: number;
        },
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * post_fleets_fleet_id_wings_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/wings/`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a fleet wing, only empty wings can be deleted. The wing may contain squads, but the squads must be empty --- Alternate route: `/dev/fleets/{fleet_id}/wings/{wing_id}/` Alternate route: `/legacy/fleets/{fleet_id}/wings/{wing_id}/` Alternate route: `/v1/fleets/{fleet_id}/wings/{wing_id}/`
     *
     * @tags Fleets
     * @name DeleteFleetsFleetIdWingsWingId
     * @summary Delete fleet wing
     * @request DELETE:/fleets/{fleet_id}/wings/{wing_id}/
     * @secure
     */
    deleteFleetsFleetIdWingsWingId: (
      fleetId: number,
      wingId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * delete_fleets_fleet_id_wings_wing_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/wings/${wingId}/`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Rename a fleet wing --- Alternate route: `/dev/fleets/{fleet_id}/wings/{wing_id}/` Alternate route: `/legacy/fleets/{fleet_id}/wings/{wing_id}/` Alternate route: `/v1/fleets/{fleet_id}/wings/{wing_id}/`
     *
     * @tags Fleets
     * @name PutFleetsFleetIdWingsWingId
     * @summary Rename fleet wing
     * @request PUT:/fleets/{fleet_id}/wings/{wing_id}/
     * @secure
     */
    putFleetsFleetIdWingsWingId: (
      fleetId: number,
      wingId: number,
      naming: {
        /**
         * put_fleets_fleet_id_wings_wing_id_name
         * name string
         * @maxLength 10
         */
        name: string;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * put_fleets_fleet_id_wings_wing_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/wings/${wingId}/`,
        method: "PUT",
        query: query,
        body: naming,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create a new squad in a fleet --- Alternate route: `/dev/fleets/{fleet_id}/wings/{wing_id}/squads/` Alternate route: `/legacy/fleets/{fleet_id}/wings/{wing_id}/squads/` Alternate route: `/v1/fleets/{fleet_id}/wings/{wing_id}/squads/`
     *
     * @tags Fleets
     * @name PostFleetsFleetIdWingsWingIdSquads
     * @summary Create fleet squad
     * @request POST:/fleets/{fleet_id}/wings/{wing_id}/squads/
     * @secure
     */
    postFleetsFleetIdWingsWingIdSquads: (
      fleetId: number,
      wingId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_fleets_fleet_id_wings_wing_id_squads_squad_id
           * The squad_id of the newly created squad
           * @format int64
           */
          squad_id: number;
        },
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * post_fleets_fleet_id_wings_wing_id_squads_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/fleets/${fleetId}/wings/${wingId}/squads/`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  fw = {
    /**
     * @description Top 4 leaderboard of factions for kills and victory points separated by total, last week and yesterday --- Alternate route: `/dev/fw/leaderboards/` Alternate route: `/legacy/fw/leaderboards/` Alternate route: `/v1/fw/leaderboards/` Alternate route: `/v2/fw/leaderboards/` --- This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwLeaderboards
     * @summary List of the top factions in faction warfare
     * @request GET:/fw/leaderboards/
     */
    getFwLeaderboards: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fw_leaderboards_kills
           * Top 4 rankings of factions by number of kills from yesterday, last week and in total
           */
          kills: {
            /**
             * get_fw_leaderboards_active_total
             * Top 4 ranking of factions active in faction warfare by total kills. A faction is considered "active" if they have participated in faction warfare in the past 14 days
             * @maxItems 4
             */
            active_total: {
              /**
               * get_fw_leaderboards_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_faction_id
               * faction_id integer
               * @format int32
               */
              faction_id?: number;
            }[];
            /**
             * get_fw_leaderboards_last_week
             * Top 4 ranking of factions by kills in the past week
             * @maxItems 4
             */
            last_week: {
              /**
               * get_fw_leaderboards_last_week_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_last_week_faction_id
               * faction_id integer
               * @format int32
               */
              faction_id?: number;
            }[];
            /**
             * get_fw_leaderboards_yesterday
             * Top 4 ranking of factions by kills in the past day
             * @maxItems 4
             */
            yesterday: {
              /**
               * get_fw_leaderboards_yesterday_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_yesterday_faction_id
               * faction_id integer
               * @format int32
               */
              faction_id?: number;
            }[];
          };
          /**
           * get_fw_leaderboards_victory_points
           * Top 4 rankings of factions by victory points from yesterday, last week and in total
           */
          victory_points: {
            /**
             * get_fw_leaderboards_victory_points_active_total
             * Top 4 ranking of factions active in faction warfare by total victory points. A faction is considered "active" if they have participated in faction warfare in the past 14 days
             * @maxItems 4
             */
            active_total: {
              /**
               * get_fw_leaderboards_active_total_amount
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_active_total_faction_id
               * faction_id integer
               * @format int32
               */
              faction_id?: number;
            }[];
            /**
             * get_fw_leaderboards_victory_points_last_week
             * Top 4 ranking of factions by victory points in the past week
             * @maxItems 4
             */
            last_week: {
              /**
               * get_fw_leaderboards_last_week_amount_1
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_last_week_faction_id_1
               * faction_id integer
               * @format int32
               */
              faction_id?: number;
            }[];
            /**
             * get_fw_leaderboards_victory_points_yesterday
             * Top 4 ranking of factions by victory points in the past day
             * @maxItems 4
             */
            yesterday: {
              /**
               * get_fw_leaderboards_yesterday_amount_1
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_yesterday_faction_id_1
               * faction_id integer
               * @format int32
               */
              faction_id?: number;
            }[];
          };
        },
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/fw/leaderboards/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Top 100 leaderboard of pilots for kills and victory points separated by total, last week and yesterday --- Alternate route: `/dev/fw/leaderboards/characters/` Alternate route: `/legacy/fw/leaderboards/characters/` Alternate route: `/v1/fw/leaderboards/characters/` Alternate route: `/v2/fw/leaderboards/characters/` --- This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwLeaderboardsCharacters
     * @summary List of the top pilots in faction warfare
     * @request GET:/fw/leaderboards/characters/
     */
    getFwLeaderboardsCharacters: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fw_leaderboards_characters_kills
           * Top 100 rankings of pilots by number of kills from yesterday, last week and in total
           */
          kills: {
            /**
             * get_fw_leaderboards_characters_active_total
             * Top 100 ranking of pilots active in faction warfare by total kills. A pilot is considered "active" if they have participated in faction warfare in the past 14 days
             * @maxItems 100
             */
            active_total: {
              /**
               * get_fw_leaderboards_characters_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_characters_character_id
               * character_id integer
               * @format int32
               */
              character_id?: number;
            }[];
            /**
             * get_fw_leaderboards_characters_last_week
             * Top 100 ranking of pilots by kills in the past week
             * @maxItems 100
             */
            last_week: {
              /**
               * get_fw_leaderboards_characters_last_week_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_characters_last_week_character_id
               * character_id integer
               * @format int32
               */
              character_id?: number;
            }[];
            /**
             * get_fw_leaderboards_characters_yesterday
             * Top 100 ranking of pilots by kills in the past day
             * @maxItems 100
             */
            yesterday: {
              /**
               * get_fw_leaderboards_characters_yesterday_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_characters_yesterday_character_id
               * character_id integer
               * @format int32
               */
              character_id?: number;
            }[];
          };
          /**
           * get_fw_leaderboards_characters_victory_points
           * Top 100 rankings of pilots by victory points from yesterday, last week and in total
           */
          victory_points: {
            /**
             * get_fw_leaderboards_characters_victory_points_active_total
             * Top 100 ranking of pilots active in faction warfare by total victory points. A pilot is considered "active" if they have participated in faction warfare in the past 14 days
             * @maxItems 100
             */
            active_total: {
              /**
               * get_fw_leaderboards_characters_active_total_amount
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_characters_active_total_character_id
               * character_id integer
               * @format int32
               */
              character_id?: number;
            }[];
            /**
             * get_fw_leaderboards_characters_victory_points_last_week
             * Top 100 ranking of pilots by victory points in the past week
             * @maxItems 100
             */
            last_week: {
              /**
               * get_fw_leaderboards_characters_last_week_amount_1
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_characters_last_week_character_id_1
               * character_id integer
               * @format int32
               */
              character_id?: number;
            }[];
            /**
             * get_fw_leaderboards_characters_victory_points_yesterday
             * Top 100 ranking of pilots by victory points in the past day
             * @maxItems 100
             */
            yesterday: {
              /**
               * get_fw_leaderboards_characters_yesterday_amount_1
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_characters_yesterday_character_id_1
               * character_id integer
               * @format int32
               */
              character_id?: number;
            }[];
          };
        },
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/fw/leaderboards/characters/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Top 10 leaderboard of corporations for kills and victory points separated by total, last week and yesterday --- Alternate route: `/dev/fw/leaderboards/corporations/` Alternate route: `/legacy/fw/leaderboards/corporations/` Alternate route: `/v1/fw/leaderboards/corporations/` Alternate route: `/v2/fw/leaderboards/corporations/` --- This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwLeaderboardsCorporations
     * @summary List of the top corporations in faction warfare
     * @request GET:/fw/leaderboards/corporations/
     */
    getFwLeaderboardsCorporations: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fw_leaderboards_corporations_kills
           * Top 10 rankings of corporations by number of kills from yesterday, last week and in total
           */
          kills: {
            /**
             * get_fw_leaderboards_corporations_active_total
             * Top 10 ranking of corporations active in faction warfare by total kills. A corporation is considered "active" if they have participated in faction warfare in the past 14 days
             * @maxItems 10
             */
            active_total: {
              /**
               * get_fw_leaderboards_corporations_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_corporations_corporation_id
               * corporation_id integer
               * @format int32
               */
              corporation_id?: number;
            }[];
            /**
             * get_fw_leaderboards_corporations_last_week
             * Top 10 ranking of corporations by kills in the past week
             * @maxItems 10
             */
            last_week: {
              /**
               * get_fw_leaderboards_corporations_last_week_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_corporations_last_week_corporation_id
               * corporation_id integer
               * @format int32
               */
              corporation_id?: number;
            }[];
            /**
             * get_fw_leaderboards_corporations_yesterday
             * Top 10 ranking of corporations by kills in the past day
             * @maxItems 10
             */
            yesterday: {
              /**
               * get_fw_leaderboards_corporations_yesterday_amount
               * Amount of kills
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_corporations_yesterday_corporation_id
               * corporation_id integer
               * @format int32
               */
              corporation_id?: number;
            }[];
          };
          /**
           * get_fw_leaderboards_corporations_victory_points
           * Top 10 rankings of corporations by victory points from yesterday, last week and in total
           */
          victory_points: {
            /**
             * get_fw_leaderboards_corporations_victory_points_active_total
             * Top 10 ranking of corporations active in faction warfare by total victory points. A corporation is considered "active" if they have participated in faction warfare in the past 14 days
             * @maxItems 10
             */
            active_total: {
              /**
               * get_fw_leaderboards_corporations_active_total_amount
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_corporations_active_total_corporation_id
               * corporation_id integer
               * @format int32
               */
              corporation_id?: number;
            }[];
            /**
             * get_fw_leaderboards_corporations_victory_points_last_week
             * Top 10 ranking of corporations by victory points in the past week
             * @maxItems 10
             */
            last_week: {
              /**
               * get_fw_leaderboards_corporations_last_week_amount_1
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_corporations_last_week_corporation_id_1
               * corporation_id integer
               * @format int32
               */
              corporation_id?: number;
            }[];
            /**
             * get_fw_leaderboards_corporations_victory_points_yesterday
             * Top 10 ranking of corporations by victory points in the past day
             * @maxItems 10
             */
            yesterday: {
              /**
               * get_fw_leaderboards_corporations_yesterday_amount_1
               * Amount of victory points
               * @format int32
               */
              amount?: number;
              /**
               * get_fw_leaderboards_corporations_yesterday_corporation_id_1
               * corporation_id integer
               * @format int32
               */
              corporation_id?: number;
            }[];
          };
        },
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/fw/leaderboards/corporations/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Statistical overviews of factions involved in faction warfare --- Alternate route: `/dev/fw/stats/` Alternate route: `/legacy/fw/stats/` Alternate route: `/v1/fw/stats/` Alternate route: `/v2/fw/stats/` --- This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwStats
     * @summary An overview of statistics about factions involved in faction warfare
     * @request GET:/fw/stats/
     */
    getFwStats: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fw_stats_faction_id
           * faction_id integer
           * @format int32
           */
          faction_id: number;
          /**
           * get_fw_stats_kills
           * Summary of kills against an enemy faction for the given faction
           */
          kills: {
            /**
             * get_fw_stats_last_week
             * Last week's total number of kills against enemy factions
             * @format int32
             */
            last_week: number;
            /**
             * get_fw_stats_total
             * Total number of kills against enemy factions since faction warfare began
             * @format int32
             */
            total: number;
            /**
             * get_fw_stats_yesterday
             * Yesterday's total number of kills against enemy factions
             * @format int32
             */
            yesterday: number;
          };
          /**
           * get_fw_stats_pilots
           * How many pilots fight for the given faction
           * @format int32
           */
          pilots: number;
          /**
           * get_fw_stats_systems_controlled
           * The number of solar systems controlled by the given faction
           * @format int32
           */
          systems_controlled: number;
          /**
           * get_fw_stats_victory_points
           * Summary of victory points gained for the given faction
           */
          victory_points: {
            /**
             * get_fw_stats_victory_points_last_week
             * Last week's victory points gained
             * @format int32
             */
            last_week: number;
            /**
             * get_fw_stats_victory_points_total
             * Total victory points gained since faction warfare began
             * @format int32
             */
            total: number;
            /**
             * get_fw_stats_victory_points_yesterday
             * Yesterday's victory points gained
             * @format int32
             */
            yesterday: number;
          };
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/fw/stats/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description An overview of the current ownership of faction warfare solar systems --- Alternate route: `/dev/fw/systems/` Alternate route: `/legacy/fw/systems/` Alternate route: `/v2/fw/systems/` Alternate route: `/v3/fw/systems/` --- This route is cached for up to 1800 seconds
     *
     * @tags Faction Warfare
     * @name GetFwSystems
     * @summary Ownership of faction warfare systems
     * @request GET:/fw/systems/
     */
    getFwSystems: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fw_systems_contested
           * contested string
           */
          contested: "captured" | "contested" | "uncontested" | "vulnerable";
          /**
           * get_fw_systems_occupier_faction_id
           * occupier_faction_id integer
           * @format int32
           */
          occupier_faction_id: number;
          /**
           * get_fw_systems_owner_faction_id
           * owner_faction_id integer
           * @format int32
           */
          owner_faction_id: number;
          /**
           * get_fw_systems_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_fw_systems_victory_points
           * victory_points integer
           * @format int32
           */
          victory_points: number;
          /**
           * get_fw_systems_victory_points_threshold
           * victory_points_threshold integer
           * @format int32
           */
          victory_points_threshold: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/fw/systems/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Data about which NPC factions are at war --- Alternate route: `/dev/fw/wars/` Alternate route: `/legacy/fw/wars/` Alternate route: `/v1/fw/wars/` Alternate route: `/v2/fw/wars/` --- This route expires daily at 11:05
     *
     * @tags Faction Warfare
     * @name GetFwWars
     * @summary Data about which NPC factions are at war
     * @request GET:/fw/wars/
     */
    getFwWars: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_fw_wars_against_id
           * The faction ID of the enemy faction.
           * @format int32
           */
          against_id: number;
          /**
           * get_fw_wars_faction_id
           * faction_id integer
           * @format int32
           */
          faction_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/fw/wars/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  incursions = {
    /**
     * @description Return a list of current incursions --- Alternate route: `/dev/incursions/` Alternate route: `/legacy/incursions/` Alternate route: `/v1/incursions/` --- This route is cached for up to 300 seconds
     *
     * @tags Incursions
     * @name GetIncursions
     * @summary List incursions
     * @request GET:/incursions/
     */
    getIncursions: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_incursions_constellation_id
           * The constellation id in which this incursion takes place
           * @format int32
           */
          constellation_id: number;
          /**
           * get_incursions_faction_id
           * The attacking faction's id
           * @format int32
           */
          faction_id: number;
          /**
           * get_incursions_has_boss
           * Whether the final encounter has boss or not
           */
          has_boss: boolean;
          /**
           * get_incursions_infested_solar_systems
           * A list of infested solar system ids that are a part of this incursion
           * @maxItems 100
           */
          infested_solar_systems: number[];
          /**
           * get_incursions_influence
           * Influence of this incursion as a float from 0 to 1
           * @format float
           */
          influence: number;
          /**
           * get_incursions_staging_solar_system_id
           * Staging solar system for this incursion
           * @format int32
           */
          staging_solar_system_id: number;
          /**
           * get_incursions_state
           * The state of this incursion
           */
          state: "withdrawing" | "mobilizing" | "established";
          /**
           * get_incursions_type
           * The type of this incursion
           */
          type: string;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/incursions/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  industry = {
    /**
     * @description Return a list of industry facilities --- Alternate route: `/dev/industry/facilities/` Alternate route: `/legacy/industry/facilities/` Alternate route: `/v1/industry/facilities/` --- This route is cached for up to 3600 seconds
     *
     * @tags Industry
     * @name GetIndustryFacilities
     * @summary List industry facilities
     * @request GET:/industry/facilities/
     */
    getIndustryFacilities: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_industry_facilities_facility_id
           * ID of the facility
           * @format int64
           */
          facility_id: number;
          /**
           * get_industry_facilities_owner_id
           * Owner of the facility
           * @format int32
           */
          owner_id: number;
          /**
           * get_industry_facilities_region_id
           * Region ID where the facility is
           * @format int32
           */
          region_id: number;
          /**
           * get_industry_facilities_solar_system_id
           * Solar system ID where the facility is
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_industry_facilities_tax
           * Tax imposed by the facility
           * @format float
           */
          tax?: number;
          /**
           * get_industry_facilities_type_id
           * Type ID of the facility
           * @format int32
           */
          type_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/industry/facilities/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return cost indices for solar systems --- Alternate route: `/dev/industry/systems/` Alternate route: `/legacy/industry/systems/` Alternate route: `/v1/industry/systems/` --- This route is cached for up to 3600 seconds
     *
     * @tags Industry
     * @name GetIndustrySystems
     * @summary List solar system cost indices
     * @request GET:/industry/systems/
     */
    getIndustrySystems: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_industry_systems_cost_indices
           * cost_indices array
           * @maxItems 10
           */
          cost_indices: {
            /**
             * get_industry_systems_activity
             * activity string
             */
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
            /**
             * get_industry_systems_cost_index
             * cost_index number
             * @format float
             */
            cost_index: number;
          }[];
          /**
           * get_industry_systems_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/industry/systems/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  insurance = {
    /**
     * @description Return available insurance levels for all ship types --- Alternate route: `/dev/insurance/prices/` Alternate route: `/legacy/insurance/prices/` Alternate route: `/v1/insurance/prices/` --- This route is cached for up to 3600 seconds
     *
     * @tags Insurance
     * @name GetInsurancePrices
     * @summary List insurance levels
     * @request GET:/insurance/prices/
     */
    getInsurancePrices: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_insurance_prices_levels
           * A list of a available insurance levels for this ship type
           * @maxItems 6
           */
          levels: {
            /**
             * get_insurance_prices_cost
             * cost number
             * @format float
             */
            cost: number;
            /**
             * get_insurance_prices_name
             * Localized insurance level
             */
            name: string;
            /**
             * get_insurance_prices_payout
             * payout number
             * @format float
             */
            payout: number;
          }[];
          /**
           * get_insurance_prices_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/insurance/prices/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  killmails = {
    /**
     * @description Return a single killmail from its ID and hash --- Alternate route: `/dev/killmails/{killmail_id}/{killmail_hash}/` Alternate route: `/legacy/killmails/{killmail_id}/{killmail_hash}/` Alternate route: `/v1/killmails/{killmail_id}/{killmail_hash}/` --- This route is cached for up to 30758400 seconds
     *
     * @tags Killmails
     * @name GetKillmailsKillmailIdKillmailHash
     * @summary Get a single killmail
     * @request GET:/killmails/{killmail_id}/{killmail_hash}/
     */
    getKillmailsKillmailIdKillmailHash: (
      killmailHash: string,
      killmailId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_killmails_killmail_id_killmail_hash_attackers
           * attackers array
           * @maxItems 10000
           */
          attackers: {
            /**
             * get_killmails_killmail_id_killmail_hash_alliance_id
             * alliance_id integer
             * @format int32
             */
            alliance_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_character_id
             * character_id integer
             * @format int32
             */
            character_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_corporation_id
             * corporation_id integer
             * @format int32
             */
            corporation_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_damage_done
             * damage_done integer
             * @format int32
             */
            damage_done: number;
            /**
             * get_killmails_killmail_id_killmail_hash_faction_id
             * faction_id integer
             * @format int32
             */
            faction_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_final_blow
             * Was the attacker the one to achieve the final blow
             */
            final_blow: boolean;
            /**
             * get_killmails_killmail_id_killmail_hash_security_status
             * Security status for the attacker
             * @format float
             */
            security_status: number;
            /**
             * get_killmails_killmail_id_killmail_hash_ship_type_id
             * What ship was the attacker flying
             * @format int32
             */
            ship_type_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_weapon_type_id
             * What weapon was used by the attacker for the kill
             * @format int32
             */
            weapon_type_id?: number;
          }[];
          /**
           * get_killmails_killmail_id_killmail_hash_killmail_id
           * ID of the killmail
           * @format int32
           */
          killmail_id: number;
          /**
           * get_killmails_killmail_id_killmail_hash_killmail_time
           * Time that the victim was killed and the killmail generated
           * @format date-time
           */
          killmail_time: string;
          /**
           * get_killmails_killmail_id_killmail_hash_moon_id
           * Moon if the kill took place at one
           * @format int32
           */
          moon_id?: number;
          /**
           * get_killmails_killmail_id_killmail_hash_solar_system_id
           * Solar system that the kill took place in
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_killmails_killmail_id_killmail_hash_victim
           * victim object
           */
          victim: {
            /**
             * get_killmails_killmail_id_killmail_hash_victim_alliance_id
             * alliance_id integer
             * @format int32
             */
            alliance_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_victim_character_id
             * character_id integer
             * @format int32
             */
            character_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_victim_corporation_id
             * corporation_id integer
             * @format int32
             */
            corporation_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_damage_taken
             * How much total damage was taken by the victim
             * @format int32
             */
            damage_taken: number;
            /**
             * get_killmails_killmail_id_killmail_hash_victim_faction_id
             * faction_id integer
             * @format int32
             */
            faction_id?: number;
            /**
             * get_killmails_killmail_id_killmail_hash_items
             * items array
             * @maxItems 10000
             */
            items?: {
              /**
               * get_killmails_killmail_id_killmail_hash_flag
               * Flag for the location of the item
               * @format int32
               */
              flag: number;
              /**
               * get_killmails_killmail_id_killmail_hash_item_type_id
               * item_type_id integer
               * @format int32
               */
              item_type_id: number;
              /**
               * get_killmails_killmail_id_killmail_hash_item_items
               * items array
               * @maxItems 10000
               */
              items?: {
                /**
                 * get_killmails_killmail_id_killmail_hash_item_flag
                 * flag integer
                 * @format int32
                 */
                flag: number;
                /**
                 * get_killmails_killmail_id_killmail_hash_item_item_type_id
                 * item_type_id integer
                 * @format int32
                 */
                item_type_id: number;
                /**
                 * get_killmails_killmail_id_killmail_hash_item_quantity_destroyed
                 * quantity_destroyed integer
                 * @format int64
                 */
                quantity_destroyed?: number;
                /**
                 * get_killmails_killmail_id_killmail_hash_item_quantity_dropped
                 * quantity_dropped integer
                 * @format int64
                 */
                quantity_dropped?: number;
                /**
                 * get_killmails_killmail_id_killmail_hash_item_singleton
                 * singleton integer
                 * @format int32
                 */
                singleton: number;
              }[];
              /**
               * get_killmails_killmail_id_killmail_hash_quantity_destroyed
               * How many of the item were destroyed if any
               * @format int64
               */
              quantity_destroyed?: number;
              /**
               * get_killmails_killmail_id_killmail_hash_quantity_dropped
               * How many of the item were dropped if any
               * @format int64
               */
              quantity_dropped?: number;
              /**
               * get_killmails_killmail_id_killmail_hash_singleton
               * singleton integer
               * @format int32
               */
              singleton: number;
            }[];
            /**
             * get_killmails_killmail_id_killmail_hash_position
             * Coordinates of the victim in Cartesian space relative to the Sun
             */
            position?: {
              /**
               * get_killmails_killmail_id_killmail_hash_x
               * x number
               * @format double
               */
              x: number;
              /**
               * get_killmails_killmail_id_killmail_hash_y
               * y number
               * @format double
               */
              y: number;
              /**
               * get_killmails_killmail_id_killmail_hash_z
               * z number
               * @format double
               */
              z: number;
            };
            /**
             * get_killmails_killmail_id_killmail_hash_victim_ship_type_id
             * The ship that the victim was piloting and was destroyed
             * @format int32
             */
            ship_type_id: number;
          };
          /**
           * get_killmails_killmail_id_killmail_hash_war_id
           * War if the killmail is generated in relation to an official war
           * @format int32
           */
          war_id?: number;
        },
        | void
        | BadRequest
        | ErrorLimited
        | {
            /**
             * get_killmails_killmail_id_killmail_hash_422_unprocessable_entity
             * Unprocessable entity message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/killmails/${killmailId}/${killmailHash}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  loyalty = {
    /**
     * @description Return a list of offers from a specific corporation's loyalty store --- Alternate route: `/dev/loyalty/stores/{corporation_id}/offers/` Alternate route: `/legacy/loyalty/stores/{corporation_id}/offers/` Alternate route: `/v1/loyalty/stores/{corporation_id}/offers/` --- This route expires daily at 11:05
     *
     * @tags Loyalty
     * @name GetLoyaltyStoresCorporationIdOffers
     * @summary List loyalty store offers
     * @request GET:/loyalty/stores/{corporation_id}/offers/
     */
    getLoyaltyStoresCorporationIdOffers: (
      corporationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_loyalty_stores_corporation_id_offers_ak_cost
           * Analysis kredit cost
           * @format int32
           */
          ak_cost?: number;
          /**
           * get_loyalty_stores_corporation_id_offers_isk_cost
           * isk_cost integer
           * @format int64
           */
          isk_cost: number;
          /**
           * get_loyalty_stores_corporation_id_offers_lp_cost
           * lp_cost integer
           * @format int32
           */
          lp_cost: number;
          /**
           * get_loyalty_stores_corporation_id_offers_offer_id
           * offer_id integer
           * @format int32
           */
          offer_id: number;
          /**
           * get_loyalty_stores_corporation_id_offers_quantity
           * quantity integer
           * @format int32
           */
          quantity: number;
          /**
           * get_loyalty_stores_corporation_id_offers_required_items
           * required_items array
           * @maxItems 100
           */
          required_items: {
            /**
             * get_loyalty_stores_corporation_id_offers_required_item_quantity
             * quantity integer
             * @format int32
             */
            quantity: number;
            /**
             * get_loyalty_stores_corporation_id_offers_required_item_type_id
             * type_id integer
             * @format int32
             */
            type_id: number;
          }[];
          /**
           * get_loyalty_stores_corporation_id_offers_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        | void
        | BadRequest
        | {
            /**
             * get_loyalty_stores_corporation_id_offers_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/loyalty/stores/${corporationId}/offers/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  markets = {
    /**
     * @description Get a list of item groups --- Alternate route: `/dev/markets/groups/` Alternate route: `/legacy/markets/groups/` Alternate route: `/v1/markets/groups/` --- This route expires daily at 11:05
     *
     * @tags Market
     * @name GetMarketsGroups
     * @summary Get item groups
     * @request GET:/markets/groups/
     */
    getMarketsGroups: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/markets/groups/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on an item group --- Alternate route: `/dev/markets/groups/{market_group_id}/` Alternate route: `/legacy/markets/groups/{market_group_id}/` Alternate route: `/v1/markets/groups/{market_group_id}/` --- This route expires daily at 11:05
     *
     * @tags Market
     * @name GetMarketsGroupsMarketGroupId
     * @summary Get item group information
     * @request GET:/markets/groups/{market_group_id}/
     */
    getMarketsGroupsMarketGroupId: (
      marketGroupId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_markets_groups_market_group_id_description
           * description string
           */
          description: string;
          /**
           * get_markets_groups_market_group_id_market_group_id
           * market_group_id integer
           * @format int32
           */
          market_group_id: number;
          /**
           * get_markets_groups_market_group_id_name
           * name string
           */
          name: string;
          /**
           * get_markets_groups_market_group_id_parent_group_id
           * parent_group_id integer
           * @format int32
           */
          parent_group_id?: number;
          /**
           * get_markets_groups_market_group_id_types
           * types array
           * @maxItems 5000
           */
          types: number[];
        },
        | void
        | BadRequest
        | {
            /**
             * get_markets_groups_market_group_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/markets/groups/${marketGroupId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of prices --- Alternate route: `/dev/markets/prices/` Alternate route: `/legacy/markets/prices/` Alternate route: `/v1/markets/prices/` --- This route is cached for up to 3600 seconds
     *
     * @tags Market
     * @name GetMarketsPrices
     * @summary List market prices
     * @request GET:/markets/prices/
     */
    getMarketsPrices: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_markets_prices_adjusted_price
           * adjusted_price number
           * @format double
           */
          adjusted_price?: number;
          /**
           * get_markets_prices_average_price
           * average_price number
           * @format double
           */
          average_price?: number;
          /**
           * get_markets_prices_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/markets/prices/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return all orders in a structure --- Alternate route: `/dev/markets/structures/{structure_id}/` Alternate route: `/legacy/markets/structures/{structure_id}/` Alternate route: `/v1/markets/structures/{structure_id}/` --- This route is cached for up to 300 seconds
     *
     * @tags Market
     * @name GetMarketsStructuresStructureId
     * @summary List orders in a structure
     * @request GET:/markets/structures/{structure_id}/
     * @secure
     */
    getMarketsStructuresStructureId: (
      structureId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_markets_structures_structure_id_duration
           * duration integer
           * @format int32
           */
          duration: number;
          /**
           * get_markets_structures_structure_id_is_buy_order
           * is_buy_order boolean
           */
          is_buy_order: boolean;
          /**
           * get_markets_structures_structure_id_issued
           * issued string
           * @format date-time
           */
          issued: string;
          /**
           * get_markets_structures_structure_id_location_id
           * location_id integer
           * @format int64
           */
          location_id: number;
          /**
           * get_markets_structures_structure_id_min_volume
           * min_volume integer
           * @format int32
           */
          min_volume: number;
          /**
           * get_markets_structures_structure_id_order_id
           * order_id integer
           * @format int64
           */
          order_id: number;
          /**
           * get_markets_structures_structure_id_price
           * price number
           * @format double
           */
          price: number;
          /**
           * get_markets_structures_structure_id_range
           * range string
           */
          range: "station" | "region" | "solarsystem" | "1" | "2" | "3" | "4" | "5" | "10" | "20" | "30" | "40";
          /**
           * get_markets_structures_structure_id_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
          /**
           * get_markets_structures_structure_id_volume_remain
           * volume_remain integer
           * @format int32
           */
          volume_remain: number;
          /**
           * get_markets_structures_structure_id_volume_total
           * volume_total integer
           * @format int32
           */
          volume_total: number;
        }[],
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/markets/structures/${structureId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of historical market statistics for the specified type in a region --- Alternate route: `/dev/markets/{region_id}/history/` Alternate route: `/legacy/markets/{region_id}/history/` Alternate route: `/v1/markets/{region_id}/history/` --- This route expires daily at 11:05
     *
     * @tags Market
     * @name GetMarketsRegionIdHistory
     * @summary List historical market statistics in a region
     * @request GET:/markets/{region_id}/history/
     */
    getMarketsRegionIdHistory: (
      regionId: number,
      query: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Return statistics for this type
         * @format int32
         */
        type_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_markets_region_id_history_average
           * average number
           * @format double
           */
          average: number;
          /**
           * get_markets_region_id_history_date
           * The date of this historical statistic entry
           * @format date
           */
          date: string;
          /**
           * get_markets_region_id_history_highest
           * highest number
           * @format double
           */
          highest: number;
          /**
           * get_markets_region_id_history_lowest
           * lowest number
           * @format double
           */
          lowest: number;
          /**
           * get_markets_region_id_history_order_count
           * Total number of orders happened that day
           * @format int64
           */
          order_count: number;
          /**
           * get_markets_region_id_history_volume
           * Total
           * @format int64
           */
          volume: number;
        }[],
        | void
        | BadRequest
        | {
            /**
             * get_markets_region_id_history_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | {
            /**
             * get_markets_region_id_history_422_unprocessable_entity
             * Unprocessable entity message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
        | {
            /**
             * get_markets_region_id_history_520_error_520
             * Error 520 message
             */
            error?: string;
          }
      >({
        path: `/markets/${regionId}/history/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of orders in a region --- Alternate route: `/dev/markets/{region_id}/orders/` Alternate route: `/legacy/markets/{region_id}/orders/` Alternate route: `/v1/markets/{region_id}/orders/` --- This route is cached for up to 300 seconds
     *
     * @tags Market
     * @name GetMarketsRegionIdOrders
     * @summary List orders in a region
     * @request GET:/markets/{region_id}/orders/
     */
    getMarketsRegionIdOrders: (
      regionId: number,
      query: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Filter buy/sell orders, return all orders by default. If you query without type_id, we always return both buy and sell orders
         * @default "all"
         */
        order_type: "buy" | "sell" | "all";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Return orders only for this type
         * @format int32
         */
        type_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_markets_region_id_orders_duration
           * duration integer
           * @format int32
           */
          duration: number;
          /**
           * get_markets_region_id_orders_is_buy_order
           * is_buy_order boolean
           */
          is_buy_order: boolean;
          /**
           * get_markets_region_id_orders_issued
           * issued string
           * @format date-time
           */
          issued: string;
          /**
           * get_markets_region_id_orders_location_id
           * location_id integer
           * @format int64
           */
          location_id: number;
          /**
           * get_markets_region_id_orders_min_volume
           * min_volume integer
           * @format int32
           */
          min_volume: number;
          /**
           * get_markets_region_id_orders_order_id
           * order_id integer
           * @format int64
           */
          order_id: number;
          /**
           * get_markets_region_id_orders_price
           * price number
           * @format double
           */
          price: number;
          /**
           * get_markets_region_id_orders_range
           * range string
           */
          range: "station" | "region" | "solarsystem" | "1" | "2" | "3" | "4" | "5" | "10" | "20" | "30" | "40";
          /**
           * get_markets_region_id_orders_system_id
           * The solar system this order was placed
           * @format int32
           */
          system_id: number;
          /**
           * get_markets_region_id_orders_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
          /**
           * get_markets_region_id_orders_volume_remain
           * volume_remain integer
           * @format int32
           */
          volume_remain: number;
          /**
           * get_markets_region_id_orders_volume_total
           * volume_total integer
           * @format int32
           */
          volume_total: number;
        }[],
        | void
        | BadRequest
        | {
            /**
             * get_markets_region_id_orders_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | {
            /**
             * get_markets_region_id_orders_422_unprocessable_entity
             * Unprocessable entity message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/markets/${regionId}/orders/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of type IDs that have active orders in the region, for efficient market indexing. --- Alternate route: `/dev/markets/{region_id}/types/` Alternate route: `/legacy/markets/{region_id}/types/` Alternate route: `/v1/markets/{region_id}/types/` --- This route is cached for up to 600 seconds
     *
     * @tags Market
     * @name GetMarketsRegionIdTypes
     * @summary List type IDs relevant to a market
     * @request GET:/markets/{region_id}/types/
     */
    getMarketsRegionIdTypes: (
      regionId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/markets/${regionId}/types/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  opportunities = {
    /**
     * @description Return a list of opportunities groups --- Alternate route: `/dev/opportunities/groups/` Alternate route: `/legacy/opportunities/groups/` Alternate route: `/v1/opportunities/groups/` --- This route expires daily at 11:05
     *
     * @tags Opportunities
     * @name GetOpportunitiesGroups
     * @summary Get opportunities groups
     * @request GET:/opportunities/groups/
     */
    getOpportunitiesGroups: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/opportunities/groups/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return information of an opportunities group --- Alternate route: `/dev/opportunities/groups/{group_id}/` Alternate route: `/legacy/opportunities/groups/{group_id}/` Alternate route: `/v1/opportunities/groups/{group_id}/` --- This route expires daily at 11:05
     *
     * @tags Opportunities
     * @name GetOpportunitiesGroupsGroupId
     * @summary Get opportunities group
     * @request GET:/opportunities/groups/{group_id}/
     */
    getOpportunitiesGroupsGroupId: (
      groupId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_opportunities_groups_group_id_connected_groups
           * The groups that are connected to this group on the opportunities map
           * @maxItems 50
           */
          connected_groups: number[];
          /**
           * get_opportunities_groups_group_id_description
           * description string
           */
          description: string;
          /**
           * get_opportunities_groups_group_id_group_id
           * group_id integer
           * @format int32
           */
          group_id: number;
          /**
           * get_opportunities_groups_group_id_name
           * name string
           */
          name: string;
          /**
           * get_opportunities_groups_group_id_notification
           * notification string
           */
          notification: string;
          /**
           * get_opportunities_groups_group_id_required_tasks
           * Tasks need to complete for this group
           * @maxItems 100
           */
          required_tasks: number[];
        },
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/opportunities/groups/${groupId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of opportunities tasks --- Alternate route: `/dev/opportunities/tasks/` Alternate route: `/legacy/opportunities/tasks/` Alternate route: `/v1/opportunities/tasks/` --- This route expires daily at 11:05
     *
     * @tags Opportunities
     * @name GetOpportunitiesTasks
     * @summary Get opportunities tasks
     * @request GET:/opportunities/tasks/
     */
    getOpportunitiesTasks: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/opportunities/tasks/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return information of an opportunities task --- Alternate route: `/dev/opportunities/tasks/{task_id}/` Alternate route: `/legacy/opportunities/tasks/{task_id}/` Alternate route: `/v1/opportunities/tasks/{task_id}/` --- This route expires daily at 11:05
     *
     * @tags Opportunities
     * @name GetOpportunitiesTasksTaskId
     * @summary Get opportunities task
     * @request GET:/opportunities/tasks/{task_id}/
     */
    getOpportunitiesTasksTaskId: (
      taskId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_opportunities_tasks_task_id_description
           * description string
           */
          description: string;
          /**
           * get_opportunities_tasks_task_id_name
           * name string
           */
          name: string;
          /**
           * get_opportunities_tasks_task_id_notification
           * notification string
           */
          notification: string;
          /**
           * get_opportunities_tasks_task_id_task_id
           * task_id integer
           * @format int32
           */
          task_id: number;
        },
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/opportunities/tasks/${taskId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  route = {
    /**
     * @description Get the systems between origin and destination --- Alternate route: `/dev/route/{origin}/{destination}/` Alternate route: `/legacy/route/{origin}/{destination}/` Alternate route: `/v1/route/{origin}/{destination}/` --- This route is cached for up to 86400 seconds
     *
     * @tags Routes
     * @name GetRouteOriginDestination
     * @summary Get route
     * @request GET:/route/{origin}/{destination}/
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
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * route security preference
         * @default "shortest"
         */
        flag?: "shortest" | "secure" | "insecure";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        | void
        | BadRequest
        | {
            /**
             * get_route_origin_destination_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/route/${origin}/${destination}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  sovereignty = {
    /**
     * @description Shows sovereignty data for campaigns. --- Alternate route: `/dev/sovereignty/campaigns/` Alternate route: `/legacy/sovereignty/campaigns/` Alternate route: `/v1/sovereignty/campaigns/` --- This route is cached for up to 5 seconds
     *
     * @tags Sovereignty
     * @name GetSovereigntyCampaigns
     * @summary List sovereignty campaigns
     * @request GET:/sovereignty/campaigns/
     */
    getSovereigntyCampaigns: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_sovereignty_campaigns_attackers_score
           * Score for all attacking parties, only present in Defense Events.
           * @format float
           */
          attackers_score?: number;
          /**
           * get_sovereignty_campaigns_campaign_id
           * Unique ID for this campaign.
           * @format int32
           */
          campaign_id: number;
          /**
           * get_sovereignty_campaigns_constellation_id
           * The constellation in which the campaign will take place.
           * @format int32
           */
          constellation_id: number;
          /**
           * get_sovereignty_campaigns_defender_id
           * Defending alliance, only present in Defense Events
           * @format int32
           */
          defender_id?: number;
          /**
           * get_sovereignty_campaigns_defender_score
           * Score for the defending alliance, only present in Defense Events.
           * @format float
           */
          defender_score?: number;
          /**
           * get_sovereignty_campaigns_event_type
           * Type of event this campaign is for. tcu_defense, ihub_defense and station_defense are referred to as "Defense Events", station_freeport as "Freeport Events".
           */
          event_type: "tcu_defense" | "ihub_defense" | "station_defense" | "station_freeport";
          /**
           * get_sovereignty_campaigns_participants
           * Alliance participating and their respective scores, only present in Freeport Events.
           * @maxItems 5000
           */
          participants?: {
            /**
             * get_sovereignty_campaigns_alliance_id
             * alliance_id integer
             * @format int32
             */
            alliance_id: number;
            /**
             * get_sovereignty_campaigns_score
             * score number
             * @format float
             */
            score: number;
          }[];
          /**
           * get_sovereignty_campaigns_solar_system_id
           * The solar system the structure is located in.
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_sovereignty_campaigns_start_time
           * Time the event is scheduled to start.
           * @format date-time
           */
          start_time: string;
          /**
           * get_sovereignty_campaigns_structure_id
           * The structure item ID that is related to this campaign.
           * @format int64
           */
          structure_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/sovereignty/campaigns/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Shows sovereignty information for solar systems --- Alternate route: `/dev/sovereignty/map/` Alternate route: `/legacy/sovereignty/map/` Alternate route: `/v1/sovereignty/map/` --- This route is cached for up to 3600 seconds
     *
     * @tags Sovereignty
     * @name GetSovereigntyMap
     * @summary List sovereignty of systems
     * @request GET:/sovereignty/map/
     */
    getSovereigntyMap: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_sovereignty_map_alliance_id
           * alliance_id integer
           * @format int32
           */
          alliance_id?: number;
          /**
           * get_sovereignty_map_corporation_id
           * corporation_id integer
           * @format int32
           */
          corporation_id?: number;
          /**
           * get_sovereignty_map_faction_id
           * faction_id integer
           * @format int32
           */
          faction_id?: number;
          /**
           * get_sovereignty_map_system_id
           * system_id integer
           * @format int32
           */
          system_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/sovereignty/map/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Shows sovereignty data for structures. --- Alternate route: `/dev/sovereignty/structures/` Alternate route: `/legacy/sovereignty/structures/` Alternate route: `/v1/sovereignty/structures/` --- This route is cached for up to 120 seconds
     *
     * @tags Sovereignty
     * @name GetSovereigntyStructures
     * @summary List sovereignty structures
     * @request GET:/sovereignty/structures/
     */
    getSovereigntyStructures: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_sovereignty_structures_alliance_id
           * The alliance that owns the structure.
           * @format int32
           */
          alliance_id: number;
          /**
           * get_sovereignty_structures_solar_system_id
           * Solar system in which the structure is located.
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_sovereignty_structures_structure_id
           * Unique item ID for this structure.
           * @format int64
           */
          structure_id: number;
          /**
           * get_sovereignty_structures_structure_type_id
           * A reference to the type of structure this is.
           * @format int32
           */
          structure_type_id: number;
          /**
           * get_sovereignty_structures_vulnerability_occupancy_level
           * The occupancy level for the next or current vulnerability window. This takes into account all development indexes and capital system bonuses. Also known as Activity Defense Multiplier from in the client. It increases the time that attackers must spend using their entosis links on the structure.
           * @format float
           */
          vulnerability_occupancy_level?: number;
          /**
           * get_sovereignty_structures_vulnerable_end_time
           * The time at which the next or current vulnerability window ends. At the end of a vulnerability window the next window is recalculated and locked in along with the vulnerabilityOccupancyLevel. If the structure is not in 100% entosis control of the defender, it will go in to 'overtime' and stay vulnerable for as long as that situation persists. Only once the defenders have 100% entosis control and has the vulnerableEndTime passed does the vulnerability interval expire and a new one is calculated.
           * @format date-time
           */
          vulnerable_end_time?: string;
          /**
           * get_sovereignty_structures_vulnerable_start_time
           * The next time at which the structure will become vulnerable. Or the start time of the current window if current time is between this and vulnerableEndTime.
           * @format date-time
           */
          vulnerable_start_time?: string;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/sovereignty/structures/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  status = {
    /**
     * @description EVE Server status --- Alternate route: `/dev/status/` Alternate route: `/legacy/status/` Alternate route: `/v1/status/` Alternate route: `/v2/status/` --- This route is cached for up to 30 seconds
     *
     * @tags Status
     * @name GetStatus
     * @summary Retrieve the uptime and player counts
     * @request GET:/status/
     */
    getStatus: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_status_players
           * Current online player count
           */
          players: number;
          /**
           * get_status_server_version
           * Running version as string
           */
          server_version: string;
          /**
           * get_status_start_time
           * Server start timestamp
           * @format date-time
           */
          start_time: string;
          /**
           * get_status_vip
           * If the server is in VIP mode
           */
          vip?: boolean;
        },
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/status/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  ui = {
    /**
     * @description Set a solar system as autopilot waypoint --- Alternate route: `/dev/ui/autopilot/waypoint/` Alternate route: `/legacy/ui/autopilot/waypoint/` Alternate route: `/v2/ui/autopilot/waypoint/`
     *
     * @tags User Interface
     * @name PostUiAutopilotWaypoint
     * @summary Set Autopilot Waypoint
     * @request POST:/ui/autopilot/waypoint/
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
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * The destination to travel to, can be solar system, station or structure's id
         * @format int64
         */
        destination_id: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/ui/autopilot/waypoint/`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the contract window inside the client --- Alternate route: `/dev/ui/openwindow/contract/` Alternate route: `/legacy/ui/openwindow/contract/` Alternate route: `/v1/ui/openwindow/contract/`
     *
     * @tags User Interface
     * @name PostUiOpenwindowContract
     * @summary Open Contract Window
     * @request POST:/ui/openwindow/contract/
     * @secure
     */
    postUiOpenwindowContract: (
      query: {
        /**
         * The contract to open
         * @format int32
         */
        contract_id: number;
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/ui/openwindow/contract/`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the information window for a character, corporation or alliance inside the client --- Alternate route: `/dev/ui/openwindow/information/` Alternate route: `/legacy/ui/openwindow/information/` Alternate route: `/v1/ui/openwindow/information/`
     *
     * @tags User Interface
     * @name PostUiOpenwindowInformation
     * @summary Open Information Window
     * @request POST:/ui/openwindow/information/
     * @secure
     */
    postUiOpenwindowInformation: (
      query: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * The target to open
         * @format int32
         */
        target_id: number;
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/ui/openwindow/information/`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the market details window for a specific typeID inside the client --- Alternate route: `/dev/ui/openwindow/marketdetails/` Alternate route: `/legacy/ui/openwindow/marketdetails/` Alternate route: `/v1/ui/openwindow/marketdetails/`
     *
     * @tags User Interface
     * @name PostUiOpenwindowMarketdetails
     * @summary Open Market Details
     * @request POST:/ui/openwindow/marketdetails/
     * @secure
     */
    postUiOpenwindowMarketdetails: (
      query: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
        /**
         * The item type to open in market window
         * @format int32
         */
        type_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        BadRequest | Unauthorized | Forbidden | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/ui/openwindow/marketdetails/`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Open the New Mail window, according to settings from the request if applicable --- Alternate route: `/dev/ui/openwindow/newmail/` Alternate route: `/legacy/ui/openwindow/newmail/` Alternate route: `/v1/ui/openwindow/newmail/`
     *
     * @tags User Interface
     * @name PostUiOpenwindowNewmail
     * @summary Open New Mail Window
     * @request POST:/ui/openwindow/newmail/
     * @secure
     */
    postUiOpenwindowNewmail: (
      new_mail: {
        /**
         * post_ui_openwindow_newmail_body
         * body string
         * @maxLength 10000
         */
        body: string;
        /**
         * post_ui_openwindow_newmail_recipients
         * recipients array
         * @maxItems 50
         * @minItems 1
         */
        recipients: number[];
        /**
         * post_ui_openwindow_newmail_subject
         * subject string
         * @maxLength 1000
         */
        subject: string;
        /**
         * post_ui_openwindow_newmail_to_corp_or_alliance_id
         * to_corp_or_alliance_id integer
         * @format int32
         */
        to_corp_or_alliance_id?: number;
        /**
         * post_ui_openwindow_newmail_to_mailing_list_id
         * Corporations, alliances and mailing lists are all types of mailing groups. You may only send to one mailing group, at a time, so you may fill out either this field or the to_corp_or_alliance_ids field
         * @format int32
         */
        to_mailing_list_id?: number;
      },
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequest
        | Unauthorized
        | Forbidden
        | ErrorLimited
        | {
            /**
             * post_ui_openwindow_newmail_422_unprocessable_entity
             * Unprocessable entity message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/ui/openwindow/newmail/`,
        method: "POST",
        query: query,
        body: new_mail,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  universe = {
    /**
     * @description Get all character ancestries --- Alternate route: `/legacy/universe/ancestries/` Alternate route: `/v1/universe/ancestries/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseAncestries
     * @summary Get ancestries
     * @request GET:/universe/ancestries/
     */
    getUniverseAncestries: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_ancestries_bloodline_id
           * The bloodline associated with this ancestry
           * @format int32
           */
          bloodline_id: number;
          /**
           * get_universe_ancestries_description
           * description string
           */
          description: string;
          /**
           * get_universe_ancestries_icon_id
           * icon_id integer
           * @format int32
           */
          icon_id?: number;
          /**
           * get_universe_ancestries_id
           * id integer
           * @format int32
           */
          id: number;
          /**
           * get_universe_ancestries_name
           * name string
           */
          name: string;
          /**
           * get_universe_ancestries_short_description
           * short_description string
           */
          short_description?: string;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/ancestries/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on an asteroid belt --- Alternate route: `/legacy/universe/asteroid_belts/{asteroid_belt_id}/` Alternate route: `/v1/universe/asteroid_belts/{asteroid_belt_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseAsteroidBeltsAsteroidBeltId
     * @summary Get asteroid belt information
     * @request GET:/universe/asteroid_belts/{asteroid_belt_id}/
     */
    getUniverseAsteroidBeltsAsteroidBeltId: (
      asteroidBeltId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_asteroid_belts_asteroid_belt_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_asteroid_belts_asteroid_belt_id_position
           * position object
           */
          position: {
            /**
             * get_universe_asteroid_belts_asteroid_belt_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_asteroid_belts_asteroid_belt_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_asteroid_belts_asteroid_belt_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_asteroid_belts_asteroid_belt_id_system_id
           * The solar system this asteroid belt is in
           * @format int32
           */
          system_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_asteroid_belts_asteroid_belt_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/asteroid_belts/${asteroidBeltId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of bloodlines --- Alternate route: `/legacy/universe/bloodlines/` Alternate route: `/v1/universe/bloodlines/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseBloodlines
     * @summary Get bloodlines
     * @request GET:/universe/bloodlines/
     */
    getUniverseBloodlines: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_bloodlines_bloodline_id
           * bloodline_id integer
           * @format int32
           */
          bloodline_id: number;
          /**
           * get_universe_bloodlines_charisma
           * charisma integer
           * @format int32
           */
          charisma: number;
          /**
           * get_universe_bloodlines_corporation_id
           * corporation_id integer
           * @format int32
           */
          corporation_id: number;
          /**
           * get_universe_bloodlines_description
           * description string
           */
          description: string;
          /**
           * get_universe_bloodlines_intelligence
           * intelligence integer
           * @format int32
           */
          intelligence: number;
          /**
           * get_universe_bloodlines_memory
           * memory integer
           * @format int32
           */
          memory: number;
          /**
           * get_universe_bloodlines_name
           * name string
           */
          name: string;
          /**
           * get_universe_bloodlines_perception
           * perception integer
           * @format int32
           */
          perception: number;
          /**
           * get_universe_bloodlines_race_id
           * race_id integer
           * @format int32
           */
          race_id: number;
          /**
           * get_universe_bloodlines_ship_type_id
           * ship_type_id integer
           * @format int32
           */
          ship_type_id?: number | null;
          /**
           * get_universe_bloodlines_willpower
           * willpower integer
           * @format int32
           */
          willpower: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/bloodlines/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of item categories --- Alternate route: `/legacy/universe/categories/` Alternate route: `/v1/universe/categories/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseCategories
     * @summary Get item categories
     * @request GET:/universe/categories/
     */
    getUniverseCategories: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/categories/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information of an item category --- Alternate route: `/legacy/universe/categories/{category_id}/` Alternate route: `/v1/universe/categories/{category_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseCategoriesCategoryId
     * @summary Get item category information
     * @request GET:/universe/categories/{category_id}/
     */
    getUniverseCategoriesCategoryId: (
      categoryId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_categories_category_id_category_id
           * category_id integer
           * @format int32
           */
          category_id: number;
          /**
           * get_universe_categories_category_id_groups
           * groups array
           * @maxItems 10000
           */
          groups: number[];
          /**
           * get_universe_categories_category_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_categories_category_id_published
           * published boolean
           */
          published: boolean;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_categories_category_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/categories/${categoryId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of constellations --- Alternate route: `/legacy/universe/constellations/` Alternate route: `/v1/universe/constellations/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseConstellations
     * @summary Get constellations
     * @request GET:/universe/constellations/
     */
    getUniverseConstellations: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/constellations/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a constellation --- Alternate route: `/legacy/universe/constellations/{constellation_id}/` Alternate route: `/v1/universe/constellations/{constellation_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseConstellationsConstellationId
     * @summary Get constellation information
     * @request GET:/universe/constellations/{constellation_id}/
     */
    getUniverseConstellationsConstellationId: (
      constellationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_constellations_constellation_id_constellation_id
           * constellation_id integer
           * @format int32
           */
          constellation_id: number;
          /**
           * get_universe_constellations_constellation_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_constellations_constellation_id_position
           * position object
           */
          position: {
            /**
             * get_universe_constellations_constellation_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_constellations_constellation_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_constellations_constellation_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_constellations_constellation_id_region_id
           * The region this constellation is in
           * @format int32
           */
          region_id: number;
          /**
           * get_universe_constellations_constellation_id_systems
           * systems array
           * @maxItems 10000
           */
          systems: number[];
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_constellations_constellation_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/constellations/${constellationId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of factions --- Alternate route: `/dev/universe/factions/` Alternate route: `/v2/universe/factions/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseFactions
     * @summary Get factions
     * @request GET:/universe/factions/
     */
    getUniverseFactions: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_factions_corporation_id
           * corporation_id integer
           * @format int32
           */
          corporation_id?: number;
          /**
           * get_universe_factions_description
           * description string
           */
          description: string;
          /**
           * get_universe_factions_faction_id
           * faction_id integer
           * @format int32
           */
          faction_id: number;
          /**
           * get_universe_factions_is_unique
           * is_unique boolean
           */
          is_unique: boolean;
          /**
           * get_universe_factions_militia_corporation_id
           * militia_corporation_id integer
           * @format int32
           */
          militia_corporation_id?: number;
          /**
           * get_universe_factions_name
           * name string
           */
          name: string;
          /**
           * get_universe_factions_size_factor
           * size_factor number
           * @format float
           */
          size_factor: number;
          /**
           * get_universe_factions_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id?: number;
          /**
           * get_universe_factions_station_count
           * station_count integer
           * @format int32
           */
          station_count: number;
          /**
           * get_universe_factions_station_system_count
           * station_system_count integer
           * @format int32
           */
          station_system_count: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/factions/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of graphics --- Alternate route: `/legacy/universe/graphics/` Alternate route: `/v1/universe/graphics/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGraphics
     * @summary Get graphics
     * @request GET:/universe/graphics/
     */
    getUniverseGraphics: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/graphics/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a graphic --- Alternate route: `/dev/universe/graphics/{graphic_id}/` Alternate route: `/legacy/universe/graphics/{graphic_id}/` Alternate route: `/v1/universe/graphics/{graphic_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGraphicsGraphicId
     * @summary Get graphic information
     * @request GET:/universe/graphics/{graphic_id}/
     */
    getUniverseGraphicsGraphicId: (
      graphicId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_graphics_graphic_id_collision_file
           * collision_file string
           */
          collision_file?: string;
          /**
           * get_universe_graphics_graphic_id_graphic_file
           * graphic_file string
           */
          graphic_file?: string;
          /**
           * get_universe_graphics_graphic_id_graphic_id
           * graphic_id integer
           * @format int32
           */
          graphic_id: number;
          /**
           * get_universe_graphics_graphic_id_icon_folder
           * icon_folder string
           */
          icon_folder?: string;
          /**
           * get_universe_graphics_graphic_id_sof_dna
           * sof_dna string
           */
          sof_dna?: string;
          /**
           * get_universe_graphics_graphic_id_sof_fation_name
           * sof_fation_name string
           */
          sof_fation_name?: string;
          /**
           * get_universe_graphics_graphic_id_sof_hull_name
           * sof_hull_name string
           */
          sof_hull_name?: string;
          /**
           * get_universe_graphics_graphic_id_sof_race_name
           * sof_race_name string
           */
          sof_race_name?: string;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_graphics_graphic_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/graphics/${graphicId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of item groups --- Alternate route: `/legacy/universe/groups/` Alternate route: `/v1/universe/groups/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGroups
     * @summary Get item groups
     * @request GET:/universe/groups/
     */
    getUniverseGroups: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/groups/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on an item group --- Alternate route: `/dev/universe/groups/{group_id}/` Alternate route: `/legacy/universe/groups/{group_id}/` Alternate route: `/v1/universe/groups/{group_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseGroupsGroupId
     * @summary Get item group information
     * @request GET:/universe/groups/{group_id}/
     */
    getUniverseGroupsGroupId: (
      groupId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_groups_group_id_category_id
           * category_id integer
           * @format int32
           */
          category_id: number;
          /**
           * get_universe_groups_group_id_group_id
           * group_id integer
           * @format int32
           */
          group_id: number;
          /**
           * get_universe_groups_group_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_groups_group_id_published
           * published boolean
           */
          published: boolean;
          /**
           * get_universe_groups_group_id_types
           * types array
           * @maxItems 10000
           */
          types: number[];
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_groups_group_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/groups/${groupId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Resolve a set of names to IDs in the following categories: agents, alliances, characters, constellations, corporations factions, inventory_types, regions, stations, and systems. Only exact matches will be returned. All names searched for are cached for 12 hours --- Alternate route: `/dev/universe/ids/` Alternate route: `/legacy/universe/ids/` Alternate route: `/v1/universe/ids/`
     *
     * @tags Universe
     * @name PostUniverseIds
     * @summary Bulk names to IDs
     * @request POST:/universe/ids/
     */
    postUniverseIds: (
      names: string[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_universe_ids_agents
           * agents array
           * @maxItems 500
           */
          agents?: {
            /**
             * post_universe_ids_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_alliances
           * alliances array
           * @maxItems 500
           */
          alliances?: {
            /**
             * post_universe_ids_alliance_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_alliance_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_characters
           * characters array
           * @maxItems 500
           */
          characters?: {
            /**
             * post_universe_ids_character_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_character_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_constellations
           * constellations array
           * @maxItems 500
           */
          constellations?: {
            /**
             * post_universe_ids_constellation_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_constellation_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_corporations
           * corporations array
           * @maxItems 500
           */
          corporations?: {
            /**
             * post_universe_ids_corporation_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_corporation_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_factions
           * factions array
           * @maxItems 500
           */
          factions?: {
            /**
             * post_universe_ids_faction_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_faction_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_inventory_types
           * inventory_types array
           * @maxItems 500
           */
          inventory_types?: {
            /**
             * post_universe_ids_inventory_type_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_inventory_type_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_regions
           * regions array
           * @maxItems 500
           */
          regions?: {
            /**
             * post_universe_ids_region_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_region_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_stations
           * stations array
           * @maxItems 500
           */
          stations?: {
            /**
             * post_universe_ids_station_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_station_name
             * name string
             */
            name?: string;
          }[];
          /**
           * post_universe_ids_systems
           * systems array
           * @maxItems 500
           */
          systems?: {
            /**
             * post_universe_ids_system_id
             * id integer
             * @format int32
             */
            id?: number;
            /**
             * post_universe_ids_system_name
             * name string
             */
            name?: string;
          }[];
        },
        BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/ids/`,
        method: "POST",
        query: query,
        body: names,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a moon --- Alternate route: `/legacy/universe/moons/{moon_id}/` Alternate route: `/v1/universe/moons/{moon_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseMoonsMoonId
     * @summary Get moon information
     * @request GET:/universe/moons/{moon_id}/
     */
    getUniverseMoonsMoonId: (
      moonId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_moons_moon_id_moon_id
           * moon_id integer
           * @format int32
           */
          moon_id: number;
          /**
           * get_universe_moons_moon_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_moons_moon_id_position
           * position object
           */
          position: {
            /**
             * get_universe_moons_moon_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_moons_moon_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_moons_moon_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_moons_moon_id_system_id
           * The solar system this moon is in
           * @format int32
           */
          system_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_moons_moon_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/moons/${moonId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Resolve a set of IDs to names and categories. Supported ID's for resolving are: Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions --- Alternate route: `/dev/universe/names/` Alternate route: `/v3/universe/names/`
     *
     * @tags Universe
     * @name PostUniverseNames
     * @summary Get names and categories for a set of IDs
     * @request POST:/universe/names/
     */
    postUniverseNames: (
      ids: number[],
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * post_universe_names_category
           * category string
           */
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
          /**
           * post_universe_names_id
           * id integer
           * @format int32
           */
          id: number;
          /**
           * post_universe_names_name
           * name string
           */
          name: string;
        }[],
        | BadRequest
        | {
            /**
             * post_universe_names_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/names/`,
        method: "POST",
        query: query,
        body: ids,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a planet --- Alternate route: `/legacy/universe/planets/{planet_id}/` Alternate route: `/v1/universe/planets/{planet_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniversePlanetsPlanetId
     * @summary Get planet information
     * @request GET:/universe/planets/{planet_id}/
     */
    getUniversePlanetsPlanetId: (
      planetId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_planets_planet_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_planets_planet_id_planet_id
           * planet_id integer
           * @format int32
           */
          planet_id: number;
          /**
           * get_universe_planets_planet_id_position
           * position object
           */
          position: {
            /**
             * get_universe_planets_planet_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_planets_planet_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_planets_planet_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_planets_planet_id_system_id
           * The solar system this planet is in
           * @format int32
           */
          system_id: number;
          /**
           * get_universe_planets_planet_id_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_planets_planet_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/planets/${planetId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of character races --- Alternate route: `/dev/universe/races/` Alternate route: `/legacy/universe/races/` Alternate route: `/v1/universe/races/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseRaces
     * @summary Get character races
     * @request GET:/universe/races/
     */
    getUniverseRaces: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_races_alliance_id
           * The alliance generally associated with this race
           * @format int32
           */
          alliance_id: number;
          /**
           * get_universe_races_description
           * description string
           */
          description: string;
          /**
           * get_universe_races_name
           * name string
           */
          name: string;
          /**
           * get_universe_races_race_id
           * race_id integer
           * @format int32
           */
          race_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/races/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of regions --- Alternate route: `/legacy/universe/regions/` Alternate route: `/v1/universe/regions/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseRegions
     * @summary Get regions
     * @request GET:/universe/regions/
     */
    getUniverseRegions: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/regions/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a region --- Alternate route: `/legacy/universe/regions/{region_id}/` Alternate route: `/v1/universe/regions/{region_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseRegionsRegionId
     * @summary Get region information
     * @request GET:/universe/regions/{region_id}/
     */
    getUniverseRegionsRegionId: (
      regionId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_regions_region_id_constellations
           * constellations array
           * @maxItems 1000
           */
          constellations: number[];
          /**
           * get_universe_regions_region_id_description
           * description string
           */
          description?: string;
          /**
           * get_universe_regions_region_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_regions_region_id_region_id
           * region_id integer
           * @format int32
           */
          region_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_regions_region_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/regions/${regionId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a planetary factory schematic --- Alternate route: `/dev/universe/schematics/{schematic_id}/` Alternate route: `/legacy/universe/schematics/{schematic_id}/` Alternate route: `/v1/universe/schematics/{schematic_id}/` --- This route is cached for up to 3600 seconds
     *
     * @tags Planetary Interaction
     * @name GetUniverseSchematicsSchematicId
     * @summary Get schematic information
     * @request GET:/universe/schematics/{schematic_id}/
     */
    getUniverseSchematicsSchematicId: (
      schematicId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_schematics_schematic_id_cycle_time
           * Time in seconds to process a run
           * @format int32
           */
          cycle_time: number;
          /**
           * get_universe_schematics_schematic_id_schematic_name
           * schematic_name string
           */
          schematic_name: string;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_schematics_schematic_id_error
             * error message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/schematics/${schematicId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a stargate --- Alternate route: `/legacy/universe/stargates/{stargate_id}/` Alternate route: `/v1/universe/stargates/{stargate_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseStargatesStargateId
     * @summary Get stargate information
     * @request GET:/universe/stargates/{stargate_id}/
     */
    getUniverseStargatesStargateId: (
      stargateId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_stargates_stargate_id_destination
           * destination object
           */
          destination: {
            /**
             * get_universe_stargates_stargate_id_destination_stargate_id
             * The stargate this stargate connects to
             * @format int32
             */
            stargate_id: number;
            /**
             * get_universe_stargates_stargate_id_destination_system_id
             * The solar system this stargate connects to
             * @format int32
             */
            system_id: number;
          };
          /**
           * get_universe_stargates_stargate_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_stargates_stargate_id_position
           * position object
           */
          position: {
            /**
             * get_universe_stargates_stargate_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_stargates_stargate_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_stargates_stargate_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_stargates_stargate_id_stargate_id
           * stargate_id integer
           * @format int32
           */
          stargate_id: number;
          /**
           * get_universe_stargates_stargate_id_system_id
           * The solar system this stargate is in
           * @format int32
           */
          system_id: number;
          /**
           * get_universe_stargates_stargate_id_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_stargates_stargate_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/stargates/${stargateId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a star --- Alternate route: `/legacy/universe/stars/{star_id}/` Alternate route: `/v1/universe/stars/{star_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseStarsStarId
     * @summary Get star information
     * @request GET:/universe/stars/{star_id}/
     */
    getUniverseStarsStarId: (
      starId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_stars_star_id_age
           * Age of star in years
           * @format int64
           */
          age: number;
          /**
           * get_universe_stars_star_id_luminosity
           * luminosity number
           * @format float
           */
          luminosity: number;
          /**
           * get_universe_stars_star_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_stars_star_id_radius
           * radius integer
           * @format int64
           */
          radius: number;
          /**
           * get_universe_stars_star_id_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_universe_stars_star_id_spectral_class
           * spectral_class string
           */
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
          /**
           * get_universe_stars_star_id_temperature
           * temperature integer
           * @format int32
           */
          temperature: number;
          /**
           * get_universe_stars_star_id_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        },
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/stars/${starId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a station --- Alternate route: `/dev/universe/stations/{station_id}/` Alternate route: `/v2/universe/stations/{station_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseStationsStationId
     * @summary Get station information
     * @request GET:/universe/stations/{station_id}/
     */
    getUniverseStationsStationId: (
      stationId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_stations_station_id_max_dockable_ship_volume
           * max_dockable_ship_volume number
           * @format float
           */
          max_dockable_ship_volume: number;
          /**
           * get_universe_stations_station_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_stations_station_id_office_rental_cost
           * office_rental_cost number
           * @format float
           */
          office_rental_cost: number;
          /**
           * get_universe_stations_station_id_owner
           * ID of the corporation that controls this station
           * @format int32
           */
          owner?: number;
          /**
           * get_universe_stations_station_id_position
           * position object
           */
          position: {
            /**
             * get_universe_stations_station_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_stations_station_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_stations_station_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_stations_station_id_race_id
           * race_id integer
           * @format int32
           */
          race_id?: number;
          /**
           * get_universe_stations_station_id_reprocessing_efficiency
           * reprocessing_efficiency number
           * @format float
           */
          reprocessing_efficiency: number;
          /**
           * get_universe_stations_station_id_reprocessing_stations_take
           * reprocessing_stations_take number
           * @format float
           */
          reprocessing_stations_take: number;
          /**
           * get_universe_stations_station_id_services
           * services array
           * @maxItems 30
           */
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
          /**
           * get_universe_stations_station_id_station_id
           * station_id integer
           * @format int32
           */
          station_id: number;
          /**
           * get_universe_stations_station_id_system_id
           * The solar system this station is in
           * @format int32
           */
          system_id: number;
          /**
           * get_universe_stations_station_id_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_stations_station_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/stations/${stationId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List all public structures --- Alternate route: `/dev/universe/structures/` Alternate route: `/legacy/universe/structures/` Alternate route: `/v1/universe/structures/` --- This route is cached for up to 3600 seconds
     *
     * @tags Universe
     * @name GetUniverseStructures
     * @summary List all public structures
     * @request GET:/universe/structures/
     */
    getUniverseStructures: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Only list public structures that have this service online */
        filter?: "market" | "manufacturing_basic";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/structures/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns information on requested structure if you are on the ACL. Otherwise, returns "Forbidden" for all inputs. --- Alternate route: `/v2/universe/structures/{structure_id}/` --- This route is cached for up to 3600 seconds
     *
     * @tags Universe
     * @name GetUniverseStructuresStructureId
     * @summary Get structure information
     * @request GET:/universe/structures/{structure_id}/
     * @secure
     */
    getUniverseStructuresStructureId: (
      structureId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /** Access token to use if unable to set a header */
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_structures_structure_id_name
           * The full name of the structure
           */
          name: string;
          /**
           * get_universe_structures_structure_id_owner_id
           * The ID of the corporation who owns this particular structure
           * @format int32
           */
          owner_id: number;
          /**
           * get_universe_structures_structure_id_position
           * Coordinates of the structure in Cartesian space relative to the Sun, in metres.
           */
          position?: {
            /**
             * get_universe_structures_structure_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_structures_structure_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_structures_structure_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_structures_structure_id_solar_system_id
           * solar_system_id integer
           * @format int32
           */
          solar_system_id: number;
          /**
           * get_universe_structures_structure_id_type_id
           * type_id integer
           * @format int32
           */
          type_id?: number;
        },
        | void
        | BadRequest
        | Unauthorized
        | Forbidden
        | {
            /**
             * get_universe_structures_structure_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/structures/${structureId}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with jumps will be listed --- Alternate route: `/legacy/universe/system_jumps/` Alternate route: `/v1/universe/system_jumps/` --- This route is cached for up to 3600 seconds
     *
     * @tags Universe
     * @name GetUniverseSystemJumps
     * @summary Get system jumps
     * @request GET:/universe/system_jumps/
     */
    getUniverseSystemJumps: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_system_jumps_ship_jumps
           * ship_jumps integer
           * @format int32
           */
          ship_jumps: number;
          /**
           * get_universe_system_jumps_system_id
           * system_id integer
           * @format int32
           */
          system_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/system_jumps/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with kills will be listed --- Alternate route: `/v2/universe/system_kills/` --- This route is cached for up to 3600 seconds
     *
     * @tags Universe
     * @name GetUniverseSystemKills
     * @summary Get system kills
     * @request GET:/universe/system_kills/
     */
    getUniverseSystemKills: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_system_kills_npc_kills
           * Number of NPC ships killed in this system
           * @format int32
           */
          npc_kills: number;
          /**
           * get_universe_system_kills_pod_kills
           * Number of pods killed in this system
           * @format int32
           */
          pod_kills: number;
          /**
           * get_universe_system_kills_ship_kills
           * Number of player ships killed in this system
           * @format int32
           */
          ship_kills: number;
          /**
           * get_universe_system_kills_system_id
           * system_id integer
           * @format int32
           */
          system_id: number;
        }[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/system_kills/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of solar systems --- Alternate route: `/dev/universe/systems/` Alternate route: `/legacy/universe/systems/` Alternate route: `/v1/universe/systems/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseSystems
     * @summary Get solar systems
     * @request GET:/universe/systems/
     */
    getUniverseSystems: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/systems/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a solar system. --- Alternate route: `/dev/universe/systems/{system_id}/` Alternate route: `/v4/universe/systems/{system_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseSystemsSystemId
     * @summary Get solar system information
     * @request GET:/universe/systems/{system_id}/
     */
    getUniverseSystemsSystemId: (
      systemId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_systems_system_id_constellation_id
           * The constellation this solar system is in
           * @format int32
           */
          constellation_id: number;
          /**
           * get_universe_systems_system_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_systems_system_id_planets
           * planets array
           * @maxItems 1000
           */
          planets?: {
            /**
             * get_universe_systems_system_id_asteroid_belts
             * asteroid_belts array
             * @maxItems 100
             */
            asteroid_belts?: number[];
            /**
             * get_universe_systems_system_id_moons
             * moons array
             * @maxItems 1000
             */
            moons?: number[];
            /**
             * get_universe_systems_system_id_planet_id
             * planet_id integer
             * @format int32
             */
            planet_id: number;
          }[];
          /**
           * get_universe_systems_system_id_position
           * position object
           */
          position: {
            /**
             * get_universe_systems_system_id_x
             * x number
             * @format double
             */
            x: number;
            /**
             * get_universe_systems_system_id_y
             * y number
             * @format double
             */
            y: number;
            /**
             * get_universe_systems_system_id_z
             * z number
             * @format double
             */
            z: number;
          };
          /**
           * get_universe_systems_system_id_security_class
           * security_class string
           */
          security_class?: string;
          /**
           * get_universe_systems_system_id_security_status
           * security_status number
           * @format float
           */
          security_status: number;
          /**
           * get_universe_systems_system_id_star_id
           * star_id integer
           * @format int32
           */
          star_id?: number;
          /**
           * get_universe_systems_system_id_stargates
           * stargates array
           * @maxItems 25
           */
          stargates?: number[];
          /**
           * get_universe_systems_system_id_stations
           * stations array
           * @maxItems 25
           */
          stations?: number[];
          /**
           * get_universe_systems_system_id_system_id
           * system_id integer
           * @format int32
           */
          system_id: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_systems_system_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/systems/${systemId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of type ids --- Alternate route: `/legacy/universe/types/` Alternate route: `/v1/universe/types/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseTypes
     * @summary Get types
     * @request GET:/universe/types/
     */
    getUniverseTypes: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/universe/types/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get information on a type --- Alternate route: `/dev/universe/types/{type_id}/` Alternate route: `/v3/universe/types/{type_id}/` --- This route expires daily at 11:05
     *
     * @tags Universe
     * @name GetUniverseTypesTypeId
     * @summary Get type information
     * @request GET:/universe/types/{type_id}/
     */
    getUniverseTypesTypeId: (
      typeId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Language to use in the response, takes precedence over Accept-Language
         * @default "en"
         */
        language?: "en" | "en-us" | "de" | "fr" | "ja" | "ru" | "zh" | "ko" | "es";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_universe_types_type_id_capacity
           * capacity number
           * @format float
           */
          capacity?: number;
          /**
           * get_universe_types_type_id_description
           * description string
           */
          description: string;
          /**
           * get_universe_types_type_id_dogma_attributes
           * dogma_attributes array
           * @maxItems 1000
           */
          dogma_attributes?: {
            /**
             * get_universe_types_type_id_attribute_id
             * attribute_id integer
             * @format int32
             */
            attribute_id: number;
            /**
             * get_universe_types_type_id_value
             * value number
             * @format float
             */
            value: number;
          }[];
          /**
           * get_universe_types_type_id_dogma_effects
           * dogma_effects array
           * @maxItems 1000
           */
          dogma_effects?: {
            /**
             * get_universe_types_type_id_effect_id
             * effect_id integer
             * @format int32
             */
            effect_id: number;
            /**
             * get_universe_types_type_id_is_default
             * is_default boolean
             */
            is_default: boolean;
          }[];
          /**
           * get_universe_types_type_id_graphic_id
           * graphic_id integer
           * @format int32
           */
          graphic_id?: number;
          /**
           * get_universe_types_type_id_group_id
           * group_id integer
           * @format int32
           */
          group_id: number;
          /**
           * get_universe_types_type_id_icon_id
           * icon_id integer
           * @format int32
           */
          icon_id?: number;
          /**
           * get_universe_types_type_id_market_group_id
           * This only exists for types that can be put on the market
           * @format int32
           */
          market_group_id?: number;
          /**
           * get_universe_types_type_id_mass
           * mass number
           * @format float
           */
          mass?: number;
          /**
           * get_universe_types_type_id_name
           * name string
           */
          name: string;
          /**
           * get_universe_types_type_id_packaged_volume
           * packaged_volume number
           * @format float
           */
          packaged_volume?: number;
          /**
           * get_universe_types_type_id_portion_size
           * portion_size integer
           * @format int32
           */
          portion_size?: number;
          /**
           * get_universe_types_type_id_published
           * published boolean
           */
          published: boolean;
          /**
           * get_universe_types_type_id_radius
           * radius number
           * @format float
           */
          radius?: number;
          /**
           * get_universe_types_type_id_type_id
           * type_id integer
           * @format int32
           */
          type_id: number;
          /**
           * get_universe_types_type_id_volume
           * volume number
           * @format float
           */
          volume?: number;
        },
        | void
        | BadRequest
        | {
            /**
             * get_universe_types_type_id_404_not_found
             * Not found message
             */
            error?: string;
          }
        | ErrorLimited
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/universe/types/${typeId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  wars = {
    /**
     * @description Return a list of wars --- Alternate route: `/dev/wars/` Alternate route: `/legacy/wars/` Alternate route: `/v1/wars/` --- This route is cached for up to 3600 seconds
     *
     * @tags Wars
     * @name GetWars
     * @summary List wars
     * @request GET:/wars/
     */
    getWars: (
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Only return wars with ID smaller than this
         * @format int32
         */
        max_war_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        number[],
        void | BadRequest | ErrorLimited | InternalServerError | ServiceUnavailable | GatewayTimeout
      >({
        path: `/wars/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return details about a war --- Alternate route: `/dev/wars/{war_id}/` Alternate route: `/legacy/wars/{war_id}/` Alternate route: `/v1/wars/{war_id}/` --- This route is cached for up to 3600 seconds
     *
     * @tags Wars
     * @name GetWarsWarId
     * @summary Get war information
     * @request GET:/wars/{war_id}/
     */
    getWarsWarId: (
      warId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_wars_war_id_aggressor
           * The aggressor corporation or alliance that declared this war, only contains either corporation_id or alliance_id
           */
          aggressor: {
            /**
             * get_wars_war_id_alliance_id
             * Alliance ID if and only if the aggressor is an alliance
             * @format int32
             */
            alliance_id?: number;
            /**
             * get_wars_war_id_corporation_id
             * Corporation ID if and only if the aggressor is a corporation
             * @format int32
             */
            corporation_id?: number;
            /**
             * get_wars_war_id_isk_destroyed
             * ISK value of ships the aggressor has destroyed
             * @format float
             */
            isk_destroyed: number;
            /**
             * get_wars_war_id_ships_killed
             * The number of ships the aggressor has killed
             * @format int32
             */
            ships_killed: number;
          };
          /**
           * get_wars_war_id_allies
           * allied corporations or alliances, each object contains either corporation_id or alliance_id
           * @maxItems 10000
           */
          allies?: {
            /**
             * get_wars_war_id_ally_alliance_id
             * Alliance ID if and only if this ally is an alliance
             * @format int32
             */
            alliance_id?: number;
            /**
             * get_wars_war_id_ally_corporation_id
             * Corporation ID if and only if this ally is a corporation
             * @format int32
             */
            corporation_id?: number;
          }[];
          /**
           * get_wars_war_id_declared
           * Time that the war was declared
           * @format date-time
           */
          declared: string;
          /**
           * get_wars_war_id_defender
           * The defending corporation or alliance that declared this war, only contains either corporation_id or alliance_id
           */
          defender: {
            /**
             * get_wars_war_id_defender_alliance_id
             * Alliance ID if and only if the defender is an alliance
             * @format int32
             */
            alliance_id?: number;
            /**
             * get_wars_war_id_defender_corporation_id
             * Corporation ID if and only if the defender is a corporation
             * @format int32
             */
            corporation_id?: number;
            /**
             * get_wars_war_id_defender_isk_destroyed
             * ISK value of ships the defender has killed
             * @format float
             */
            isk_destroyed: number;
            /**
             * get_wars_war_id_defender_ships_killed
             * The number of ships the defender has killed
             * @format int32
             */
            ships_killed: number;
          };
          /**
           * get_wars_war_id_finished
           * Time the war ended and shooting was no longer allowed
           * @format date-time
           */
          finished?: string;
          /**
           * get_wars_war_id_id
           * ID of the specified war
           * @format int32
           */
          id: number;
          /**
           * get_wars_war_id_mutual
           * Was the war declared mutual by both parties
           */
          mutual: boolean;
          /**
           * get_wars_war_id_open_for_allies
           * Is the war currently open for allies or not
           */
          open_for_allies: boolean;
          /**
           * get_wars_war_id_retracted
           * Time the war was retracted but both sides could still shoot each other
           * @format date-time
           */
          retracted?: string;
          /**
           * get_wars_war_id_started
           * Time when the war started and both sides could shoot each other
           * @format date-time
           */
          started?: string;
        },
        | void
        | BadRequest
        | ErrorLimited
        | {
            /**
             * get_wars_war_id_422_unprocessable_entity
             * Unprocessable entity message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/wars/${warId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of kills related to a war --- Alternate route: `/dev/wars/{war_id}/killmails/` Alternate route: `/legacy/wars/{war_id}/killmails/` Alternate route: `/v1/wars/{war_id}/killmails/` --- This route is cached for up to 3600 seconds
     *
     * @tags Wars
     * @name GetWarsWarIdKillmails
     * @summary List kills for a war
     * @request GET:/wars/{war_id}/killmails/
     */
    getWarsWarIdKillmails: (
      warId: number,
      query?: {
        /**
         * The server name you would like data from
         * @default "tranquility"
         */
        datasource?: "tranquility";
        /**
         * Which page of results to return
         * @format int32
         * @min 1
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * get_wars_war_id_killmails_killmail_hash
           * A hash of this killmail
           */
          killmail_hash: string;
          /**
           * get_wars_war_id_killmails_killmail_id
           * ID of this killmail
           * @format int32
           */
          killmail_id: number;
        }[],
        | void
        | BadRequest
        | ErrorLimited
        | {
            /**
             * get_wars_war_id_killmails_422_unprocessable_entity
             * Unprocessable entity message
             */
            error?: string;
          }
        | InternalServerError
        | ServiceUnavailable
        | GatewayTimeout
      >({
        path: `/wars/${warId}/killmails/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
