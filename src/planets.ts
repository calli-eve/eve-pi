import {
  AccessToken,
  Planet,
  PlanetInfo,
  PlanetInfoUniverse,
  PlanetWithInfo,
} from "@/types";
import { Api } from "@/esi-api";
import { EXTRACTOR_TYPE_IDS, FACTORY_IDS, PI_SCHEMATICS } from "@/const";
import { extractorsHaveExpired } from "./app/components/PlanetaryInteraction/timeColors";

export const getPlanets = async (character: AccessToken): Promise<Planet[]> => {
  const api = new Api();
  const planets = (
    await api.v1.getCharactersCharacterIdPlanets(
      character.character.characterId,
      {
        token: character.access_token,
      },
    )
  ).data;
  return planets;
};

export const getPlanet = async (
  character: AccessToken,
  planet: Planet,
): Promise<PlanetInfo> => {
  const api = new Api();
  const planetInfo = (
    await api.v3.getCharactersCharacterIdPlanetsPlanetId(
      character.character.characterId,
      planet.planet_id,
      {
        token: character.access_token,
      },
    )
  ).data;
  return planetInfo;
};

export const getPlanetUniverse = async (
  planet: Planet,
): Promise<PlanetInfoUniverse> => {
  const api = new Api();
  const planetInfo = (await api.v1.getUniversePlanetsPlanetId(planet.planet_id))
    .data;
  return planetInfo;
};

export const planetCalculations = (planet: PlanetWithInfo) => {
  const planetInfo = planet.info;
  type SchematicId = number;
  const extractors: PlanetInfo["pins"] = planetInfo.pins.filter((p) =>
    EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id),
  );
  const localProduction = planetInfo.pins
    .filter((p) => FACTORY_IDS().some((e) => e.type_id === p.type_id))
    .reduce((acc, f) => {
      if (f.schematic_id) {
        const schematic = PI_SCHEMATICS.find(
          (s) => s.schematic_id == f.schematic_id,
        );
        if (schematic) acc.set(f.schematic_id, schematic);
      }
      return acc;
    }, new Map<SchematicId, (typeof PI_SCHEMATICS)[number]>());

  const locallyProduced = Array.from(localProduction)
    .flatMap((p) => p[1].outputs)
    .map((p) => p.type_id);

  const locallyConsumed = Array.from(localProduction)
    .flatMap((p) => p[1].inputs)
    .map((p) => p.type_id);

  const locallyExcavated = planetInfo.pins
    .filter((p) => EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id))
    .map((e) => e.extractor_details?.product_type_id ?? 0);

  const localImports = Array.from(localProduction)
    .flatMap((p) => p[1].inputs)
    .filter(
      (p) =>
        ![...locallyProduced, ...locallyExcavated].some(
          (lp) => lp === p.type_id,
        ),
    );

  const localExports = locallyProduced
    .filter((p) => !locallyConsumed.some((lp) => lp === p))
    .map((typeId) => {
      const outputs = PI_SCHEMATICS.flatMap((s) => s.outputs).find(
        (s) => s.type_id === typeId,
      );
      if (!outputs) return { typeId, amount: 0 };
      const cycleTime =
        PI_SCHEMATICS.find((s) => s.schematic_id === outputs.schematic_id)
          ?.cycle_time ?? 3600;
      const factoriesProducing = planetInfo.pins
        .filter((p) => FACTORY_IDS().some((e) => e.type_id === p.type_id))
        .filter((f) => f.schematic_id === outputs?.schematic_id);
      const amount = outputs.quantity
        ? factoriesProducing.length * outputs.quantity * (3600 / cycleTime)
        : 0;
      return {
        typeId,
        amount,
      };
    });

  const expired = extractorsHaveExpired(extractors.map((e) => e.expiry_time));
  return {
    expired,
    localExports,
    localImports,
    locallyConsumed,
    locallyProduced,
    localProduction,
    extractors,
  };
};
