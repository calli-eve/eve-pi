"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { CharacterDialog } from "./CharacterDialog";
import { AccessToken } from "@/types";
import { Box, Tooltip, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { EVE_IMAGE_URL } from "@/const";
import { CharacterContext } from "@/app/context/Context";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.custom.compactMode ? theme.spacing(1) : theme.spacing(2),
  display: "flex",
  textAlign: "left",
  justifyContent: "flex-start",
  alignItems: "flex-start",
}));

export const CharacterRow = ({ character }: { character: AccessToken }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<
    AccessToken | undefined
  >(undefined);

  const { deleteCharacter, updateCharacter } = useContext(CharacterContext);
  const theme = useTheme();
  return (
    <StackItem
      key={character.character.characterId}
    >
      <CharacterDialog
        character={selectedCharacter}
        deleteCharacter={deleteCharacter}
        updateCharacter={updateCharacter}
        closeDialog={() => setSelectedCharacter(undefined)}
      />
      <Typography
        sx={{
          whiteSpace: "nowrap",
          fontSize: theme.custom.smallText,
          textAlign: "left",
          lineHeight: 1.2,
          marginBottom: "0.4rem",
          marginLeft: "0.2rem",
          overflow: "visible",
          textOverflow: "clip",
          width: "1rem"
        }}
      >
        {character.character.name}
      </Typography>
      <Tooltip title={character.comment}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={120}
          onClick={() => setSelectedCharacter(character)}
          position="relative"
          sx={{ cursor: "pointer" }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCharacter(character);
            }}
            sx={{
              p: 0,
              position: "absolute",
              top: 4,
              left: 4,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <SettingsIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
          <Image
            unoptimized
            src={`${EVE_IMAGE_URL}/characters/${character.character.characterId}/portrait?size=128`}
            alt=""
            width={theme.custom.cardImageSize}
            height={theme.custom.cardImageSize}
            style={{ marginBottom: "0.2rem", borderRadius: 8 }}
          />
        </Box>
      </Tooltip>
    </StackItem>
  );
};
