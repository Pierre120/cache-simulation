<template>
  <div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content">
        <!-- Specs input form -->
        <form-specs
          v-if="simulState.$state.isInputSpecs"
          v-model:block-size="specsStore.$state.blockSize"
          v-model:mm-size="specsStore.$state.mainMemory.size.value"
          v-model:mm-unit="specsStore.$state.mainMemory.size.unit"
          v-model:mm-access-time="specsStore.$state.mainMemory.accessTime"
          v-model:cache-size="specsStore.$state.cache.size.value"
          v-model:cache-unit="specsStore.$state.cache.size.unit"
          v-model:cache-access-time="specsStore.$state.cache.accessTime"
          v-model:read-mode="specsStore.$state.readMode"
          @save-specs="saveSpecs"
        />

        <!-- Input sequence input form -->
        <form-inputsequence
          v-if="simulState.$state.isInputSequence"
          v-model:sequence="inputSeqStore.$state.values"
          v-model:pass="inputSeqStore.$state.pass"
          @simulate="simulate"
          @cancel="cancelSimulation"
        />
      </div>
    </div>
    <p class="mt-4">
      <span class="font-bold text-green-500">Block size: </span>{{ specsStore.blockSize }} <br>
      <span class="font-bold text-green-500">Main Memory Size & unit: </span> {{ specsStore.mainMemory.size.value }} {{ specsStore.mainMemory.size.unit }} <br>
      <span class="font-bold text-green-500">Main Memory Access Time: </span>{{ specsStore.mainMemory.accessTime }} <br>
      <span class="font-bold text-green-500">Cache Size & unit: </span> {{ specsStore.cache.size.value }}  {{ specsStore.cache.size.unit }} <br>
      <span class="font-bold text-green-500">Cache Access Time: </span>{{ specsStore.cache.accessTime }} <br>
      <span class="font-bold text-green-500">Read Mode:</span> {{ specsStore.readMode }} <br>
      <span class="font-bold text-green-500">Sequence: </span>{{ inputSeqStore.values.join(',') }} <br>
      <span class="font-bold text-green-500">Pass:</span> {{ inputSeqStore.pass }} <br>
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { useSimulStateStore } from '@/store/simulation/state'
  import { useSpecsStore } from '@/store/specs';
  import { useInputSeqStore } from '@/store/inputsequence'
  import { useSimulResultStore } from '@/store/simulation/results'

  const simulState = useSimulStateStore();
  const specsStore = useSpecsStore();
  const inputSeqStore = useInputSeqStore();
  const simulStore = useSimulResultStore();

  const saveSpecs = () => {
    // TODO: Add specsStore state values validation

    // Move to getting the input sequence
    // when specs is validated
    simulState.$state.isInputSpecs = false;
    simulState.$state.isInputSequence = true;
  };

  const simulate = () => {
    // Initialize cache blocks
    simulStore.initCacheBlocks(specsStore.getCacheNumBlocks);

    // Show the simulation component
    simulState.$state.isInputSequence = false;
    simulState.$state.isSimulation = true;
  };

  const cancelSimulation = () => {
    simulState.$state.isInputSequence = false;
    simulState.$state.isInputSpecs = true;

    // TODO: reset values of specsStore
  }
</script>
