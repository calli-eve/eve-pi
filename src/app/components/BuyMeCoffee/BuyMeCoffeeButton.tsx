import { Box, Button, Tooltip } from "@mui/material";
export const BuyMeCoffeeButton = () => {
  return (
    <Box>
      <Tooltip title="Support the development of this tool">
        <Button
          href="https://buymeacoffee.com/evepi"
          target="_blank"
          style={{ width: "100%" }}
          sx={{ color: "white", display: "block" }}
        >
          By me a beer
        </Button>
      </Tooltip>
    </Box>
  );
};
