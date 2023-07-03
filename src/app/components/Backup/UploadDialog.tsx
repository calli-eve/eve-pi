import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { DialogActions, DialogContent, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "@/app/context/Context";
import { AccessToken } from "@/types";

export const UploadDialog = ({
  open,
  closeDialog,
}: {
  open: boolean;
  closeDialog: () => void;
}) => {
  const [file, setFile] = useState();

  const { restoreCharacters } = useContext(CharacterContext);

  const error = new Error("Invalid input");

  const validate = (characters: AccessToken[]) => {
    characters.forEach((c) => {
      if (!c.access_token) throw error;
      if (!c.expires_at) throw error;
      if (!c.refresh_token) throw error;
      if (!c.character) throw error;
      if (!c.character.characterId) throw error;
      if (!c.character.name) throw error;
    });

    return characters;
  };
  useEffect(() => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = (event) => {
        if (!event || event.target === null) return;
        const jsonOutput = event.target.result?.toString();
        if (jsonOutput) restoreCharacters(validate(JSON.parse(jsonOutput)));
        closeDialog();
      };

      fileReader.readAsText(file);
    }
  }, [file]);

  const changeHandler = (event: any) => {
    setFile(event.target.files[0]);
  };
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Restore your character list</DialogTitle>
      <DialogContent>
        <Typography>
          The list must be exported from the same EVE PI instance to work!
        </Typography>
        <input
          type="file"
          name="file"
          accept=".json"
          onChange={changeHandler}
          style={{ paddingTop: "1rem" }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
