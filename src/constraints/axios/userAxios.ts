import axios from "axios";
import Cookies from 'js-cookie';
import { API_GATEWAY_BASE_URL, userEndpoints } from "../endpoints/userEndPoints";

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
        const token = Cookies.get('userRefreshToken')
        // const token = localStorage.getItem('userRefreshToken')
        console.log('refreshToken',token)
        const originalRequest = error.config;

        // Handle 401 Unauthorized (token expiration)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log('hello inside refresh')
                const refreshResponse = await axios.post(userEndpoints.refreshToken,{token});
                console.log('1111111111111')
                const newAccessToken = refreshResponse.data.accessToken;
                console.log('11111411111111',newAccessToken)

                if(newAccessToken){
                    Cookies.set('userToken',JSON.stringify(newAccessToken));
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return userAxios(originalRequest)  // Retry original request
                }
            } catch (refreshError) {
                console.log('Error refreshing token:', refreshError);
                Cookies.remove('userToken');
                Cookies.remove('userRefreshToken');
            }
        }

        // Handle 403 Forbidden (user blocked)
        if (error.response.status === 403) {
            console.log('User is blocked. Redirecting to login or blocked page.');
            Cookies.remove('userToken')
            Cookies.remove('userRefreshToken');
            // Redirect to login or blocked user page
            window.location.href = '/login'; // Change this to your actual login or blocked route

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
