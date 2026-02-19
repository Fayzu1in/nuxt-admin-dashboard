<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

const isOpen = ref(false);
const route = useRoute();

const menuItems = [
  {
    section: "Склад",
    items: [
      {
        name: "Приход товаров",
        icon: "lucide:folder-down",
        path: "/import",
      },
      {
        name: "Отгрузка товаров",
        icon: "lucide:folder-up",
        path: "/shipping",
        // size: "w-[19px] h-[19px]",
      },
      { name: "Остатки", icon: "lucide:box", path: "/stock" },
    ],
  },
  {
    section: "Настройки",
    items: [
      {
        name: "Аналитика",
        icon: "solar:presentation-graph-outline",
        path: "/analytics",
      },
      {
        name: "Настройки аккаунта",
        icon: "majesticons:user-line",
        path: "/profile",
      },
    ],
  },
];
</script>

<template>
  <div
    :class="[
      'h-full bg-[#EEEDF4] transition-all duration-300 rounded-[10px]',
      isOpen ? 'w-[280px]' : 'w-[72px]',
    ]"
  >
    <!-- Toggle -->
    <div class="flex justify-end p-6">
      <button @click="isOpen = !isOpen" :class="['cursor-pointer']">
        <Icon
          icon="uil:angle-double-left"
          :class="[
            'w-6 h-6 transition-transform duration-300',
            !isOpen ? 'rotate-180' : '',
          ]"
        />
      </button>
    </div>

    <!-- Menu -->
    <div class="px-3">
      <div v-for="section in menuItems" :key="section.section">
        <!-- Section title -->
        <p
          v-if="isOpen"
          class="text-xs uppercase text-gray-400 px-2 h-14 flex justify-start items-center pl-[13px]"
        >
          {{ section.section }}
        </p>

        <!-- Items -->
        <div class="">
          <NuxtLink
            v-for="item in section.items"
            :key="item.path"
            :to="item.path"
            class="relative flex items-center gap-3 h-14 px-3 rounded-lg transition"
            :class="
              route.path === item.path
                ? 'bg-white text-[#2C75FF]'
                : 'text-gray-700 hover:bg-white'
            "
            @click="isOpen = false"
          >
            <!-- Active bar -->
            <div
              v-if="route.path === item.path"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2C75FF] rounded-r"
            />

            <Icon
              :icon="item.icon"
              :class="[item.size || 'w-6 h-6', 'shrink-0']"
            />

            <span v-if="isOpen" class="text-sm">
              {{ item.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
