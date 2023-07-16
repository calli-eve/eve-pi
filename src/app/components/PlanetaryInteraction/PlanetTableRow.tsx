import { Button, Tooltip, Typography, useTheme } from "@mui/material";
import { AccessToken, Planet, PlanetInfo, PlanetInfoUniverse } from "@/types";
import { Api } from "@/esi-api";
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateTime } from "luxon";
import {
  EXTRACTOR_TYPE_IDS,
  FACTORY_IDS,
  PI_SCHEMATICS,
  PI_TYPES_MAP,
} from "@/const";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Countdown from "react-countdown";
import Image from "next/image";
import { SessionContext } from "@/app/context/Context";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PinsCanvas3D from "./PinsCanvas3D";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PlanetTableRow = ({
  planet,
  character,
}: {
  planet: Planet;
  character: AccessToken;
}) => {
  const theme = useTheme();

  const [planetRenderOpen, setPlanetRenderOpen] = useState(false);

  const handle3DrenderOpen = () => {
    setPlanetRenderOpen(true);
  };

  const handle3DrenderClose = () => {
    setPlanetRenderOpen(false);
  };

  const { piPrices } = useContext(SessionContext);
  const [planetInfo, setPlanetInfo] = useState<PlanetInfo | undefined>(
    undefined
  );

  const [planetInfoUniverse, setPlanetInfoUniverse] = useState<
    PlanetInfoUniverse | undefined
  >(undefined);

  const [extractors, setExtractors] = useState<PlanetInfo["pins"]>([]);
  const [production, setProduction] = useState(
    new Map<SchematicId, (typeof PI_SCHEMATICS)[number]>()
  );

  const [imports, setImports] = useState<
    (typeof PI_SCHEMATICS)[number]["inputs"]
  >([]);

  const [exports, setExports] = useState<{ typeId: number; amount: number }[]>(
    []
  );

  type SchematicId = number;

  const getPlanet = async (
    character: AccessToken,
    planet: Planet
  ): Promise<PlanetInfo> => {
    const api = new Api();
    const planetRes = await api.v3.getCharactersCharacterIdPlanetsPlanetId(
      character.character.characterId,
      planet.planet_id,
      {
        token: character.access_token,
      }
    );

    const planetInfo = planetRes.data;

    setExtractors(
      planetInfo.pins.filter((p) =>
        EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id)
      )
    );

    const localProduction = planetInfo.pins
      .filter((p) => FACTORY_IDS().some((e) => e.type_id === p.type_id))
      .reduce((acc, f) => {
        if (f.schematic_id) {
          const schematic = PI_SCHEMATICS.find(
            (s) => s.schematic_id == f.schematic_id
          );
          if (schematic) acc.set(f.schematic_id, schematic);
        }
        return acc;
      }, new Map<SchematicId, (typeof PI_SCHEMATICS)[number]>());

    setProduction(localProduction);

    const locallyProduced = Array.from(localProduction)
      .flatMap((p) => p[1].outputs)
      .map((p) => p.type_id);

    const locallyConsumed = Array.from(localProduction)
      .flatMap((p) => p[1].inputs)
      .map((p) => p.type_id);

    const locallyExcavated = planetInfo.pins
      .filter((p) => EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id))
      .map((e) => e.extractor_details?.product_type_id ?? 0);

    const localImports = Array.from(localProduction)
      .flatMap((p) => p[1].inputs)
      .filter(
        (p) =>
          ![...locallyProduced, ...locallyExcavated].some(
            (lp) => lp === p.type_id
          )
      );

    const localExports = locallyProduced
      .filter((p) => !locallyConsumed.some((lp) => lp === p))
      .map((typeId) => {
        const schematic = PI_SCHEMATICS.flatMap((s) => s.outputs).find(
          (s) => s.type_id === typeId
        );
        if (!schematic) return { typeId, amount: 0 };
        const factoriesProducing = planetInfo.pins
          .filter((p) => FACTORY_IDS().some((e) => e.type_id === p.type_id))
          .filter((f) => f.schematic_id === schematic?.schematic_id);
        const amount = schematic.quantity
          ? factoriesProducing.length * schematic.quantity
          : (0 * PI_SCHEMATICS[schematic.schematic_id].cycle_time) / 3600;
        return {
          typeId,
          amount,
        };
      });

    setImports(localImports);
    setExports(localExports);
    return planetInfo;
  };

  const getPlanetUniverse = async (
    planet: Planet
  ): Promise<PlanetInfoUniverse> => {
    const api = new Api();
    const planetInfo = (
      await api.v1.getUniversePlanetsPlanetId(planet.planet_id)
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
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Tooltip
          title={`${
            planet.planet_type.charAt(0).toUpperCase() +
            planet.planet_type.slice(1)
          } planet.`}
        >
          <div style={{ display: "flex" }}>
            <Image
              src={`/${planet.planet_type}.png`}
              alt=""
              width={theme.custom.cardImageSize / 6}
              height={theme.custom.cardImageSize / 6}
            />
            {planetInfoUniverse?.name}
          </div>
        </Tooltip>
      </TableCell>
      <TableCell>{planet.upgrade_level}</TableCell>
      <TableCell>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {extractors.map((e, idx) => {
            return (
              <div
                key={`${e}-${idx}-${character.character.characterId}`}
                style={{ display: "flex" }}
              >
                <Typography
                  color={timeColor(e.expiry_time)}
                  fontSize={theme.custom.smallText}
                  paddingRight={1}
                >
                  {e ? (
                    <Countdown
                      overtime={true}
                      date={DateTime.fromISO(e.expiry_time ?? "").toMillis()}
                    />
                  ) : (
                    "STOPPED"
                  )}
                </Typography>
                <Typography fontSize={theme.custom.smallText}>
                  {PI_TYPES_MAP[e.extractor_details?.product_type_id ?? 0].name}
                </Typography>
              </div>
            );
          })}
        </div>
      </TableCell>
      <TableCell>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Array.from(production).map((schematic, idx) => {
            return (
              <Typography
                key={`prod-${character.character.characterId}-${planet.planet_id}-${idx}`}
                fontSize={theme.custom.smallText}
              >
                {schematic[1].name}
              </Typography>
            );
          })}
        </div>
      </TableCell>
      <TableCell>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {imports.map((i) => (
            <Typography
              key={`import-${character.character.characterId}-${planet.planet_id}-${i.type_id}`}
              fontSize={theme.custom.smallText}
            >
              {PI_TYPES_MAP[i.type_id].name}
            </Typography>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {exports.map((exports) => (
            <Typography
              key={`export-${character.character.characterId}-${planet.planet_id}-${exports.typeId}`}
              fontSize={theme.custom.smallText}
            >
              {PI_TYPES_MAP[exports.typeId].name}
            </Typography>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {exports.map((exports) => (
            <Typography
              key={`export-uph-${character.character.characterId}-${planet.planet_id}-${exports.typeId}`}
              fontSize={theme.custom.smallText}
            >
              {exports.amount}
            </Typography>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {exports.map((e) => (
            <Typography
              key={`export-praisal-${character.character.characterId}-${planet.planet_id}-${e.typeId}`}
              fontSize={theme.custom.smallText}
            >
              {`${(
                (((piPrices?.appraisal.items.find((a) => a.typeID === e.typeId)
                  ?.prices.sell.min ?? 0) *
                  e.amount) /
                  1000000) *
                24 *
                30
              ).toFixed(2)} M`}
            </Typography>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <Tooltip title="Open 3D render of this planet">
          <Button variant="contained" onClick={handle3DrenderOpen}>
            3D
          </Button>
        </Tooltip>
      </TableCell>
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
    </TableRow>
  );
};
