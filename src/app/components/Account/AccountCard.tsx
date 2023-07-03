import { AccessToken } from "@/types";
import { Box, Stack, Typography } from "@mui/material";
import { CharacterRow } from "../Characters/CharacterRow";
import { PlanetaryInteractionRow } from "../PlanetaryInteraction/PlanetaryInteractionRow";
import { useContext } from "react";
import { SessionContext } from "@/app/context/Context";

export const AccountCard = ({
  characters,
  sessionReady,
}: {
  characters: AccessToken[];
  sessionReady: boolean;
}) => {
  const { compactMode } = useContext(SessionContext);
  return (
    <Box
      sx={{
        padding: 1,
        borderBottom: compactMode ? "" : "solid 1px gray",
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
          {sessionReady && <PlanetaryInteractionRow character={c} />}
        </Stack>
      ))}
    </Box>
  );
};
