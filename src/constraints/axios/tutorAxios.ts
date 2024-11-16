import axios from "axios";
 import Cookies from "js-cookie";

import { API_GATEWAY_BASE_URL, tutorEndpoints } from "../endpoints/tutorEndpoints";

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
        const token = Cookies.get('tutorRefreshToken')
        

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Attempt to refresh the access token
            try {
                
                const refreshResponse = await axios.post(tutorEndpoints.refreshToken,{token});
                const newAccessToken = refreshResponse.data.accessToken;

                if (newAccessToken) {
                    Cookies.set('tutorToken',JSON.stringify(newAccessToken));
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return tutorAxios(originalRequest);
                  } 
                } catch (refreshError) {
                    // Handle refresh token failure (e.g., redirect to login)
                    console.log('error in refreshtken tutorAxios',refreshError);
                    Cookies.remove('tutorToken');
                    Cookies.remove('tutorRefreshToken');
                    Cookies.remove('tutorId');

    

                    
                }
            }
            // Handle 403 Forbidden (user blocked)
        if (error.response.status === 403) {
            console.log('Tutor is blocked. Redirecting to login or blocked page.');
            Cookies.remove('tutorToken')
            Cookies.remove('tutorRefreshToken');
            Cookies.remove('tutorId');


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
    