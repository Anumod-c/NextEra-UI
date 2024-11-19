
export const API_GATEWAY_BASE_URL = 'http://localhost:5000/course';


export const courseEndpoints={
    addCourse:`${API_GATEWAY_BASE_URL}/addCourse`,
    fetchAllCourse: `${API_GATEWAY_BASE_URL}/fetchAllCourses`,
    Course: `${API_GATEWAY_BASE_URL}/courses/:courseId`,
    fetchlatestCourse:`${API_GATEWAY_BASE_URL}/fetchLatestCourses`,
    mostRatedCourse:`${API_GATEWAY_BASE_URL}/fetchMostRatedCourse`,
    mostPurchasedCourse:`${API_GATEWAY_BASE_URL}/fetchMostPurchasedCourse`,
    fetchMyCourses:`${API_GATEWAY_BASE_URL}/fetchMyCourses`,
    fetchCourseChatList:`${API_GATEWAY_BASE_URL}/fetchCourseChatList`
}