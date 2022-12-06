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
    if(state.cache.size.unit === "Words")
      return Math.floor(state.cache.size.value / state.blockSize);
    
    return state.cache.size.value;
  },
  getBlockSize: (state: SpecsState): number => {
    return state.blockSize;
  },
  getMainMemorySizeValue: (state: SpecsState): number => {
    return state.mainMemory.size.value;
  },
  getMainMemorySizeUnit: (state: SpecsState): string => {
    return state.mainMemory.size.unit;
  },
  getMainMemoryAccessTime: (state: SpecsState): number => {
    return state.mainMemory.accessTime;
  },
  getCacheSizeValue: (state: SpecsState): number => {
    return state.cache.size.value;
  },
  getCacheSizeUnit: (state: SpecsState): string => {
    return state.cache.size.unit;
  },
  getCacheAccessTime: (state: SpecsState): number => {
    return state.cache.accessTime;
  },
  getReadMode: (state: SpecsState): string => {
    return state.readMode;
  }
};

export const useSpecsStore = defineStore('specsStore', {
  state,
  getters,
  actions: {
    resetSpecsValues() {
      this.blockSize = 1;
      this.mainMemory.size.value = 1;
      this.mainMemory.size.unit = 'Blocks';
      this.mainMemory.accessTime = 10;
      this.cache.size.value = 1;
      this.cache.size.unit = 'Blocks';
      this.cache.accessTime = 1;
      this.readMode = 'Non-Load Through';
    },
    isValidSpecs() {
      // TODO: validate specs values
      return this.blockSize >= 1 &&
        this.mainMemory.size.value >= 1 &&
        (this.mainMemory.size.unit === 'Blocks' || this.mainMemory.size.unit === 'Words') &&
        this.mainMemory.accessTime >= 1 &&
        this.cache.size.value >= 1 &&
        (this.cache.size.unit === 'Blocks' || this.cache.size.unit === 'Words') &&
        this.cache.accessTime >= 1 &&
        (this.readMode === 'Non-Load Through' || this.readMode === 'Load Through');
    },
  },
});
