"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";
import { CharacterDialog } from "./CharacterDialog";
import { AccessToken } from "@/types";
import { Box } from "@mui/material";
import { EVE_IMAGE_URL } from "@/const";
import { CharacterContext } from "@/app/context/Context";

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
        onClick={() => setSelectedCharacter(character)}
        display="flex"
        flexDirection="column"
      >
        <Image
          src={`${EVE_IMAGE_URL}/characters/${character.character.characterId}/portrait?size=64`}
          alt=""
          width={120}
          height={120}
          style={{ marginBottom: "0.2rem" }}
        />
        {character.character.name}
      </Box>
    </StackItem>
  );
};
