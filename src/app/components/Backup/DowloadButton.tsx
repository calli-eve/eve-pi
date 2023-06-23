import { CharacterContext } from "@/app/context/Context";
import { Button } from "@mui/material";
import { useContext } from "react";

export const DowloadButton = () => {
  const { characters } = useContext(CharacterContext);
  return (
    <Button
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(characters)
      )}`}
      download="pi-avanto-tk-characters.json"
    >
      Backup
    </Button>
  );
};
