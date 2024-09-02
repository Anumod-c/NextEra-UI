const API_GATEWAY_BASE_URL = 'http://localhost:5000/admin';



export const adminEndpoints={
    login: `${API_GATEWAY_BASE_URL}/login`,
    getUser:`${API_GATEWAY_BASE_URL}/getUsers`,
    getTutor:`${API_GATEWAY_BASE_URL}/getTutors`,
    getCourses:`${API_GATEWAY_BASE_URL}/getCourses`,
    getStudentsCount:`${API_GATEWAY_BASE_URL}/getStudentsCount`,
    getInstructorsCount :`${API_GATEWAY_BASE_URL}/getInstructorsCount`
}