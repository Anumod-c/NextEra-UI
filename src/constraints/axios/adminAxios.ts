import axios from "axios";
import Cookies from "js-cookie";

import {API_GATEWAY_BASE_URL} from '../endpoints/adminEndpoints'

export const adminAxios = axios.create({
    baseURL:API_GATEWAY_BASE_URL,
    headers:{
        "Content-Type":'application/json',
    },
    withCredentials:true
});


adminAxios.interceptors.response.use(
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
                    return adminAxios(originalRequest);
                  } else {
                    // Handle failed refresh (e.g., redirect to login)
                    console.log('Refresh token failed');
                  }
                  return adminAxios(originalRequest);
                } catch (refreshError) {
                    // Handle refresh token failure (e.g., redirect to login)
                    console.log('error in refreshtken tutorAxios');
                    
                }
            }
    
            return Promise.reject(error);
        }
    );
    

    adminAxios.interceptors.request.use(config => {
        const rawToken = Cookies.get('adminToken');
    
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
    
    
    export default adminAxios;
    