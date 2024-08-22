import { Routes,Route } from "react-router-dom"
import AdminLogin from "../components/admin/auth/AdminLogin"
import AdminDashboard from "../pages/admin/AdminDashboard"
import UsersPage from "../pages/admin/UsersPage"
import TutorPage from "../pages/admin/TutorPage"

const AdminRoutes=()=>{
 return(
    <Routes>
       <Route path='/' element={<AdminLogin/>}/>
       <Route path='/dashboard' element={<AdminDashboard/>}/>
       <Route path="/userlist" element={<UsersPage/>}/>
       <Route path="/tutorlist" element={<TutorPage/>}/>

    </Routes>
 )
}
export default AdminRoutes