import { Route, Routes } from "react-router-dom"
import UserLogin from "../../components/user/auth/UserLogin"
import UserForgotPass from "../../components/user/auth/UserForgotPass"
import Userotp from "../../components/user/auth/Userotp"
import UserRegister from "../../components/user/auth/UserRegister"
import UserResetPass from "../../components/user/auth/UserResetPass"
import UserProfile from "../../pages/user/UserProfilePage"
import UserLandingPage from "../../pages/user/UserLandingPage"
import UserHome from "../../pages/user/UserHome"
import PrivateRoute from "./PrivateRoute"
import PrivateRouteUser from "./PrivateRouteUser"
import UserTutorSelection from "../../components/user/UserTutorSelection"
import SingleCoursePage from "../../pages/user/SingleCoursePage.tsx/SingleCoursePage"
import SuccessPage from "../../components/user/SuccessPage"
import AllCoursePage from "../../pages/user/Courses/AllCoursePage"
import EditProfile from "../../components/user/profile/EditProfile"
import ChatLayout from "../../pages/user/ChatLayout"
import QuizPage from "../../components/user/PurchasedSingleCourse.tsx/QuizPage"

const UserRoutes:React.FC=()=>{
    return(
<Routes>
<Route path="/" element={<UserLandingPage/>}/>
 
<Route path="/courses/:courseId" element={<SingleCoursePage/>}/>
<Route path="/UserTutorSelection" element={<UserTutorSelection/>}/>


    <Route path="/home" element={<PrivateRouteUser><UserHome/></PrivateRouteUser>}/>
    <Route path='/allCourse' element={<AllCoursePage/>} />

    <Route path="/login" element={ <PrivateRoute><UserLogin/></PrivateRoute> }/>
    <Route path='/forgotPassword' element={<PrivateRoute><UserForgotPass/></PrivateRoute>}/>
    <Route path='/otp' element={ <PrivateRoute><Userotp/></PrivateRoute>}/>
    <Route path='/register' element={<PrivateRoute><UserRegister/></PrivateRoute>}/>
    <Route path='/resetPassword' element={<PrivateRoute><UserResetPass/></PrivateRoute>}/>
    <Route path='/profile' element={<PrivateRouteUser><UserProfile/></PrivateRouteUser>} />
    <Route path='/success' element={<PrivateRouteUser><SuccessPage/></PrivateRouteUser>} />
    <Route path='/editProfile' element={<PrivateRouteUser><EditProfile/></PrivateRouteUser>} />
    <Route path='/discussion' element={<PrivateRouteUser><ChatLayout/></PrivateRouteUser>} />
    <Route path='/quiz' element={<PrivateRouteUser><QuizPage/></PrivateRouteUser>} />
    


</Routes>
    )
}
export default UserRoutes