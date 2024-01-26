import { defineStore } from 'pinia';
import request from '@/lib/request';
import { useAuthStore } from '@/stores/auth';

export const useHomeworksApi = defineStore('homeworksApi', () => {  
  const auth = useAuthStore()

  return {
    /** 
     * @returns {Promise<Response>}
    */
    index: async () => {
      const response = await request.get('/api/v1/teachers/homeworks', {token: auth.token});

      return response
    },
    /** 
     * @param {number} id 
     * @returns {Promise<Response>}
    */
    show: async (id) => {
      const response = await request.get(`/api/v1/teachers/homeworks/${id}`, {token: auth.token});

      return response
    },
    /** 
     * @param {{id: number, title: string subject_id: number, due_at: string}} payload 
     * @returns {Promise<Response>}
    */
    update: async (payload) => {
      const response = await request.update(`/api/v1/teachers/homeworks/${payload.id}`, {token: auth.token, payload: payload});

      return response
    },
    /** 
     * @param {{title: string, subject_id: number, due_at: string}} payload 
     * @returns {Promise<Response>}
    */
    create: async (payload) => {
      const response = await request.post('/api/v1/teachers/homeworks', {token: auth.token, payload: payload});

      return response
    },
    /** 
     * @param {string} query 
     * @returns {Promise<Response>}
    */
    search: async (query) => {
      const response =  await request.get('/api/v1/teachers/homeworks', {
        token: auth.token,
        searchParams: {
            query: query
        }
      })

      return response
    },
    /** 
     * @param {number} id 
     * @returns {Promise<Response>}
    */
    destroy: async (id) => {
      const response = await request.destroy(`/api/v1/teachers/homeworks/${id}`, {token: auth.token});

      return response
    },
    /** 
     * @param {{id: number, student_id: number}} payload 
     * @returns {Promise<Response>}
    */
    assign: async (payload) => {
      const response = await request.post(`/api/v1/teachers/homeworks/${payload.id}/assign`, {
        token: auth.token, 
        payload: {
          student_id: payload.student_id
        }
      });

      return response
    },
    /** 
     * @param {{id: number, student_id: number}} payload 
     * @returns {Promise<Response>}
    */
    unassign: async (payload) => {
      const response = await request.post(`/api/v1/teachers/homeworks/${payload.id}/unassign`, {
        token: auth.token, 
        payload: {
          student_id: payload.student_id
        }
      });

      return response
    }
  }
})
