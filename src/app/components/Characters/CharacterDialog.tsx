import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { AccessToken, CharacterUpdate } from "../../../types";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (character?.account) setAccount(character.account);
  }, [character]);

  const logout = (character: AccessToken) => {
    revokeToken(character)
      .then()
      .catch((e) => console.log("Logout failed"));
  };

  return (
    <Dialog open={character !== undefined} onClose={closeDialog}>
      <DialogTitle>{character && character.character.name}</DialogTitle>
      <TextField
        id="outlined-basic"
        label="Account name"
        variant="outlined"
        value={account ?? ""}
        sx={{ margin: 1 }}
        onChange={(event) => setAccount(event.target.value)}
      />
      <DialogActions>
        <Button
          onClick={() => {
            character && updateCharacter(character, { account });
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
