import { useContext } from "react";
import {
  Box,
  CssBaseline,
  Fab,
  Grid,
  Stack,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { AccountCard } from "./Account/AccountCard";
import { AccessToken } from "@/types";
import { CharacterContext } from "../context/Context";
import CopyrightIcon from "@mui/icons-material/Copyright";
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Stack direction="row" spacing={1}></Stack>
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
        <Tooltip
          title={`
          EVE Online and the EVE logo are the registered trademarks of CCP hf. All rights are reserved worldwide. All other trademarks are the property of their respective owners. EVE Online, the EVE logo, EVE and all associated logos and designs are the intellectual property of CCP hf. All artwork, screenshots, characters, vehicles, storylines, world facts or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of CCP hf. CCP hf. has granted permission to EVE PI to use EVE Online and all associated logos and designs for promotional and information purposes on its website but does not endorse, and is not in any way affiliated with, EVE PI. CCP is in no way responsible for the content on or functioning of this website, nor can it be liable for any damage arising from the use of this website.
        `}
        >
          <Fab
            variant="extended"
            style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
          >
            <CopyrightIcon style={{ marginRight: "1rem" }} /> CCP
          </Fab>
        </Tooltip>
      </Box>
    </ThemeProvider>
  );
};
