import { Routes,Route } from "react-router-dom"
import AdminLogin from "../components/admin/auth/AdminLogin"
import AdminDashboard from "../pages/admin/AdminDashboard"

const AdminRoutes=()=>{
 return(
    <Routes>
       <Route path='/' element={<AdminLogin/>}/>
       <Route path='/dashboard' element={<AdminDashboard/>}/>

    </Routes>
 )
}
export default AdminRoutes