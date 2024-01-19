const headers = {
  'Content-Type': 'application/json',
}

/** 
 * @param {String} url 
 * @param {Object} args 
 */
async function post(url, args = {}) {
  if (args.token !== null && args.token !== undefined) {
    headers['Authorization'] = `Bearer ${args.token}`
  }
  
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(args.payload)
  });
}

/** 
 * @param {String} url 
 * @param {Object} args 
 */
async function get(url, args = {}) {
  if (args.token !== null && args.token !== undefined) {
    headers['Authorization'] = `Bearer ${args.token}`
  }
  
  return fetch(url, {
    method: 'GET',
    headers: headers,
    // body: JSON.stringify(args.payload)
  });
}



export default {
  post: post,
  get: get,
}
