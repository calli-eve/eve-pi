import { CharacterContext } from "@/app/context/Context";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";

export const DowloadButton = () => {
  const { characters } = useContext(CharacterContext);
  return (
    <Tooltip title="Export your EVE PI list to transfer to another device or backup">
      <Button
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(characters)
        )}`}
        download={`eve-pi-characters.json`}
        sx={{ color: "white", display: "block" }}
      >
        Backup
      </Button>
    </Tooltip>
  );
};
