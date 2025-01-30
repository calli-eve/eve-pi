import { ColorContext, SessionContext } from "@/app/context/Context";
import { PI_TYPES_MAP } from "@/const";
import { planetCalculations } from "@/planets";
import { AccessToken, PlanetWithInfo } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Tooltip, Typography, useTheme, Menu, MenuItem, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import { DateTime } from "luxon";
import Image from "next/image";
import React, { forwardRef, useContext, useState } from "react";
import Countdown from "react-countdown";
import { PlanetConfigDialog } from "../PlanetConfig/PlanetConfigDialog";
import PinsCanvas3D from "./PinsCanvas3D";
import { alertModeVisibility, timeColor } from "./timeColors";
import { ExtractionSimulationDisplay } from './ExtractionSimulationDisplay';
import { ProductionNode } from './ExtractionSimulation';
import { Collapse, Box, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PlanetTableRow = ({
  planet,
  character,
}: {
  planet: PlanetWithInfo;
  character: AccessToken;
}) => {
  const theme = useTheme();

  const [planetRenderOpen, setPlanetRenderOpen] = useState(false);
  const [planetConfigOpen, setPlanetConfigOpen] = useState(false);
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handle3DrenderOpen = () => {
    setPlanetRenderOpen(true);
  };

  const handle3DrenderClose = () => {
    setPlanetRenderOpen(false);
  };

  const handlePlanetConfigOpen = () => {
    setPlanetConfigOpen(true);
  };

  const handlePlanetConfigClose = () => {
    setPlanetConfigOpen(false);
  };

  const { piPrices, alertMode } = useContext(SessionContext);
  const planetInfo = planet.info;
  const planetInfoUniverse = planet.infoUniverse;
  const { expired, extractors, localProduction, localImports, localExports } =
    planetCalculations(planet);
  const planetConfig = character.planetConfig.find(
    (p) => p.planetId === planet.planet_id,
  );
  const { colors } = useContext(ColorContext);
  // Convert local production to ProductionNode array for simulation
  const productionNodes: ProductionNode[] = Array.from(localProduction).map(([schematicId, schematic]) => ({
    schematicId: schematicId,
    typeId: schematic.outputs[0].type_id,
    name: schematic.name,
    inputs: schematic.inputs.map(input => ({
      typeId: input.type_id,
      quantity: input.quantity
    })),
    outputs: schematic.outputs.map(output => ({
      typeId: output.type_id,
      quantity: output.quantity
    })),
    cycleTime: schematic.cycle_time
  }));

  // Convert Map to Array for schematic IDs
  const installedSchematicIds = Array.from(localProduction.values()).map(p => p.schematic_id);
  
  // Get extractor head types safely
  const extractedTypeIds = extractors
    .map(e => e.extractor_details?.product_type_id)
    .filter((id): id is number => id !== undefined);

  return (
    <>
      <TableRow
        style={{ visibility: alertModeVisibility(alertMode, expired) }}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Tooltip
            title={`${
              planet.planet_type.charAt(0).toUpperCase() +
              planet.planet_type.slice(1)
            } planet.`}
          >
            <div style={{ display: "flex", minWidth: "8em" }}>
              <Image
                src={`/${planet.planet_type}.png`}
                alt=""
                width={theme.custom.cardImageSize / 6}
                height={theme.custom.cardImageSize / 6}
                style={{ marginRight: "5px" }}
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
                    color={timeColor(e.expiry_time, colors)}
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
                    {
                      PI_TYPES_MAP[e.extractor_details?.product_type_id ?? 0]
                        ?.name
                    }
                  </Typography>
                </div>
              );
            })}
          </div>
        </TableCell>
        <TableCell>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {Array.from(localProduction).map((schematic, idx) => {
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
            {localImports.map((i) => (
              <Typography
                key={`import-${character.character.characterId}-${planet.planet_id}-${i.type_id}`}
                fontSize={theme.custom.smallText}
              >
                {PI_TYPES_MAP[i.type_id].name} ({i.quantity}/h)
              </Typography>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {localExports.map((exports) => (
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
            {localExports.map((exports) => (
              <Typography
                key={`export-excluded-${character.character.characterId}-${planet.planet_id}-${exports.typeId}`}
                fontSize={theme.custom.smallText}
              >
                {planetConfig?.excludeFromTotals ? "ex" : ""}
              </Typography>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {localExports.map((exports) => (
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "4em",
              textAlign: "end",
            }}
          >
            {localExports.map((e) => {
              const valueInMillions =
                (((piPrices?.appraisal.items.find((a) => a.typeID === e.typeId)
                  ?.prices.sell.min ?? 0) *
                  e.amount) /
                  1000000) *
                24 *
                30;
              const displayValue =
                valueInMillions >= 1000
                  ? `${(valueInMillions / 1000).toFixed(2)} B`
                  : `${valueInMillions.toFixed(2)} M`;

              return (
                <Typography
                  key={`export-praisal-${character.character.characterId}-${planet.planet_id}-${e.typeId}`}
                  fontSize={theme.custom.smallText}
                >
                  {displayValue}
                </Typography>
              );
            })}
          </div>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="more"
            aria-controls="planet-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="planet-menu"
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              handlePlanetConfigOpen();
              handleMenuClose();
            }}>
              Configure Planet
            </MenuItem>
            {extractors.length > 0 && (
              <MenuItem onClick={() => {
                setSimulationOpen(!simulationOpen);
                handleMenuClose();
              }}>
                {simulationOpen ? 'Hide Extraction Simulation' : 'Show Extraction Simulation'}
              </MenuItem>
            )}
            <MenuItem onClick={() => {
              handle3DrenderOpen();
              handleMenuClose();
            }}>
              Show 3D View
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={simulationOpen} timeout="auto" unmountOnExit>
            <Box sx={{ my: 2 }}>
              <ExtractionSimulationDisplay
                extractors={extractors
                  .filter(e => e.extractor_details?.product_type_id && e.extractor_details?.qty_per_cycle)
                  .map(e => ({
                    typeId: e.extractor_details!.product_type_id!,
                    baseValue: e.extractor_details!.qty_per_cycle!,
                    cycleTime: e.extractor_details!.cycle_time || 3600,
                    installTime: e.install_time ?? "",
                    expiryTime: e.expiry_time ?? ""
                  }))}
                productionNodes={productionNodes}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
      <Dialog
        fullScreen
        open={planetConfigOpen}
        onClose={handlePlanetConfigClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handlePlanetConfigClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Planet configuration: {planetInfoUniverse?.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handlePlanetConfigClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <PlanetConfigDialog planet={planet} character={character} />
      </Dialog>
    </>
  );
};
