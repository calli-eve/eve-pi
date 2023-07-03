import { Box, Button, Tooltip } from "@mui/material";
export const DiscordButton = () => {
  return (
    <Box>
      <Tooltip title="Come nerd out in discord about PI and this tool">
        <Button
          href="https://discord.gg/MDapvGyw"
          target="_blank"
          style={{ width: "100%" }}
          sx={{ color: "white", display: "block" }}
        >
          Discord
        </Button>
      </Tooltip>
    </Box>
  );
};
