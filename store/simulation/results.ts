import { defineStore } from 'pinia';
import { SimulationResults } from './types'
import { Memory } from '../specs/types'

const state = (): SimulationResults => ({
  cache: {
    blocksAge: [],
    blocksValue: [],
  },
  cacheHits: 0,
  cacheMiss: 0,
  missPenalty: 0,
  avgAccessTime: 0,
  totalAccessTime: 0,
});

const getters = {
  getCacheBlockAges: (state: SimulationResults): number[] => {
    return state.cache.blocksAge;
  },
  getCacheBlockValues: (state: SimulationResults): string[] => {
    return state.cache.blocksValue;
  },
  getCacheBlockValuesAsString: (state: SimulationResults): string => {
    return state.cache.blocksValue.join(',');
  },
  getCacheHits: (state: SimulationResults): number => {
    return state.cacheHits;
  },
  getCacheMiss: (state: SimulationResults): number => {
    return state.cacheMiss;
  },
  getMissPenalty: (state: SimulationResults): number => {
    return state.missPenalty;
  },
  getAvgAccessTime: (state: SimulationResults): number => {
    return state.avgAccessTime;
  },
  getTotalAccessTime: (state: SimulationResults): number => {
    return state.totalAccessTime;
  }
};

export const useSimulResultStore = defineStore('simulResults', {
  state,
  getters,
  actions: {
    initCacheBlocks(numCacheBlocks: number) {
      for(let i = 0; i < numCacheBlocks; i++) {
        this.cache.blocksAge.push(0);
        this.cache.blocksValue.push('');
      }
    },
    incrementHits() {
      this.cacheHits++;
    },
    incrementMiss() {
      this.cacheMiss++;
    },
    computeMissPenalty(blockSize: number, mmAT: number, cacheAT: number) {
      // TODO:
      // Compute miss penalty given the params and store the result
      // in `this.missPenalty`. Add or remove params as needed. 
    },
    computeAvgAccessTime(mmAT: number, cacheAT: number) {
      // TODO:
      // Compute average accesss time and store the result in
      // `this.avgAccessTime`. Add or remove params as needed.
    },
    computeTotalAccessTime(
      blockSize: number,
      mainMemory: Memory,
      mmAT: number,
      cache: Memory,
      cacheAT: number) {
      // TODO:
      // Compute total access time and store the result in
      // `this.totalAccessTime`. Add or remove params as needed.
    },
    simulateCacheRead() {
      // TODO:
      // Execute the simulation here.
    }
  },
})
