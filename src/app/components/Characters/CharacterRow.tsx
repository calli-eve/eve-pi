"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";
import { CharacterDialog } from "./CharacterDialog";
import { AccessToken } from "@/types";
import { Box, Button } from "@mui/material";
import { EVE_IMAGE_URL } from "@/const";
import { CharacterContext, SessionContext } from "@/app/context/Context";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));

export const CharacterRow = ({ character }: { character: AccessToken }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<
    AccessToken | undefined
  >(undefined);

  const { deleteCharacter, updateCharacter } = useContext(CharacterContext);
  const { compactMode } = useContext(SessionContext);
  return (
    <StackItem
      key={character.character.characterId}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <CharacterDialog
        character={selectedCharacter}
        deleteCharacter={deleteCharacter}
        updateCharacter={updateCharacter}
        closeDialog={() => setSelectedCharacter(undefined)}
      />
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={120}
        onClick={() => setSelectedCharacter(character)}
      >
        <Image
          src={`${EVE_IMAGE_URL}/characters/${character.character.characterId}/portrait?size=128`}
          alt=""
          width={compactMode ? 80 : 120}
          height={compactMode ? 80 : 120}
          style={{ marginBottom: "0.2rem", borderRadius: 8 }}
        />
        <Button style={{ padding: 3, fontSize: "0.6rem" }} variant="outlined">
          {character.character.name}
        </Button>
      </Box>
    </StackItem>
  );
};
