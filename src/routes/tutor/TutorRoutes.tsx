import { Route, Routes } from "react-router-dom"
import TutorLogin from "../../components/tutor/auth/TutorLogin"
import TutorDashboard from "../../pages/tutor/TutorDashboard"
import TutorRegister from "../../components/tutor/auth/TutorRegister"
import TutorForgotPass from "../../components/tutor/auth/TutorForgotPass"
import TutorOTP from "../../components/tutor/auth/TutorOTP"
import TutorResetPass from "../../components/tutor/auth/TutorResetPass"
import Course from "../../pages/tutor/Course"
import CourseListPage from "../../pages/tutor/CourseListPage"
import CourseDetailsPage from "../../pages/tutor/CourseDetailsPage"
import PayoutListPage from "../../pages/tutor/PayoutListPage"
import PrivateRoute from "./privateRoute"
import PrivateRouteTutor from "./PrivateRouteTutor"
import TutorAdditionalInfo from "../../components/tutor/auth/TutorAdditionalInfo "
import TutorProfilePage from "../../pages/tutor/TutorProfilePage"
import EditProfile from "../../components/tutor/EditProfile"

const TutorRoutes=()=>{
return(
    <Routes>
        <Route path="/" element={<PrivateRoute><TutorLogin/></PrivateRoute>}/>
        <Route path="/dashboard" element={ <PrivateRouteTutor><TutorDashboard /></PrivateRouteTutor>} />
        <Route path="/register" element={<PrivateRoute><TutorRegister/></PrivateRoute>}/>
        <Route path="/forgotPassword" element={<PrivateRoute><TutorForgotPass/></PrivateRoute>}/>
        <Route path="/otp" element={<PrivateRoute><TutorOTP/></PrivateRoute>}/>
        <Route path="/resetpassword" element={<PrivateRoute><TutorResetPass/></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRouteTutor><TutorProfilePage /></PrivateRouteTutor> } />
        <Route path="/edit-profile" element={<PrivateRouteTutor><EditProfile /></PrivateRouteTutor> } />
        
        <Route path="/addcourse" element={<Course /> } />
        <Route  path="/courselist" element={<PrivateRouteTutor><CourseListPage /></PrivateRouteTutor> }/>
        <Route  path="/courses-details/:courseId" element={<PrivateRouteTutor><CourseDetailsPage /></PrivateRouteTutor> }/>
        <Route  path="/payouts" element={<PrivateRouteTutor><PayoutListPage/></PrivateRouteTutor> }/>
        <Route  path="/additionalInfo" element={<TutorAdditionalInfo/>}/>

        



    </Routes>
)
}
 export default TutorRoutes