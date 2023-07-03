import { Box, Button, Tooltip } from "@mui/material";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";

export const LoginButton = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  return (
    <Box>
      <Tooltip title="Login with your EVE characters to track your planets">
        <Button
          style={{ width: "100%" }}
          sx={{ color: "white", display: "block" }}
          onClick={() => setLoginDialogOpen(true)}
        >
          Login
        </Button>
      </Tooltip>
      <LoginDialog
        open={loginDialogOpen}
        closeDialog={() => setLoginDialogOpen(false)}
      />
    </Box>
  );
};
