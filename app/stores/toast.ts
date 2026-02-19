
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<any[]>([])

  const show = (text: string, type = 'error') => {
    const id = Date.now()

    toasts.value.push({ id, text, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 2000)
  }

  const showError = (text: string) => show(text, 'error')
  const showSuccess = (text: string) => show(text, 'success')

  return { toasts, showError, showSuccess }
})
