import React from 'react';
import { Box, Paper, Typography, Grid, Stack, Divider } from '@mui/material';
import { EVE_IMAGE_URL } from '@/const';
import { PI_TYPES_MAP } from '@/const';

interface Factory {
  schematic_id: number;
  count: number;
}

interface ProductionNode {
  typeId: number;
  name: string;
  schematicId: number;
  inputs: Array<{
    typeId: number;
    quantity: number;
  }>;
  outputs: Array<{
    typeId: number;
    quantity: number;
  }>;
  cycleTime: number;
}

interface ProductionChainVisualizationProps {
  extractedTypeIds: number[];
  extractors: Array<{
    typeId: number;
    baseValue: number;
    cycleTime: number;
  }>;
  factories: Factory[];
  extractorTotals: Map<number, number>;
  productionNodes: ProductionNode[];
}

export const ProductionChainVisualization: React.FC<ProductionChainVisualizationProps> = ({
  extractedTypeIds,
  factories,
  extractorTotals,
  productionNodes
}) => {
  // Get all type IDs involved in the production chain
  const allTypeIds = new Set<number>();
  const requiredInputs = new Set<number>();
  
  // Add extracted resources
  extractedTypeIds.forEach(id => allTypeIds.add(id));
  
  // Add all resources involved in the production chain
  productionNodes.forEach(node => {
    node.inputs.forEach(input => {
      allTypeIds.add(input.typeId);
      requiredInputs.add(input.typeId);
    });
    node.outputs.forEach(output => allTypeIds.add(output.typeId));
  });

  // Calculate production and consumption rates for the program
  const productionTotals = new Map<number, number>();
  const consumptionTotals = new Map<number, number>();
  const importedTypes = new Set<number>();
  const importAmounts = new Map<number, number>();
  const nodesByOutput = new Map<number, ProductionNode>();
  const cyclesByNode = new Map<number, number>(); // Track cycles per schematic

  // Add extractor production to totals
  extractorTotals.forEach((total, typeId) => {
    productionTotals.set(typeId, total);
  });

  // Map each output type to its producing node
  productionNodes.forEach(node => {
    node.outputs.forEach(output => {
      nodesByOutput.set(output.typeId, node);
    });
  });

  // Calculate production levels first
  const productionLevels = new Map<number, number>();
  extractedTypeIds.forEach(id => productionLevels.set(id, 0));

  const determineProductionLevel = (typeId: number, visited = new Set<number>()): number => {
    if (productionLevels.has(typeId)) {
      return productionLevels.get(typeId)!;
    }

    if (visited.has(typeId)) {
      return 0;
    }
    visited.add(typeId);

    const producingNode = nodesByOutput.get(typeId);
    if (!producingNode) {
      // If this is a required input but not produced locally, 
      // find the maximum level of nodes that consume it
      if (requiredInputs.has(typeId)) {
        const consumingNodes = productionNodes.filter(node => 
          node.inputs.some(input => input.typeId === typeId)
        );
        if (consumingNodes.length > 0) {
          // Get the level of the first consuming node's outputs
          const consumerLevel = Math.max(...consumingNodes[0].outputs.map(output => 
            determineProductionLevel(output.typeId, new Set(visited))
          )) - 1; // Place one level below the consumer
          productionLevels.set(typeId, consumerLevel);
          return consumerLevel;
        }
      }
      return 0;
    }

    const inputLevels = producingNode.inputs.map(input => 
      determineProductionLevel(input.typeId, visited)
    );
    const level = Math.max(...inputLevels) + 1;
    productionLevels.set(typeId, level);
    return level;
  };

  // Calculate levels for all types
  Array.from(allTypeIds).forEach(typeId => {
    if (!productionLevels.has(typeId)) {
      determineProductionLevel(typeId);
    }
  });

  // Sort nodes by production level to process in order
  const sortedNodes = [...productionNodes].sort((a, b) => {
    const aLevel = Math.max(...a.outputs.map(o => productionLevels.get(o.typeId) ?? 0));
    const bLevel = Math.max(...b.outputs.map(o => productionLevels.get(o.typeId) ?? 0));
    return aLevel - bLevel;
  });

  // Process nodes in order of production level
  sortedNodes.forEach(node => {
    const factoryCount = factories.find(f => f.schematic_id === node.schematicId)?.count ?? 0;
    if (factoryCount === 0) return;

    // Calculate maximum possible cycles based on available inputs
    let maxPossibleCycles = Infinity;
    let needsImports = false;
    const inputCycles = new Map<number, number>();

    // First calculate how many cycles we could run for each input
    node.inputs.forEach(input => {
      const availableInput = productionTotals.get(input.typeId) ?? 0;
      const requiredPerCycle = input.quantity * factoryCount;
      const cyclesPossible = Math.floor(availableInput / requiredPerCycle);
      inputCycles.set(input.typeId, cyclesPossible);
      
      if (cyclesPossible === 0) {
        needsImports = true;
      }
      maxPossibleCycles = Math.min(maxPossibleCycles, cyclesPossible);
    });

    // Find the maximum cycles we could run with the most abundant input
    const maxInputCycles = Math.max(...Array.from(inputCycles.values()));

    // If we need imports, calculate them based on the maximum possible cycles from our most abundant input
    if (needsImports) {
      const targetCycles = maxInputCycles > 0 ? maxInputCycles : 1; // If no inputs, assume 1 cycle
      node.inputs.forEach(input => {
        const availableInput = productionTotals.get(input.typeId) ?? 0;
        const requiredInput = input.quantity * factoryCount * targetCycles;
        const currentImport = importAmounts.get(input.typeId) ?? 0;
        
        if (requiredInput > availableInput) {
          importedTypes.add(input.typeId);
          importAmounts.set(input.typeId, Math.max(currentImport, requiredInput - availableInput));
        }
      });
      maxPossibleCycles = targetCycles;
    }

    if (!isFinite(maxPossibleCycles)) maxPossibleCycles = 0;
    cyclesByNode.set(node.schematicId, maxPossibleCycles);

    // Calculate consumption
    node.inputs.forEach(input => {
      const currentTotal = consumptionTotals.get(input.typeId) ?? 0;
      const factoryConsumption = input.quantity * maxPossibleCycles * factoryCount;
      consumptionTotals.set(input.typeId, currentTotal + factoryConsumption);
    });

    // Calculate production
    node.outputs.forEach(output => {
      const currentTotal = productionTotals.get(output.typeId) ?? 0;
      const factoryProduction = output.quantity * maxPossibleCycles * factoryCount;
      productionTotals.set(output.typeId, currentTotal + factoryProduction);
    });
  });

  // Final pass: Update import amounts for any remaining deficits
  requiredInputs.forEach(typeId => {
    const production = productionTotals.get(typeId) ?? 0;
    const consumption = consumptionTotals.get(typeId) ?? 0;
    if (consumption > production) {
      importedTypes.add(typeId);
      importAmounts.set(typeId, consumption - production);
    }
  });

  // Group types by production level
  const levelGroups = new Map<number, number[]>();
  Array.from(allTypeIds).forEach(typeId => {
    const level = productionLevels.get(typeId) ?? 0;
    const group = levelGroups.get(level) ?? [];
    group.push(typeId);
    levelGroups.set(level, group);
  });

  // Get factory count for a type
  const getFactoryCount = (typeId: number): number => {
    const node = nodesByOutput.get(typeId);
    if (!node) return 0;
    return factories.find(f => f.schematic_id === node.schematicId)?.count ?? 0;
  };

  // Get input requirements for a type
  const getInputRequirements = (typeId: number): Array<{ typeId: number; quantity: number }> => {
    const node = nodesByOutput.get(typeId);
    if (!node) return [];
    return node.inputs;
  };

  // Get schematic cycle time for a type
  const getSchematicCycleTime = (typeId: number): number | undefined => {
    const node = nodesByOutput.get(typeId);
    return node?.cycleTime;
  };

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Production Chain
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {Array.from(levelGroups.entries())
          .sort(([a], [b]) => a - b)
          .map(([level, typeIds]) => (
            <Box key={level}>
              <Typography variant="subtitle1" gutterBottom sx={{ borderBottom: '2px solid', borderColor: 'divider', pb: 1 }}>
                {level === 0 ? 'Raw Materials (P0)' :
                 level === 1 ? 'Basic Materials (P1)' :
                 level === 2 ? 'Refined Materials (P2)' :
                 level === 3 ? 'Advanced Materials (P3)' : 'High-Tech Products (P4)'}
              </Typography>
              <Grid container spacing={2}>
                {typeIds.map(typeId => {
                  const type = PI_TYPES_MAP[typeId];
                  const factoryCount = getFactoryCount(typeId);
                  const isImported = importedTypes.has(typeId);
                  const importAmount = importAmounts.get(typeId) ?? 0;
                  const production = productionTotals.get(typeId) ?? 0;
                  const consumption = consumptionTotals.get(typeId) ?? 0;
                  const inputs = getInputRequirements(typeId);
                  const cycleTime = getSchematicCycleTime(typeId);

                  return (
                    <Grid item key={typeId} xs={12} sm={6} md={4}>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: 1,
                          border: isImported ? '2px solid orange' : 
                                  production > 0 ? '2px solid green' :
                                  consumption > 0 ? '2px solid red' : 'none',
                          height: '100%'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img 
                            src={`${EVE_IMAGE_URL}/types/${typeId}/icon`} 
                            alt={type?.name ?? `Type ${typeId}`}
                            width={48}
                            height={48}
                          />
                          <Box>
                            <Typography variant="subtitle2">
                              {type?.name ?? `Type ${typeId}`}
                            </Typography>
                            {cycleTime && (
                              <Typography variant="caption" color="text.secondary">
                                {cycleTime === 1800 ? 'Basic (30m)' : 'Advanced (1h)'}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Stack spacing={0.5}>
                          {production > 0 && (
                            <>
                              <Typography variant="caption" color="success.main">
                                Production: {production.toFixed(1)} units total
                              </Typography>
                            </>
                          )}
                          {consumption > 0 && (
                            <>
                              <Typography variant="caption" color="error.main">
                                Consumption: {consumption.toFixed(1)} units total
                              </Typography>
                            </>
                          )}
                          {isImported && (
                            <>
                              <Typography variant="caption" color="warning.main" sx={{ fontWeight: 'bold' }}>
                                Required Import: {importAmount.toFixed(1)} units
                              </Typography>
                              <Typography variant="caption" color="warning.main">
                                (Local production: {production.toFixed(1)} units)
                              </Typography>
                            </>
                          )}
                          <Typography 
                            variant="caption" 
                            color={production - consumption > 0 ? "success.main" : 
                                   production - consumption < 0 ? "error.main" : "text.secondary"}
                            sx={{ fontWeight: 'bold' }}
                          >
                            Net: {(production - consumption).toFixed(1)} units total
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))}
      </Box>
    </Paper>
  );
}; 