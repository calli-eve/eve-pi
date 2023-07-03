import { Box, Button, Tooltip } from "@mui/material";
import { useState } from "react";
import { UploadDialog } from "./UploadDialog";

export const UploadButton = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  return (
    <Box>
      <Tooltip title="Upload your exported configuration to restore the PI list">
        <Button
          style={{ width: "100%" }}
          onClick={() => setUploadDialogOpen(true)}
          sx={{ color: "white", display: "block" }}
        >
          Restore
        </Button>
      </Tooltip>
      <UploadDialog
        open={uploadDialogOpen}
        closeDialog={() => setUploadDialogOpen(false)}
      />
    </Box>
  );
};
