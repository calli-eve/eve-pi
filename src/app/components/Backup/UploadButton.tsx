import { Box, Button } from "@mui/material";
import { useState } from "react";
import { UploadDialog } from "./UploadDialog";

export const UploadButton = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  return (
    <Box>
      <Button
        style={{ width: "100%" }}
        onClick={() => setUploadDialogOpen(true)}
      >
        Restore
      </Button>
      <UploadDialog
        open={uploadDialogOpen}
        closeDialog={() => setUploadDialogOpen(false)}
      />
    </Box>
  );
};
