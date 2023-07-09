import { Api } from "@/esi-api";
import { AccessToken, Planet } from "@/types";
import { Stack, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { PlanetCard } from "./PlanetCard";
import { NoPlanetCard } from "./NoPlanetCard";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.custom.compactMode ? theme.spacing(1) : theme.spacing(2),
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));

const getPlanets = async (character: AccessToken): Promise<Planet[]> => {
  const api = new Api();
  const planets = (
    await api.v1.getCharactersCharacterIdPlanets(
      character.character.characterId,
      {
        token: character.access_token,
      }
    )
  ).data;
  return planets;
};

export const PlanetaryInteractionRow = ({
  character,
}: {
  character: AccessToken;
}) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  useEffect(() => {
    getPlanets(character).then(setPlanets).catch(console.log);
  }, [character]);

  return (
    <StackItem>
      <Stack spacing={2} direction="row" flexWrap="wrap">
        {planets.map((planet) => (
          <PlanetCard
            key={`${character.character.characterId}-${planet.planet_id}`}
            planet={planet}
            character={character}
          />
        ))}
        {Array.from(Array(6 - planets.length).keys()).map((i, id) => (
          <NoPlanetCard
            key={`${character.character.characterId}-no-planet-${id}`}
          />
        ))}
      </Stack>
    </StackItem>
  );
};
