// General interface for size
export interface Size {
  value: number;
  unit: "Blocks" | "Words";
}

// for main memory and cache
export interface Memory {
  size: Size;
  accessTime: number; // access time in ns time unit
}

export interface SpecsState {
  blockSize: number; // block size in words measurement unit
  mainMemory: Memory;
  cache: Memory;
  readMode: "Load Through" | "Non-Load Through";
}
