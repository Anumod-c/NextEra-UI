import axios from "axios";
import Cookies from 'js-cookie';
import { API_GATEWAY_BASE_URL } from "../endpoints/userEndPoints";

export const userAxios = axios.create({
    baseURL: API_GATEWAY_BASE_URL,
    headers: {
        "Content-Type": 'application/json',
    },
    withCredentials: true
});

// Handle response errors, including token expiration and user blocked
userAxios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized (token expiration)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.get(`${API_GATEWAY_BASE_URL}/refresh-token`, { withCredentials: true });
                
                if (refreshResponse.data.accessToken) {
                    Cookies.set('userToken', JSON.stringify(refreshResponse.data.accessToken)); // Store new token in cookies
                    originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;
                    return userAxios(originalRequest); // Retry the original request
                } else {
                    // Handle failed token refresh
                    console.log('Token refresh failed');
                    // Optionally, redirect to login if token refresh fails
                }
            } catch (refreshError) {
                console.log('Error refreshing token:', refreshError);
                // Optionally, redirect to login on refresh token failure
            }
        }

        // Handle 403 Forbidden (user blocked)
        if (error.response.status === 403) {
            console.log('User is blocked. Redirecting to login or blocked page.');
            Cookies.remove('userToken')

            // Redirect to login or blocked user page
            window.location.href = '/login?message=blocked'; // Change this to your actual login or blocked route

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

// Handle request by setting the access token in headers
userAxios.interceptors.request.use(config => {
    const rawToken = Cookies.get('userToken');

    if (rawToken) {
        const token = JSON.parse(rawToken);
        console.log('Access Token (userAxios):', token);
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('Access token not found');
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default userAxios;
