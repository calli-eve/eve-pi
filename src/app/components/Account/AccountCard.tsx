import { AccessToken, PlanetWithInfo, Pin } from "@/types";
import { Box, Stack, Typography, useTheme, Paper, IconButton, Divider } from "@mui/material";
import { CharacterRow } from "../Characters/CharacterRow";
import { PlanetaryInteractionRow } from "../PlanetaryInteraction/PlanetaryInteractionRow";
import { SessionContext } from "@/app/context/Context";
import { useContext, useState, useEffect } from "react";
import { PlanRow } from "./PlanRow";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { planetCalculations } from "@/planets";
import { EvePraisalResult } from "@/eve-praisal";
import { STORAGE_IDS, PI_SCHEMATICS, PI_PRODUCT_VOLUMES, STORAGE_CAPACITIES } from "@/const";
import { DateTime } from "luxon";
import { PlanetCalculations, AlertState, StorageContent, StorageInfo } from "@/types/planet";
import { getProgramOutputPrediction } from "../PlanetaryInteraction/ExtractionSimulation";

interface AccountTotals {
  monthlyEstimate: number;
  storageValue: number;
  planetCount: number;
  characterCount: number;
  runningExtractors: number;
  totalExtractors: number;
}

const calculateAlertState = (planetDetails: PlanetCalculations, minExtractionRate: number): AlertState => {
  const hasLowStorage = planetDetails.storageInfo.some(storage => storage.fillRate > 60);
  const hasLowImports = planetDetails.importDepletionTimes.some(depletion => depletion.hoursUntilDepletion < 24);
  const hasLowExtractionRate = planetDetails.extractorAverages.length > 0 && minExtractionRate > 0 && planetDetails.extractorAverages.some(avg => avg.averagePerHour < minExtractionRate);

  return {
    expired: planetDetails.expired,
    hasLowStorage,
    hasLowImports,
    hasLargeExtractorDifference: planetDetails.hasLargeExtractorDifference,
    hasLowExtractionRate
  };
};

