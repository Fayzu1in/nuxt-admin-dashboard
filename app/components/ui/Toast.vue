<script setup>
import { useToastStore } from "@/stores/toast";

const toastStore = useToastStore();
</script>

<template>
  <div class="fixed top-5 right-5 space-y-2 z-[9999]">
    <div
      v-for="t in toastStore.toasts"
      :key="t.id"
      class="px-4 py-3 rounded-[10px] shadow-md text-white text-sm"
      :class="t.type === 'error' ? 'bg-red-500' : 'bg-green-500'"
    >
      {{ t.text }}
    </div>
  </div>
</template>
