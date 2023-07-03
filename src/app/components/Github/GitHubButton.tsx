import { Box, Button, Tooltip } from "@mui/material";
export const GitHubButton = () => {
  return (
    <Box>
      <Tooltip title="Checkout the source of this app">
        <Button
          href="https://github.com/calli-eve/eve-pi"
          target="_blank"
          style={{ width: "100%" }}
          sx={{ color: "white", display: "block" }}
        >
          GitHub
        </Button>
      </Tooltip>
    </Box>
  );
};
