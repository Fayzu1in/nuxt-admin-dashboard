<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :class="[baseClasses, variantClasses, widthClasses, 'px-4 py-2 text-sm']"
  >
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

    <slot />
  </button>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  block: {
    type: Boolean,
    default: false,
  },
});

const isDisabled = computed(() => props.disabled || props.loading);

const baseClasses =
  "inline-flex items-center justify-center gap-1 cursor-pointer rounded-[10px] transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses = computed(() => {
  switch (props.variant) {
    case "success":
      return "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500";

    case "danger":
      return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";

    case "ghost":
      return "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-400";

    default:
      return "bg-[#2C75FF] text-white hover:bg-[#1f63e6] focus:ring-[#2C75FF]";
  }
});

const widthClasses = computed(() => {
  return props.block ? "w-full" : "";
});
</script>
