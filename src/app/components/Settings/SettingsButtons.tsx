import {
  ColorContext,
  ColorSelectionType,
  SessionContext,
} from "@/app/context/Context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { ColorChangeHandler, ColorResult, CompactPicker } from "react-color";
import React, { useState, useContext } from "react";

export const SettingsButton = () => {
  const { colors, setColors } = useContext(ColorContext);
  const { balanceThreshold, setBalanceThreshold } = useContext(SessionContext);
  const [open, setOpen] = useState(false);

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

  const handleBalanceThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100000) {
      setBalanceThreshold(value);
    }
  };

  return (
    <Tooltip title="Toggle settings dialog">
      <>
        <Button onClick={handleClickOpen} color="inherit">
          Settings
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          <DialogTitle id="alert-dialog-title">
            {"Settings"}
          </DialogTitle>

          <DialogContent style={{ paddingTop: "1rem" }}>
          <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Balance Threshold</Typography>
              <TextField
                type="number"
                value={balanceThreshold}
                onChange={handleBalanceThresholdChange}
                fullWidth
                margin="normal"
                inputProps={{ min: 0, max: 100000 }}
                helperText="Set the threshold for balance alerts (0-100,000)"
                error={balanceThreshold < 0 || balanceThreshold > 100000}
              />
            </Box>
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
