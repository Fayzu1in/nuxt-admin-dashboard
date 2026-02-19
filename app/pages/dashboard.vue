<template>
  <div class="p-6">
    <!-- Приветствие -->
    <div class="mb-8">
      <h1 class="text-[32px] font-bold text-[#1A1C1E]">
        Добро пожаловать, {{ user?.name || "Пользователь" }}! 👋
      </h1>
      <p class="text-gray-500">Вот что происходит в вашей системе сегодня.</p>
    </div>
  </div>
</template>
<script setup>
const { user, isAuthenticated, logout } = useAuth();
</script>