const calculatePlanetDetails = (planet: PlanetWithInfo, piPrices: EvePraisalResult | undefined, balanceThreshold: number): PlanetCalculations => {
  const { expired, extractors, localProduction: rawProduction, localImports, localExports: rawExports } = planetCalculations(planet);
  
  // Convert localProduction to include factoryCount
  const localProduction = new Map(Array.from(rawProduction).map(([key, value]) => [
    key,
    {
      ...value,
      factoryCount: value.count || 1
    }
  ]));

  // Calculate extractor averages and check for large differences
  const CYCLE_TIME = 30 * 60; // 30 minutes in seconds
  const extractorAverages = extractors
    .filter(e => e.extractor_details?.product_type_id && e.extractor_details?.qty_per_cycle)
    .map(e => {
      const installDate = new Date(e.install_time ?? "");
      const expiryDate = new Date(e.expiry_time ?? "");
      const programDuration = (expiryDate.getTime() - installDate.getTime()) / 1000;
      const cycles = Math.floor(programDuration / CYCLE_TIME);

      const qtyPerCycle = e.extractor_details?.qty_per_cycle || 0;
      const prediction = getProgramOutputPrediction(qtyPerCycle, CYCLE_TIME, cycles);
      const totalOutput = prediction.reduce((sum, val) => sum + val, 0);
      const averagePerHour = totalOutput / cycles * 2;

      return {
        typeId: e.extractor_details!.product_type_id!,
        averagePerHour
      };
    });

  const hasLargeExtractorDifference = extractorAverages.length === 2 &&
    Math.abs(extractorAverages[0].averagePerHour - extractorAverages[1].averagePerHour) > balanceThreshold;

  // Calculate storage info
  const storageFacilities = planet.info.pins.filter((pin: Pin) => 
    STORAGE_IDS().some(storage => storage.type_id === pin.type_id)
  );

  const storageInfo = storageFacilities.map((storage: Pin) => {
    if (!storage || !storage.contents) return null;

    const storageType = STORAGE_IDS().find(s => s.type_id === storage.type_id)?.name || 'Unknown';
    const storageCapacity = STORAGE_CAPACITIES[storage.type_id] || 0;
    
    const totalVolume = (storage.contents || [])
      .reduce((sum: number, item: StorageContent) => {
        const volume = PI_PRODUCT_VOLUMES[item.type_id] || 0;
        return sum + (item.amount * volume);
      }, 0);

    const totalValue = (storage.contents || [])
      .reduce((sum: number, item: StorageContent) => {
        const price = piPrices?.appraisal.items.find((a) => a.typeID === item.type_id)?.prices.sell.min ?? 0;
        return sum + (item.amount * price);
      }, 0);

    const fillRate = storageCapacity > 0 ? (totalVolume / storageCapacity) * 100 : 0;

    return {
      type: storageType,
      type_id: storage.type_id,
      capacity: storageCapacity,
      used: totalVolume,
      fillRate: fillRate,
      value: totalValue
    };
  }).filter(Boolean) as StorageInfo[];

  // Calculate import depletion times
  const importDepletionTimes = localImports.map(i => {
    // Find all storage facilities containing this import
    const storagesWithImport = storageFacilities.filter((storage: Pin) => 
      storage.contents?.some((content: StorageContent) => content.type_id === i.type_id)
    );
    
    // Get the total amount in all storage facilities
    const totalAmount = storagesWithImport.reduce((sum: number, storage: Pin) => {
      const content = storage.contents?.find((content: StorageContent) => content.type_id === i.type_id);
      return sum + (content?.amount ?? 0);
    }, 0);

    // Calculate consumption rate per hour
    const schematic = PI_SCHEMATICS.find(s => s.schematic_id === i.schematic_id);
    const cycleTime = schematic?.cycle_time ?? 3600;
    const consumptionPerHour = i.quantity * i.factoryCount * (3600 / cycleTime);

    // Calculate time until depletion in hours, starting from last_update
    const lastUpdate = DateTime.fromISO(planet.last_update);
    const now = DateTime.now();
    const hoursSinceUpdate = now.diff(lastUpdate, 'hours').hours;
    const remainingAmount = Math.max(0, totalAmount - (consumptionPerHour * hoursSinceUpdate));
    const hoursUntilDepletion = consumptionPerHour > 0 ? remainingAmount / consumptionPerHour : 0;

    // Calculate monthly cost
    const price = piPrices?.appraisal.items.find((a) => a.typeID === i.type_id)?.prices.sell.min ?? 0;
    const monthlyCost = (consumptionPerHour * 24 * 30 * price) / 1000000; // Cost in millions

    return {
      typeId: i.type_id,
      hoursUntilDepletion,
      monthlyCost
    };
  });

  // Convert localExports to match the LocalExport interface
  const localExports = rawExports.map(e => {
    const schematic = PI_SCHEMATICS.flatMap(s => s.outputs)
      .find(s => s.type_id === e.typeId)?.schematic_id ?? 0;
    const factoryCount = planet.info.pins
      .filter(p => p.schematic_id === schematic)
      .length;
    
    return {
      type_id: e.typeId,
      schematic_id: schematic,
      quantity: e.amount / factoryCount, // Convert total amount back to per-factory quantity
      factoryCount
    };
  });

  return {
    expired,
    extractors,
    localProduction,
    localImports,
    localExports,
    storageInfo,
    extractorAverages,
    hasLargeExtractorDifference,
    importDepletionTimes,
    visibility: 'visible' as const
  };
};

