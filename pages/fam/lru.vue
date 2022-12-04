<template>
  <div>
    <button class="btn btn-secondary" @click="updateShow">
      Show/Hide
    </button>
    <h1 v-if="show" class="text-5xl">Greet</h1>
  </div>
</template>

<script lang="ts" setup>
const name = useState('name', () => '');
const show = useState('show', () => false);

const updateShow = () => {
  show.value = !show.value;
}
</script>
