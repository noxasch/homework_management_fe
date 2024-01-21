import { ref } from 'vue';
import { defineStore } from 'pinia';
import request from '@/lib/request';
import { useAuthStore } from './auth';

const baseUrl = 'http://127.0.0.1:3000';

export const useHomeworksStore = defineStore('homeworks', () => {
  const homeworks = ref([]);
  const meta = ref({});

  async function get() {
    const auth = useAuthStore();
    const response = await request.get(`${baseUrl}/api/v1/teachers/homeworks`, {token: auth.token});
    if (response.ok) {
      const responseData = await response.json();
      homeworks.value = responseData.homeworks;
      meta.value = responseData.meta;
      console.log(responseData);
    }
    return response.ok;
  }

  async function create(payload) {
    const auth = useAuthStore();
    const response = await request.post(`${baseUrl}/api/v1/teachers/homeworks`, {token: auth.token, payload: payload});

    if (response.ok) {
      const responseData = await response.json();
      homeworks.value.push(responseData);
    }
    


    return response.ok;
  }

  return { create, get, homeworks, meta };
});
