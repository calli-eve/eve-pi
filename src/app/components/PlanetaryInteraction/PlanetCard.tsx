import { Stack, Typography, styled, useTheme } from "@mui/material";
import Image from "next/image";
import { AccessToken, Planet } from "@/types";
import { Api } from "@/esi-api";
import { forwardRef, useContext, useEffect, useState } from "react";
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

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  margin: "0 !important",
  textAlign: "left",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export interface Pin {
  contents?: {
    amount: number;
    type_id: number;
  }[];
  expiry_time?: string;
  extractor_details?: {
    cycle_time?: number;
    head_radius?: number;
    heads: {
      head_id: number;
      latitude: number;
      longitude: number;
    }[];
    product_type_id?: number;
    qty_per_cycle?: number;
  };
  factory_details?: {
    schematic_id: number;
  };
  install_time?: string;
  last_cycle_start?: string;
  latitude: number;
  longitude: number;
  pin_id: number;
  schematic_id?: number;
  type_id: number;
}

export interface PlanetInfo {
  links: {
    destination_pin_id: number;
    link_level: number;
    source_pin_id: number;
  }[];
  pins: Pin[];
  routes: {
    content_type_id: number;
    destination_pin_id: number;
    quantity: number;
    route_id: number;
    source_pin_id: number;
    waypoints?: number[];
  }[];
}

export interface PlanetInfoUniverse {
  name: string;
  planet_id: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  system_id: number;
  type_id: number;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PlanetCard = ({
  planet,
  character,
}: {
  planet: Planet;
  character: AccessToken;
}) => {
  const [planetInfo, setPlanetInfo] = useState<PlanetInfo | undefined>(
    undefined
  );

  const [planetInfoUniverse, setPlanetInfoUniverse] = useState<
    PlanetInfoUniverse | undefined
  >(undefined);

  const [planetRenderOpen, setPlanetRenderOpen] = useState(false);

  const theme = useTheme();

  const handle3DrenderOpen = () => {
    setPlanetRenderOpen(true);
  };

  const handle3DrenderClose = () => {
    setPlanetRenderOpen(false);
  };

  const extractors =
    (planetInfo &&
      planetInfo.pins
        .filter((p) => EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id))
        .map((p) => p.expiry_time)) ??
    [];
  const getPlanet = async (
    character: AccessToken,
    planet: Planet
  ): Promise<PlanetInfo> => {
    const api = new Api();
    const planetInfo = (
      await api.characters.getCharactersCharacterIdPlanetsPlanetId(
        character.character.characterId,
        planet.planet_id,
        {
          token: character.access_token,
        }
      )
    ).data;
    return planetInfo;
  };

  const getPlanetUniverse = async (
    planet: Planet
  ): Promise<PlanetInfoUniverse> => {
    const api = new Api();
    const planetInfo = (
      await api.universe.getUniversePlanetsPlanetId(planet.planet_id)
    ).data;
    return planetInfo;
  };

  const timeColor = (extractorDate: string | undefined): string => {
    if (!extractorDate) return "red";
    const dateExtractor = DateTime.fromISO(extractorDate);
    const dateNow = DateTime.now();
    if (dateExtractor < dateNow) return "red";
    if (dateExtractor.minus({ hours: 24 }) < dateNow) return "yellow";
    return "green";
  };

  useEffect(() => {
    getPlanet(character, planet).then(setPlanetInfo);
    getPlanetUniverse(planet).then(setPlanetInfoUniverse);
  }, [planet, character]);
  return (
    <StackItem
      alignItems="flex-start"
      height="100%"
      position="relative"
      minHeight={theme.custom.cardMinHeight}
    >
      <Image
        src={`/${planet.planet_type}.png`}
        alt=""
        width={theme.custom.cardImageSize}
        height={theme.custom.cardImageSize}
        style={{ borderRadius: 8, marginRight: 4 }}
        onClick={handle3DrenderOpen}
      />
      {extractors.some((e) => {
        if (!e) return true;
        const dateExtractor = DateTime.fromISO(e);
        const dateNow = DateTime.now();
        return dateExtractor < dateNow;
      }) && (
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

      {extractors.map((e, idx) => {
        return (
          <Typography
            key={`${e}-${idx}-${character.character.characterId}`}
            color={timeColor(e)}
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
