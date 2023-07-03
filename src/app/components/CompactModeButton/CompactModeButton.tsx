import { SessionContext } from "@/app/context/Context";
import { ToggleButton, Tooltip } from "@mui/material";
import { useContext } from "react";

export const CompactModeButton = () => {
  const { compactMode, toggleCompactMode } = useContext(SessionContext);
  return (
    <Tooltip title="Export your EVE PI list to transfer to another device or backup">
      <ToggleButton
        value="check"
        selected={compactMode}
        onChange={toggleCompactMode}
        style={{ margin: "1rem 0" }}
      >
        Compact mode
      </ToggleButton>
    </Tooltip>
  );
};
