import { Button, Dialog, DialogActions, DialogTitle, Box } from "@mui/material";
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
  const [system, setSystem] = useState("");

  useEffect(() => {
    if (character?.account) setAccount(character.account);
    if (character?.comment) setComment(character.comment);
    if (character?.system) setSystem(character.system);
  }, [character]);

  const logout = (character: AccessToken) => {
    revokeToken(character)
      .then()
      .catch((e) => console.log("Logout failed"));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      closeDialog();
      if (character) {
        updateCharacter(character, { account, comment });
      }
    }
  };

  return (
    <Dialog
      open={character !== undefined}
      onClose={closeDialog}
      fullWidth={true}
    >
      <DialogTitle>{character?.character?.name}</DialogTitle>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
        <TextField
          id="outlined-basic"
          label="Account name"
          variant="outlined"
          value={account ?? ""}
          sx={{ flex: 1 }}
          onChange={(event) => setAccount(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={() => {
            setAccount("-");
          }}
          variant="outlined"
          sx={{ ml: 1 }}
        >
          Clear account
        </Button>
      </Box>
      <TextField
        id="outlined-basic"
        label="System"
        variant="outlined"
        value={system ?? ""}
        sx={{ margin: 1 }}
        minRows={6}
        onChange={(event) => setSystem(event.target.value)}
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
            console.log("Saving character", character, { account, comment, system });
            character &&
              updateCharacter(character, { account, comment, system });
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
