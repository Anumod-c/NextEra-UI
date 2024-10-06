import React,{ReactNode} from "react";
import { Navigate } from "react-router-dom";
 import Cookies from "js-cookie";
interface privateRouteAdminProps{
    children:ReactNode
}
const PrivateRouteAdmin:React.FC<privateRouteAdminProps>=({children})=> {
    const admin = Cookies.get('adminToken')

  return admin? children:<Navigate to = "/admin"/>
}

export default PrivateRouteAdmin
