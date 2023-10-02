import { SessionContext } from "@/app/context/Context";
import { ToggleButton, Tooltip } from "@mui/material";
import { useContext } from "react";

export const PlanModeButton = () => {
  const { planMode, togglePlanMode } = useContext(SessionContext);
  return (
    <Tooltip title="Toggle plan mode that show layout for widescreen">
      <ToggleButton
        value="check"
        selected={planMode}
        onChange={togglePlanMode}
      >
        Plan mode
      </ToggleButton>
    </Tooltip>
  );
};
