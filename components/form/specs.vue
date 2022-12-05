<template>
  <div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content">
        <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div class="card-body">
            <h2 class="card-title tracking-widest font-bold">SPECIFICATIONS</h2>
            <custom-input
              type="block-size"
              v-model:value="blockModel"
            />
            <custom-input
              type="memory-size"
              label="Main Memory Size"
              v-model:value="mmSizeModel"
              v-model:unit="mmUnitModel"
            />
            <custom-input
              type="access-time"
              label="MM Access Time"
              v-model:value="mmATModel"
            />
            <custom-input
              type="memory-size"
              label="Cache Size"
              v-model:value="cacheSizeModel"
              v-model:unit="cacheUnitModel"
            />
            <custom-input
              type="access-time"
              label="Cache Access Time"
              v-model:value="cacheATModel"
            />
            <custom-input
              type="read-type"
              v-model:read="readModel"
            />
            <div class="form-control mt-6">
              <button
                class="btn btn-primary"
                @click="saveSpecs"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    blockSize: number;
    mmSize: number;
    mmUnit: string;
    mmAccessTime: number;
    cacheSize: number;
    cacheUnit: string;
    cacheAccessTime: number;
    readMode: "Load Through" | "Non-Load Through";
  }>();

  const emit = defineEmits<{
    (e: 'update:blockSize', size: number): void;
    (e: 'update:mmSize', size: number): void;
    (e: 'update:mmUnit', unit: string): void;
    (e: 'update:mmAccessTime', time: number): void;
    (e: 'update:cacheSize', size: number): void;
    (e: 'update:cacheUnit', unit: string): void;
    (e: 'update:cacheAccessTime', time: number): void;
    (e: 'update:readMode', mode: string): void;
    (e: 'saveSpecs'): void;
  }>();

  const blockModel = computed({
    get() {
      return props.blockSize;
    },
    set(newSize) {
      emit('update:blockSize', newSize)
    },
  });

  const mmSizeModel = computed({
    get() {
      return props.mmSize;
    },
    set(newSize) {
      emit('update:mmSize', newSize);
    }
  });

  const mmUnitModel = computed({
    get() {
      return props.mmUnit;
    },
    set(newUnit) {
      emit('update:mmUnit', newUnit);
    }
  });

  const mmATModel = computed({
    get() {
      return props.mmAccessTime;
    },
    set(newTime) {
      emit('update:mmAccessTime', newTime);
    }
  });

  const cacheSizeModel = computed({
    get() {
      return props.cacheSize;
    },
    set(newSize) {
      emit('update:cacheSize', newSize);
    }
  });

  const cacheUnitModel = computed({
    get() {
      return props.cacheUnit;
    },
    set(newUnit) {
      emit('update:cacheUnit', newUnit);
    }
  });

  const cacheATModel = computed({
    get() {
      return props.cacheAccessTime;
    },
    set(newTime) {
      emit('update:cacheAccessTime', newTime);
    }
  });

  const readModel = computed({
    get() {
      return props.readMode;
    },
    set(newMode) {
      emit('update:readMode', newMode);
    }
  });

  const saveSpecs = () => emit('saveSpecs');
</script>
