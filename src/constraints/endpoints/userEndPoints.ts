
export const API_GATEWAY_BASE_URL ='http://localhost:5000';


export const userEndpoints = {
    register : `${API_GATEWAY_BASE_URL}/register`,
    otp : `${API_GATEWAY_BASE_URL}/otp`,
    login : `${API_GATEWAY_BASE_URL}/login`,
    forgotPasword : `${API_GATEWAY_BASE_URL}/forgotPassword`,
    resetPassword: `${API_GATEWAY_BASE_URL}/resetPassword`,
    googleLogin: `${API_GATEWAY_BASE_URL}/google_login`
}