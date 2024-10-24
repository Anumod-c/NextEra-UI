
export const API_GATEWAY_BASE_URL = 'http://localhost:5000/tutor';

export const tutorEndpoints ={
    register: `${API_GATEWAY_BASE_URL}/register`,
    otp:`${API_GATEWAY_BASE_URL}/otp`,
    login : `${API_GATEWAY_BASE_URL}/login`,
    courseList:`${API_GATEWAY_BASE_URL}/courseList`,
    forgotPassword:`${API_GATEWAY_BASE_URL}/forgotPassword`,
    resetPassword: `${API_GATEWAY_BASE_URL}/resetPassword`,
    googleLogin: `${API_GATEWAY_BASE_URL}/google_login`,
    getPresignedUrlForUpload:`${API_GATEWAY_BASE_URL}/get-presigned-url`,
    getPresignedUrlForDownload:`${API_GATEWAY_BASE_URL}/get-presigned-url-download`,
    payouts: `${API_GATEWAY_BASE_URL}/payouts`,
    getTotalStudentsCount: `${API_GATEWAY_BASE_URL}/getStudentsCount`,
    getTotalCoursesCount: `${API_GATEWAY_BASE_URL}/getTotalCoursesCount`,
    additionalInfo: `${API_GATEWAY_BASE_URL}/additionalInfo`
    
}
