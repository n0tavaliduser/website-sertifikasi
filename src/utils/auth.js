/**
 * Utilitas untuk autentikasi
 */

/**
 * Periksa apakah pengguna sudah login
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Dapatkan token JWT dari localStorage
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Dapatkan data user dari localStorage
 * @returns {Object|null}
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error('Error parsing user data', e);
    return null;
  }
};

/**
 * Periksa apakah pengguna memiliki role tertentu
 * @param {string} role - Role yang ingin diperiksa ('admin', 'user', dll)
 * @returns {boolean}
 */
export const hasRole = (role) => {
  const user = getUser();
  return user && user.role === role;
};

/**
 * Logout pengguna
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Redirect ke halaman login
  window.location.href = '/auth/login';
};

/**
 * Set auth header untuk API request
 * @param {Object} headers - Headers untuk request
 * @returns {Object} - Headers yang sudah ditambahkan Authorization
 */
export const setAuthHeader = (headers = {}) => {
  const token = getToken();
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  return headers;
}; 