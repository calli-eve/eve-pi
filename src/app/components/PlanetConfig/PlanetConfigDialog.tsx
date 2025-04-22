import { PI_TYPES_MAP } from "@/const";
import { planetCalculations } from "@/planets";
import { AccessToken, PlanetWithInfo } from "@/types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DateTime } from "luxon";
import Countdown from "react-countdown";
import { timeColor } from "../PlanetaryInteraction/timeColors";
import Image from "next/image";
import { ColorContext, SessionContext } from "@/app/context/Context";
import { useContext } from "react";

export const PlanetConfigDialog = ({
  planet,
  character,
}: {
  planet: PlanetWithInfo;
  character: AccessToken;
}) => {
  const theme = useTheme();
  const { colors } = useContext(ColorContext);
  const { piPrices } = useContext(SessionContext);
  const { extractors, localProduction, localImports, localExports } =
    planetCalculations(planet);

  return (
    <Card style={{ padding: "1rem", margin: "1rem" }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell scope="row">
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
                  {planet.infoUniverse?.name}
                </div>
              </Tooltip>
            </TableCell>
            <TableCell>{planet.upgrade_level}</TableCell>
            <TableCell>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {extractors.map((e, idx) => {
                  return (
                    <div key={`${e}-${idx}`} style={{ display: "flex" }}>
                      <Typography
                        color={timeColor(e.expiry_time, colors)}
                        fontSize={theme.custom.smallText}
                        paddingRight={1}
                      >
                        {e ? (
                          <Countdown
                            overtime={true}
                            date={DateTime.fromISO(
                              e.expiry_time ?? "",
                            ).toMillis()}
                          />
                        ) : (
                          "STOPPED"
                        )}
                      </Typography>
                      <Typography fontSize={theme.custom.smallText}>
                        {
                          PI_TYPES_MAP[
                            e.extractor_details?.product_type_id ?? 0
                          ]?.name
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
                      key={`prod-${planet.planet_id}-${idx}`}
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
                    key={`import-${planet.planet_id}-${i.type_id}`}
                    fontSize={theme.custom.smallText}
                  >
                    {PI_TYPES_MAP[i.type_id].name}
                  </Typography>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {localExports.map((exports) => (
                  <Typography
                    key={`export-${planet.planet_id}-${exports.typeId}`}
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
                    key={`export-uph-${exports.typeId}`}
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
                    (((piPrices?.appraisal.items.find(
                      (a) => a.typeID === e.typeId,
                    )?.prices.sell.min ?? 0) *
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
                      key={`export-praisal-${planet.planet_id}-${e.typeId}`}
                      fontSize={theme.custom.smallText}
                    >
                      {displayValue}
                    </Typography>
                  );
                })}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
