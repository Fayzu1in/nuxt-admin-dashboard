<template>
  <div class="p-10 space-y-4">
    <UiActionButton variant="primary" label="Default"> </UiActionButton>

    <UiActionButton variant="secondary" label="Secondary"> </UiActionButton>

    <UiActionButton variant="ghost" label="Ghost"> </UiActionButton>

    <UiActionButton :loading="true" label="Saving..."> </UiActionButton>

    <UiActionButton block label="Full width"> </UiActionButton>

    <UiInput placeholder="Login">
      <template #left>
        <Icon
          icon="majesticons:phone-line"
          class="w-6 h-6 text-[#6B6B6B]"
        /> </template
    ></UiInput>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
</script>
