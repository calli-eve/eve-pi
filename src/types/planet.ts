import { Pin, PlanetWithInfo } from '../types';

export interface StorageContent {
  type_id: number;
  amount: number;
}

export interface StorageInfo {
  type: string;
  type_id: number;
  capacity: number;
  used: number;
  fillRate: number;
  value: number;
}

export interface PlanetCalculations {
  expired: boolean;
  extractors: Pin[];
  localProduction: Map<number, LocalProductionInfo>;
  localImports: LocalImport[];
  localExports: LocalExport[];
  storageInfo: StorageInfo[];
  extractorAverages: ExtractorAverage[];
  hasLargeExtractorDifference: boolean;
  importDepletionTimes: ImportDepletionTime[];
  visibility: 'visible' | 'hidden';
}

export interface AlertState {
  expired: boolean;
  hasLowStorage: boolean;
  hasLowImports: boolean;
  hasLargeExtractorDifference: boolean;
  hasLowExtractionRate: boolean;
}

export interface ExtractorAverage {
  typeId: number;
  averagePerHour: number;
}

export interface ImportDepletionTime {
  typeId: number;
  hoursUntilDepletion: number;
  monthlyCost: number;
}

export interface LocalProductionInfo {
  name: string;
  cycle_time: number;
  schematic_id: number;
  inputs: SchematicInput[];
  outputs: SchematicOutput[];
  factoryCount: number;
}

export interface LocalImport {
  type_id: number;
  schematic_id: number;
  quantity: number;
  factoryCount: number;
}

export interface LocalExport {
  type_id: number;
  schematic_id: number;
  quantity: number;
  factoryCount: number;
}

export interface SchematicInput {
  schematic_id: number;
  type_id: number;
  quantity: number;
  is_input: number;
}

export interface SchematicOutput {
  schematic_id: number;
  type_id: number;
  quantity: number;
  is_input: number;
} 