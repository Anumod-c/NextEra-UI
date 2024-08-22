import { Route, Routes } from "react-router-dom"
import UserHome from "../pages/user/UserHome"
import UserLogin from "../components/user/auth/UserLogin"
import UserForgotPass from "../components/user/auth/UserForgotPass"
import Userotp from "../components/user/auth/Userotp"
import UserRegister from "../components/user/auth/UserRegister"
import UserResetPass from "../components/user/auth/UserResetPass"
import UserProfile from "../pages/user/UserProfile"

const UserRoutes=()=>{
    return(
<Routes>
    <Route path="/" element={<UserHome/>}/>
    <Route path="/login" element={<UserLogin/>}/>
    <Route path='/forgotPassword' element={<UserForgotPass/>}/>
    <Route path='/otp' element={<Userotp/>}/>
    <Route path='/register' element={<UserRegister/>}/>
    <Route path='/resetPassword' element={<UserResetPass/>}/>
    <Route path='/profile' element={<UserProfile/>} />



</Routes>
    )
}
export default UserRoutes