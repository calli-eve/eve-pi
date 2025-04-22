import { AccessToken } from "@/types";
import { Box, Stack, Typography, useTheme, Paper } from "@mui/material";
import { CharacterRow } from "../Characters/CharacterRow";
import { PlanetaryInteractionRow } from "../PlanetaryInteraction/PlanetaryInteractionRow";
import { SessionContext } from "@/app/context/Context";
import { useContext } from "react";
import { PlanRow } from "./PlanRow";

export const AccountCard = ({ characters }: { characters: AccessToken[] }) => {
  const theme = useTheme();

  const { planMode } = useContext(SessionContext);
  return (
    <Paper
      elevation={2}
      sx={{
        padding: theme.custom.compactMode ? theme.spacing(1) : theme.spacing(2),
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        backgroundColor: theme.palette.background.paper,
        transition: 'all 0.2s ease-in-out',
        cursor: 'grab',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
        '&:active': {
          boxShadow: theme.shadows[8],
          cursor: 'grabbing',
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 1,
            padding: theme.spacing(1),
            marginBottom: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography 
            sx={{ 
              fontSize: "0.9rem",
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {characters[0].account !== "-"
              ? `Account: ${characters[0].account}`
              : "No account name"}
          </Typography>
        </Box>
        {characters.map((c) => (
          <Stack
            key={c.character.characterId}
            direction="row"
            alignItems="flex-start"
          >
            <CharacterRow character={c} />
            {planMode ? (
              <PlanRow character={c} />
            ) : (
              <PlanetaryInteractionRow character={c} />
            )}
          </Stack>
        ))}
      </Box>
    </Paper>
  );
};
