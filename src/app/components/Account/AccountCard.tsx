import { AccessToken } from "@/types";
import { Box, Stack, Typography } from "@mui/material";
import { CharacterRow } from "../Characters/CharacterRow";
import { PlanetaryInteractionRow } from "../PlanetaryInteraction/PlanetaryInteractionRow";

export const AccountCard = ({
  characters,
  sessionReady,
}: {
  characters: AccessToken[];
  sessionReady: boolean;
}) => {
  return (
    <Box
      sx={{
        background: "#262626",
        padding: 1,
        borderRadius: 1,
        margin: 1,
      }}
    >
      <Typography style={{ fontSize: "0.8rem" }} paddingLeft={2}>
        {characters[0].account !== "-"
          ? `Account: ${characters[0].account}`
          : ""}
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
