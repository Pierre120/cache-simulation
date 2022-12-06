<template>
  <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
    <div class="card-body">
      <h2 class="card-title tracking-widest font-bold text-4xl px-4">Input Sequence</h2>
      <custom-input
        type="input-sequence"
        v-model:seq="seqModel"
      />
      <custom-input
        type="pass-count"
        v-model:value="passModel"
      />
      <div class="form-control mt-6">
        <button class="btn btn-primary mb-2" @click="simulate">
          Simulate
        </button>
        <button class="btn btn-outline" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    sequence: string[]
    pass: number;
  }>();

  const emit = defineEmits<{
    (e: 'update:blockSize', size: number): void;
    (e: 'update:sequence', seq: string[]): void;
    (e: 'update:pass', pass: number): void;
    (e: 'simulate'): void;
    (e: 'cancel'): void;
  }>();

  const seqModel = computed({
    get() {
      return props.sequence;
    },
    set(newSeq) {
      emit('update:sequence', newSeq);
    },
  });

  const passModel = computed({
    get() {
      return props.pass;
    },
    set(newPass) {
      emit('update:pass', newPass);
    }
  });

  const simulate = () => emit('simulate');
  const cancel = () => emit('cancel');
</script>
