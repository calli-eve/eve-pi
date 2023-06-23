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
    <StackItem alignItems="flex-start" className="poop" height="100%">
      <Image
        src={`/noplanet.png`}
        alt=""
        width={120}
        height={120}
        style={{ marginBottom: "0.2rem" }}
      />
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