const calculateAccountTotals = (characters: AccessToken[], piPrices: EvePraisalResult | undefined): AccountTotals => {
  let totalMonthlyEstimate = 0;
  let totalStorageValue = 0;
  let totalPlanetCount = 0;
  let totalCharacterCount = characters.length;
  let runningExtractors = 0;
  let totalExtractors = 0;

  characters.forEach((character) => {
    totalPlanetCount += character.planets.length;
    character.planets.forEach((planet) => {
      const { localExports, extractors } = planetCalculations(planet);
      const planetConfig = character.planetConfig.find(p => p.planetId === planet.planet_id);
      
      // Count running and total extractors
      if (!planetConfig?.excludeFromTotals) {
        extractors.forEach(extractor => {
          totalExtractors++;
          if (extractor.expiry_time && new Date(extractor.expiry_time) > new Date()) {
            runningExtractors++;
          }
        });
      }
      
      // Calculate monthly estimate
      if (!planetConfig?.excludeFromTotals) {
        localExports.forEach((exportItem) => {
          const valueInMillions = (((piPrices?.appraisal.items.find(
            (a) => a.typeID === exportItem.typeId,
          )?.prices.sell.min ?? 0) *
            exportItem.amount) /
            1000000) *
            24 *
            30;
          totalMonthlyEstimate += valueInMillions;
        });
      }

      if (!planetConfig?.excludeFromTotals) {
        planet.info.pins
          .filter(pin => STORAGE_IDS().some(storage => storage.type_id === pin.type_id))
          .forEach(storage => {
            storage.contents?.forEach(content => {
              const valueInMillions = (piPrices?.appraisal.items.find(
                (a) => a.typeID === content.type_id,
              )?.prices.sell.min ?? 0) * content.amount / 1000000;
              totalStorageValue += valueInMillions;
            });
          });
      }
    });
  });

  return {
    monthlyEstimate: totalMonthlyEstimate,
    storageValue: totalStorageValue,
    planetCount: totalPlanetCount,
    characterCount: totalCharacterCount,
    runningExtractors,
    totalExtractors
  };
};

