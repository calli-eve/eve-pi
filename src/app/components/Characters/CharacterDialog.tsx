import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { AccessToken, CharacterUpdate } from "../../../types";
import { useEffect, useState, KeyboardEvent } from "react";
import TextField from "@mui/material/TextField";
import { revokeToken } from "@/esi-sso";

export const CharacterDialog = ({
  character,
  closeDialog,
  deleteCharacter,
  updateCharacter,
}: {
  character: AccessToken | undefined;
  closeDialog: () => void;
  deleteCharacter: (character: AccessToken) => void;
  updateCharacter: (characer: AccessToken, update: CharacterUpdate) => void;
}) => {
  const [account, setAccount] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (character?.account) setAccount(character.account);
    if (character?.comment) setComment(character.comment);
  }, [character]);

  const logout = (character: AccessToken) => {
    revokeToken(character)
      .then()
      .catch((e) => console.log("Logout failed"));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      closeDialog();
      character && updateCharacter(character, { account, comment });
    }
  };

  return (
    <Dialog
      open={character !== undefined}
      onClose={closeDialog}
      fullWidth={true}
    >
      <DialogTitle>{character && character.character.name}</DialogTitle>
      <TextField
        id="outlined-basic"
        label="Account name"
        variant="outlined"
        value={account ?? ""}
        sx={{ margin: 1 }}
        onChange={(event) => setAccount(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <TextField
        id="outlined-basic"
        label="Comment / Plan"
        variant="outlined"
        value={comment ?? ""}
        sx={{ margin: 1 }}
        multiline={true}
        minRows={6}
        onChange={(event) => setComment(event.target.value)}
      />
      <DialogActions>
        <Button
          onClick={() => {
            character && updateCharacter(character, { account, comment });
            closeDialog();
          }}
          variant="contained"
        >
          Save
        </Button>
        <Button
          onClick={() => {
            character && deleteCharacter(character);
            character && logout(character);
          }}
          variant="contained"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            closeDialog();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
