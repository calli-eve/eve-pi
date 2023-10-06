import { SessionContext } from "@/app/context/Context";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";

export const CompactModeButton = () => {
  const { compactMode, toggleCompactMode } = useContext(SessionContext);
  return (
    <Tooltip title="Toggle compact layout for widescreen">
      <Button
        style={{
          backgroundColor: compactMode
            ? "rgba(144, 202, 249, 0.08)"
            : "inherit",
        }}
        onClick={toggleCompactMode}
      >
        Compact mode
      </Button>
    </Tooltip>
  );
};
