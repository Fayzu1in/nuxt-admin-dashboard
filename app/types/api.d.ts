declare module "#app" {
  interface NuxtApp {
    $api: ReturnType<typeof import("@/services/api").createApiMethods>
  }
}
