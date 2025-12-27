import { Box, Button, Tooltip } from "@mui/material";
import { useState } from "react";

export const PartnerCodeButton = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText("CALLIEVE");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <Tooltip
        title={
          copied
            ? "Copied to clipboard!"
            : "Click to copy partner code - Use for CCP purchases to support this project"
        }
      >
        <Button
          onClick={handleClick}
          style={{ width: "100%" }}
          sx={{ color: "white", display: "block" }}
        >
          Partner Code: CALLIEVE
        </Button>
      </Tooltip>
    </Box>
  );
};
