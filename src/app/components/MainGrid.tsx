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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

interface Grouped {
  [key: string]: AccessToken[];
}

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      compactMode: boolean;
      smallText: string;
      cardImageSize: number;
      cardMinHeight: number;
      stoppedPosition: number;
    };
  }
  interface ThemeOptions {
    custom?: {
      compactMode?: boolean;
      smallText?: string;
      cardImageSize?: number;
      cardMinHeight?: number;
      stoppedPosition?: number;
    };
  }
}

export const MainGrid = ({ sessionReady }: { sessionReady: boolean }) => {
  const { characters } = useContext(CharacterContext);
  const groupByAccount = characters.reduce<Grouped>((group, character) => {
    const { account } = character;
    group[account ?? ""] = group[account ?? ""] ?? [];
    group[account ?? ""].push(character);
    return group;
  }, {});

  const { compactMode } = useContext(SessionContext);
  const [darkTheme, setDarkTheme] = useState(
    createTheme({
      palette: {
        mode: "dark",
      },
      custom: {
        compactMode,
        smallText: compactMode ? "0.6rem" : "0.8rem",
        cardImageSize: compactMode ? 80 : 120,
        cardMinHeight: compactMode ? 100 : 170,
        stoppedPosition: compactMode ? 32 : 48,
      },
    })
  );

  useEffect(() => {
    setDarkTheme(
      createTheme({
        palette: {
          mode: "dark",
        },
        custom: {
          compactMode,
          smallText: compactMode ? "0.6rem" : "0.8rem",
          cardImageSize: compactMode ? 80 : 120,
          cardMinHeight: compactMode ? 100 : 170,
          stoppedPosition: compactMode ? 32 : 48,
        },
      })
    );
  }, [compactMode]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <Grid container spacing={1}>
          {Object.values(groupByAccount).map((g, id) => (
            <Grid
              item
              xs={12}
              sm={compactMode ? 6 : 12}
              key={`account-${id}-${g[0].account}`}
            >
              <AccountCard characters={g} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
