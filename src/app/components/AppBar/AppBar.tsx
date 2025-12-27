import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { DowloadButton } from "../Backup/DowloadButton";
import { UploadButton } from "../Backup/UploadButton";
import { CCPButton } from "../CCP/CCPButton";
import { DiscordButton } from "../Discord/DiscordButton";
import { GitHubButton } from "../Github/GitHubButton";
import { LoginButton } from "../Login/LoginButton";
import { PartnerCodeButton } from "../PartnerCode/PartnerCodeButton";
import { SettingsButton } from "../Settings/SettingsButtons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [faqOpen, setFaqOpen] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EVE PI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <LoginButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <DowloadButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <UploadButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <DiscordButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <GitHubButton />
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <SettingsButton />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  setFaqOpen(true);
                }}
              >
                <Button
                  href=""
                  style={{ width: "100%" }}
                  sx={{ color: "white", display: "flex", justifyContent: "flex-start" }}
                >
                  FAQ
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <CCPButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <PartnerCodeButton />
              </MenuItem>
            </Menu>
          </Box>
          <PublicIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EVE PI
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <LoginButton />
            <DowloadButton />
            <UploadButton />
            <DiscordButton />
            <GitHubButton />

            <SettingsButton />
            <Button onClick={() => setFaqOpen(true)} color="inherit">
              FAQ
            </Button>
            <CCPButton />
            <PartnerCodeButton />
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={faqOpen}
        onClose={() => setFaqOpen(false)}
        aria-labelledby="faq-dialog-title"
      >
        <DialogTitle id="faq-dialog-title">
          Frequently Asked Questions
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>EVE Online Partner Code</strong>
            <br />
            Consider using my partner code for CCP related purchases to support
            this project:
            <Button
              href=""
              style={{ width: "100%" }}
              sx={{ color: "white", display: "block" }}
              onClick={() => {
                navigator.clipboard.writeText("CALLIEVE");
              }}
            >
              CALLIEVE
            </Button>{" "}
            Click button above to copy to clipboard.
            <br />
            <br />
            <strong>What is this application?</strong>
            <br />
            This EVE Online Planetary Interaction tool that helps you track and
            manage your colonies and production chains. Main usecase is to see
            if your extractors are running.
            <br />
            <br />
            <strong>How do I add characters?</strong>
            <br />
            You can add characters by clicking the &quot;Add Character&quot;
            button in the app bar and following the authentication process.
            <br />
            <br />
            <strong>Why don&apos;t my storage numbers add up?</strong>
            <br />
            EVE Online API (ESI) provides planetary interaction endpoints. These
            are updated when you submit changes to planet. For example after an
            extractor restart.
            <br />
            <br />
            <strong>What does exclude mean?</strong>
            <br />
            Exclude means that this planet will not be counted in totals. This
            is useful if you have longer production chains where exports of a
            planet are consumed by another planet.
            <br />
            <br />
            <strong>How do see my planets production chains?</strong>
            <br />
            Click on the planet row to open the extraction simulation.
            <br />
            <br />
            <strong>What is Compact Mode?</strong>
            <br />
            Compact Mode reduces the size of character cards to show more
            information at once. You can toggle it in the settings.
            <br />
            <br />
            <strong>What is Alert Mode?</strong>
            <br />
            Alert mode shows only the planets that have extractors offline and
            need attention.
            <br />
            <br />
            <strong>What does off-blanace mean?</strong>
            <br />
            Off-blanace alert shows up for planets that have two extractors that
            are extracting different amount of material. Treshold can be set in
            settings. Generally you want to keep this below 1000.
            <br />
            <br />
            <strong>How do I reorder accounts?</strong>
            <br />
            You can drag and drop account cards to reorder them. The order will
            be saved automatically.
            <br />
            <br />
            <strong>How do I add a character to account groups?</strong>
            <br />
            You can add a character to an account group by clicking the cog on
            the character card and typing in the account/group name.
            <br />
            <br />
            <strong>I like icons! Why so much text?</strong>
            <br />
            Toggle this option in settings.
            <br />
            <br />
            <strong>I like colors! Why your alert colors are so ugly?</strong>
            <br />
            Change the color scheme in settings.
            <br />
            <br />
            <strong>What does the 3D view do?</strong>
            <br />
            Nothing. Just made it for fun
            <br />
            <br />
            <strong>Why are planet settings empty?</strong>
            <br />
            Its a work in progress feature. Plan is to be able to configuer
            planet and planet exports to belong to production chains.
            <br />
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFaqOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
export default ResponsiveAppBar;
