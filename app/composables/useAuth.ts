import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const useAuth = () => {
  const auth = useAuthStore()
  const { user, token, isAuthenticated } = storeToRefs(auth)

  return {
    user,
    token,
    isAuthenticated,
    login: auth.login,
    logout: auth.logout,
  }
}