export const AccountCard = ({ characters, isCollapsed: propIsCollapsed }: { characters: AccessToken[], isCollapsed?: boolean }) => {
  const theme = useTheme();
  const [localIsCollapsed, setLocalIsCollapsed] = useState(false);
  const { planMode, piPrices, alertMode, balanceThreshold, minExtractionRate } = useContext(SessionContext);
  const { monthlyEstimate, storageValue, planetCount, characterCount, runningExtractors, totalExtractors } = calculateAccountTotals(characters, piPrices);

  // Calculate planet details and alert states for each planet
  const planetDetails = characters.reduce((acc, character) => {
    character.planets.forEach(planet => {
      const details = calculatePlanetDetails(planet, piPrices, balanceThreshold);
      acc[`${character.character.characterId}-${planet.planet_id}`] = {
        ...details,
        alertState: calculateAlertState(details, minExtractionRate)
      };
    });
    return acc;
  }, {} as Record<string, PlanetCalculations & { alertState: AlertState }>);

  // Update local collapse state when prop changes
  useEffect(() => {
    setLocalIsCollapsed(propIsCollapsed ?? false);
  }, [propIsCollapsed]);

  const getAlertVisibility = (alertState: AlertState) => {
    if (!alertMode) return 'visible';
    if (alertState.expired) return 'visible';
    if (alertState.hasLowStorage) return 'visible';
    if (alertState.hasLowImports) return 'visible';
    if (alertState.hasLargeExtractorDifference) return 'visible';
    if (alertState.hasLowExtractionRate) return 'visible';
    return 'hidden';
  };

  // Check if any planet in the account has alerts
  const hasAnyAlerts = Object.values(planetDetails).some(details => {
    const alertState = calculateAlertState(details, minExtractionRate);
    return alertState.expired ||
           alertState.hasLowStorage ||
           alertState.hasLowImports ||
           alertState.hasLargeExtractorDifference ||
           alertState.hasLowExtractionRate;
  });

  // If in alert mode and no alerts, hide the entire card
  if (alertMode && !hasAnyAlerts) {
    return null;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        padding: theme.custom.compactMode ? theme.spacing(1) : theme.spacing(2),
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        backgroundColor: theme.palette.background.paper,
        transition: 'all 0.2s ease-in-out',
        cursor: 'grab',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
        '&:active': {
          boxShadow: theme.shadows[8],
          cursor: 'grabbing',
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 1,
            padding: theme.spacing(1),
            marginBottom: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
          onClick={() => setLocalIsCollapsed(!localIsCollapsed)}
        >
          <Box>
            <Typography 
              sx={{ 
                fontSize: "0.9rem",
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              {characters.length > 0 && characters[0].account !== "-"
                ? `Account: ${characters[0].account}`
                : "No account name"}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexWrap: 'wrap',
              mt: 1,
              alignItems: 'center'
            }}>
              <Typography 
                sx={{ 
                  fontSize: "0.8rem",
                  color: theme.palette.text.secondary,
                }}
              >
                Monthly: {monthlyEstimate >= 1000 
                  ? `${(monthlyEstimate / 1000).toFixed(2)} B` 
                  : `${monthlyEstimate.toFixed(2)} M`} ISK
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 16, borderColor: theme.palette.divider }} />
              <Typography 
                sx={{ 
                  fontSize: "0.8rem",
                  color: theme.palette.text.secondary,
                }}
              >
                Storage: {storageValue >= 1000 
                  ? `${(storageValue / 1000).toFixed(2)} B` 
                  : `${storageValue.toFixed(2)} M`} ISK
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 16, borderColor: theme.palette.divider }} />
              <Typography 
                sx={{ 
                  fontSize: "0.8rem",
                  color: theme.palette.text.secondary,
                }}
              >
                Planets: {planetCount}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 16, borderColor: theme.palette.divider }} />
              <Typography 
                sx={{ 
                  fontSize: "0.8rem",
                  color: theme.palette.text.secondary,
                }}
              >
                Characters: {characterCount}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 16, borderColor: theme.palette.divider }} />
              <Typography 
                sx={{ 
                  fontSize: "0.8rem",
                  color: runningExtractors < totalExtractors ? theme.palette.error.main : theme.palette.text.secondary,
                }}
              >
                Extractors: {runningExtractors}/{totalExtractors}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 16, borderColor: theme.palette.divider }} />
              <Typography 
                sx={{ 
                  fontSize: "0.8rem",
                  color: Object.values(planetDetails).some(d => d.alertState.hasLowStorage) ? theme.palette.error.main : theme.palette.text.secondary,
                }}
              >
                Storage Alerts: {Object.values(planetDetails).filter(d => d.alertState.hasLowStorage).length}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 16, borderColor: theme.palette.divider }} />
              <Typography 
                sx={{ 
                  fontSize: "0.8rem",
                  color: Object.values(planetDetails).some(d => d.alertState.hasLargeExtractorDifference) ? theme.palette.error.main : theme.palette.text.secondary,
                }}
              >
                Balance Alerts: {Object.values(planetDetails).filter(d => d.alertState.hasLargeExtractorDifference).length}
              </Typography>
            </Box>
          </Box>
          <IconButton 
            size="small" 
            sx={{ 
              transform: localIsCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            {localIsCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
        {!localIsCollapsed && characters.map((c) => (
          <Stack
            key={c.character.characterId}
            direction="row"
            alignItems="flex-start"
          >
            <CharacterRow character={c} />
            {planMode ? (
              <PlanRow character={c} />
            ) : (
              <PlanetaryInteractionRow 
                character={c} 
                planetDetails={c.planets.reduce((acc, planet) => {
                  const details = planetDetails[`${c.character.characterId}-${planet.planet_id}`];
                  acc[planet.planet_id] = {
                    ...details,
                    visibility: getAlertVisibility(details.alertState)
                  };
                  return acc;
                }, {} as Record<number, PlanetCalculations & { visibility: string }>)}
              />
            )}
          </Stack>
        ))}
      </Box>
    </Paper>
  );
};
