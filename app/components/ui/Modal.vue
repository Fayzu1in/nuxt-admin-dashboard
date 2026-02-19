<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
        @click.self="close"
      >
        <transition name="scale">
          <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>
<script setup>
import { onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);

const onEsc = (e) => {
  if (e.key === "Escape") close();
};

onMounted(() => window.addEventListener("keydown", onEsc));
onBeforeUnmount(() => window.removeEventListener("keydown", onEsc));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active {
  transition: transform 0.2s ease;
}
.scale-enter-from {
  transform: scale(0.95);
}
</style>
