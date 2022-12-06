<template>
  <div class="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
    <div class="card-body">
      <h2 class="card-title">Full Associative Mapping (LRU)</h2>
      <div class="w-full flex">
        <div class="w-1/2 p-4">
          <cache-table :cache="cache"/>
        </div>
        <div class="w-1/2 p-4">
          Cache Hits: {{ hits }}<br>
          Cache Miss: {{ miss }}<br>
          Miss Penalty: {{ missPenalty }} ns<br>
          Average Access Time: {{ avgAccessTime }} ns<br>
          Total Access Time: {{ totalAccessTime }} ns
          <div class="form-control mt-6">
            <button class="btn btn-primary mb-2">
              Download as .txt
            </button>
            <button class="btn btn-outline">
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
</script>
