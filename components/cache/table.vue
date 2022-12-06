<template>
  <div class="w-full">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Block no.</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in cache.blocksValue" :key="index">
          <th>{{ index }}</th>
          <td>{{ cache.blocksValue[index] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
  import { Cache } from '@/store/simulation/types'
  const props = defineProps<{
    cache: Cache;
  }>();
</script>
