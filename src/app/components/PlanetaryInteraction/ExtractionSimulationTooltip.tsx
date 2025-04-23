import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { getProgramOutputPrediction } from './ExtractionSimulation';
import { PI_TYPES_MAP } from '@/const';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { DateTime } from 'luxon';
import Countdown from 'react-countdown';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExtractorConfig {
  typeId: number;
  baseValue: number;
  cycleTime: number;
  installTime: string;
  expiryTime: string;
}

interface ExtractionSimulationTooltipProps {
  extractors: ExtractorConfig[];
}

export const ExtractionSimulationTooltip: React.FC<ExtractionSimulationTooltipProps> = ({
  extractors
}) => {
  const CYCLE_TIME = 30 * 60; // 30 minutes in seconds

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

  const maxCycles = Math.max(...extractorPrograms.map(e => e.cycles));

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

  // Create datasets for the chart
  const datasets = extractorOutputs.map((output, index) => {
    const hue = (360 / extractors.length) * index;
    return {
      label: `${PI_TYPES_MAP[output.typeId]?.name ?? `Resource ${output.typeId}`}`,
      data: output.prediction,
      borderColor: `hsl(${hue}, 70%, 50%)`,
      backgroundColor: `hsl(${hue}, 70%, 80%)`,
      tension: 0.4
    };
  });

  const chartData = {
    labels: Array.from({ length: maxCycles }, (_, i) => {
      return (i % 4 === 0) ? `Cycle ${i + 1}` : '';
    }),
    datasets
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Extraction Output Prediction'
      },
      tooltip: {
        callbacks: {
          title: (context: any) => `Cycle ${context[0].dataIndex + 1}`,
          label: (context: any) => `Output: ${context.raw.toFixed(1)} units`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Units per Cycle'
        }
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 24
        }
      }
    }
  };

  return (
    <Paper sx={{ p: 1, bgcolor: 'background.paper', minWidth: 800 }}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <div style={{ height: '200px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack spacing={1}>
            {extractorPrograms.map(({ typeId, cycleTime, cycles, installTime, expiryTime }, idx) => {
              const prediction = getProgramOutputPrediction(
                extractors[idx].baseValue,
                CYCLE_TIME,
                cycles
              );
              const totalOutput = prediction.reduce((sum, val) => sum + val, 0);
              
              return (
                <Paper key={typeId} sx={{ p: 1, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2">
                    {PI_TYPES_MAP[typeId]?.name}
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">
                      • Total Output: {totalOutput.toFixed(1)} units per program
                    </Typography>
                    <Typography variant="body2">
                      • Cycle Time: {(cycleTime / 60).toFixed(1)} minutes
                    </Typography>
                    <Typography variant="body2">
                      • Program Cycles: {cycles}
                    </Typography>
                    <Typography variant="body2">
                      • Average per Cycle: {(totalOutput / cycles).toFixed(1)} units
                    </Typography>
                    <Typography variant="body2">
                      • Average per hour: {(totalOutput / cycles  * 2).toFixed(1)} units
                    </Typography>
                    <Typography variant="body2">
                      • Expires in: <Countdown overtime={true} date={DateTime.fromISO(expiryTime).toMillis()} />
                    </Typography>
                  </Stack>
                </Paper>
              );
            })}
            {extractors.length === 2 && (
              <Paper sx={{ p: 1, bgcolor: 'background.default' }}>
                <Typography variant="subtitle2" color="error">
                  Balance
                </Typography>
                <Stack spacing={0.5}>
                  {extractors.map((extractor, index) => {
                    const averagePerHour = (extractor.baseValue * 3600) / extractor.cycleTime;
                    return (
                      <Typography key={index} variant="body2">
                        • {PI_TYPES_MAP[extractor.typeId]?.name}: {averagePerHour.toFixed(1)} u/h
                      </Typography>
                    );
                  })}
                  <Typography 
                    variant="body2" 
                    color="error"
                    sx={{ 
                      mt: 1,
                      fontWeight: 'bold',
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      pt: 1
                    }}
                  >
                    Difference: {Math.abs(
                      (extractors[0].baseValue * 3600 / extractors[0].cycleTime) - 
                      (extractors[1].baseValue * 3600 / extractors[1].cycleTime)
                    ).toFixed(1)} u/h
                  </Typography>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}; 