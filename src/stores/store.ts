import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  const baseUrl = import.meta.env.VITE_BASE_URL

  return { count, doubleCount, increment, baseUrl }
})
