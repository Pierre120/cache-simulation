import { defineStore } from 'pinia';
import { InputSequenceState } from './types';

const state = (): InputSequenceState => ({
  pass: 1,
  values: null,
});

export const useSpecsStore = defineStore('specsStore', {
  state,
});
