<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 transition-all duration-200 font-medium cursor-pointer active:scale-95 ',
      'py-2 px-3',

      variantClasses[variant],
      rounded ? 'rounded-full' : 'rounded-[999px]',
    ]"
    @click="$emit('click')"
    :disabled="isDisabled"
  >
    <Icon v-if="leftIcon" :icon="leftIcon" :class="iconSizeClass" />
    <span v-if="label" class="whitespace-nowrap">{{ label }}</span>
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
    <Icon
      v-if="hasDropdown"
      icon="flowbite:caret-down-outline"
      :class="[
        'transition-transform',
        isOpened ? 'rotate-180' : '',
        iconSizeClass,
      ]"
    />
    <Icon v-else-if="rightIcon" :icon="rightIcon" :class="iconSizeClass" />
  </button>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  label: String,
  leftIcon: String,
  rightIcon: String,
  hasDropdown: Boolean,
  isOpened: Boolean,
  rounded: Boolean,
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "secondary",
  },
  size: {
    type: String,
    default: "md",
  },
});
const isDisabled = computed(() => props.disabled || props.loading);

defineEmits(["click"]);

const variantClasses = {
  primary:
    "bg-[#3377FF] text-white hover:bg-blue-600 border border-transparent 'border-[0.5px] border-solid border-[#d6d1d1]",
  secondary:
    "bg-white text-[#1A1C1E] border border-gray-200 hover:bg-gray-100 'border-[0.5px] border-solid border-[#d6d1d1]",
  filter:
    "bg-white text-[#1A1C1E] border border-gray-100 hover:border-gray-300 shadow-sm text-[13px]",
  ghost: `
    bg-transparent 
    text-gray-600 
    hover:bg-[#2C75FF]/10 
    hover:text-[#2C75FF] 
    transition-colors 
    duration-200
  `,
};

// Стили размеров
const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-[10px] text-base",
};

// Размер иконок в зависимости от размера кнопки
const iconSizeClass = computed(() => {
  return props.size === "sm" ? "text-[18px]" : "text-[20px]";
});
</script>
