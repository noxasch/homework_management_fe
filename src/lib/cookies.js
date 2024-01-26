function setCookie(cname, cvalue, exminutes = 20) {
  const d = new Date();
  d.setTime(d.getTime() + (exminutes*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default {
  /** @param {{ key: value }} payload */
  set: (payload) => {
    const entry = Object.entries(payload)
    setCookie(entry[0][0], entry[0][1])

    return true
  },
  /** @param {string} name */
  get: (name) => {
    return getCookie(name)
  },
  /** @param {string} name */
  reset: (name) => {
    setCookie(name, "", 0)

    return true
  }
}
