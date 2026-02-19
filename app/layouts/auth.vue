<script setup></script>
<template>
  <div class="min-h-screen">
    <div class="flex h-screen pt-[12px] px-[20px] pb-[20px] box-border">
      <div class="flex-1 ml-[20px] flex flex-col gap-[20px]">
        <CommonNavbar />
        <slot />
      </div>
    </div>
    <UiToast></UiToast>
  </div>
</template>
