import axios from "axios";
import Cookies from 'js-cookie'
import { API_GATEWAY_BASE_URL } from "../endpoints/userEndPoints";

export const userAxios = axios.create({
    baseURL:API_GATEWAY_BASE_URL,
    headers:{
        "Content-Type":'application/json',
    },
    withCredentials:true
});

userAxios.interceptors.response.use(
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
                    return userAxios(originalRequest);
                  } else {
                    // Handle failed refresh (e.g., redirect to login)
                    console.log('Refresh token failed');
                  }
                return userAxios(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                console.log('error in refreshtken userAxios');
                
            }
        }

        return Promise.reject(error);
    }
);






userAxios.interceptors.request.use(config => {
    const rawToken = Cookies.get('userToken');

    if (rawToken) {
        const token =JSON.parse(rawToken); // No need to parse, it's already a string
        console.log('Access Token useraxios:', token);
        config.headers['Authorization'] = `Bearer ${token}`;

    } else {
        console.log('Access token not found');
    }

    return config;
}, error => {
    return Promise.reject(error);
});


export default userAxios;




// import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
// import Cookies from 'js-cookie';
// import { API_GATEWAY_BASE_URL } from '../endpoints/userEndPoints';

// export const userAxios = axios.create({
//     baseURL: API_GATEWAY_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true,
// });

// userAxios.interceptors.request.use(
//     async (config: InternalAxiosRequestConfig) => {
//         const rawToken = Cookies.get('accessToken');

//         if (rawToken) {
//             const token = rawToken;
//             console.log('Access Token:', token);
//             config.headers['Authorization'] = `Bearer ${token}`;
//             return config;
//         } else {
//             console.log('Access token not found, attempting to refresh');
//             try {
//                 const response = await userAxios.get<{ accessToken: string }>('/refresh-token', { withCredentials: true });
//                 const newToken = response.data.accessToken;

//                 Cookies.set('accessToken', newToken, { expires: 15 / 1440 });
//                 config.headers['Authorization'] = `Bearer ${newToken}`;

//                 // Retry original request with new token
//                 return config; // Corrected from `return userAxios(config);`
//             } catch (refreshError) {
//                 console.log('Error refreshing access token', refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }
//     },
//     (error: AxiosError) => {
//         return Promise.reject(error);
//     }
// );

// userAxios.interceptors.response.use(
//     response => response,
//     async (error: AxiosError) => {
//         const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const refreshResponse = await axios.get<{ accessToken: string }>(`${API_GATEWAY_BASE_URL}/refresh-token`, { withCredentials: true });

//                 if (refreshResponse.data.accessToken) {
//                     Cookies.set('accessToken', refreshResponse.data.accessToken, { expires: 15 / 1440 });

//                     originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;
//                     return userAxios(originalRequest); // Retry with the new token
//                 } else {
//                     console.log('Refresh token failed');
//                 }
//             } catch (refreshError) {
//                 console.log('Error in refresh token');
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default userAxios;
