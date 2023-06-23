import { CharacterContext, SessionContext } from "@/app/context/Context";
import { Button } from "@mui/material";
import { useContext } from "react";

export const DowloadButton = () => {
  const { characters } = useContext(CharacterContext);
  return (
    <Button
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(characters)
      )}`}
      download={`eve-pi-characters.json`}
    >
      Backup
    </Button>
  );
};
