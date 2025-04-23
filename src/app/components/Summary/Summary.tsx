import { SessionContext } from "@/app/context/Context";
import { PI_TYPES_MAP, STORAGE_IDS } from "@/const";
import { planetCalculations } from "@/planets";
import { AccessToken } from "@/types";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  TableBody,
  useTheme,
  Stack,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableSortLabel,
  Box,
  TextField,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateTime } from "luxon";

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.custom.compactMode ? theme.spacing(1) : theme.spacing(2),
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
}));

interface Grouped {
  [key: number]: number;
}

const displayValue = (valueInMillions: number): string =>
  valueInMillions >= 1000
    ? `${(valueInMillions / 1000).toFixed(2)} B`
    : `${valueInMillions.toFixed(2)} M`;

type SortBy = "name" | "perHour" | "storage" | "price" | "storagePrice" | "progress";
type SortDirection = "asc" | "desc";

export const Summary = ({ characters }: { characters: AccessToken[] }) => {
  const { piPrices } = useContext(SessionContext);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [startDate, setStartDate] = useState<string>(DateTime.now().startOf('day').toISO());
  const [activityPercentage, setActivityPercentage] = useState<number>(() => {
    const saved = localStorage.getItem('activityPercentage');
    return saved ? parseFloat(saved) : 100;
  });

  useEffect(() => {
    const savedDate = localStorage.getItem('productionStartDate');
    if (savedDate) {
      setStartDate(savedDate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productionStartDate', startDate);
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem('activityPercentage', activityPercentage.toString());
  }, [activityPercentage]);

  // Calculate exports and storage amounts
  const exports = characters.flatMap((char) => {
    return char.planets
      .filter(
        (p) =>
          !char.planetConfig.some(
            (c) => c.planetId == p.planet_id && c.excludeFromTotals,
          ),
      )
      .flatMap((planet) => {
        const { localExports } = planetCalculations(planet);
        return localExports;
      });
  });

  // Calculate storage amounts
  const storageAmounts = characters.reduce<Grouped>((totals, character) => {
    character.planets
      .filter(
        (p) =>
          !character.planetConfig.some(
            (c) => c.planetId == p.planet_id && c.excludeFromTotals,
          ),
      )
      .forEach((planet) => {
        planet.info.pins
          .filter(pin => STORAGE_IDS().some(storage => storage.type_id === pin.type_id))
          .forEach(storage => {
            storage.contents?.forEach(content => {
              const current = totals[content.type_id] || 0;
              totals[content.type_id] = current + content.amount;
            });
          });
      });
    return totals;
  }, {});

  const groupedByMaterial = exports.reduce<Grouped>((totals, material) => {
    const { typeId, amount } = material;
    const newTotal = isNaN(totals[typeId]) ? amount : totals[typeId] + amount;
    totals[typeId] = newTotal;
    return totals;
  }, {});

  const startDateTime = DateTime.fromISO(startDate);
  const hoursSinceStart = DateTime.now().diff(startDateTime, 'hours').hours;

  const withProductNameAndPrice = Object.keys(groupedByMaterial).map(
    (typeIdString) => {
      const typeId = parseInt(typeIdString);
      const amount = groupedByMaterial[typeId];
      const storageAmount = storageAmounts[typeId] || 0;
      const adjustedAmount = amount * (activityPercentage / 100);
      const valueInMillions =
        (((piPrices?.appraisal.items.find((a) => a.typeID === typeId)?.prices
          .sell.min ?? 0) *
          adjustedAmount) /
          1000000) *
        24 *
        30;
      const storageValueInMillions =
        ((piPrices?.appraisal.items.find((a) => a.typeID === typeId)?.prices
          .sell.min ?? 0) *
          storageAmount) /
        1000000;

      // Calculate expected production and progress
      const expectedProduction = adjustedAmount * hoursSinceStart;
      const progress = hoursSinceStart > 0 ? (storageAmount / expectedProduction) * 100 : 0;

      return {
        typeId,
        amount: adjustedAmount,
        storageAmount,
        materialName: PI_TYPES_MAP[typeId].name,
        price: valueInMillions,
        storageValue: storageValueInMillions,
        progress,
      };
    },
  );


  return (
    <StackItem width="100%">
      <Accordion style={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h2>Totals</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <TextField
              label="Production Start Date"
              type="date"
              value={DateTime.fromISO(startDate).toFormat('yyyy-MM-dd')}
              onChange={(e) => {
                const newDate = DateTime.fromFormat(e.target.value, 'yyyy-MM-dd').startOf('day').toISO();
                if (newDate) setStartDate(newDate);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />
            <TextField
              label="Activity %"
              type="number"
              value={activityPercentage}
              onChange={(e) => {
                const value = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                setActivityPercentage(value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 0,
                max: 100,
                step: 1,
              }}
              size="small"
              sx={{ width: '100px' }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell width="20%">
                    <Tooltip title="What exports factories are producing">
                      <TableSortLabel
                        active={sortBy === "name"}
                        direction={sortDirection}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc",
                          );
                          setSortBy("name");
                        }}
                      >
                        Exports
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="10%" align="right">
                    <Tooltip title={`Adjusted production rate (${activityPercentage}% activity)`}>
                      <TableSortLabel
                        active={sortBy === "perHour"}
                        direction={sortDirection}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc",
                          );
                          setSortBy("perHour");
                        }}
                      >
                        u/h
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="10%" align="right">
                    <Tooltip title="Amount currently in storage">
                      <TableSortLabel
                        active={sortBy === "storage"}
                        direction={sortDirection}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc",
                          );
                          setSortBy("storage");
                        }}
                      >
                        Units in storage
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="15%" align="right">
                    <Tooltip title="Current ISK value of storage">
                      <TableSortLabel
                        active={sortBy === "storagePrice"}
                        direction={sortDirection}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc",
                          );
                          setSortBy("storagePrice");
                        }}
                      >
                        Produced ISK value
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="15%" align="right">
                    <Tooltip title="Monthly ISK value from production">
                      <TableSortLabel
                        active={sortBy === "price"}
                        direction={sortDirection}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc",
                          );
                          setSortBy("price");
                        }}
                      >
                        Maximum possible ISK/M
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="15%" align="right">
                    <Tooltip title="Progress towards monthly production target">
                      <TableSortLabel
                        active={sortBy === "progress"}
                        direction={sortDirection}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc",
                          );
                          setSortBy("progress");
                        }}
                      >
                        Progress from start date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {withProductNameAndPrice
                  .sort((a, b) => {
                    if (sortBy === "name") {
                      if (sortDirection === "asc")
                        return a.materialName > b.materialName ? 1 : -1;
                      if (sortDirection === "desc")
                        return a.materialName > b.materialName ? -1 : 1;
                    }
                    if (sortBy === "perHour") {
                      if (sortDirection === "asc")
                        return a.amount > b.amount ? 1 : -1;
                      if (sortDirection === "desc")
                        return a.amount > b.amount ? -1 : 1;
                    }
                    if (sortBy === "storage") {
                      if (sortDirection === "asc")
                        return a.storageAmount > b.storageAmount ? 1 : -1;
                      if (sortDirection === "desc")
                        return a.storageAmount > b.storageAmount ? -1 : 1;
                    }
                    if (sortBy === "price") {
                      if (sortDirection === "asc")
                        return a.price > b.price ? 1 : -1;
                      if (sortDirection === "desc")
                        return a.price > b.price ? -1 : 1;
                    }
                    if (sortBy === "storagePrice") {
                      if (sortDirection === "asc")
                        return a.storageValue > b.storageValue ? 1 : -1;
                      if (sortDirection === "desc")
                        return a.storageValue > b.storageValue ? -1 : 1;
                    }
                    if (sortBy === "progress") {
                      if (sortDirection === "asc")
                        return a.progress > b.progress ? 1 : -1;
                      if (sortDirection === "desc")
                        return a.progress > b.progress ? -1 : 1;
                    }
                    return 0;
                  })
                  .map((product) => (
                    <SummaryRow
                      key={product.materialName}
                      material={product.materialName}
                      amount={product.amount}
                      storageAmount={product.storageAmount}
                      price={product.price}
                      storageValue={product.storageValue}
                      progress={product.progress}
                    />
                  ))}
                <SummaryRow
                  material="Total"
                  price={withProductNameAndPrice.reduce(
                    (amount, p) => amount + p.price,
                    0,
                  )}
                  storageValue={withProductNameAndPrice.reduce(
                    (amount, p) => amount + p.storageValue,
                    0,
                  )}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </StackItem>
  );
};

const SummaryRow = ({
  material,
  amount,
  storageAmount,
  price,
  storageValue,
  progress,
}: {
  material: string;
  amount?: number;
  storageAmount?: number;
  price: number;
  storageValue?: number;
  progress?: number;
}) => (
  <TableRow>
    <TableCell component="th" scope="row">
      {material}
    </TableCell>
    <TableCell align="right">{amount?.toFixed(1)}</TableCell>
    <TableCell align="right">{storageAmount?.toFixed(1)}</TableCell>
        <TableCell align="right">{storageValue !== undefined && displayValue(storageValue)}</TableCell>
    <TableCell align="right">{displayValue(price)}</TableCell>
    <TableCell align="right">
      {progress !== undefined && (
        <Typography color={progress >= 100 ? 'success.main' : progress >= 75 ? 'warning.main' : 'error.main'}>
          {progress.toFixed(1)}%
        </Typography>
      )}
    </TableCell>
  </TableRow>
);
