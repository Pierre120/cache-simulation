export interface SimulationState {
  isInputSpecs: boolean;
  isInputSequence: boolean;
  isSimulation: boolean;
  isValid: boolean
}

export interface Cache {
  blocksAge: number[];
  blocksValue: string[];
}

export interface SimulationResults {
  cache: Cache;
  cacheHits: number;
  cacheMiss: number;
  missPenalty: number;
  avgAccessTime: number;
  totalAccessTime: number;
}
