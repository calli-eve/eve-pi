import { SessionContext } from "@/app/context/Context";
import { Box, Stack, Typography, styled } from "@mui/material";
import { useContext } from "react";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  margin: "0 !important",
  padding: 0,
  textAlign: "left",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const NoPlanetCard = ({}: {}) => {
  const { compactMode } = useContext(SessionContext);
  return (
    <StackItem
      alignItems="flex-start"
      height="100%"
      minHeight={compactMode ? "100px" : "170px"}
    >
      <Box
        width={compactMode ? 80 : 120}
        height={compactMode ? 80 : 120}
        border="solid 1px black"
        style={{ borderRadius: 8, marginRight: 4 }}
      />
      <Typography fontSize="0.8rem">No planet</Typography>
    </StackItem>
  );
};
