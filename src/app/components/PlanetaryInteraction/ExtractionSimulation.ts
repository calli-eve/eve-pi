export interface ExtractionSimulationConfig {
  baseValue: number;
  cycleTime: number;
  length: number;
}

const SEC = 10000000;

export const getProgramOutputPrediction = (
  baseValue: number,
  cycleDuration: number, // in seconds
  length: number
): number[] => {
  const vals: number[] = [];
  const startTime = 0;
  const cycleTime = cycleDuration * SEC;
  
  for (let i = 0; i < length; i++) {
    const currentTime = (i + 1) * cycleTime;
    vals.push(getProgramOutput(baseValue, startTime, currentTime, cycleTime));
  }
  
  return vals;
};

export const getProgramOutput = (
  baseValue: number,
  startTime: number,
  currentTime: number,
  cycleTime: number
): number => {
  const decayFactor = 0.012;
  const noiseFactor = 0.8;
  const timeDiff = currentTime - startTime;
  const cycleNum = Math.max((timeDiff + SEC) / cycleTime - 1, 0);
  const barWidth = cycleTime / SEC / 900.0;
  const t = (cycleNum + 0.5) * barWidth;
  const decayValue = baseValue / (1 + t * decayFactor);
  const f1 = 1.0 / 12.0;
  const f2 = 1.0 / 5.0;
  const f3 = 1.0 / 2.0;
  const phaseShift = Math.pow(baseValue, 0.7);
  const sinA = Math.cos(phaseShift + t * f1);
  const sinB = Math.cos(phaseShift / 2.0 + t * f2);
  const sinC = Math.cos(t * f3);
  let sinStuff = (sinA + sinB + sinC) / 3.0;
  sinStuff = Math.max(0.0, sinStuff);
  const barHeight = decayValue * (1 + noiseFactor * sinStuff);

  const output = barWidth * barHeight;
  // Round down, with integers also rounded down (123.0 -> 122)
  return output - output % 1 - 1;
};

export interface ProductionNode {
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
  factoryCount: number;
}

export interface ProductionChainBalance {
  nodes: ProductionNode[];
  totalInputs: Map<number, number>;
  totalOutputs: Map<number, number>;
  deficit: Map<number, number>;
  surplus: Map<number, number>;
}

export const calculateProductionChainBalance = (
  nodes: ProductionNode[]
): ProductionChainBalance => {
  const totalInputs = new Map<number, number>();
  const totalOutputs = new Map<number, number>();
  const deficit = new Map<number, number>();
  const surplus = new Map<number, number>();

  // Calculate total inputs and outputs
  for (const node of nodes) {
    // Process inputs
    for (const input of node.inputs) {
      const current = totalInputs.get(input.typeId) || 0;
      totalInputs.set(input.typeId, current + input.quantity);
    }

    // Process outputs
    for (const output of node.outputs) {
      const current = totalOutputs.get(output.typeId) || 0;
      totalOutputs.set(output.typeId, current + output.quantity);
    }
  }

  // Calculate deficits and surpluses
  Array.from(totalInputs.entries()).forEach(([typeId, inputQty]) => {
    const outputQty = totalOutputs.get(typeId) || 0;
    if (inputQty > outputQty) {
      deficit.set(typeId, inputQty - outputQty);
    }
  });

  Array.from(totalOutputs.entries()).forEach(([typeId, outputQty]) => {
    const inputQty = totalInputs.get(typeId) || 0;
    if (outputQty > inputQty) {
      surplus.set(typeId, outputQty - inputQty);
    }
  });

  return {
    nodes,
    totalInputs,
    totalOutputs,
    deficit,
    surplus
  };
}; 