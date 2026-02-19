import { defineStore } from 'pinia'
// Импортируем созданный тобой тип. 
// Используем префикс 'type', так как это только для компилятора.
import type { IUser } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
  // 1. Состояние (State)
  // Куки автоматически синхронизируют данные между сервером и клиентом
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 неделя
    watch: true,
  })

  // Типизируем куку пользователя через твой интерфейс IUser
  const user = useCookie<IUser | null>('auth_user', {
    maxAge: 60 * 60 * 24 * 7,
  })

  // 2. Геттеры (Getters)
  const isAuthenticated = computed(() => !!token.value)

  // 3. Действия (Actions)
  
  /**
   * Вход в систему
   * Теперь TypeScript будет ругаться, если ты попытаешься передать в userData 
   * что-то, что не соответствует интерфейсу IUser
   */
  const login = (userData: IUser, userToken: string) => {
    token.value = userToken
    user.value = userData
  }

  /**
   * Обновление данных пользователя (например, после редактирования профиля)
   */
  const setUser = (userData: IUser) => {
    user.value = userData
  }

  /**
   * Выход из системы
   */
  const logout = () => {
    token.value = null
    user.value = null
    
    // После очистки данных перекидываем на логин
    navigateTo('/login')
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    setUser,
    logout,
  }
})