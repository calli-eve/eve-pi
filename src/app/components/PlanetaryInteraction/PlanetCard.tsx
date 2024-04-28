import { Stack, Typography, styled, useTheme } from "@mui/material";
import Image from "next/image";
import {
  AccessToken,
  Planet,
  PlanetInfo,
  PlanetInfoUniverse,
  PlanetWithInfo,
} from "@/types";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { EXTRACTOR_TYPE_IDS } from "@/const";
import Countdown from "react-countdown";
import PinsCanvas3D from "./PinsCanvas3D";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {
  alertModeVisibility,
  extractorsHaveExpired,
  timeColor,
} from "./timeColors";
import { ColorContext, SessionContext } from "@/app/context/Context";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  margin: "0 !important",
  textAlign: "left",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PlanetCard = ({
  character,
  planet,
}: {
  character: AccessToken;
  planet: PlanetWithInfo;
}) => {
  const { alertMode } = useContext(SessionContext);

  const planetInfo = planet.info;
  const planetInfoUniverse = planet.infoUniverse;

  const [planetRenderOpen, setPlanetRenderOpen] = useState(false);

  const theme = useTheme();

  const handle3DrenderOpen = () => {
    setPlanetRenderOpen(true);
  };

  const handle3DrenderClose = () => {
    setPlanetRenderOpen(false);
  };

  const extractorsExpiryTime =
    (planetInfo &&
      planetInfo.pins
        .filter((p) => EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id))
        .map((p) => p.expiry_time)) ??
    [];

  const { colors } = useContext(ColorContext);
  const expired = extractorsHaveExpired(extractorsExpiryTime);

  return (
    <StackItem
      alignItems="flex-start"
      height="100%"
      position="relative"
      minHeight={theme.custom.cardMinHeight}
      visibility={alertModeVisibility(alertMode, expired)}
    >
      <Image
        unoptimized
        src={`/${planet.planet_type}.png`}
        alt=""
        width={theme.custom.cardImageSize}
        height={theme.custom.cardImageSize}
        style={{ borderRadius: 8, marginRight: 4 }}
        onClick={handle3DrenderOpen}
      />
      {expired && (
        <Image
          width={32}
          height={32}
          src={`/stopped.png`}
          alt=""
          style={{ position: "absolute", top: theme.custom.stoppedPosition }}
        />
      )}
      <div style={{ position: "absolute", top: 5, left: 10 }}>
        <Typography fontSize={theme.custom.smallText}>
          {planetInfoUniverse?.name}
        </Typography>
        <Typography fontSize={theme.custom.smallText}>
          L{planet.upgrade_level}
        </Typography>
      </div>

      {extractorsExpiryTime.map((e, idx) => {
        return (
          <Typography
            key={`${e}-${idx}-${character.character.characterId}`}
            color={timeColor(e, colors)}
            fontSize={theme.custom.smallText}
          >
            {e ? (
              <Countdown
                overtime={true}
                date={DateTime.fromISO(e).toMillis()}
              />
            ) : (
              "STOPPED"
            )}
          </Typography>
        );
      })}
      <Dialog
        fullScreen
        open={planetRenderOpen}
        onClose={handle3DrenderClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handle3DrenderClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {planetInfoUniverse?.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handle3DrenderClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <PinsCanvas3D planetInfo={planetInfo} />
      </Dialog>
    </StackItem>
  );
};
