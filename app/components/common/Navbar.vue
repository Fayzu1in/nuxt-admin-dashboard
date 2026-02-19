<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";

const route = useRoute();
const showMenu = ref(false);
const showNotifications = ref(false);

const { user, isAuthenticated, logout } = useAuth();

const handleLogout = async () => {
  logout();
  navigateTo("/login");
};

const breadcrumb = computed(() => {
  switch (route.path) {
    case "/profile":
      return {
        parent: "Настройки",
        current: "Настройки аккаунта",
      };

    case "/analytics":
      return {
        parent: "Настройки",
        current: "Аналитика",
      };
    case "/import":
      return {
        parent: "Склад",
        current: "Приход товаров",
      };
    case "/shipping":
      return {
        parent: "Склад",
        current: "Отгрузка товаров",
      };
    case "/stock":
      return {
        parent: "Склад",
        current: "Остатки",
      };

    default:
      return {
        parent: "Склад",
        current: "",
      };
  }
});
</script>

<template>
  <div
    class="sticky top-[12px] z-40 h-16 min-h-16 max-h-16 bg-white rounded-[10px] flex items-center justify-between px-6"
    :class="isAuthenticated ? 'justify-between' : 'justify-end'"
  >
    <!-- LEFT: Breadcrumb -->
    <div
      v-if="isAuthenticated"
      class="flex items-center gap-3 text-[16px] cursor-default"
    >
      <span class="text-gray-500">{{ breadcrumb.parent }}</span>

      <Icon
        icon="iconamoon:arrow-right-2-duotone"
        class="w-5 h-5 text-gray-400"
      />

      <span class="text-gray-900 font-medium">{{ breadcrumb.current }}</span>
    </div>

    <!-- RIGHT: Actions -->
    <div class="flex items-center gap-6 text-[16px]">
      <!-- Notifications -->

      <!-- Language -->
      <div
        class="flex items-center gap-2 cursor-no-drop rounded-lg hover:bg-gray-100 w-14 h-10"
      >
        <img
          src="/images/ru_flag.png"
          alt="RU"
          class="w-6 h-6 rounded-full object-cover"
          disabled
          aria-disabled="true"
        />
        <span class="text-[16px]">Ru</span>
      </div>
      <button
        v-if="isAuthenticated"
        class="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        @click="showNotifications = true"
      >
        <Icon
          icon="cuida:notification-bell-outline"
          class="w-6 h-6 text-gray-700"
        />
      </button>

      <!-- Profile -->

      <div
        v-if="isAuthenticated"
        class="relative flex items-center gap-3 cursor-pointer rounded-lg hover:bg-gray-100"
        :class="showMenu && 'bg-gray-100 rounded-b-[0px] shadow-md z-50'"
        @click="showMenu = !showMenu"
      >
        <div
          class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          <!-- <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="Avatar"
            class="w-full h-full object-cover"
          /> -->

          <Icon icon="pajamas:profile" class="w-6 h-6 text-gray-500" />
        </div>

        <!-- Name -->
        <span class="text-[16px] font-medium">
          {{ user?.name }}
        </span>

        <!-- Dropdown -->
        <Icon icon="icon-park-solid:down-one" class="w-4 h-4 text-gray-500" />
        <div
          v-if="showMenu"
          class="absolute left-0 top-[40px] bg-gray-100 rounded-b-[10px] border-t-0 shadow-md p-2 z-50 w-full"
        >
          <button
            class="w-full text-left text-red-500 px-3 py-2 rounded-md hover:bg-red-50 cursor-pointer"
            @click.stop="handleLogout"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
    <UiModal v-model="showNotifications">
      <h2 class="text-xl font-semibold mb-4">Уведомления</h2>

      <p class="text-gray-500">Пока пусто 🙂</p>
    </UiModal>
  </div>
</template>
