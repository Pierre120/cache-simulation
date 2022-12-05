import { defineStore } from 'pinia';
import { SimulationResults } from './types'
import { Memory } from '../specs/types'

const state = (): SimulationResults => ({
  cacheBlocks: [],
  cacheHits: 0,
  cacheMiss: 0,
  missPenalty: 0,
  avgAccessTime: 0,
  totalAccessTime: 0,
});

const getters = {
  getCacheBlocks(state: SimulationResults) {
    return state.cacheBlocks;
  },
  getCacheBlocksAsString(state: SimulationResults) {
    return state.cacheBlocks.join(',');
  },
  getCacheHits(state: SimulationResults) {
    return state.cacheHits;
  },
  getCacheMiss(state: SimulationResults) {
    return state.cacheMiss;
  },
  getMissPenalty(state: SimulationResults) {
    return state.missPenalty;
  },
  getAvgAccessTime(state: SimulationResults) {
    return state.avgAccessTime;
  },
  getTotalAccessTime(state: SimulationResults) {
    return state.totalAccessTime;
  }
};

export const useSimulResultStore = defineStore('simulResults', {
  state,
  getters,
  actions: {
    incrementHits() {
      this.cacheHits++;
    },
    incrementMiss() {
      this.cacheMiss++;
    },
    computeMissPenalty(blockSize: number, mmAT: number, cacheAT: number, readMode: String) {
      // TODO:
      // Compute miss penalty given the params and store the result
      // in `this.missPenalty`. Add or remove params as needed. 
      
      // initial cache check
      this.missPenalty++;
      // transfer
      this.missPenalty += blockSize * mmAT;
      // cache read
      if(readMode == "Non-Load Through"){ //added readMode param
        this.missPenalty++;
      }
    },
    computeAvgAccessTime(mmAT: number, cacheAT: number) {
      // TODO:
      // Compute average accesss time and store the result in
      // `this.avgAccessTime`. Add or remove params as needed.
      var d = this.cacheHits + this.cacheMiss;
      
      this.avgAccessTime = this.cacheHits / d * cacheAT + this.cacheMiss / d * mmAT;
    },
    computeTotalAccessTime(
      blockSize: number,
      //mainMemory: Memory,
      mmAT: number,
      //cache: Memory,
      cacheAT: number) {
      // TODO:
      // Compute total access time and store the result in
      // `this.totalAccessTime`. Add or remove params as needed.

      var a = this.cacheHits * blockSize
      var b = (cacheAT + this.cacheAT * 2) * (mmAT + cacheAT);
      var c = this.cacheMiss * cacheAT;

      this.totalAccessTime = a + b + c;
    },
    simulateCacheRead() {
      // TODO:
      // Execute the simulation here.
    }
  },
})
