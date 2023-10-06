import {
  ColorContext,
  ColorSelectionType,
} from "@/app/context/Context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from "@mui/material";
import { ColorChangeHandler, ColorResult, CompactPicker } from "react-color";
import React from "react";
import { useContext } from "react";

export const SettingsButton = () => {
  const { colors, setColors } = useContext(ColorContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleColorSelection = (key: string, currentColors: ColorSelectionType) => (selection: ColorResult) => {
    console.log(key, selection.hex)
    setColors({
      ...currentColors,
      [key]: selection.hex
    })
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
          <DialogContent style={{ paddingTop: "1rem" }}>
            {Object.keys(colors).map((key) => {
              return (
                <div key={`color-row-${key}`}>
                  <Typography>{key}</Typography>
                  <CompactPicker
                    color={colors[key as keyof ColorSelectionType]}
                    onChangeComplete={handleColorSelection(key, colors)}
                  />
                </div>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    </Tooltip>
  );
};
