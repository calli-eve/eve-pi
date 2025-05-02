import { ColorContext, SessionContext } from "@/app/context/Context";
import { PI_TYPES_MAP, STORAGE_IDS, STORAGE_CAPACITIES, PI_PRODUCT_VOLUMES, EVE_IMAGE_URL, PI_SCHEMATICS, LAUNCHPAD_IDS } from "@/const";
import { planetCalculations } from "@/planets";
import { AccessToken, PlanetWithInfo } from "@/types";
import { PlanetCalculations, StorageInfo } from "@/types/planet";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Tooltip, Typography, useTheme, Menu, MenuItem, IconButton, Checkbox, FormControlLabel } from "@mui/material";
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
import { timeColor } from "./alerts";
import { ExtractionSimulationDisplay } from './ExtractionSimulationDisplay';
import { ExtractionSimulationTooltip } from './ExtractionSimulationTooltip';
import { Collapse, Box, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SchematicInput {
  type_id: number;
  quantity: number;
}

interface SchematicOutput {
  type_id: number;
  quantity: number;
}

export const PlanetTableRow = ({
  planet,
  character,
  planetDetails,
}: {
  planet: PlanetWithInfo;
  character: AccessToken;
  planetDetails: PlanetCalculations;
}) => {
  const theme = useTheme();
  const { showProductIcons, extractionTimeMode, alertMode } = useContext(SessionContext);
  const { colors } = useContext(ColorContext);

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

  const { piPrices, updatePlanetConfig, readPlanetConfig } = useContext(SessionContext);
  const planetInfo = planet.info;
  const planetInfoUniverse = planet.infoUniverse;
  const planetConfig = readPlanetConfig({
    characterId: character.character.characterId,
    planetId: planet.planet_id,
  });

  const handleExcludeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePlanetConfig({
      ...planetConfig,
      excludeFromTotals: event.target.checked,
    });
  };

  // Check if there are any alerts
  const hasAlerts = alertMode && (
    planetDetails.expired ||
    planetDetails.storageInfo.some(storage => storage.fillRate > 60) ||
    planetDetails.importDepletionTimes.some(depletion => depletion.hoursUntilDepletion < 24) ||
    planetDetails.hasLargeExtractorDifference
  );

  // If in alert mode and no alerts, hide the row
  if (alertMode && !hasAlerts) {
    return null;
  }

  const renderProductDisplay = (typeId: number, amount?: number) => {
    if (!typeId || !PI_TYPES_MAP[typeId]) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Typography fontSize={theme.custom.smallText} color="text.secondary">
            No product
          </Typography>
          {amount !== undefined && (
            <Typography fontSize={theme.custom.smallText} style={{ marginLeft: "5px", flexShrink: 0 }}>
              {amount}
            </Typography>
          )}
        </div>
      );
    }

    if (showProductIcons) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Image
            src={`${EVE_IMAGE_URL}/types/${typeId}/icon?size=32`}
            alt={PI_TYPES_MAP[typeId].name}
            width={32}
            height={32}
            style={{ marginRight: "5px" }}
          />
          {amount !== undefined && (
            <Typography fontSize={theme.custom.smallText} style={{ marginLeft: "5px", flexShrink: 0 }}>
              {amount}
            </Typography>
          )}
        </div>
      );
    }
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography fontSize={theme.custom.smallText}>
          {PI_TYPES_MAP[typeId].name}
        </Typography>
        {amount !== undefined && (
          <Typography fontSize={theme.custom.smallText} style={{ marginLeft: "5px", flexShrink: 0 }}>
            {amount}
          </Typography>
        )}
      </div>
    );
  };

  return (
    <>
      <TableRow
        style={{ visibility: planetDetails.visibility }}
        sx={{ 
          "&:last-child td, &:last-child th": { border: 0 },
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
        onClick={(e: React.MouseEvent<HTMLTableRowElement>) => {
          if (!(e.target as HTMLElement).closest('.clickable-cell')) return;
          setSimulationOpen(!simulationOpen);
        }}
      >
        <TableCell component="th" scope="row" className="clickable-cell">
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
              <Tooltip
                placement="right"
                title={
                  planetDetails.extractors.length > 0 ? (
                    <ExtractionSimulationTooltip
                      extractors={planetDetails.extractors
                        .filter(e => e.extractor_details?.product_type_id && e.extractor_details?.qty_per_cycle)
                        .map(e => ({
                          typeId: e.extractor_details!.product_type_id!,
                          baseValue: e.extractor_details!.qty_per_cycle!,
                          cycleTime: e.extractor_details!.cycle_time || 3600,
                          installTime: e.install_time ?? "",
                          expiryTime: e.expiry_time ?? ""
                        }))}
                    />
                  ) : null
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'background.paper',
                      '& .MuiTooltip-arrow': {
                        color: 'background.paper',
                      },
                      maxWidth: 'none',
                      width: 'fit-content'
                    }
                  }
                }}
              >
                <Stack spacing={0}>
                  <Typography 
                    fontSize={theme.custom.smallText}
                    color={planetDetails.hasLargeExtractorDifference ? 'error' : 'inherit'}
                  >
                    {planetInfoUniverse?.name}
                  </Typography>
                  {planetDetails.hasLargeExtractorDifference && (
                    <Typography 
                      fontSize={theme.custom.smallText}
                      color="error"
                      sx={{ opacity: 0.7 }}
                    >
                      off-balance
                    </Typography>
                  )}
                </Stack>
              </Tooltip>
            </div>
          </Tooltip>
        </TableCell>
        <TableCell className="clickable-cell">{planet.upgrade_level}</TableCell>
        <TableCell className="clickable-cell">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {planetDetails.extractors.length === 0 &&<Typography fontSize={theme.custom.smallText}>No extractors</Typography>}
            {planetDetails.extractors.map((e, idx) => {
              return (
                <div
                  key={`${e}-${idx}-${character.character.characterId}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    color={timeColor(e.expiry_time, colors)}
                    fontSize={theme.custom.smallText}
                    paddingRight={1}
                  >
                    {e ? (
                      extractionTimeMode ? (
                        DateTime.fromISO(e.expiry_time ?? "").toFormat('yyyy-MM-dd HH:mm:ss')
                      ) : (
                        <Countdown
                          overtime={true}
                          date={DateTime.fromISO(e.expiry_time ?? "").toMillis()}
                        />
                      )
                    ) : (
                      "STOPPED"
                    )}
                  </Typography>
                  {renderProductDisplay(e.extractor_details?.product_type_id ?? 0)}
                </div>
              );
            })}
          </div>
        </TableCell>
        <TableCell className="clickable-cell">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {Array.from(planetDetails.localProduction).map((schematic, idx) => {
              return (
                <div
                  key={`prod-${character.character.characterId}-${planet.planet_id}-${idx}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {renderProductDisplay(schematic[1].outputs[0].type_id)}
                </div>
              );
            })}
          </div>
        </TableCell>
        <TableCell className="clickable-cell">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {planetDetails.localImports.map((i) => {
              const depletionTime = planetDetails.importDepletionTimes.find(d => d.typeId === i.type_id);
              return (
                <div
                  key={`import-${character.character.characterId}-${planet.planet_id}-${i.type_id}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Tooltip title={
                    <>
                      <div>Will be depleted in {depletionTime?.hoursUntilDepletion.toFixed(1)} hours</div>
                      <div>Monthly cost: {depletionTime?.monthlyCost.toFixed(2)}M ISK</div>
                    </>
                  }>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {renderProductDisplay(i.type_id, i.quantity * i.factoryCount)}
                      {depletionTime && (
                        <Typography 
                          fontSize={theme.custom.smallText} 
                          color={depletionTime.hoursUntilDepletion < 24 ? 'error' : depletionTime.hoursUntilDepletion < 48 ? 'warning' : 'success'}
                          sx={{ ml: 1 }}
                        >
                          ({depletionTime.hoursUntilDepletion.toFixed(1)}h)
                        </Typography>
                      )}
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </TableCell>
        <TableCell className="clickable-cell">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {planetDetails.localExports.map((exports) => (
              <div
                key={`export-${character.character.characterId}-${planet.planet_id}-${exports.type_id}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                {renderProductDisplay(exports.type_id, exports.quantity * exports.factoryCount)}
              </div>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {planetDetails.localExports.map((exports) => (
              <FormControlLabel
                key={`export-excluded-${character.character.characterId}-${planet.planet_id}-${exports.type_id}`}
                control={
                  <Checkbox
                    checked={planetConfig.excludeFromTotals}
                    onChange={handleExcludeChange}
                    size="small"
                  />
                }
                label=""
              />
            ))}
          </div>
        </TableCell>
        <TableCell className="clickable-cell">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {planetDetails.localExports.map((exports) => (
              <Typography
                key={`export-uph-${character.character.characterId}-${planet.planet_id}-${exports.type_id}`}
                fontSize={theme.custom.smallText}
              >
                {exports.quantity * exports.factoryCount}
              </Typography>
            ))}
          </div>
        </TableCell>
        <TableCell className="clickable-cell">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "4em",
              textAlign: "end",
            }}
          >
            {planetDetails.localExports.map((e) => {
              const valueInMillions =
                (((piPrices?.appraisal.items.find((a) => a.typeID === e.type_id)
                  ?.prices.sell.min ?? 0) *
                  e.quantity * e.factoryCount) /
                  1000000) *
                24 *
                30;
              const displayValue =
                valueInMillions >= 1000
                  ? `${(valueInMillions / 1000).toFixed(2)} B`
                  : `${valueInMillions.toFixed(2)} M`;

              return (
                <Typography
                  key={`export-praisal-${character.character.characterId}-${planet.planet_id}-${e.type_id}`}
                  fontSize={theme.custom.smallText}
                >
                  {displayValue}
                </Typography>
              );
            })}
          </div>
        </TableCell>
        <TableCell className="clickable-cell">
          <Tooltip
            title={
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Storage Facilities
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Capacity</TableCell>
                      <TableCell align="right">Used</TableCell>
                      <TableCell align="right">Fill Rate</TableCell>
                      <TableCell align="right">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planetDetails.storageInfo.map((storage: StorageInfo, idx: number) => {
                      const isLaunchpad = LAUNCHPAD_IDS.includes(storage.type_id);
                      const fillRate = storage.fillRate;
                      const color = fillRate > 90 ? '#ff0000' : fillRate > 80 ? '#ffa500' : fillRate > 60 ? '#ffd700' : 'inherit';
                      const contents = planet.info.pins.find(p => p.type_id === storage.type_id)?.contents || [];
                      
                      return (
                        <React.Fragment key={`storage-${character.character.characterId}-${planet.planet_id}-${storage.type}-${idx}`}>
                          <TableRow>
                            <TableCell>{isLaunchpad ? 'Launchpad' : 'Storage'}</TableCell>
                            <TableCell align="right">{storage.capacity.toFixed(1)} m³</TableCell>
                            <TableCell align="right">{storage.used.toFixed(1)} m³</TableCell>
                            <TableCell align="right" sx={{ color }}>{fillRate.toFixed(1)}%</TableCell>
                            <TableCell align="right">
                              {storage.value > 0 ? (
                                storage.value >= 1000000000 
                                  ? `${(storage.value / 1000000000).toFixed(2)} B` 
                                  : `${(storage.value / 1000000).toFixed(0)} M`
                              ) : '-'} ISK
                            </TableCell>
                          </TableRow>
                          {contents.length > 0 && (
                            <TableRow>
                              <TableCell colSpan={5} sx={{ pt: 0, pb: 0 }}>
                                <Table size="small">
                                  <TableBody>
                                    {contents.map((content, idy) => (
                                      <TableRow key={`content-${character.character.characterId}-${planet.planet_id}-${storage.type}-${content.type_id}-${idx}-${idy}`}>
                                        <TableCell sx={{ pl: 2 }}>
                                          {PI_TYPES_MAP[content.type_id]?.name}
                                        </TableCell>
                                        <TableCell align="right" colSpan={4}>
                                          {content.amount.toFixed(1)} units
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            }
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'background.paper',
                  '& .MuiTooltip-arrow': {
                    color: 'background.paper',
                  },
                  maxWidth: 'none',
                  width: 'fit-content'
                }
              }
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {planetDetails.storageInfo.length === 0 &&<Typography fontSize={theme.custom.smallText}>No storage</Typography>}
              {planetDetails.storageInfo.map((storage: StorageInfo, idx: number) => {
                const isLaunchpad = LAUNCHPAD_IDS.includes(storage.type_id);
                const fillRate = storage.fillRate;
                const color = fillRate > 90 ? '#ff0000' : fillRate > 80 ? '#ffa500' : fillRate > 60 ? '#ffd700' : 'inherit';
                
                return (
                  <div key={`storage-${character.character.characterId}-${planet.planet_id}-${storage.type}-${idx}`} style={{ display: "flex", alignItems: "center" }}>
                    <Typography fontSize={theme.custom.smallText} style={{ marginRight: "5px" }}>
                      {isLaunchpad ? 'L' : 'S'}
                    </Typography>
                    <Typography fontSize={theme.custom.smallText} style={{ color }}>
                      {fillRate.toFixed(1)}%
                    </Typography>
                    {storage.value > 0 && (
                      <Typography fontSize={theme.custom.smallText} style={{ marginLeft: "5px" }}>
                        ({Math.round(storage.value / 1000000)}M)
                      </Typography>
                    )}
                  </div>
                );
              })}
            </div>
          </Tooltip>
        </TableCell>
        <TableCell className="menu-cell">
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
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }}>
          <Collapse in={simulationOpen} timeout="auto" unmountOnExit>
            <Box sx={{ my: 2 }}>
              <ExtractionSimulationDisplay
                extractors={planetDetails.extractors
                  .filter(e => e.extractor_details?.product_type_id && e.extractor_details?.qty_per_cycle)
                  .map(e => ({
                    typeId: e.extractor_details!.product_type_id!,
                    baseValue: e.extractor_details!.qty_per_cycle!,
                    cycleTime: e.extractor_details!.cycle_time || 3600,
                    installTime: e.install_time ?? "",
                    expiryTime: e.expiry_time ?? ""
                  }))}
                productionNodes={Array.from(planetDetails.localProduction).map(([schematicId, schematic]) => ({
                  schematicId: schematicId,
                  typeId: schematic.outputs[0].type_id,
                  name: schematic.name,
                  inputs: schematic.inputs.map((input: SchematicInput) => ({
                    typeId: input.type_id,
                    quantity: input.quantity
                  })),
                  outputs: schematic.outputs.map((output: SchematicOutput) => ({
                    typeId: output.type_id,
                    quantity: output.quantity
                  })),
                  cycleTime: schematic.cycle_time,
                  factoryCount: schematic.factoryCount || 1
                }))}
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
