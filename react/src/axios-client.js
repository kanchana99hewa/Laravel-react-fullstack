import axios from "axios";  // Importing the axios library for making HTTP requests

// Creating an axios instance with a base URL for the API (from environment variables)
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`  // Base URL configured via environment variables
});

// Request interceptor to attach the Authorization token to each request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');  // Retrieve the token from localStorage
  config.headers.Authorization = `Bearer ${token}`;  // Attach the token as a Bearer token in the Authorization header
  return config;  // Return the modified config object
});

// Response interceptor to handle responses and errors
axiosClient.interceptors.response.use(
  (response) => {
    return response;  // If the response is successful, return it
  },
  (error) => {
    const {response} = error;  // Extract the response object from the error

    // Handle 401 Unauthorized errors (e.g., token expiration or invalid token)
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');  // Remove the token from localStorage to log out the user
      // window.location.reload();  // Optionally reload the page to force the user to log in again (commented out)
    } 
    // Handle 404 Not Found errors (e.g., API endpoint not found)
    else if (response.status === 404) {
      // Optionally show a "Not Found" message or handle this case in the UI
    }

    throw error;  // Re-throw the error to be handled further down the chain or by the calling code
  }
);

export default axiosClient;  // Export the axios instance so it can be used in other parts of the application
