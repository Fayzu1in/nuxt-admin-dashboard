<script setup>
import { ref } from "vue";
const auth = useAuthStore();
import { Icon } from "@iconify/vue";
const avatar = ref(null);
const status = ref(auth.user?.status);
const firstName = ref(auth.user?.name);
const lastName = ref(auth.user?.surname);
const position = ref(auth.user?.position);
const phone = ref(auth.user?.phone);
const email = ref(auth.user?.email);
const birthDate = ref(auth.user?.birthDate);

const password = ref("");
const toast = useToastStore();
const loading = ref(false);
const { $api } = useNuxtApp();
const handleUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = URL.createObjectURL(file);
  }
};
const handleSave = async () => {
  console.log("position:", position.value);
  console.log("options:", ["Администратор", "Менеджер", "Оператор"]);
  loading.value = true;

  try {
    const res = await $api.updateProfile({
      name: firstName.value,
      surname: lastName.value,
      phone: phone.value,
      email: email.value,
      position: position.value,
      birthDate: birthDate.value,
      status: status.value,
    });

    // обновляем store
    auth.setUser(res.data.user);

    toast.showSuccess("Профиль обновлён ✅");
  } catch (err) {
    const message =
      err?.response?.data?.message || err?.message || "Ошибка сохранения";

    toast.showError(message);
  } finally {
    loading.value = false;
  }
};
const handleDelete = () => {
  toast.showError("Функция временно недоступна");
};
</script>

<template>
  <div>
    <h1 class="font-euclid font-semibold text-[40px] leading-[48px]">
      Настройки аккаунта
    </h1>

    <div class="mt-[20px] border-t border-gray-200"></div>

    <div class="mt-[20px]"></div>

    <div class="space-y-[20px]">
      <label
        class="flex items-center gap-[16px] border border-dashed border-gray-300 rounded-[10px] px-[16px] py-[0] pl-0 w-fit cursor-pointer"
      >
        <div
          class="w-[60px] h-[60px] rounded-[10px] overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          <img
            v-if="true"
            src="/images/profileImage.jpeg"
            alt="Avatar"
            class="w-full h-full object-cover"
          />

          <Icon
            v-else
            icon="majesticons:user-line"
            class="w-8 h-8 text-gray-400"
          />
        </div>

        <span class="text-[16px] font-medium text-gray-700"> Фотография </span>

        <input type="file" class="hidden" @change="handleUpload" />
      </label>

      <div class="grid grid-cols-2 gap-[20px]">
        <UiInput label="Фамилия" v-model="lastName" />
        <UiInput label="Имя" v-model="firstName" />

        <UiInput label="Номер телефона" v-model="phone" />
        <UiInput label="Пароль" type="password" v-model="password" />
        <UiSelect
          label="Должность"
          v-model="position"
          :options="['Администратор', 'Менеджер', 'Оператор']"
        />
        <UiSelect label="Дата рождения" type="date" v-model="birthDate" />

        <UiInput label="Email" v-model="email" />
        <UiSelect
          label="Статус"
          v-model="status"
          :options="['Активный', 'Офлайн']"
        />
      </div>
      <div class="mt-[20px] border-t border-gray-200"></div>

      <div class="mt-[20px]"></div>

      <div class="flex gap-[10px]">
        <UiButton
          variant="primary"
          class="pt-[15px] pl-[12px] pr-[12px] pb-[15px]"
          @click="handleSave"
          :disabled="loading"
        >
          {{ loading ? "Сохраняем" : "Сохранить" }}
        </UiButton>

        <UiButton
          variant="danger"
          class="h-14"
          :disabled="loading"
          @click="handleDelete"
        >
          Удалить
        </UiButton>
      </div>
    </div>
  </div>
</template>
