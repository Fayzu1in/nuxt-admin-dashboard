<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Левая карточка -->
    <div class="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm">
      <h3 class="text-[20px] font-bold mb-4">Первые показы, %</h3>
      <v-chart class="h-[400px]" :option="roseOption" autoresize />
    </div>

    <!-- Правая карточка -->
    <div class="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm">
      <h3 class="text-[20px] font-bold mb-4">Объем</h3>
      <v-chart class="h-[400px]" :option="barOption" autoresize />
    </div>
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

// Регистрируем нужные модули ECharts
use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const roseOption = ref({
  // ... вставь конфиг roseChart из примера выше
});

const barOption = ref({
  // ... вставь конфиг barChart из примера выше
});
</script>
