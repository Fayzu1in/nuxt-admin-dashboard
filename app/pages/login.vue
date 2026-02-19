<template>
  <div class="flex items-center justify-center h-[88vh] pb-[75px]">
    <div
      class="absolute top-0 left-0 right-0 w-full flex items-center justify-center px-[20px]"
    ></div>
    <div class="w-[340px] bg-[#FFFFFF] rounded-[16px]">
      <div class="flex justify-center mb-6">
        <img src="/images/logo.png" alt="Logo" class="w-[120px] h-[120px]" />
      </div>

      <h1 class="text-[28px] font-semibold font-euclid text-center mb-[18px]">
        Вход
      </h1>

      <div class="space-y-[17px]">
        <UiInput
          v-model="phone"
          v-phone-mask
          placeholder="+998(__)-___-__-__"
          :error="error"
        >
          <template #left>
            <Icon
              icon="majesticons:phone-line"
              class="w-[24px] h-[30px] text-[#6b6b6ba1]"
            />
          </template>
        </UiInput>

        <UiInput
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Пароль"
          :error="error"
        >
          <template #left>
            <Icon
              icon="majesticons:lock-line"
              class="w-[22px] h-[22px] text-[#6b6b6ba1]"
            />
          </template>

          <template #right>
            <Icon
              :icon="
                showPassword
                  ? 'majesticons:eye-off-line'
                  : 'majesticons:eye-line'
              "
              class="w-6 h-6 text-[#6b6b6ba1] cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </UiInput>

        <UiButton
          variant="primary"
          class="w-full h-14"
          :disabled="loading"
          @click="handleLogin"
        >
          {{ loading ? "Загрузка..." : "Войти" }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
});
const { $api } = useNuxtApp();
const auth = useAuthStore();
const toast = useToastStore();
import { Icon } from "@iconify/vue";
const phone = ref("+998");
const password = ref("");
const error = ref("");
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  error.value = "";

  if (!phone.value || !password.value) {
    error.value = "Введите телефон и пароль";
    toast.showError("Заполните все поля");
    return;
  }

  loading.value = true;

  try {
    const res = await $api.login({
      phone: phone.value,
      password: password.value,
    });

    const { user, token } = res.data;
    auth.login(user, token);

    toast.showSuccess("Добро пожаловать 👋");
    await navigateTo("/dashboard");
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.statusMessage ||
      err?.response?.statusText ||
      err?.message ||
      "Ошибка сервера";

    error.value = message;
    toast.showError(message);
  } finally {
    loading.value = false;
  }
};
</script>
