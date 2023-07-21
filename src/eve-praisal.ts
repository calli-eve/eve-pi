import { PI_TYPES_ARRAY } from "./const";

export interface Totals {
  buy: number;
  sell: number;
  volume: number;
}

export interface All {
  avg: number;
  max: number;
  median: number;
  min: number;
  percentile: number;
  stddev: number;
  volume: number;
  order_count: number;
}

export interface Buy {
  avg: number;
  max: number;
  median: number;
  min: number;
  percentile: number;
  stddev: number;
  volume: number;
  order_count: number;
}

export interface Sell {
  avg: number;
  max: number;
  median: number;
  min: number;
  percentile: number;
  stddev: number;
  volume: number;
  order_count: number;
}

export interface Prices {
  all: All;
  buy: Buy;
  sell: Sell;
  updated: string;
  strategy: string;
}

export interface Meta {}

export interface Item {
  name: string;
  typeID: number;
  typeName: string;
  typeVolume: number;
  quantity: number;
  prices: Prices;
  meta: Meta;
}

export interface Appraisal {
  created: number;
  kind: string;
  market_name: string;
  totals: Totals;
  items: Item[];
  raw: string;
  unparsed?: any;
  private: boolean;
  live: boolean;
}

export interface EvePraisalResult {
  appraisal: Appraisal;
}

export interface EvePraisalRequest {
  items: { amount: number; typeId: number }[];
}

const PRAISAL_URL = process.env.NEXT_PUBLIC_PRAISAL_URL ?? "";

export const getPraisal = async (
  items: { quantity: number; type_id: number }[]
): Promise<EvePraisalResult | undefined> => {
  const praisalRequest = {
    market_name: "jita",
    items,
  };

  return fetch(PRAISAL_URL, {
    method: "POST",
    body: JSON.stringify(praisalRequest),
    headers: {
      "User-Agent": "EVE-PI https://github.com/calli-eve/eve-pi",
    },
  })
    .then((res) => res.json())
    .catch(() => console.log("Appraisal failed"));
};

export const fetchAllPrices = async (): Promise<EvePraisalResult> => {
  const allPI = PI_TYPES_ARRAY.map((t) => {
    return { quantity: 1, type_id: t.type_id };
  });
  return await fetch("api/praisal", {
    method: "POST",
    body: JSON.stringify(allPI),
  }).then((res) => res.json());
};
