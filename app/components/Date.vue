<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  modelValue: String,
  label: String,
  error: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="mb-1 text-sm text-[#6B6B6B]">
      {{ label }}
    </label>

    <!-- Field wrapper -->
    <div
      class="relative flex items-center h-[56px] px-4 gap-2 bg-white border rounded-[10px] transition mt-[8px]"
      :class="
        error
          ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500'
          : 'border-[#EDEDEE] focus-within:ring-2 focus-within:ring-[#2C75FF]'
      "
    >
      <!-- Date input -->
      <input
        type="date"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        class="flex-1 bg-transparent outline-none text-[16px] leading-[20px] font-normal text-[#1E1E1E] appearance-none"
      />

      <!-- Calendar icon -->
      <Icon
        icon="majesticons:calendar-line"
        class="w-5 h-5 text-gray-400 pointer-events-none"
      />
    </div>

    <!-- Error -->
    <p v-if="error" class="mt-1 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>
