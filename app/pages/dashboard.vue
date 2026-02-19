<template>
  <div class="pl-6">
    <!-- Приветствие -->
    <div class="mt-[0]">
      <h1 class="text-[32px] font-bold text-[#1A1C1E]">
        Добро пожаловать, {{ user?.name || "Пользователь" }}! 👋
      </h1>
    </div>
  </div>
</template>
<script setup>
const { user, isAuthenticated, logout } = useAuth();
</script>
