import { Api } from "@/esi-api";
import { AccessToken, Planet } from "@/types";
import { Stack, styled, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { PlanetCard } from "./PlanetCard";
import { NoPlanetCard } from "./NoPlanetCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PlanetTableRow } from "./PlanetTableRow";

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

const PlanetaryIteractionTable = ({
  character,
  planets,
}: {
  character: AccessToken;
  planets: Planet[];
}) => {
  return (
    <StackItem width="100%">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width="13%">Planet</TableCell>
              <TableCell width="2%">CC</TableCell>
              <TableCell width="20%">Extraction</TableCell>
              <TableCell width="20%">Production</TableCell>
              <TableCell width="20%">Imports</TableCell>
              <TableCell width="20%">Exports</TableCell>
              <TableCell width="5%">u/h</TableCell>
              <TableCell width="5%">MISK/h</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planets.map((planet) => (
              <PlanetTableRow
                key={`${character.character.characterId}-${planet.planet_id}`}
                planet={planet}
                character={character}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StackItem>
  );
};

const PlanetaryInteractionIconsRow = ({
  character,
  planets,
}: {
  character: AccessToken;
  planets: Planet[];
}) => {
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

export const PlanetaryInteractionRow = ({
  character,
}: {
  character: AccessToken;
}) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const theme = useTheme();
  useEffect(() => {
    getPlanets(character).then(setPlanets).catch(console.log);
  }, [character]);

  return theme.custom.compactMode ? (
    <PlanetaryInteractionIconsRow planets={planets} character={character} />
  ) : (
    <PlanetaryIteractionTable planets={planets} character={character} />
  );
};
