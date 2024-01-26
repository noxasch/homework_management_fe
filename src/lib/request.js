const baseUrl = 'http://127.0.0.1:3000'

/** @param {string|null} token */
function buildHeaders(token) {
  if (token !== 'null' && token !== null && token !== undefined) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  return { 'Content-Type': 'application/json' }
}

/** 
 * @param {String} path 
 * @param {Object} args 
 */
async function post(path, args = {}) {
  const url = new URL(baseUrl)
  url.pathname = path

  return fetch(url.href, {
    method: 'POST',
    headers: buildHeaders(args.token),
    body: JSON.stringify(args.payload)
  });
}

/** 
 * @param {String} path 
 * @param {Object} args
 * @return {Promise<{Response}>}
 */
async function get(path, args = {}) {  
  const url = new URL(baseUrl)
  url.pathname = path

  if (args.searchParams != undefined) {
    for (const [key, value] of Object.entries(args.searchParams)) {
      url.searchParams.set(key, value)
    }
  }

  return fetch(url.href, {
    method: 'GET',
    headers: buildHeaders(args.token),
  });
}

/** 
 * @param {String} path 
 * @param {Object} args
 * @return {Promise<{Response}>}
 */
async function destroy(path, args = {}) {  
  const url = new URL(baseUrl)
  url.pathname = path

  return fetch(url.href, {
    method: 'DELETE',
    headers: buildHeaders(args.token),
  });
}

/** 
 * @param {String} path 
 * @param {Object} args
 * @return {Promise<{Response}>}
 */
async function update(path, args = {}) {  
  const url = new URL(baseUrl)
  url.pathname = path

  return fetch(url.href, {
    method: 'PUT',
    headers: buildHeaders(args.token),
  });
}



export default {
  post,
  get,
  destroy,
  update
}
