import { defineStore } from 'pinia';
import { SpecsState } from './types';

const state = (): SpecsState => ({
  blockSize: 1,
  mainMemory: {
    size: {
      value: 1,
      unit: "Blocks",
    },
    accessTime: 10,
  },
  cache: {
    size: {
      value: 1,
      unit: "Blocks",
    },
    accessTime: 1,
  },
  readMode: "Non-Load Through",
});

const getters = {
  getMainMemoryNumBlocks: (state: SpecsState): number => {
    if(state.mainMemory.size.unit === "Words")
      return Math.floor(state.mainMemory.size.value / state.blockSize);
    
    return state.mainMemory.size.value;
  },
  getCacheNumBlocks: (state: SpecsState): number => {
    if(state.mainMemory.size.unit === "Words")
      return Math.floor(state.cache.size.value / state.blockSize);
    
    return state.cache.size.value;
  },
}

export const useSpecsStore = defineStore('specsStore', {
  state,
  getters,
});
