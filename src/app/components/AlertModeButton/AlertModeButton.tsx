import { SessionContext } from "@/app/context/Context";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";

export const AlertModeButton = () => {
  const { alertMode, toggleAlertMode } = useContext(SessionContext);
  return (
    <Tooltip title="Toggle alert mode to show only accounts and planets that need action.">
      <Button
        style={{
          backgroundColor: alertMode
            ? "rgba(144, 202, 249, 0.08)"
            : "inherit",
        }}
        onClick={toggleAlertMode}
      >
        Alert mode
      </Button>
    </Tooltip>
  );
};
