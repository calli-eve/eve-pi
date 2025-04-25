import { AccessToken } from "@/types";
import { Icon, IconButton, Stack, Tooltip, Typography, styled, useTheme } from "@mui/material";
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
import { Settings } from "@mui/icons-material";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.custom.compactMode ? theme.spacing(1) : theme.spacing(2),
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));

const PlanetaryIteractionTable = ({
  character,
}: {
  character: AccessToken;
}) => {
  const theme = useTheme();

  if (character.needsLogin)
    return (
      <p style={{ color: "red" }}>
        Character token has expired. Relogin to fix.
      </p>
    );

  return (
    <StackItem width="100%">
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table size="small" aria-label="a dense table" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell width="8%">
                <Typography fontSize={theme.custom.smallText}>
                  Planet
                </Typography>
              </TableCell>
              <TableCell width="2%">
                <Tooltip title="Command center upgrade level">
                  <Typography fontSize={theme.custom.smallText}>CC</Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="24%">
                <Tooltip title="Extractor status and products">
                  <Typography fontSize={theme.custom.smallText}>
                    Extraction
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="20%">
                <Tooltip title="What factories are producing">
                  <Typography fontSize={theme.custom.smallText}>
                    Production
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="20%">
                <Tooltip title="What imports factories need from outside">
                  <Typography fontSize={theme.custom.smallText}>
                    Imports
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="20%">
                <Tooltip title="What exports factories are producing">
                  <Typography fontSize={theme.custom.smallText}>
                    Exports
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="2%">
                <Tooltip title="Is planet ecluded from totals">
                  <Typography fontSize={theme.custom.smallText}>Excluded</Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="2%">
                <Tooltip title="How many units per hour factories are producing">
                  <Typography fontSize={theme.custom.smallText}>u/h</Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="4%" align="right">
                <Tooltip title="How many million ISK per month this planet is exporting (Jita sell min)">
                  <Typography fontSize={theme.custom.smallText}>
                    ISK/M
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="10%">
                <Tooltip title="Storage facility fill rate">
                  <Typography fontSize={theme.custom.smallText}>
                    Storage Fill rate
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Planet settings">
                <IconButton aria-label="settings">
                  <Settings fontSize="small" />
                </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {character.planets.map((planet) => (
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
}: {
  character: AccessToken;
}) => {
  return (
    <StackItem>
      <Stack spacing={2} direction="row" flexWrap="wrap">
        {character.planets.map((planet) => (
          <PlanetCard
            key={`${character.character.characterId}-${planet.planet_id}`}
            planet={planet}
            character={character}
          />
        ))}
        {Array.from(Array(6 - character.planets.length).keys()).map((i, id) => (
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
  const theme = useTheme();

  return theme.custom.compactMode ? (
    <div style={{ marginTop: "1.2rem" }}><PlanetaryInteractionIconsRow character={character} /></div>
  ) : (
    <div style={{ marginTop: "1.4rem" }}><PlanetaryIteractionTable character={character} /></div>
  );
};
