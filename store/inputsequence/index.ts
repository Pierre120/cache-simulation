import { defineStore } from 'pinia';
import { InputSequenceState } from './types';

const state = (): InputSequenceState => ({
  pass: 1,
  values: [],
});

const getters = {
  getNumPass: (state: InputSequenceState): number => {
    return state.pass;
  },
  getValues: (state: InputSequenceState): string[] => {
    return state.values;
  },
  getValuesAsString: (state: InputSequenceState): string => {
    return state.values.join(',');
  }
};

export const useInputSeqStore = defineStore('inputSeqStore', {
  state,
  getters,
  actions: {
    resetSeqInputValues() {
      this.pass = 1;
      this.values = [];
    },
    isValidNumPass() {
      return this.pass >= 1;
    },
    cleanInputSeq() {
      let dirty = this.values.indexOf("");
      while(dirty > -1) {
        this.values.splice(dirty, 1);
        dirty = this.values.indexOf("");
      }
    },
  },
});
