<template>
  <div class="min-h-screen pb-[50px]">
    <div class="flex h-screen pt-[12px] px-[20px] pb-[20px] box-border">
      <CommonSidebar />

      <div class="flex-1 ml-[20px] flex flex-col gap-[20px]">
        <CommonNavbar />
        <NuxtPage />
      </div>
    </div>
  </div>
  <UiToast></UiToast>
</template>
