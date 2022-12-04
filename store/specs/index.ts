import { defineStore } from 'pinia';
import { SpecsState } from './types';

const state = (): SpecsState => ({
  blockSize: 0,
  mainMemory: {
    size: {
      value: 0,
      unit: "Blocks",
    },
    accessTime: 0,
  },
  cache: {
    size: {
      value: 0,
      unit: "Blocks",
    },
    accessTime: 0,
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
