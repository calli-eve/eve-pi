import { Stack, Typography, styled } from "@mui/material";
import Image from "next/image";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));

export const NoPlanetCard = ({}: {}) => {
  return (
    <StackItem alignItems="flex-start" height="100%">
      <Image src={`/noplanet.png`} alt="" width={120} height={120} />
      <Image
        width={64}
        height={64}
        src={`/stopped.png`}
        alt=""
        style={{ position: "absolute" }}
      />
      <Typography>No planet</Typography>
    </StackItem>
  );
};
