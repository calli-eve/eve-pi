import { useContext, useEffect } from "react";
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
  const groupByAccount = characters.reduce<Grouped>((group, character) => {
    const { account } = character;
    group[account ?? ""] = group[account ?? ""] ?? [];
    group[account ?? ""].push(character);
    return group;
  }, {});

  const { compactMode } = useContext(SessionContext);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <Grid container spacing={1}>
          {Object.values(groupByAccount).map((g, id) => (
            <Grid
              item
              xs={compactMode ? 6 : 12}
              key={`account-${id}-${g[0].account}`}
            >
              <AccountCard characters={g} sessionReady={sessionReady} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
