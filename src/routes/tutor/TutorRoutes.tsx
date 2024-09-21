import { Route, Routes } from "react-router-dom"
import TutorLogin from "../../components/tutor/auth/TutorLogin"
import TutorDashboard from "../../pages/tutor/TutorDashboard"
import TutorRegister from "../../components/tutor/auth/TutorRegister"
import TutorForgotPass from "../../components/tutor/auth/TutorForgotPass"
import TutorOTP from "../../components/tutor/auth/TutorOTP"
import TutorResetPass from "../../components/tutor/auth/TutorResetPass"
import TutorProfile from "../../components/tutor/TutorProfile"
import Course from "../../pages/tutor/Course"
import CourseListPage from "../../pages/tutor/CourseListPage"
import CourseDetailsPage from "../../pages/tutor/CourseDetailsPage"

const TutorRoutes=()=>{
return(
    <Routes>
        <Route path="/" element={<TutorLogin/>}/>
        <Route path="/dashboard" element={ <TutorDashboard />} />
        <Route path="/register" element={<TutorRegister/>}/>
        <Route path="/forgotPassword" element={<TutorForgotPass/>}/>
        <Route path="/otp" element={<TutorOTP/>}/>
        <Route path="/resetpassword" element={<TutorResetPass/>}/>
        <Route path="/profile" element={<TutorProfile /> } />
        <Route path="/addcourse" element={<Course /> } />
        <Route  path="/courselist" element={<CourseListPage /> }/>
        <Route  path="/courses-details/:courseId" element={<CourseDetailsPage /> }/>

        



    </Routes>
)
}
 export default TutorRoutes