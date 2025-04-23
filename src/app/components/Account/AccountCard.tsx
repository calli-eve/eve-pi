import { AccessToken } from "@/types";
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
import { STORAGE_IDS } from "@/const";

interface AccountTotals {
  monthlyEstimate: number;
  storageValue: number;
  planetCount: number;
  characterCount: number;
  runningExtractors: number;
  totalExtractors: number;
}

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
  const { planMode, piPrices } = useContext(SessionContext);
  const { monthlyEstimate, storageValue, planetCount, characterCount, runningExtractors, totalExtractors } = calculateAccountTotals(characters, piPrices);

  // Update local collapse state when prop changes
  useEffect(() => {
    setLocalIsCollapsed(propIsCollapsed ?? false);
  }, [propIsCollapsed]);

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
              <PlanetaryInteractionRow character={c} />
            )}
          </Stack>
        ))}
      </Box>
    </Paper>
  );
};
