import axios from "axios";
import Cookies from "js-cookie";

import {adminEndpoints, API_GATEWAY_BASE_URL} from '../endpoints/adminEndpoints'

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
        const token = Cookies.get('adminRefreshToken')
        // const token = localStorage.getItem('adminRefreshToken')
        console.log('Retrieved token from localStorage:', token);
        console.log('tokendddd',token)
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.post(adminEndpoints.refreshToken, {token});
                console.log('response working for token')
                const newAccessToken = refreshResponse.data.accessToken;
                if (newAccessToken) {
                    Cookies.set('adminToken', JSON.stringify(newAccessToken));
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return adminAxios(originalRequest); // Retry original request
                }
            } catch (refreshError) {
                console.log('Refresh token failed, redirecting to login');
                // Optionally clear cookies and redirect
                Cookies.remove('adminToken');
                Cookies.remove('adminRefreshToken');
               
            }
        }
        return Promise.reject(error);
    }
);


    adminAxios.interceptors.request.use(config => {
        const rawToken = Cookies.get('adminToken');
        console.log('token is checking and pasing through header')
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
    