const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://perfume-shop-jkch.onrender.com';

export function apiFetch(path, options) {
  return fetch(`${API_BASE_URL}${path}`, options);
}

export default API_BASE_URL;
