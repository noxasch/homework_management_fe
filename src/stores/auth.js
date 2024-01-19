import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import request from '@/lib/request';

const baseUrl = 'http://127.0.0.1:3000';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('token') || null);
  const user = ref(sessionStorage.getItem('user') || {});

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
    const response = await request.post(`${baseUrl}/oauth/revoke`, {token: token.value});

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
    } else {
      sessionStorage.setItem('token', null);
      token.value = null;
    }
  }

  async function sync() {
    const response = await request.get(`${baseUrl}/api/v1/users/sync`, {token: token.value});

    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      console.log(responseData);
      clear();
    } else {
      user.value = responseData;
      // console.log()
      sessionStorage.setItem('user', responseData);
      // token.value = null;
    }
  }

  return { isLoggedIn, token, login, logout, sync };
});
