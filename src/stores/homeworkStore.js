import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useHomeworksStore = defineStore('homeworks', () => {
  const homeworks = ref([])

  const get = computed(() => homeworks.value)

  function set(items) {
    homeworks.value = [...items]
  }

  function add(item) {
    homeworks.value.push(item)
  }

  return { homeworks, get, set, add }
})
