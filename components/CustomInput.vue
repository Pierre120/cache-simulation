<template>
  <div>
    <div v-if="type === 'block-size'" class="form-control">
      <label class="label">
        <span class="label-text">Enter block size</span>
      </label>
      <label class="input-group">
        <span>Block size</span>
        <input
          type="number"
          class="input input-bordered"
          min="1"
          v-model="numValue"
        />
        <span>Words</span>
      </label>
    </div>

    <div v-if="type === 'memory-size'" class="form-control">
      <label class="label">
        <span class="label-text">Enter memory size</span>
      </label>
      <label class="input-group">
        <span>{{ label }}</span>
        <input
          type="number"
          placeholder="4"
          class="input input-bordered"
          min="1"
          v-model="numValue"
        />
        <span>
          <select v-model="unitValue" class="select w-full max-w-xs">
            <option disabled selected>Pick unit</option>
            <option value="Blocks">Blocks</option>
            <option value="Words">Words</option>
          </select>
        </span>
      </label>
    </div>

    <div v-if="type === 'access-time'" class="form-control">
      <label class="label">
        <span class="label-text">Enter access time</span>
      </label>
      <label class="input-group">
        <span>{{ label }}</span>
        <input
          type="number"
          class="input input-bordered"
          min="1"
          v-model="numValue"
        />
        <span>ns</span>
      </label>
    </div>

    <div v-if="type === 'read-type'" class="form-control">
      <label class="label">
        <span class="label-text">Enter read mode</span>
      </label>
      <label class="input-group">
        <span>Read mode</span>
        <select v-model="mode" class="select w-full max-w-xs">
          <option disabled selected>Pick mode</option>
          <option value="Load Through">Load Through</option>
          <option value="Non-Load Through">Non-Load Through</option>
        </select>
      </label>
    </div>

    <div v-if="type === 'input-sequence'" class="form-control">
      <label class="label">
        <span class="label-text">Enter input sequence</span>
      </label>
      <label class="input-group">
        <span>Input Sequence</span>
        <input
          type="text"
          class="input input-bordered"
          v-model="seqValue"
        />
      </label>
    </div>

    <div v-if="type === 'pass-count'" class="form-control">
      <label class="label">
        <span class="label-text">Enter number of pass</span>
      </label>
      <label class="input-group">
        <span>Pass</span>
        <input
          type="number"
          class="input input-bordered"
          v-model="numValue"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    type:
      "block-size" | "memory-size" | "access-time" |
      "read-type" | "input-sequence" | "pass-count";
    value?: string | number;
    unit?: string;
    read?: string;
    label?: string;
    seq?: string[];
  }>();

  const emit = defineEmits<{
    (e: 'update:value', value: string | number): void;
    (e: 'update:unit', unit: string): void;
    (e: 'update:read', read: string): void;
    (e: 'update:seq', seq: string[]): void;
  }>();

  const numValue = computed({
    get() {
      return '' + props.value;
    },
    set(newVal) {
      emit('update:value', +newVal);
    },
  });

  const strValue = computed({
    get() {
      return props.read as string;
    },
    set(newStr) {
      emit('update:read', newStr);
    }
  })

  const unitValue = computed({
    get() {
      return props.unit as string;
    },
    set(newUnit) {
      emit('update:unit', newUnit);
    },
  });

  const mode = computed({
    get() {
      return props.read as string;
    },
    set(newMode) {
      emit('update:read', newMode);
    }
  });

  const seqValue = computed({
    get() {
      return (props.seq as string[]).join(',');
    },
    set(newSeq: string) {
      emit('update:seq', newSeq.split(','));
    }
  });
</script>
