import { defineStore } from 'pinia';
import { SimulationState } from './types'

const state = (): SimulationState => ({
  isInputSpecs: true,
  isInputSequence: false,
  isSimulation: false,
});

export const useSimulStateStore = defineStore('simulState', {
  state,
});