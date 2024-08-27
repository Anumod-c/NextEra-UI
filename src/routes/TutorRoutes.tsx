import { Navigate, Route, Routes } from "react-router-dom"
import TutorLogin from "../components/tutor/auth/TutorLogin"
import TutorDashboard from "../pages/tutor/TutorDashboard"
import TutorRegister from "../components/tutor/auth/TutorRegister"
import TutorForgotPass from "../components/tutor/auth/TutorForgotPass"
import TutorOTP from "../components/tutor/auth/TutorOTP"
import TutorResetPass from "../components/tutor/auth/TutorResetPass"
import TutorProfile from "../components/tutor/TutorProfile"

const TutorRoutes=()=>{
    const token = localStorage.getItem('tutorToken');
return(
    <Routes>
        <Route path="/" element={<TutorLogin/>}/>
        <Route path="/dashboard" element={token? <TutorDashboard /> : <Navigate to="/tutor" />} />
        <Route path="/register" element={<TutorRegister/>}/>
        <Route path="/forgotPassword" element={<TutorForgotPass/>}/>
        <Route path="/otp" element={<TutorOTP/>}/>
        <Route path="/resetpassword" element={<TutorResetPass/>}/>
        <Route path="/profile" element={token ? <TutorProfile /> : <Navigate to="/tutor" />} />




    </Routes>
)
}
 export default TutorRoutes