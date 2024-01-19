import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import request from '@/lib/request';

const baseUrl = 'http://127.0.0.1:3000';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token'));

  function setUser(payload) {
    token.value = payload.access_token;
    sessionStorage.setItem('token', payload.access_token);
  }

  function isLoggedIn() {
    return token.value !== null && token.value !== undefined;
  }

  /** @param {Object} payload */
  async function login(payload) {
    const response = await request.post(`${baseUrl}/oauth/token`, {
      payload: {
        email: payload.email,
        password: payload.password,
        grant_type: 'password'
      }
    })

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      sessionStorage.setItem('token', null);
      // const error = new Error(responseData.message || 'Authentication failed!');
      // throw error;
    } else {
      // console.log(responseData);
      setUser(responseData);
    }
  }

   async function logout() {
    const response = await request.post(`${baseUrl}/oauth/revoke`, {token: token.value});

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      sessionStorage.setItem('token', null);
    } else {
      sessionStorage.setItem('token', null);
      token.value = null;
    }
  }

  return { isLoggedIn, token, login, logout };
});
