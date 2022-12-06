<template>
  <div>
    <div v-if="type === 'block-size'" class="form-control">
      <label class="label">
        <span class="label-text italic font-bold text-secondary">Enter block size</span>
      </label>
      <label class="input-group">
        <span class = "w-2/5">Block size</span>
        <input
          type="number"
          class="input input-bordered w-2/5"
          min="1"
          v-model="numValue"
          @click="removeAlert"
        />
        <span class="w-1/5 pr-28">Words</span>
      </label>
    </div>

    <div v-if="type === 'memory-size'" class="form-control">
      <label class="label">
        <span class="label-text italic font-bold text-secondary">Enter memory size</span>
      </label>
      <label class="input-group">
        <span class="w-2/5">{{ label }}</span>
        <input
          type="number"
          class="input input-bordered w-2/5 "
          min="1"
          v-model="numValue"
          @click="removeAlert"
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
        <span class="label-text italic font-bold text-secondary">Enter access time</span>
      </label>
      <label class="input-group">
        <span class="w-2/5">{{ label }}</span>
        <input
          type="number"
          class="input input-bordered w-2/5"
          min="1"
          v-model="numValue"
          @click="removeAlert"
        />
        <span class="w-1/5 pr-28">ns</span>
      </label>
    </div>

    <div v-if="type === 'read-type'" class="form-control">
      <label class="label">
        <span class="label-text italic font-bold text-secondary">Enter read mode</span>
      </label>
      <label class="input-group">
        <span class="w-2/5">Read mode</span>
        <select v-model="mode" class="select w-3/5 max-w-xs">
          <option disabled selected>Pick mode</option>
          <option value="Load Through">Load Through</option>
          <option value="Non-Load Through">Non-Load Through</option>
        </select>
      </label>
    </div>

    <div v-if="type === 'input-sequence'" class="form-control">
      <label class="label">
        <span class="label-text italic font-bold text-secondary">Enter input sequence</span>
      </label>
      <label class="input-group">
        <span class="w-2/5">Input Sequence</span>
        <input
          type="text"
          class="input input-bordered w-3/5"
          v-model="seqValue"
          @click="removeAlert"
        />
      </label>
    </div>

    <div v-if="type === 'pass-count'" class="form-control">
      <label class="label">
        <span class="label-text italic font-bold text-secondary">Enter number of pass</span>
      </label>
      <label class="input-group">
        <span class="w-2/5">Pass</span>
        <input
          type="number"
          class="input input-bordered w-3/5"
          v-model="numValue"
          @click="removeAlert"
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
    (e: 'removeAlert'): void;
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
      const seqArr = newSeq.split(',');
      seqArr.forEach((elem, index) => {
        seqArr[index] = elem.trim();
      })
      emit('update:seq', seqArr);
    }
  });

  const removeAlert = () => emit('removeAlert');
</script>
