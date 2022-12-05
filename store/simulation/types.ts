export interface SimulationState {
  isInputSpecs: boolean;
  isInputSequence: boolean;
  isSimulation: boolean;
}

export interface SimulationResults {
  cacheBlocks: string[];
  cacheHits: number;
  cacheMiss: number;
  missPenalty: number;
  avgAccessTime: number;
  totalAccessTime: number;
}
