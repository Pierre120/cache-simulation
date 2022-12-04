import { defineStore } from 'pinia';
import { SpecsState } from './types';

const state = (): SpecsState => ({
  blockSize: 0,
  mainmemory: {
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
  readType: "Non-Load Through",
});

const getters = {
  getMainMemoryNumBlocks: (state: SpecsState): number => {
    if(state.mainmemory.size.unit === "Words")
      return Math.floor(state.mainmemory.size.value / state.blockSize);
    
    return state.mainmemory.size.value;
  },
  getCacheNumBlocks: (state: SpecsState): number => {
    if(state.mainmemory.size.unit === "Words")
      return Math.floor(state.cache.size.value / state.blockSize);
    
    return state.cache.size.value;
  },
}

export const useSpecsStore = defineStore('specsStore', {
  state,
  getters,
});
