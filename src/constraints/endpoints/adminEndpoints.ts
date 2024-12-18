export const API_GATEWAY_BASE_URL = 'http://localhost:5000/admin';

export const adminEndpoints={
    login: `${API_GATEWAY_BASE_URL}/login`,
    refreshToken: `${API_GATEWAY_BASE_URL}/refresh-token`,

    
    getUser:`${API_GATEWAY_BASE_URL}/getUsers`,
    getTutor:`${API_GATEWAY_BASE_URL}/getTutors`,
    getCourses:`${API_GATEWAY_BASE_URL}/getCourses`,
    getStudentsCount:`${API_GATEWAY_BASE_URL}/getStudentsCount`,
    getTotalCourses: `${API_GATEWAY_BASE_URL}/getTotalCourses`,
    getInstructorsCount :`${API_GATEWAY_BASE_URL}/getInstructorsCount`,
    changeStatus: (userId: string) => `${API_GATEWAY_BASE_URL}/changeStatus/${userId}`,
    changeTutorStatus: (tutorId: string) => `${API_GATEWAY_BASE_URL}/changeTutorStatus/${tutorId}`,
    changeTutorVerification: (tutorId: string) => `${API_GATEWAY_BASE_URL}/changeTutorVerification/${tutorId}`,
    changeCourseStatus:(courseId:string)=>`${API_GATEWAY_BASE_URL}/changeCourseStatus/${courseId}`,

    payouts: `${API_GATEWAY_BASE_URL}/payouts`,
    courseTable:`${API_GATEWAY_BASE_URL}/courseTable`,
    payoutsByMonth:`${API_GATEWAY_BASE_URL}/payoutsByMonth`,
}
