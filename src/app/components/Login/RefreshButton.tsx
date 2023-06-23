import { CharacterContext, SessionContext } from "@/app/context/Context";
import { Button } from "@mui/material";
import { useContext } from "react";

export const RefreshButton = () => {
  const { refreshSession } = useContext(SessionContext);
  const { characters } = useContext(CharacterContext);
  return (
    <Button
      style={{ width: "100%" }}
      variant="contained"
      onClick={() => refreshSession(characters)}
    >
      Refresh
    </Button>
  );
};
