import { Route, Routes } from "react-router-dom"
import UserLogin from "../../components/user/auth/UserLogin"
import UserForgotPass from "../../components/user/auth/UserForgotPass"
import Userotp from "../../components/user/auth/Userotp"
import UserRegister from "../../components/user/auth/UserRegister"
import UserResetPass from "../../components/user/auth/UserResetPass"
import UserProfile from "../../pages/user/UserProfile"
import UserLandingPage from "../../pages/user/UserLandingPage"
import UserHome from "../../pages/user/UserHome"
import PrivateRoute from "./PrivateRoute"
import PrivateRouteUser from "./PrivateRouteUser"
import UserTutorSelection from "../../components/user/UserTutorSelection"
import SingleCoursePage from "../../pages/user/SingleCoursePage.tsx/SingleCoursePage"

const UserRoutes:React.FC=()=>{
    return(
<Routes>
<Route path="/" element={<SingleCoursePage/>}/>
<Route path="/UserTutorSelection" element={<UserTutorSelection/>}/>


    <Route path="/home" element={<PrivateRouteUser><UserHome/></PrivateRouteUser>}/>
    <Route path="/login" element={ <PrivateRoute><UserLogin/></PrivateRoute> }/>
    <Route path='/forgotPassword' element={<PrivateRoute><UserForgotPass/></PrivateRoute>}/>
    <Route path='/otp' element={ <Userotp/>}/>
    <Route path='/register' element={<PrivateRoute><UserRegister/></PrivateRoute>}/>
    <Route path='/resetPassword' element={<PrivateRoute><UserResetPass/></PrivateRoute>}/>
    <Route path='/profile' element={<PrivateRouteUser><UserProfile/></PrivateRouteUser>} />
    UserTutorSelection


</Routes>
    )
}
export default UserRoutes