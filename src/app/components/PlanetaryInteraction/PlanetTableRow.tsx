import { ColorContext, SessionContext } from "@/app/context/Context";
import { PI_TYPES_MAP, STORAGE_IDS, STORAGE_CAPACITIES, PI_PRODUCT_VOLUMES, EVE_IMAGE_URL, PI_SCHEMATICS } from "@/const";
import { planetCalculations } from "@/planets";
import { AccessToken, PlanetWithInfo } from "@/types";
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
import { alertModeVisibility, timeColor } from "./timeColors";
import { ExtractionSimulationDisplay } from './ExtractionSimulationDisplay';
import { ExtractionSimulationTooltip } from './ExtractionSimulationTooltip';
import { ProductionNode } from './ExtractionSimulation';
import { Collapse, Box, Stack } from "@mui/material";

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
  const { showProductIcons, extractionTimeMode } = useContext(SessionContext);

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

  const { piPrices, alertMode, updatePlanetConfig, readPlanetConfig, balanceThreshold } = useContext(SessionContext);
  const planetInfo = planet.info;
  const planetInfoUniverse = planet.infoUniverse;
  const { expired, extractors, localProduction, localImports, localExports } =
    planetCalculations(planet);
  const planetConfig = readPlanetConfig({
    characterId: character.character.characterId,
    planetId: planet.planet_id,
  });
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
    cycleTime: schematic.cycle_time,
    factoryCount: schematic.count || 1
  }));

  // Calculate extractor averages and check for large differences
  const extractorAverages = extractors
    .filter(e => e.extractor_details?.product_type_id && e.extractor_details?.qty_per_cycle)
    .map(e => {
      const cycleTime = e.extractor_details?.cycle_time || 3600;
      const qtyPerCycle = e.extractor_details?.qty_per_cycle || 0;
      return {
        typeId: e.extractor_details!.product_type_id!,
        averagePerHour: (qtyPerCycle * 3600) / cycleTime
      };
    });

  const hasLargeExtractorDifference = extractorAverages.length === 2 && 
    Math.abs(extractorAverages[0].averagePerHour - extractorAverages[1].averagePerHour) > balanceThreshold;

  const storageFacilities = planetInfo.pins.filter(pin => 
    STORAGE_IDS().some(storage => storage.type_id === pin.type_id)
  );

  const getStorageInfo = (pin: any) => {
    if (!pin || !pin.contents) return null;

    const storageType = PI_TYPES_MAP[pin.type_id].name;
    const storageCapacity = STORAGE_CAPACITIES[pin.type_id] || 0;
    
    const totalVolume = (pin.contents || [])
      .reduce((sum: number, item: any) => {
        const volume = PI_PRODUCT_VOLUMES[item.type_id] || 0;
        return sum + (item.amount * volume);
      }, 0);

    const totalValue = (pin.contents || [])
      .reduce((sum: number, item: any) => {
        const price = piPrices?.appraisal.items.find((a) => a.typeID === item.type_id)?.prices.sell.min ?? 0;
        return sum + (item.amount * price);
      }, 0);

    const fillRate = storageCapacity > 0 ? (totalVolume / storageCapacity) * 100 : 0;

    return {
      type: storageType,
      capacity: storageCapacity,
      used: totalVolume,
      fillRate: fillRate,
      value: totalValue
    };
  };

  const handleExcludeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePlanetConfig({
      ...planetConfig,
      excludeFromTotals: event.target.checked,
    });
  };

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
        style={{ visibility: alertModeVisibility(alertMode, expired) }}
        sx={{ 
          "&:last-child td, &:last-child th": { border: 0 },
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
        onClick={(e) => {
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
                  extractors.length > 0 ? (
                    <ExtractionSimulationTooltip
                      extractors={extractors
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
                    color={hasLargeExtractorDifference ? 'error' : 'inherit'}
                  >
                    {planetInfoUniverse?.name}
                  </Typography>
                  {hasLargeExtractorDifference && (
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
            {extractors.length === 0 &&<Typography fontSize={theme.custom.smallText}>No extractors</Typography>}
            {extractors.map((e, idx) => {
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
            {Array.from(localProduction).map((schematic, idx) => {
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
            {localImports.map((i) => {
              // Find all storage facilities (including launchpads) containing this import
              const storagesWithImport = storageFacilities.filter(storage => 
                storage.contents?.some(content => content.type_id === i.type_id)
              );
              
              // Get the total amount in all storage facilities
              const totalAmount = storagesWithImport.reduce((sum, storage) => {
                const content = storage.contents?.find(content => content.type_id === i.type_id);
                return sum + (content?.amount ?? 0);
              }, 0);

              // Calculate consumption rate per hour
              const schematic = PI_SCHEMATICS.find(s => s.schematic_id === i.schematic_id);
              const cycleTime = schematic?.cycle_time ?? 3600;
              const consumptionPerHour = i.quantity * i.factoryCount * (3600 / cycleTime);

              // Calculate time until depletion in hours
              const hoursUntilDepletion = consumptionPerHour > 0 ? totalAmount / consumptionPerHour : 0;

              return (
                <div
                  key={`import-${character.character.characterId}-${planet.planet_id}-${i.type_id}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {renderProductDisplay(i.type_id, i.quantity * i.factoryCount)}
                  {totalAmount > 0 && (
                    <Tooltip title={
                      <>
                        <div>Total: {totalAmount.toFixed(1)} units</div>
                        <div>Will be depleted in {hoursUntilDepletion.toFixed(1)} hours</div>
                      </>
                    }>
                      <Typography 
                        fontSize={theme.custom.smallText} 
                        color={hoursUntilDepletion < 24 ? 'error' : hoursUntilDepletion < 48 ? 'warning' : 'success'}
                        sx={{ ml: 1 }}
                      >
                        ({hoursUntilDepletion.toFixed(1)}h)
                      </Typography>
                    </Tooltip>
                  )}
                </div>
              );
            })}
          </div>
        </TableCell>
        <TableCell className="clickable-cell">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {localExports.map((exports) => (
              <div
                key={`export-${character.character.characterId}-${planet.planet_id}-${exports.typeId}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                {renderProductDisplay(exports.typeId, exports.amount)}
              </div>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {localExports.map((exports) => (
              <FormControlLabel
                key={`export-excluded-${character.character.characterId}-${planet.planet_id}-${exports.typeId}`}
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
        <TableCell className="clickable-cell">
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
        <TableCell className="clickable-cell">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {storageFacilities.length === 0 &&<Typography fontSize={theme.custom.smallText}>No storage</Typography>}
            {storageFacilities
              .sort((a, b) => {
                const isALaunchpad = a.type_id === 2256 || a.type_id === 2542 || a.type_id === 2543 || a.type_id === 2544 || a.type_id === 2552 || a.type_id === 2555 || a.type_id === 2556 || a.type_id === 2557;
                const isBLaunchpad = b.type_id === 2256 || b.type_id === 2542 || b.type_id === 2543 || b.type_id === 2544 || b.type_id === 2552 || b.type_id === 2555 || b.type_id === 2556 || b.type_id === 2557;
                return isALaunchpad === isBLaunchpad ? 0 : isALaunchpad ? -1 : 1;
              })
              .map((storage) => {
                const storageInfo = getStorageInfo(storage);
                if (!storageInfo) return null;
                
                const isLaunchpad = storage.type_id === 2256 || 
                                  storage.type_id === 2542 || 
                                  storage.type_id === 2543 || 
                                  storage.type_id === 2544 || 
                                  storage.type_id === 2552 || 
                                  storage.type_id === 2555 || 
                                  storage.type_id === 2556 || 
                                  storage.type_id === 2557;
                
                const fillRate = storageInfo.fillRate;
                const color = fillRate > 95 ? '#ff0000' : fillRate > 80 ? '#ffd700' : 'inherit';
                
                return (
                  <div key={`storage-${character.character.characterId}-${planet.planet_id}-${storage.pin_id}`} style={{ display: "flex", alignItems: "center" }}>
                    <Typography fontSize={theme.custom.smallText} style={{ marginRight: "5px" }}>
                      {isLaunchpad ? 'L' : 'S'}
                    </Typography>
                    <Typography fontSize={theme.custom.smallText} style={{ color }}>
                      {fillRate.toFixed(1)}%
                    </Typography>
                    {storageInfo.value > 0 && (
                      <Typography fontSize={theme.custom.smallText} style={{ marginLeft: "5px" }}>
                        ({Math.round(storageInfo.value / 1000000)}M)
                      </Typography>
                    )}
                  </div>
                );
              })}
          </div>
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
