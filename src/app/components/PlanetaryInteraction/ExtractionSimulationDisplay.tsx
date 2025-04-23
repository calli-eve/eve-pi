import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { getProgramOutputPrediction, ProductionNode } from './ExtractionSimulation';
import { PI_TYPES_MAP } from '@/const';
import { ProductionChainVisualization } from './ProductionChainVisualization';
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

interface ExtractionSimulationDisplayProps {
  extractors: ExtractorConfig[];
  productionNodes: ProductionNode[];
}

export const ExtractionSimulationDisplay: React.FC<ExtractionSimulationDisplayProps> = ({
  extractors,
  productionNodes
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

  // Calculate total output per program for each extractor
  const programTotals = extractorPrograms.map(extractor => {
    const prediction = getProgramOutputPrediction(
      extractor.baseValue,
      CYCLE_TIME,
      extractor.cycles
    );
    const totalOutput = prediction.reduce((sum, val) => sum + val, 0);
    return {
      typeId: extractor.typeId,
      cycleTime: CYCLE_TIME,
      cycles: extractor.cycles,
      total: totalOutput,
      installTime: extractor.installTime,
      expiryTime: extractor.expiryTime
    };
  });

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
      // Show every 4th cycle number to avoid overcrowding
      return (i % 4 === 0) ? `Cycle ${i + 1}` : '';
    }),
    datasets
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Extraction Output Prediction (30 Minute Program)'
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

  // Prepare data for ProductionChainVisualization
  const extractorTotals = new Map<number, number>();
  programTotals.forEach(({ typeId, total }) => {
    extractorTotals.set(typeId, total);
  });

  // Get unique extracted type IDs
  const extractedTypeIds = Array.from(new Set(extractors.map(e => e.typeId)));

  // Get installed schematic IDs from production nodes
  const installedSchematicIds = Array.from(new Set(productionNodes.map(node => node.schematicId)));

  // Create factories array with correct counts
  const factories = installedSchematicIds.map(schematicId => {
    const node = productionNodes.find(n => n.schematicId === schematicId);
    if (!node) return { schematic_id: schematicId, count: 0 };
    return {
      schematic_id: schematicId,
      count: node.factoryCount
    };
  });

  return (
    <Box>
      {extractors.length > 0 ? <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Extraction Simulation
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
          {programTotals.map(({ typeId, total, cycleTime, cycles, installTime, expiryTime }) => (
            <Stack key={typeId} spacing={1}>
              <Typography variant="subtitle2">
                {PI_TYPES_MAP[typeId]?.name}:
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Total Output: {total.toFixed(1)} units per program
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Cycle Time: {(cycleTime / 60).toFixed(1)} minutes
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Program Cycles: {cycles}
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Average per Cycle: {(total / cycles).toFixed(1)} units
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Install Time: {new Date(installTime).toLocaleString()}
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Expiry Time: {new Date(expiryTime).toLocaleString()}
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Factory Count: {factories.find(f => f.schematic_id === typeId)?.count ?? 0}
              </Typography>
              <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                • Expires in: <Countdown overtime={true} date={DateTime.fromISO(expiryTime).toMillis()} />
              </Typography>
            </Stack>
          ))}
        </Box>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </Paper> : null}

      <ProductionChainVisualization
        extractedTypeIds={extractedTypeIds}
        extractors={extractors.map(e => ({
          typeId: e.typeId,
          baseValue: e.baseValue,
          cycleTime: CYCLE_TIME,
          expiryTime: e.expiryTime
        }))}
        factories={factories}
        extractorTotals={extractorTotals}
        productionNodes={productionNodes}
      />
    </Box>
  );
}; 