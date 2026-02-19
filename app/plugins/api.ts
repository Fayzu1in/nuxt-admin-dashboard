import axios from "axios"
import { createApiMethods } from "@/services/api"

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: "/api",
    timeout: 10000,
  })

  api.interceptors.request.use((config) => {
    const token = useCookie("token").value
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const methods = createApiMethods(api)

  return {
    provide: {
      api: methods,
    },
  }
})
