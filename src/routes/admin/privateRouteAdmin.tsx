import React,{ReactNode} from "react";
import { Navigate } from "react-router-dom";
 import Cookies from "js-cookie";
interface privateRouteAdminProps{
    children:ReactNode
}
const PrivateRouteAdmin:React.FC<privateRouteAdminProps>=({children})=> {
    const admin = Cookies.get('adminToken');
  const adminRefreshToken =  Cookies.get('adminRefreshToken');
   return admin || adminRefreshToken ? children : <Navigate to="/admin" />;
}

export default PrivateRouteAdmin
