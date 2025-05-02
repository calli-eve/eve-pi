import { Stack, Typography, styled, useTheme, Tooltip } from "@mui/material";
import Image from "next/image";
import {
  AccessToken,
  PlanetWithInfo,
} from "@/types";
import { PlanetCalculations } from "@/types/planet";
import React, { useContext } from "react";
import { DateTime } from "luxon";
import Countdown from "react-countdown";
import { ColorContext } from "@/app/context/Context";
import { ExtractionSimulationTooltip } from "./ExtractionSimulationTooltip";
import { timeColor } from "./alerts";

interface ExtractorConfig {
  typeId: number;
  baseValue: number;
  cycleTime: number;
  installTime: string;
  expiryTime: string;
}

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  margin: "0 !important",
  textAlign: "left",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const PlanetCard = ({
  character,
  planet,
  planetDetails,
}: {
  character: AccessToken;
  planet: PlanetWithInfo;
  planetDetails: PlanetCalculations;
}) => {
  const theme = useTheme();
  const { colors } = useContext(ColorContext);

  const extractorConfigs: ExtractorConfig[] = planetDetails.extractors
    .filter(e => e.extractor_details?.product_type_id && e.extractor_details?.qty_per_cycle)
    .map(e => ({
      typeId: e.extractor_details!.product_type_id!,
      baseValue: e.extractor_details!.qty_per_cycle!,
      cycleTime: e.extractor_details?.cycle_time || 3600,
      installTime: e.install_time ?? "",
      expiryTime: e.expiry_time ?? ""
    }));

  return (
    <Tooltip
      title={
        planetDetails.extractors.length > 0 ? (
          <ExtractionSimulationTooltip
            extractors={extractorConfigs}
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
      <StackItem
        alignItems="flex-start"
        height="100%"
        position="relative"
        minHeight={theme.custom.cardMinHeight}
        style={{ visibility: planetDetails.visibility }}
      >
        <div style={{ position: 'relative' }}>
          <Image
            unoptimized
            src={`/${planet.planet_type}.png`}
            alt=""
            width={theme.custom.cardImageSize}
            height={theme.custom.cardImageSize}
            style={{ 
              borderRadius: 8, 
              marginRight: 4,
              position: 'relative',
              zIndex: 0
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: theme.custom.cardImageSize,
            height: theme.custom.cardImageSize,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 8,
          }} />
        </div>
        {planetDetails.expired && (
          <Image
            width={32}
            height={32}
            src={`/stopped.png`}
            alt=""
            style={{ position: "absolute", top: theme.custom.stoppedPosition }}
          />
        )}
        <div style={{ position: "absolute", top: 5, left: 10 }}>
          <Typography fontSize={theme.custom.smallText}>
            {planet.infoUniverse?.name}
          </Typography>
          {planetDetails.extractors.map((e, idx) => {
            const average = planetDetails.extractorAverages[idx];
            return (
              <div key={`${e}-${idx}-${character.character.characterId}`}>
                <Typography
                  color={timeColor(e.expiry_time, colors)}
                  fontSize={theme.custom.smallText}
                >
                  {!planetDetails.expired && e.expiry_time && <Countdown
                      overtime={true}
                      date={DateTime.fromISO(e.expiry_time).toMillis()}
                    />
                  }
                </Typography>
                {!planetDetails.expired && e && average && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Image
                      unoptimized
                      src={`https://images.evetech.net/types/${e.extractor_details?.product_type_id}/icon?size=32`}
                      alt=""
                      width={16}
                      height={16}
                      style={{ borderRadius: 4 }}
                    />
                    <Typography fontSize={theme.custom.smallText}>
                      {average.averagePerHour.toFixed(1)}/h
                    </Typography>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </StackItem>
    </Tooltip>
  );
};
