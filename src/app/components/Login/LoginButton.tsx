import { Button } from "@mui/material";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";

export const LoginButton = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  return (
    <>
      <Button
        style={{ width: "100%" }}
        variant="contained"
        onClick={() => setLoginDialogOpen(true)}
      >
        Login
      </Button>
      <LoginDialog
        open={loginDialogOpen}
        closeDialog={() => setLoginDialogOpen(false)}
      />
    </>
  );
};
