// src/services/AuthToken.js
let token = null;

export function setToken(t) {
  token = t || null;
}

export function getToken() {
  return token;
}

export default { setToken, getToken };
