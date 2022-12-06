<template>
  <div class="card flex-shrink-0 w-full max-w-screen-lg shadow-2xl bg-base-100">
    <div class="card-body w-full">
      <h2 class="card-title font-bold text-secondary text-4xl px-40 pb-5">FULL ASSOCIATIVE - LRU</h2>
      <div class="flex">
        <div class="2xl:w-96 px-6 basis-1/3">
          <cache-table :cache="cache"/>
        </div>
        <div class="2xl:w-96 px-6 basis-2/3">
          <span class="font-bold text-secondary">Cache Hits:</span> {{ hits }}<br>
          <span class="font-bold text-secondary">Cache Miss:</span> {{ miss }}<br>
          <span class="font-bold text-secondary">Miss Penalty:</span>  {{ missPenalty }} ns<br>
          <span class="font-bold text-secondary">Average Access Time:</span> {{ avgAccessTime }} ns<br>
          <span class="font-bold text-secondary">Total Access Time:</span> {{ totalAccessTime }} ns
          <div class="form-control mt-6">
            <button
              class="btn btn-primary mb-2"
              @click="downloadText"
            >
              Download as .txt
            </button>
            <button
              class="btn btn-outline"
              @click="newSimulation"
            >
              New Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Cache } from '@/store/simulation/types'

  const props = defineProps<{
    cache: Cache;
    hits: number;
    miss: number;
    missPenalty: number;
    avgAccessTime: number;
    totalAccessTime: number;
  }>();

  const emit = defineEmits<{
    (e: 'downloadText'): void;
    (e: 'newSimulation'): void;
  }>();

  const downloadText = () => emit('downloadText');
  const newSimulation = () => emit('newSimulation');
</script>
