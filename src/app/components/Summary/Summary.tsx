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
} from "@mui/material";

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

export const Summary = ({ characters }: { characters: AccessToken[] }) => {
  const exports = characters.flatMap((char) => {
    return char.planets.flatMap((planet) => {
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
      return {
        typeId,
        amount: groupedByMaterial[typeId],
        materialName: PI_TYPES_MAP[typeId].name,
        price: 0,
      };
    },
  );
  const theme = useTheme();

  return (
    <StackItem width="100%">
      <h2>Totals</h2>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width="40%">
                <Tooltip title="What exports factories are producing">
                  <Typography fontSize={theme.custom.smallText}>
                    Exports
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="10%">
                <Tooltip title="How many units per hour factories are producing">
                  <Typography fontSize={theme.custom.smallText}>u/h</Typography>
                </Tooltip>
              </TableCell>
              <TableCell width="10%" align="right">
                <Tooltip title="How many million ISK per month this planet is exporting (Jita sell min)">
                  <Typography fontSize={theme.custom.smallText}>
                    ISK/M
                  </Typography>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withProductNameAndPrice.map((product) => (
              <SummaryRow
                key={product.materialName}
                material={product.materialName}
                amount={product.amount}
                price={product.price}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StackItem>
  );
};

const SummaryRow = ({
  material,
  amount,
  price,
}: {
  material: string;
  amount: number;
  price: number;
}) => (
  <TableRow>
    <TableCell component="th" scope="row">
      {material}
    </TableCell>
    <TableCell>{amount}</TableCell>
    <TableCell align="right">{price}</TableCell>
  </TableRow>
);
