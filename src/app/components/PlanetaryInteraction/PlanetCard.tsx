import { Stack, Typography, styled } from "@mui/material";
import Image from "next/image";
import { AccessToken, Planet } from "@/types";
import { Api } from "@/esi-api";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { EXTRACTOR_TYPE_IDS } from "@/const";
import Countdown from "react-countdown";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  margin: "0 !important",
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));

export interface PlanetInfo {
  links: {
    destination_pin_id: number;
    link_level: number;
    source_pin_id: number;
  }[];
  pins: {
    contents?: {
      amount: number;
      type_id: number;
    }[];
    expiry_time?: string;
    extractor_details?: {
      cycle_time?: number;
      head_radius?: number;
      heads: {
        head_id: number;
        latitude: number;
        longitude: number;
      }[];
      product_type_id?: number;
      qty_per_cycle?: number;
    };
    factory_details?: {
      schematic_id: number;
    };
    install_time?: string;
    last_cycle_start?: string;
    latitude: number;
    longitude: number;
    pin_id: number;
    schematic_id?: number;
    type_id: number;
  }[];
  routes: {
    content_type_id: number;
    destination_pin_id: number;
    quantity: number;
    route_id: number;
    source_pin_id: number;
    waypoints?: number[];
  }[];
}

export const PlanetCard = ({
  planet,
  character,
}: {
  planet: Planet;
  character: AccessToken;
}) => {
  const [planetInfo, setPlanetInfo] = useState<PlanetInfo | undefined>(
    undefined
  );
  const extractors =
    (planetInfo &&
      planetInfo.pins
        .filter((p) => EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id))
        .map((p) => p.expiry_time)) ??
    [];
  const getPlanet = async (
    character: AccessToken,
    planet: Planet
  ): Promise<PlanetInfo> => {
    const api = new Api();
    const planetInfo = (
      await api.characters.getCharactersCharacterIdPlanetsPlanetId(
        character.character.characterId,
        planet.planet_id,
        {
          token: character.access_token,
        }
      )
    ).data;
    return planetInfo;
  };
  useEffect(() => {
    getPlanet(character, planet).then(setPlanetInfo);
  }, [planet, character]);
  return (
    <StackItem alignItems="flex-start" height="100%">
      <Image
        src={`/${planet.planet_type}.png`}
        alt=""
        width={120}
        height={120}
      />
      {extractors.some((e) => {
        if (!e) return true;
        const dateExtractor = DateTime.fromISO(e);
        const dateNow = DateTime.now();
        return dateExtractor < dateNow;
      }) && (
        <Image
          width={64}
          height={64}
          src={`/stopped.png`}
          alt=""
          style={{ position: "absolute" }}
        />
      )}
      {extractors.map((e, idx) => {
        const inPast = () => {
          if (!e) return true;
          const dateExtractor = DateTime.fromISO(e);
          const dateNow = DateTime.now();
          return dateExtractor < dateNow;
        };

        return (
          <Typography
            key={`${e}-${idx}-${character.character.characterId}`}
            color={inPast() ? "red" : "white"}
          >
            {e ? (
              <Countdown
                overtime={true}
                date={DateTime.fromISO(e).toMillis()}
              />
            ) : (
              "STOPPED"
            )}
          </Typography>
        );
      })}
    </StackItem>
  );
};
