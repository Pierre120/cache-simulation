import { defineStore } from 'pinia';
import { SimulationResults } from './types'
// import { Memory } from '../specs/types'

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
 
      var d = this.cacheHits + this.cacheMiss;
      
      this.avgAccessTime = this.cacheHits / d * cacheAT + this.cacheMiss / d * mmAT;
    },
    computeTotalAccessTime(
      blockSize: number,
      //mainMemory: Memory,
      mmAT: number,
      //cache: Memory,
      cacheAT: number,
      readMode: string) {

      let a = this.cacheHits * blockSize * cacheAT;
      let c = this.cacheMiss * cacheAT;
      let b = 0;
      if (readMode == "Non-Load Through"){
        b = this.cacheMiss * blockSize * (cacheAT + mmAT);
      }
      else{
        b =this.cacheMiss * blockSize * mmAT;
      }
      
      this.totalAccessTime = a + b + c;
    },
    simulateCacheRead(sequence: string[], pass: number, cacheNumBlocks: number) {

      for (let age = 0; age < sequence.length * pass; age++){

        let minIndex = this.cache.blocksValue.indexOf(sequence[age % sequence.length]);
        if ( minIndex > -1){
          this.incrementHits();
          this.cache.blocksAge[minIndex] = age;
        }
        else{
          this.incrementMiss();
          minIndex = this.cache.blocksValue.indexOf("");
          if (minIndex === -1) {
            minIndex = 0;
            for (let j = 1; j < this.cache.blocksAge.length; j++) {
              if (this.cache.blocksAge[minIndex] > this.cache.blocksAge[j]){
                minIndex = j;
              }
            }
          }
          this.cache.blocksValue[minIndex] = sequence[age % sequence.length];
          this.cache.blocksAge[minIndex] = age;
        }
          
      }
      

    }
  },
})
