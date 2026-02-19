// middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  // Если юзер УЖЕ залогинен, не пускаем его на страницу логина/регистрации
  if (auth.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})