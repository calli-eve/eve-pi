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
import { CompactModeButton } from "../CompactModeButton/CompactModeButton";
import { DiscordButton } from "../Discord/DiscordButton";
import { GitHubButton } from "../Github/GitHubButton";
import { LoginButton } from "../Login/LoginButton";
import { PlanModeButton } from "../PlanModeButton/PlanModeButton";
import { SettingsButton } from "../Settings/SettingsButtons";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

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
                <CCPButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <SettingsButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <CompactModeButton />
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <PlanModeButton />
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
              gap: "0.2rem"
            }}
          >
            <LoginButton />
            <DowloadButton />
            <UploadButton />
            <DiscordButton />
            <GitHubButton />
            <CCPButton />
            <SettingsButton />
            <CompactModeButton />
            <PlanModeButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
