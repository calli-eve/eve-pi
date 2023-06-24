import { Box, Stack, Typography, styled } from "@mui/material";
import Image from "next/image";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  margin: "0 !important",
  padding: 0,
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));

export const NoPlanetCard = ({}: {}) => {
  return (
    <StackItem alignItems="flex-start" height="100%">
      <Box
        width={120}
        height={120}
        border="solid 1px black"
        style={{ borderRadius: 8, marginRight: 4 }}
      />
      <Typography>No planet</Typography>
    </StackItem>
  );
};
