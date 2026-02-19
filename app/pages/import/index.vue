<template>
  <div class="p-6">
    <h1 class="font-euclid font-semibold text-[40px] leading-[48px]">
      Приход товаров
    </h1>

    <div class="mt-[20px] border-t border-gray-200"></div>

    <!-- Кнопки управления -->
    <div class="mt-[20px] flex items-center gap-2">
      <UiActionButton
        variant="primary"
        label="Создать"
        leftIcon="ic:baseline-plus"
      />
      <UiActionButton
        variant="secondary"
        label="Экспорт"
        leftIcon="hugeicons:file-export"
      />

      <div class="w-[1px] h-6 bg-gray-200 mx-4"></div>

      <UiActionButton
        variant="filter"
        label="Номер прихода"
        hasDropdown
        rounded
      />
      <UiActionButton variant="filter" label="Магазин" hasDropdown rounded />
      <UiActionButton variant="filter" label="Склад" hasDropdown rounded />
      <UiActionButton
        variant="filter"
        label="Дата создания"
        hasDropdown
        rounded
      />
      <UiActionButton
        variant="filter"
        label="Дата прихода"
        hasDropdown
        rounded
      />
      <UiActionButton variant="filter" label="Статус" hasDropdown rounded />
    </div>

    <!-- Таблица -->
    <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <DataTable
        :columns="tableColumns"
        :data="paginatedData"
        :loading="loading"
      >
        <!-- Слот для первой колонки (ID + Иконка) -->
        <template #id="{ value }">
          <!-- Обертываем в NuxtLink для навигации -->
          <NuxtLink :to="`/import/${value}`" class="inline-block">
            <div
              class="flex items-center justify-center py-[8px] px-[12px] bg-blue-50 rounded-[5px] text-blue-600 hover:bg-blue-100 hover:scale-105 transition-all cursor-pointer active:scale-95"
              title="Открыть детали"
            >
              <Icon icon="ci:log-out" class="text-lg mr-1" />
              <span class="text-[13px] font-bold">{{ value }}</span>
            </div>
          </NuxtLink>
        </template>

        <!-- Форматирование цены -->
        <template #price="{ value }">
          <span class="whitespace-nowrap"
            >{{ value.toLocaleString() }} сум</span
          >
        </template>

        <!-- Статус (Бейдж) -->
        <template #status="{ value }">
          <div
            class="px-4 py-1.5 bg-[#E7F6EC] text-[#0F973D] text-[13px] rounded-lg text-center font-medium"
          >
            {{ value }}
          </div>
        </template>
      </DataTable>

      <!-- Пагинация (как на скрине) -->
      <div
        class="flex items-center justify-between p-4 border-t border-gray-100"
      >
        <!-- LEFT: pages -->
        <div class="flex items-center gap-2">
          <!-- BACK -->
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
          >
            <Icon icon="solar:alt-arrow-left-linear" />
          </button>

          <!-- NUMBERS -->
          <button
            v-for="p in totalPages"
            :key="p"
            @click="currentPage = p"
            :class="[
              'w-10 h-10 rounded-xl font-medium transition',
              currentPage === p
                ? 'bg-blue-600 text-white shadow'
                : 'border border-gray-200 hover:bg-gray-50',
            ]"
          >
            {{ p }}
          </button>

          <!-- FORWARD -->
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
          >
            <Icon icon="solar:alt-arrow-right-linear" />
          </button>
        </div>

        <!-- RIGHT: page size -->
        <div class="flex items-center gap-3 text-[14px] text-gray-500">
          <span>Показывать по:</span>

          <select
            v-model="pageSize"
            class="px-3 py-1.5 border border-gray-200 rounded-xl"
          >
            <option v-for="s in pageSizes" :key="s" :value="s">
              {{ s }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const { $api } = useNuxtApp();
const tableData = ref([]);
const pageSize = ref(10);
const currentPage = ref(1);
const pageSizes = [5, 8, 10];
const loading = ref(true);

const totalPages = computed(() =>
  Math.ceil(tableData.value.length / pageSize.value),
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return tableData.value.slice(start, start + pageSize.value);
});

watch(pageSize, () => (currentPage.value = 1));

const tableColumns = [
  { label: "", key: "id", width: "80px" },
  { label: "№ поставки", key: "delivery_no", width: "1fr" },
  { label: "Количество", key: "quantity", width: "1fr" },
  { label: "Цена прихода", key: "price", width: "1.5fr" },
  { label: "Локация склада", key: "warehouse", width: "1fr" },
  { label: "Тип прихода", key: "type", width: "1fr" },
  { label: "Статус", key: "status", width: "140px" },
  { label: "Дата создания", key: "created_at", width: "160px" },
  { label: "Дата прихода", key: "arrival_date", width: "160px" },
];

onMounted(async () => {
  const res = await $api.getImports();
  console.log("getImports", res.data);
  tableData.value = res.data.imports;
  loading.value = false;
});
</script>
