import { Routes,Route } from "react-router-dom"
import AdminLogin from "../../components/admin/auth/AdminLogin"
import AdminDashboard from "../../pages/admin/AdminDashboard"
import PrivateRoute from "./privateRoute"
import PrivateRouteAdmin from "./privateRouteAdmin"

const AdminRoutes=()=>{
 return(
    <Routes>
       <Route path='/' element={<PrivateRoute><AdminLogin/></PrivateRoute>}/>
       <Route path='/dashboard' element={<PrivateRouteAdmin><AdminDashboard/></PrivateRouteAdmin>}/>

    </Routes>
 )
}
export default AdminRoutes