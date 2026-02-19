<template>
  <div>
    <div class="flex items-center gap-3">
      <Icon
        icon="solar:presentation-graph-outline"
        class="text-blue-600 text-[48px]"
      />

      <h1 class="font-euclid font-semibold text-[40px] leading-[48px]">
        Аналитика
      </h1>
    </div>
    <p class="pt-[8px]">
      В этом разделе вы сможете узнать информацию о рассрочке: кто оформил, от
      кого, на какую сумму и на какой срок. Это поможет вам лучше понять условия
      и детали оформления рассрочки.
    </p>
    <div class="mt-[20px] border-t border-gray-200"></div>
    <div class="mt-[20px]"></div>
    <div class="flex items-center">
      <UiActionButton
        variant="secondary"
        label="Экспорт"
        leftIcon="ic:baseline-plus"
      />
      <div class="w-[1px] h-6 bg-gray-200 mx-4"></div>

      <UiActionButton
        variant="primary"
        label="За текущий месяц"
        rightIcon="carbon:close-outline"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <div
        class="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm overflow-hidden"
      >
        <h3 class="text-[20px] font-bold mb-4">Первые показы, %</h3>

        <div class="h-[400px] w-full">
          <ClientOnly>
            <v-chart
              class="w-full h-full"
              :option="roseOption"
              :autoresize="{ throttle: 100 }"
            />
          </ClientOnly>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm overflow-hidden"
      >
        <h3 class="text-[20px] font-bold mb-4">Объем</h3>

        <div class="h-[400px] w-full">
          <ClientOnly>
            <v-chart
              class="w-full h-full"
              :option="barOption"
              :autoresize="{ throttle: 100 }"
            />
          </ClientOnly>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <DataTable :columns="tableColumns" :data="tableData" :loading="loading">
        <template #fact_volume="{ value }">
          <span>{{ value }}%</span>
        </template>

        <template #actions="{ row }">
          <UiActionButton
            variant="secondary"
            size="sm"
            label="Детали"
            @click="openDetails(row.id)"
          />
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
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
const { $api } = useNuxtApp();
const tableData = ref([]);
const roseOption = ref({});
const barOption = ref({});
const loading = ref(true);

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);
const tableColumns = [
  {
    label: "Финансовый партнёр",
    key: "partner",
    width: "minmax(200px, 1.5fr)",
  },
  { label: "Фактический объем", key: "fact_volume", width: "1fr" },
  { label: "Целевой объем", key: "target_volume", width: "1fr" },
  { label: "Первые показы, кол-во", key: "first_shows_count", width: "1fr" },
  { label: "Первые показы, %", key: "first_shows_percent", width: "1fr" },
  { label: "Успешные от ПП, %", key: "success_percent", width: "1fr" },
];
onMounted(async () => {
  const res = await $api.getAnalytics();
  console.log("part", res.data.partners);
  tableData.value = res.data.partners;
  loading.value = false;
  barOption.value = {
    legend: { bottom: "0" },
    xAxis: {
      type: "category",
      data: res.data.partners.map((p) => p.partner),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Фактический объем",
        type: "bar",
        data: res.data.partners.map((p) => Number(p.fact_volume)),
        itemStyle: {
          color: "#66D2E8",
          borderRadius: [6, 6, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
          fontSize: 14,
          fontWeight: 600,
          color: "#333",
        },
      },
      {
        name: "Целевой объем",
        type: "bar",
        data: res.data.partners.map((p) => Number(p.target_volume)),
        itemStyle: {
          color: "#4D79A8",
          borderRadius: [6, 6, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
          fontSize: 14,
          fontWeight: 600,
          color: "#333",
        },
      },
    ],
  };
  roseOption.value = {
    series: [
      {
        type: "pie",
        radius: [20, 140],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: res.data.partners.map((p) => ({
          value: p.success_percent,
          name: p.partner,
          first_shows_percent: p.first_shows_percent,
          itemStyle: { color: p.color },
        })),
        label: {
          show: true,
          formatter: (params) => {
            return `${params.name}   ${params.data.first_shows_percent}%\nУспешных   ${params.value}%`;
          },
        },
      },
    ],
  };
});

// const barOption = ref({
//   legend: { bottom: "0" },
//   xAxis: {
//     type: "category",
//     data: ["Partner 1", "Partner 2", "Partner 3", "Partner 4"],
//   },
//   yAxis: { type: "value" },
//   series: [
//     {
//       name: "Факт",
//       type: "bar",
//       data: [72, 55, 83, 48],
//       itemStyle: {
//         color: "#66D2E8",
//         borderRadius: [6, 6, 0, 0],
//       },
//     },
//     {
//       name: "Цель",
//       type: "bar",
//       data: [80, 80, 75, 65],
//       itemStyle: {
//         color: "#4D79A8",
//         borderRadius: [6, 6, 0, 0],
//       },
//     },
//   ],
// });
</script>
