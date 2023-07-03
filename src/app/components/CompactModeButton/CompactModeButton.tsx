import { SessionContext } from "@/app/context/Context";
import { ToggleButton, Tooltip } from "@mui/material";
import { useContext } from "react";

export const CompactModeButton = () => {
  const { compactMode, toggleCompactMode } = useContext(SessionContext);
  return (
    <Tooltip title="Toggle compact layout for widescreen">
      <ToggleButton
        value="check"
        selected={compactMode}
        onChange={toggleCompactMode}
      >
        Compact mode
      </ToggleButton>
    </Tooltip>
  );
};
