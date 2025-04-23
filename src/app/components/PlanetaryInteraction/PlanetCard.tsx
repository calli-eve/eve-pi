import { Stack, Typography, styled, useTheme, Tooltip } from "@mui/material";
import Image from "next/image";
import {
  AccessToken,
  PlanetWithInfo,
} from "@/types";
import React, { useContext } from "react";
import { DateTime } from "luxon";
import { EXTRACTOR_TYPE_IDS } from "@/const";
import Countdown from "react-countdown";
import { getProgramOutputPrediction } from "./ExtractionSimulation";
import {
  alertModeVisibility,
  extractorsHaveExpired,
  timeColor,
} from "./timeColors";
import { ColorContext, SessionContext } from "@/app/context/Context";
import { ExtractionSimulationTooltip } from "./ExtractionSimulationTooltip";

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
}: {
  character: AccessToken;
  planet: PlanetWithInfo;
}) => {
  const { alertMode } = useContext(SessionContext);

  const planetInfo = planet.info;
  const planetInfoUniverse = planet.infoUniverse;

  const theme = useTheme();

  const extractorsExpiryTime =
    (planetInfo &&
      planetInfo.pins
        .filter((p) => EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id))
        .map((p) => p.expiry_time)) ??
    [];

  const { colors } = useContext(ColorContext);
  const expired = extractorsHaveExpired(extractorsExpiryTime);

  const CYCLE_TIME = 30 * 60; // 30 minutes in seconds

  const extractors = planetInfo?.pins
    .filter((p) => EXTRACTOR_TYPE_IDS.some((e) => e === p.type_id))
    .map((p) => ({
      typeId: p.type_id,
      baseValue: p.extractor_details?.qty_per_cycle || 0,
      cycleTime: p.extractor_details?.cycle_time || 3600,
      installTime: p.install_time || "",
      expiryTime: p.expiry_time || "",
      installedSchematicId: p.extractor_details?.product_type_id || undefined
    })) || [];

  // Calculate program duration and cycles for each extractor
  const extractorPrograms = extractors.map(extractor => {
    const installDate = new Date(extractor.installTime);
    const expiryDate = new Date(extractor.expiryTime);
    const programDuration = (expiryDate.getTime() - installDate.getTime()) / 1000; // Convert to seconds
    return {
      ...extractor,
      programDuration,
      cycles: Math.floor(programDuration / CYCLE_TIME)
    };
  });


  // Get output predictions for each extractor
  const extractorOutputs = extractorPrograms.map(extractor => ({
    typeId: extractor.typeId,
    cycleTime: CYCLE_TIME,
    cycles: extractor.cycles,
    prediction: getProgramOutputPrediction(
      extractor.baseValue,
      CYCLE_TIME,
      extractor.cycles
    )
  }));

  // Calculate average per hour for each extractor
  const extractorAverages = extractorOutputs.map(extractor => {
    const totalOutput = extractor.prediction.reduce((sum, val) => sum + val, 0);
    const programDuration = extractor.cycles * CYCLE_TIME;
    const averagePerHour = (totalOutput / programDuration) * 3600;
    return {
      typeId: extractor.typeId,
      averagePerHour
    };
  });

  return (
    <Tooltip
      title={
        <ExtractionSimulationTooltip
          extractors={extractors}
        />
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
      visibility={alertModeVisibility(alertMode, expired)}
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
     
      {expired && (
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
          {planetInfoUniverse?.name}
        </Typography>
        {extractorsExpiryTime.map((e, idx) => {
          const extractor = extractors[idx];
          const average = extractorAverages[idx];
          return (
            <div key={`${e}-${idx}-${character.character.characterId}`}>
              <Typography
                color={timeColor(e, colors)}
                fontSize={theme.custom.smallText}
              >
                {!expired && e && <Countdown
                    overtime={true}
                    date={DateTime.fromISO(e).toMillis()}
                  />
                }
              </Typography>
              {!expired && extractor && average && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Image
                    unoptimized
                    src={`https://images.evetech.net/types/${extractor.installedSchematicId}/icon?size=32`}
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
