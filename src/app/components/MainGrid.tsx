import { useContext, useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AccountCard } from "./Account/AccountCard";
import { AccessToken } from "@/types";
import { CharacterContext, SessionContext } from "../context/Context";
import ResponsiveAppBar from "./AppBar/AppBar";

interface Grouped {
  [key: string]: AccessToken[];
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const MainGrid = ({ sessionReady }: { sessionReady: boolean }) => {
  const { characters } = useContext(CharacterContext);
  const { compactMode } = useContext(SessionContext);
  const groupByAccount = characters.reduce<Grouped>((group, character) => {
    const { account } = character;
    group[account ?? ""] = group[account ?? ""] ?? [];
    group[account ?? ""].push(character);
    return group;
  }, {});

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            style={{ display: compactMode ? "flex" : "block" }}
          >
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
    </ThemeProvider>
  );
};
