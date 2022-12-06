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

      <!-- Live Simulation -->
      <cache-simlation
        v-if="simulState.$state.isSimulation"
        :cache="simulStore.$state.cache"
        :hits="simulStore.$state.cacheHits"
        :miss="simulStore.$state.cacheMiss"
        :missPenalty="simulStore.$state.missPenalty"
        :avgAccessTime="simulStore.$state.avgAccessTime"
        :totalAccessTime="simulStore.$state.totalAccessTime"
      />
    </div>
    <p class="mt-4">
      Block size: {{ specsStore.blockSize }} <br>
      Main Memory Size - Unit: {{ specsStore.mainMemory.size.value }} - {{ specsStore.mainMemory.size.unit }} <br>
      Main Memory Access Time: {{ specsStore.mainMemory.accessTime }} <br>
      Cache Size - Unit: {{ specsStore.cache.size.value }} - {{ specsStore.cache.size.unit }} <br>
      Cache Access Time: {{ specsStore.cache.accessTime }} <br>
      Read Mode: {{ specsStore.readMode }} <br>
      Sequence: {{ inputSeqStore.getValuesAsString }} <br>
      Pass: {{ inputSeqStore.pass }} <br>
      Cache block ages: {{ simulStore.getCacheBlockAges.join(',') }} <br>
      Cache block data: {{ simulStore.getCacheBlockValuesAsString }} <br>
      Cache Hits: {{ simulStore.getCacheHits }} <br>
      Cache Miss: {{ simulStore.getCacheMiss }} <br>
      Cache Miss Penalty: {{ simulStore.getMissPenalty }} <br>
      Average Access Time: {{ simulStore.getAvgAccessTime }} <br>
      Total Access Time: {{ simulStore.getTotalAccessTime }} <br>
    </p>
    <button @click="randCache">Randomize cache data</button>
    <button @click="simulStore.incrementHits">Inc Cache Hits</button>
    <button @click="simulStore.incrementMiss">Inc Cache Miss</button>
    <button @click="randPenalty">Cache Miss Penalty</button>
    <button @click="randAvg">Randomize Avg AT</button>
    <button @click="randTotal">Randomize Total AT</button>
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

  // -- FOR DEBUGGING PURPOSES
  const randCache = () => {
    for(i in simulStore.$state.cache.blocksValue) {
      simulStore.$state.cache.blocksValue[i] = Math.random();
    }
  }

  const randPenalty = () => {
    simulStore.$state.missPenalty = Math.random();
  }

  const randAvg = () => {
    simulStore.$state.avgAccessTime = Math.random();
  }

  const randTotal = () => {
    simulStore.$state.totalAccessTime = Math.random();
  }
</script>
