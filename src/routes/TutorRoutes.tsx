import { Route, Routes } from "react-router-dom"
import TutorLogin from "../components/tutor/auth/TutorLogin"
import TutorDashboard from "../pages/tutor/TutorDashboard"
import TutorRegister from "../components/tutor/auth/TutorRegister"
import TutorForgotPass from "../components/tutor/auth/TutorForgotPass"
import TutorOTP from "../components/tutor/auth/TutorOTP"
import TutorResetPass from "../components/tutor/auth/TutorResetPass"
import TutorProfile from "../components/tutor/TutorProfile"
import Course from "../pages/tutor/Course"
import AddCourse2 from "../components/tutor/AddCourse2"

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
        <Route path="/add-course-2" element={<AddCourse2 /> } />

       



    </Routes>
)
}
 export default TutorRoutes