import request from '@/lib/request';

export default {
  /** 
   * @param {{email: string, password: string}} payload 
   * @return {Promise<{Response}>}
  */
  login: async (payload) => {
    const response = await request.post('/oauth/token', {
      payload: {
        ...payload,
        grant_type: 'password'
      }
    })

    return response
  },

  /** 
   * @param {string} token 
   * @return {Promise<{Response}>}
  */
  logout: async (token) => {
    const response = await request.post('oauth/revoke', {  
      payload: { token } 
    })

    return response
  }
}
