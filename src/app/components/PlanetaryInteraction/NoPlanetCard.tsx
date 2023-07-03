import { Box, Stack, Typography, styled, useTheme } from "@mui/material";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  margin: "0 !important",
  padding: 0,
  textAlign: "left",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const NoPlanetCard = ({}: {}) => {
  const theme = useTheme();
  return (
    <StackItem
      alignItems="flex-start"
      height="100%"
      minHeight={theme.custom.cardMinHeight}
    >
      <Box
        width={theme.custom.cardImageSize}
        height={theme.custom.cardImageSize}
        style={{ borderRadius: 8, marginRight: 4, backgroundColor: "#101010" }}
      />
      <Typography fontSize={theme.custom.smallText}>No planet</Typography>
    </StackItem>
  );
};
