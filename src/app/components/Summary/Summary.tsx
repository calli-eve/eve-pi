import { SessionContext } from "@/app/context/Context";
import { PI_TYPES_MAP } from "@/const";
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
} from "@mui/material";
import { useContext, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { argv0 } from "process";

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

type SortBy = "name" | "perHour" | "price";
type SortDirection = "asc" | "desc";

export const Summary = ({ characters }: { characters: AccessToken[] }) => {
  const { piPrices } = useContext(SessionContext);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [sortBy, setSortBy] = useState<SortBy>("name");
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

  const groupedByMaterial = exports.reduce<Grouped>((totals, material) => {
    const { typeId, amount } = material;
    const newTotal = isNaN(totals[typeId]) ? amount : totals[typeId] + amount;
    totals[typeId] = newTotal;
    return totals;
  }, {});

  const withProductNameAndPrice = Object.keys(groupedByMaterial).map(
    (typeIdString) => {
      const typeId = parseInt(typeIdString);
      const amount = groupedByMaterial[typeId];
      const valueInMillions =
        (((piPrices?.appraisal.items.find((a) => a.typeID === typeId)?.prices
          .sell.min ?? 0) *
          amount) /
          1000000) *
        24 *
        30;

      return {
        typeId,
        amount,
        materialName: PI_TYPES_MAP[typeId].name,
        price: valueInMillions,
      };
    },
  );
  const theme = useTheme();

  return (
    <StackItem width="100%">
      <Accordion style={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h2>Totals</h2>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell width="40%">
                    <Tooltip title="What exports factories are producing">
                      <TableSortLabel
                        active={true}
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
                  <TableCell width="10%">
                    <Tooltip title="How many units per hour factories are producing">
                      <TableSortLabel
                        active={true}
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
                    <Tooltip title="How many million ISK per month this planet is exporting (Jita sell min)">
                      <TableSortLabel
                        active={true}
                        direction={sortDirection}
                        onClick={() => {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc",
                          );
                          setSortBy("price");
                        }}
                      >
                        ISK/M
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
                    if (sortBy === "price") {
                      if (sortDirection === "asc")
                        return a.price > b.price ? 1 : -1;
                      if (sortDirection === "desc")
                        return a.price > b.price ? -1 : 1;
                    }
                    return 0;
                  })
                  .map((product) => (
                    <SummaryRow
                      key={product.materialName}
                      material={product.materialName}
                      amount={product.amount}
                      price={product.price}
                    />
                  ))}
                <SummaryRow
                  material="Total"
                  price={withProductNameAndPrice.reduce(
                    (amount, p) => amount + p.price,
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
  price,
}: {
  material: string;
  amount?: number;
  price: number;
}) => (
  <TableRow>
    <TableCell component="th" scope="row">
      {material}
    </TableCell>
    <TableCell>{amount}</TableCell>
    <TableCell align="right">{displayValue(price)}</TableCell>
  </TableRow>
);
