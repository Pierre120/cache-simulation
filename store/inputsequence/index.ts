import { defineStore } from 'pinia';
import { InputSequenceState } from './types';

const state = (): InputSequenceState => ({
  pass: 1,
  values: [],
  rawString: '',
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
  },
  getRawString: (state: InputSequenceState): string => {
    return state.rawString;
  },
};

export const useInputSeqStore = defineStore('inputSeqStore', {
  state,
  getters,
  actions: {
    resetSeqInputValues() {
      this.pass = 1;
      this.values = [];
      this.rawString = '';
    },
    isValidInputSeq() {
      return this.pass >= 1 && this.values.length > 0;
    },
    initSequence() {
      // invalid mixing of `,` and `-` separtors
      if(this.rawString.indexOf(',') > -1 && this.rawString.indexOf('-') > -1) {
        this.values = [] as string[];
      }
      else if(this.rawString.indexOf(',') === -1 && this.rawString.indexOf('-') === -1) {
        this.values = [this.rawString];
      }
      else if(this.rawString.indexOf(',') > -1) {
        this.values = this.rawString.split(',');
      }
      else if(this.rawString.indexOf('-') > -1) {
        let range = this.rawString.split('-');

        if(range.length > 2) {
          this.values = [] as string[];
        }
        else if(range[1] === '') {
          this.values = [range[0]];
        }
        else {
          let start = +range[0];
          let end = +range[1];
          this.values = [] as string[];
          for(let i = start; i <= end; i++) {
            this.values.push('' + i);
          }
        }
      }
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
