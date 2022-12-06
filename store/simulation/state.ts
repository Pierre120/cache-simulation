import { defineStore } from 'pinia';
import { SimulationState } from './types'

const state = (): SimulationState => ({
  isInputSpecs: true,
  isInvalidSpecs: false,
  isInputSequence: false,
  isInvalidPass: false,
  isSimulation: false,
});

const getters = {
  getIsInputSpecs: (state: SimulationState): boolean => {
    return state.isInputSpecs;
  },
  getIsInvalidSpecs: (state: SimulationState): boolean => {
    return state.isInvalidSpecs;
  },
  getIsInputSequence: (state: SimulationState): boolean => {
    return state.isInputSequence;
  },
  getIsInvalidPass: (state: SimulationState): boolean => {
    return state.isInvalidPass;
  },
  getIsSimulation: (state: SimulationState): boolean => {
    return state.isSimulation;
  },
};

export const useSimulStateStore = defineStore('simulState', {
  state,
  getters,
});