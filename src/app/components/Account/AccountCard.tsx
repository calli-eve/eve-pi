import { AccessToken } from "@/types";
import { Box, Stack, Typography, useTheme, Paper, IconButton } from "@mui/material";
import { CharacterRow } from "../Characters/CharacterRow";
import { PlanetaryInteractionRow } from "../PlanetaryInteraction/PlanetaryInteractionRow";
import { SessionContext } from "@/app/context/Context";
import { useContext, useState } from "react";
import { PlanRow } from "./PlanRow";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const AccountCard = ({ characters }: { characters: AccessToken[] }) => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
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
            justifyContent: 'space-between',
          }}
        >
          <Typography 
            sx={{ 
              fontSize: "0.9rem",
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {characters.length > 0 && characters[0].account !== "-"
              ? `Account: ${characters[0].account}`
              : "No account name"}
          </Typography>
          <IconButton 
            size="small" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{ 
              transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
        {!isCollapsed && characters.map((c) => (
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
