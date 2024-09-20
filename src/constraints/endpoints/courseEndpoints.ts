
const API_GATEWAY_BASE_URL = 'http://localhost:5000/course';


export const courseEndpoints={
    addCourse:`${API_GATEWAY_BASE_URL}/addCourse`,
    fetchAllCourse: `${API_GATEWAY_BASE_URL}/fetchAllCourse`,
    Course: `${API_GATEWAY_BASE_URL}/courses/:courseId`,


}