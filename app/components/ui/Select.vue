<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: [String, Number, null],
  label: String,
  type: {
    type: String,
    default: "select",
  },
  options: {
    type: Array,
    default: () => [],
  },
  error: String,
});

const emit = defineEmits(["update:modelValue"]);
const localValue = computed({
  get: () => props.modelValue ?? "",
  set: (v) => emit("update:modelValue", v),
});

const update = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="mb-1 text-sm text-[#6B6B6B]">
      {{ label }}
    </label>

    <div
      class="relative flex items-center h-[56px] px-4 gap-2 bg-white border rounded-[10px] transition mt-[8px]"
      :class="
        error
          ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500'
          : 'border-[#EDEDEE] focus-within:ring-2 focus-within:ring-[#2C75FF]'
      "
    >
      <!-- SELECT -->
      <select
        v-if="type === 'select'"
        v-model="localValue"
        @change="emit('update:modelValue', localValue)"
        class="flex-1 bg-transparent outline-none text-[16px]"
      >
        <option disabled value="">Выберите...</option>

        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <!-- DATE -->
      <input
        v-else-if="type === 'date'"
        type="date"
        :value="modelValue ? modelValue.replace(/\./g, '-') : ''"
        @input="update"
        class="flex-1 bg-transparent outline-none text-[16px] text-[#1E1E1E]"
      />

      <Icon
        v-if="type === 'select'"
        icon="icon-park-solid:down-one"
        class="w-4 h-4 text-gray-400 pointer-events-none"
      />
    </div>

    <p v-if="error" class="mt-1 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>
