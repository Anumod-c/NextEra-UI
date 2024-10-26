import axios from "axios";
 import Cookies from "js-cookie";

import { API_GATEWAY_BASE_URL } from "../endpoints/tutorEndpoints";

 export const tutorAxios = axios.create({
    baseURL:API_GATEWAY_BASE_URL,
    headers:{
        "Content-Type":'application/json',
    },
    withCredentials:true
});


tutorAxios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Attempt to refresh the access token
            try {
                // await axios.get(`${API_GATEWAY_BASE_URL}/refresh-token`, { withCredentials: true });
                const refreshResponse = await axios.get(`${API_GATEWAY_BASE_URL}/refresh-token`, { withCredentials: true });
                if (refreshResponse.data.accessToken) {
                    // Retry the original request
                    return tutorAxios(originalRequest);
                  } else {
                    // Handle failed refresh (e.g., redirect to login)
                    console.log('Refresh token failed');
                    // window.location.href = '/tutor'; // Change this to your actual login or blocked route

                  }
                  return tutorAxios(originalRequest);
                } catch (refreshError) {
                    // Handle refresh token failure (e.g., redirect to login)
                    console.log('error in refreshtken tutorAxios',refreshError);

                    
                }
            }
            // Handle 403 Forbidden (user blocked)
        if (error.response.status === 403) {
            console.log('Tutor is blocked. Redirecting to login or blocked page.');
            Cookies.remove('tutorToken')

            // Redirect to login or blocked user page
            window.location.href = '/tutor?message=blocked'; // Change this to your actual login or blocked route

            return Promise.reject(error);
        }
    
            return Promise.reject(error);
        }
    );
    

    tutorAxios.interceptors.request.use(config => {
        const rawToken = Cookies.get('tutorToken');
    
        if (rawToken) {
            const token =JSON.parse(rawToken); // No need to parse, it's already a string
            console.log('Access Token:', token);
            config.headers['Authorization'] = `Bearer ${token}`;
    
        } else {
            console.log('Access token not found');
            

        }
    
        return config;
    }, error => {
        return Promise.reject(error);
    });
    
    
    export default tutorAxios;
    