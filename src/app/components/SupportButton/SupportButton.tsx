import { Box, Button, Tooltip } from "@mui/material";
export const SupportButton = () => {
  return (
    <Box>
      <Tooltip
        title={`
          Consider using code 'CALLIEVE' on EVE store checkout to support the project! Click to copy to clipboard ;)
        `}
      >
        <Button
          href=""
          style={{ width: "100%" }}
          sx={{ color: "white", display: "block" }}
          onClick={() => {
            navigator.clipboard.writeText("CALLIEVE");
          }}
        >
          CALLIEVE
        </Button>
      </Tooltip>
    </Box>
  );
};
