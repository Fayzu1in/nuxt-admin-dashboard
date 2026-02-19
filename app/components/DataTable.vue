<template>
  <div class="w-full overflow-x-auto rounded-xl border border-gray-100">
    <div
      class="grid items-center bg-[#F9F9F9] border-b border-gray-100"
      :style="gridStyle"
    >
      <div
        v-for="(column, index) in columns"
        :key="index"
        class="py-[20px] px-[16px] text-[16px] font-medium text-[#1A1C1E] whitespace-nowrap"
      >
        {{ column.label }}
      </div>
    </div>

    <div class="divide-y divide-gray-50">
      <!-- SKELETON -->
      <template v-if="loading">
        <div
          v-for="i in 3"
          :key="i"
          class="grid items-center bg-white"
          :style="gridStyle"
        >
          <div
            v-for="(column, index) in columns"
            :key="index"
            class="py-[16px] px-[16px]"
          >
            <div class="h-4 w-full rounded shimmer"></div>
          </div>
        </div>
      </template>

      <!-- DATA -->
      <template v-else>
        <div
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="grid items-center bg-white hover:bg-gray-50 transition-colors"
          :style="gridStyle"
        >
          <div
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="py-[16px] px-[16px] text-[15px] text-[#474D52]"
          >
            <slot :name="column.key" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  loading: Boolean,
});

const gridStyle = computed(() => {
  const columnsWidths = props.columns
    .map((col) => col.width || "1fr")
    .join(" ");
  return {
    gridTemplateColumns: columnsWidths,
  };
});
</script>
<style scoped>
.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e4e4e4 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
