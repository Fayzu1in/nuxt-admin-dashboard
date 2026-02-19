<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

interface Props {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  disabled?: boolean;
  error?: string;
  hint?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const modelValue = defineModel<string>();

const inputId = useId();
</script>

<template>
  <div class="w-full flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-medium text-[#6B6B6B] select-none"
    >
      {{ label }}
    </label>

    <div
      class="relative flex items-center h-[56px] px-4 gap-2 bg-white border rounded-[10px] transition-all duration-200"
      :class="[
        error
          ? 'border-red-500 focus-within:ring-1 focus-within:ring-red-500'
          : 'border-[#EDEDEE] focus-within:ring-1 focus-within:ring-[#2C75FF]',
        disabled
          ? 'bg-gray-50 opacity-60 cursor-not-allowed'
          : 'hover:border-[#D1D1D2]',
      ]"
    >
      <div v-if="$slots.left" class="flex items-center justify-center shrink-0">
        <slot name="left" />
      </div>

      <input
        :id="inputId"
        v-bind="$attrs"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="flex-1 bg-transparent outline-none text-[16px] leading-[20px] font-normal text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 disabled:cursor-not-allowed"
      />

      <div
        v-if="$slots.right"
        class="flex items-center justify-center shrink-0"
      >
        <slot name="right" />
      </div>
    </div>

    <Transition name="fade">
      <p v-if="error" class="text-xs text-red-500 mt-1">
        {{ error }}
      </p>
      <p v-else-if="hint" class="text-xs text-gray-400 mt-1">
        {{ hint }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
