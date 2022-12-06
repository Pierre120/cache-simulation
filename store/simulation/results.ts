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
    resetSimulationResults() {
      this.cache.blocksAge = [];
      this.cache.blocksValue = [];
      this.cacheHits = 0;
      this.cacheMiss = 0;
      this.missPenalty = 0;
      this.avgAccessTime = 0;
      this.totalAccessTime = 0;
    },
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
    computeMissPenalty(
      blockSize: number, 
      mmAT: number, 
      //cacheAT: number, 
      readMode: String) {
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

      var a = this.cacheHits * blockSize * cacheAT;
      var b = this.cacheMiss * blockSize * (cacheAT + mmAT);
      var c = this.cacheMiss * cacheAT;

      this.totalAccessTime = a + b + c;
    },
    simulateCacheRead(sequence: string[], blockSize: number) {
      // TODO:
      // Execute the simulation here.
      var blocks: string[][] = []; //[number in sequence][age]
      
      // Gives age to each of the numbers
      for(let i = 0; i < sequence.length; i++){
        if(i == 0){
          blocks[i][0] = sequence[i];
          blocks[i][1] = i.toString();
        }
        else{
          //check if the value exists in the sequence
          for(let j = 0; j < blockSize; j++){
            // number is in block
            if(blocks[j][0] == sequence[i]){
              blocks[j][1] = i.toString();
              this.incrementHits();
            }
            // number isn't in block
            else{
              // if block isn't full
              for(let k = 0; k < blockSize; k++){
                if(blocks[j][0] == null){
                  blocks[j][0] = sequence[i];
                  blocks[j][1] = i.toString();
                }
                else{
                  for(let l = 0; l < blockSize; l++){
                    var age = i-4;
                    if(blocks[j][1] == age.toString()){
                      blocks[j][0] = sequence[i];
                      blocks[j][1] = i.toString();
                    }
                  }
                }
              }
              this.incrementMiss();
            }
          }
        }
      }
    }
  },
})
