import { ColorContextType } from "@/app/context/Context";
import { DateTime } from "luxon";

export const timeColor = (
  extractorDate: string | undefined,
  colors: ColorContextType,
): string => {
  if (!extractorDate) return colors.expiredColor;
  const dateExtractor = DateTime.fromISO(extractorDate);
  const dateNow = DateTime.now();
  if (dateExtractor < dateNow) return colors.expiredColor;
  if (dateExtractor.minus({ hours: 2 }) < dateNow) return colors.twoHoursColor;
  if (dateExtractor.minus({ hours: 4 }) < dateNow) return colors.fourHoursColor;
  if (dateExtractor.minus({ hours: 8 }) < dateNow)
    return colors.eightHoursColor;
  if (dateExtractor.minus({ hours: 12 }) < dateNow)
    return colors.twelveHoursColor;
  if (dateExtractor.minus({ hours: 24 }) < dateNow) return colors.dayColor;
  if (dateExtractor.minus({ hours: 48 }) < dateNow) return colors.twoDaysColor;
  return colors.defaultColor;
};
