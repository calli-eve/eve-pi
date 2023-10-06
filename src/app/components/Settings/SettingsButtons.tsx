import { SessionContext } from "@/app/context/Context";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from "@mui/material";
import React from "react";
import { useContext } from "react";

export const SettingsButton = () => {
  const { compactMode, toggleCompactMode } = useContext(SessionContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Tooltip title="Toggle settings dialog">
      <>
        <Button onClick={handleClickOpen}>Settings</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Override default timer colors"}
          </DialogTitle>
          <DialogContent style={{ paddingTop: '1rem'}}>
            <TextField
              label="Required"
              defaultValue="Hello World"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Tooltip>
  );
};
