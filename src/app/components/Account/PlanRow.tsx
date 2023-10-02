import { AccessToken } from "@/types";
import { Stack, Typography, styled } from "@mui/material";
const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.custom.compactMode ? theme.spacing(1) : theme.spacing(2),
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));
export const PlanRow = ({ character }: { character: AccessToken }) => {
  return (
    <StackItem>
      <Typography style={{whiteSpace: 'pre-line'}}>{character.comment}</Typography>
    </StackItem>
  );
};
