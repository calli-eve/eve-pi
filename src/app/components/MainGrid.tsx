import { useContext } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { LoginButton } from "./Login/LoginButton";
import { AccountCard } from "./Account/AccountCard";
import { AccessToken } from "@/types";
import { CharacterContext } from "../context/Context";

interface Grouped {
  [key: string]: AccessToken[];
}

export const MainGrid = ({ sessionReady }: { sessionReady: boolean }) => {
  const { characters } = useContext(CharacterContext);
  const groupByAccount = characters.reduce<Grouped>((group, character) => {
    const { account } = character;
    group[account ?? ""] = group[account ?? ""] ?? [];
    group[account ?? ""].push(character);
    return group;
  }, {});

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Stack direction="row" spacing={1}>
            <LoginButton />
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {Object.values(groupByAccount).map((g, id) => (
            <AccountCard
              key={`account-${id}-${g[0].account}`}
              characters={g}
              sessionReady={sessionReady}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
