import { defineStore } from 'pinia';
import { SimulationState } from './types'

const state = (): SimulationState => ({
  isInputSpecs: true,
  isInputSequence: false,
  isSimulation: false,
});

const getters = {
  getIsInputSpecs: (state: SimulationState): boolean => {
    return state.isInputSpecs;
  },
  getIsInputSequence: (state: SimulationState): boolean => {
    return state.isInputSequence;
  },
  getIsSimulation: (state: SimulationState): boolean => {
    return state.isSimulation;
  },
};

export const useSimulStateStore = defineStore('simulState', {
  state,
  getters,
});