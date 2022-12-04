<template>
  <div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content">
        <form-specs
          v-model:block-size="specsStore.$state.blockSize"
          v-model:mm-size="specsStore.$state.mainMemory.size.value"
          v-model:mm-unit="specsStore.$state.mainMemory.size.unit"
          v-model:mm-access-time="specsStore.$state.mainMemory.accessTime"
          v-model:cache-size="specsStore.$state.cache.size.value"
          v-model:cache-unit="specsStore.$state.cache.size.unit"
          v-model:cache-access-time="specsStore.$state.cache.accessTime"
          v-model:read-mode="specsStore.$state.readMode"
        />
      </div>
    </div>
    <p class="mt-4">
      Block size: {{ specsStore.blockSize }} <br>
      Main Memory Size - Unit: {{ specsStore.mainMemory.size.value }} - {{ specsStore.mainMemory.size.unit }} <br>
      Main Memory Access Time: {{ specsStore.mainMemory.accessTime }} <br>
      Cache Size - Unit: {{ specsStore.cache.size.value }} - {{ specsStore.cache.size.unit }} <br>
      Cache Access Time: {{ specsStore.cache.accessTime }} <br>
      Read Mode: {{ specsStore.readMode }} <br>
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { useSpecsStore } from '@/store/specs';
  const specsStore = useSpecsStore();
</script>
