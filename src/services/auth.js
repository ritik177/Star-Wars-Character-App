/**
 * Mock Authentication Service
 * Simulates JWT token-based authentication with fake credentials
 */

const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

const TOKEN_STORAGE_KEY = 'sw_token';
const REFRESH_TOKEN_STORAGE_KEY = 'sw_refresh_token';
const TOKEN_EXPIRY_KEY = 'sw_token_expiry';

/**
 * Generate a mock JWT token
 * @param {string} username - Username
 * @param {number} expiresIn - Expiration time in seconds
 * @returns {string} Mock JWT token
 */
const generateMockToken = (username, expiresIn = 3600) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    })
  );
  const signature = btoa('mock_signature');
  return `${header}.${payload}.${signature}`;
};

/**
 * Decode JWT token (mock)
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null
 */
const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
const isTokenExpired = (token) => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  return Date.now() / 1000 >= payload.exp;
};

/**
 * Login with credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise<Object>} Auth result with token
 */
export const login = async (username, password) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check credentials
  if (
    username === MOCK_CREDENTIALS.username &&
    password === MOCK_CREDENTIALS.password
  ) {
    const token = generateMockToken(username, 3600); // 1 hour
    const refreshToken = generateMockToken(username, 86400); // 24 hours

    // Store tokens
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + 3600000));

    return {
      success: true,
      token,
      refreshToken,
      user: { username },
    };
  }

  throw new Error('Invalid credentials');
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

/**
 * Get current token
 * @returns {string|null} Current token or null
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
};

/**
 * Refresh token (mocked)
 * @returns {Promise<string>} New token
 */
export const refreshToken = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  if (!refreshTokenValue || isTokenExpired(refreshTokenValue)) {
    throw new Error('Refresh token expired');
  }

  const payload = decodeToken(refreshTokenValue);
  if (!payload) {
    throw new Error('Invalid refresh token');
  }

  const newToken = generateMockToken(payload.sub, 3600); // 1 hour
  localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
  localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + 3600000));

  return newToken;
};

/**
 * Get current user from token
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  const token = getToken();
  if (!token || isTokenExpired(token)) return null;

  const payload = decodeToken(token);
  if (!payload) return null;

  return { username: payload.sub };
};

/**
 * Setup automatic token refresh
 * Checks token expiry and refreshes if needed
 */
export const setupTokenRefresh = (onTokenRefresh, onLogout) => {
  const checkAndRefresh = async () => {
    const token = getToken();
    if (!token) return;

    const payload = decodeToken(token);
    if (!payload) {
      onLogout();
      return;
    }

    // Refresh if token expires in less than 5 minutes
    const timeUntilExpiry = payload.exp - Date.now() / 1000;
    if (timeUntilExpiry < 300 && timeUntilExpiry > 0) {
      try {
        const newToken = await refreshToken();
        if (onTokenRefresh) onTokenRefresh(newToken);
      } catch (error) {
        console.error('Token refresh failed:', error);
        onLogout();
      }
    } else if (timeUntilExpiry <= 0) {
      // Token already expired
      onLogout();
    }
  };

  // Check immediately
  checkAndRefresh();

  // Check every minute
  const interval = setInterval(checkAndRefresh, 60000);

  return () => clearInterval(interval);
};

