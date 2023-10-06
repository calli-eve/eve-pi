import { SessionContext } from "@/app/context/Context";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";

export const PlanModeButton = () => {
  const { planMode, togglePlanMode } = useContext(SessionContext);
  return (
    <Tooltip title="Toggle plan mode that show layout for widescreen">
      <Button onClick={togglePlanMode} style={{backgroundColor: planMode ? 'rgba(144, 202, 249, 0.08)' : 'inherit'}}>
        Plan mode

      </Button>
    </Tooltip>
  );
};
