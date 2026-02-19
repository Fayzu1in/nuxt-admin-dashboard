<template>
  <div class="p-6">
    <div class="flex justify-between">
      <div class="flex flex-start items-center">
        <div class="mr-[22px]">
          <NuxtLink to="/import" class="text-[30px] text-[#6B6B6B]">
            <Icon icon="ic:round-arrow-back" />
          </NuxtLink>
        </div>
        <div class="rightSide">
          <h2 class="text-2xl font-bold mb-[4px]">
            Приход #{{ $route.params.id }} - 15.09.2025 17:04
          </h2>
          <div class="text-[15px] text-[#6B6B6B]">
            Коробки {{ importData?.warehouse || "Загружаем" }}
          </div>
          <div class="my-[20px]">
            Статус:
            <span
              class="bg-[#4FC17D] text-[#fff] py-[12px] px-[9px] rounded-md ml-[5px]"
              >{{ importData?.status || "Загружаем" }}</span
            >
          </div>
        </div>
      </div>
      <div>
        <UiActionButton
          variant="ghost"
          label="Список товаров"
          leftIcon="jam:task-list"
        />
        <UiActionButton
          variant="ghost"
          label="Загрузки"
          leftIcon="solar:file-download-broken"
        />
        <UiActionButton
          variant="ghost"
          label="История статусов"
          leftIcon="ph:dots-three-vertical-bold"
        />
      </div>
    </div>
    <div class="mt-[20px] border-t border-gray-200"></div>
    <div class="mt-[20px]"></div>

    <div class="relative w-full mt-[20px]">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        >🔍</span
      >
      <input
        type="text"
        placeholder="Поиск"
        class="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
      />
    </div>

    <div class="mt-[20px] mb-[20px] flex items-center gap-2">
      <UiActionButton
        variant="primary"
        label="Добавить товар"
        leftIcon="ic:baseline-plus"
      />
      <UiActionButton
        variant="secondary"
        label="Импорт"
        leftIcon="hugeicons:file-export"
      />
      <UiActionButton
        variant="secondary"
        label="Экспорт"
        leftIcon="hugeicons:file-export"
      />

      <div class="w-[1px] h-6 bg-gray-200 mx-4"></div>

      <UiActionButton variant="filter" label="Магазин" hasDropdown rounded />
      <UiActionButton variant="filter" label="Инвойс" hasDropdown rounded />
      <UiActionButton variant="filter" label="Статус" hasDropdown rounded />
    </div>
    <DataTable :columns="tableColumns" :data="tableData" :loading="loading">
      <!-- Кастомный слот для колонки "Статус" -->
      <template #status="{ value }">
        <div
          :class="[
            'px-4 py-2 rounded-lg text-[13px] font-medium text-center transition-colors',
            value === 'Принят'
              ? 'bg-[#E7F6EC] text-[#0F973D]'
              : 'bg-[#EEF4FF] text-[#3377FF]',
          ]"
        >
          {{ value }}
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
const route = useRoute();
const { $api } = useNuxtApp();

const importData = ref(null);
const tableData = ref([]);
const loading = ref(true);

onMounted(async () => {
  const res = await $api.getImportById(route.params.id);

  importData.value = res.data.import;
  tableData.value = res.data.items;
  loading.value = false;
});
import { Icon } from "@iconify/vue";
const tableColumns = [
  { label: "Код товара (EAN)", key: "ean", width: "1.5fr" },
  { label: "Инвойс", key: "invoice", width: "2fr" },
  { label: "Магазин", key: "store", width: "1fr" },
  { label: "Дата прихода", key: "arrival_date", width: "1.2fr" },
  { label: "Статус", key: "status", width: "220px" },
];

// const tableData = ref([
//   {
//     ean: "EAN13 ABGD1715",
//     invoice: "1051138/25/12/FV/0000097",
//     store: "Магазин 1",
//     arrival_date: "15.09.2025 17:04",
//     status: "Принят не по списку",
//   },
//   {
//     ean: "EAN13 ABGD1234",
//     invoice: "1051138/25/12/FV/0000097",
//     store: "Магазин 1",
//     arrival_date: "15.09.2025 17:04",
//     status: "Принят",
//   },
//   {
//     ean: "EAN13 ABGD1243",
//     invoice: "1051138/25/12/FV/0000097",
//     store: "Магазин 1",
//     arrival_date: "15.09.2025 17:04",
//     status: "Принят",
//   },
//   {
//     ean: "EAN13 ABGD1432",
//     invoice: "1051138/25/12/FV/0000097",
//     store: "Магазин 1",
//     arrival_date: "15.09.2025 17:04",
//     status: "Принят",
//   },
//   {
//     ean: "EAN13 ABGD1225",
//     invoice: "1051138/25/12/FV/0000097",
//     store: "Магазин 1",
//     arrival_date: "15.09.2025 17:04",
//     status: "Принят",
//   },
//   {
//     ean: "EAN13 ABGD1123",
//     invoice: "1051138/25/12/FV/0000097",
//     store: "Магазин 1",
//     arrival_date: "15.09.2025 17:04",
//     status: "Принят",
//   },
// ]);
</script>
