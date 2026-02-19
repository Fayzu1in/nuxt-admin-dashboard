// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  devtools: { enabled: true },
  vite: {
    plugins: [
      //@ts-ignore
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt'],


})
