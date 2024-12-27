import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Update with your Flask backend URL
  timeout: 5000,                        // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json', // Common header for JSON payloads
    Accept: 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add an Authorization header if a token exists
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[Response Error]', error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);

// Export the Axios instance for use in other files
export default apiClient;
