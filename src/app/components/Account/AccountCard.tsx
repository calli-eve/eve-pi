import { AccessToken } from "@/types";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CharacterRow } from "../Characters/CharacterRow";
import { PlanetaryInteractionRow } from "../PlanetaryInteraction/PlanetaryInteractionRow";
import { SessionContext } from "@/app/context/Context";
import { useContext } from "react";
import { PlanRow } from "./PlanRow";
export const AccountCard = ({ characters }: { characters: AccessToken[] }) => {
  const theme = useTheme();

  const { planMode } = useContext(SessionContext);
  return (
    <Box
      sx={{
        padding: 1,
        borderBottom: theme.custom.compactMode ? "" : "solid 1px gray",
      }}
    >
      <Typography style={{ fontSize: "0.8rem" }} paddingLeft={2}>
        {characters[0].account !== "-"
          ? `Account: ${characters[0].account}`
          : "No account name"}
      </Typography>
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
  );
};
