export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('phone-mask', {
    mounted(el: HTMLInputElement) {
      const format = (value: string) => {
        // только цифры
        let digits = value.replace(/\D/g, '')

        // убираем код страны если ввели
        if (digits.startsWith('998')) digits = digits.slice(3)

        digits = digits.slice(0, 9)

        const parts = [
          digits.slice(0, 2),
          digits.slice(2, 5),
          digits.slice(5, 7),
          digits.slice(7, 9),
        ]

        let result = '+998'

        if (parts[0]) result += `(${parts[0]}`
        if (parts[0]?.length === 2) result += ')'
        if (parts[1]) result += `-${parts[1]}`
        if (parts[2]) result += `-${parts[2]}`
        if (parts[3]) result += `-${parts[3]}`

        return result
      }

      const onInput = (e: Event) => {
        const input = e.target as HTMLInputElement
        input.value = format(input.value)
        input.dispatchEvent(new Event('input')) // для v-model
      }

      el.addEventListener('input', onInput)

      // начальное значение
      if (!el.value) el.value = '+998'
    }
  })
})
