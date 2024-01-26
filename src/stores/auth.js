import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/lib/api/auth';
import request from '@/lib/request';


export const useAuthStore = defineStore('auth', () => {  
  /** @type {ref<{string}>} */
  const token = ref(sessionStorage.getItem('token') || null);

  /** @type {ref<{ name: string, email: string}>} */
  const user = ref(sessionStorage.getItem('user') || {});

  /** 
   * @param {{access_token: string}} payload 
   */
  function setUser(payload) {
    token.value = payload.access_token;
    sessionStorage.setItem('token', payload.access_token);
  }
  
  function isLoggedIn() {
    return token.value !== 'null' && token.value !== null && token.value !== undefined;
  }

  /** 
   * @param {Object} payload 
   * @return {Promise<{void}>}
  */
  async function login(payload) {
    const response = await api.login({
      email: payload.email,
      password: payload.password,
    })

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      clear();
      // const error = new Error(responseData.message || 'Authentication failed!');
      // throw error;
    } else {
      // console.log(responseData);
      setUser(responseData);
    }
  }

  function clear() {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('user', {});
    token.value = null;
    user.value = {}
  }

  async function logout() {
    const response = await api.logout(token.value)

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
    } else {
      sessionStorage.setItem('token', null);
      token.value = null;
    }
  }

  async function sync() {
    const response = await request.get('api/v1/users/sync', {token: token.value});

    const responseData = await response.json();
    if (!response.ok) {
      clear();
    } else {
      user.value = responseData;
      // console.log()
      sessionStorage.setItem('user', responseData);
      // token.value = null;
    }
  }

  return { isLoggedIn, token, login, logout, sync, clear };
});
