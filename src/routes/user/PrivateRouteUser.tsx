import React,{ReactNode} from "react";
import { Navigate } from "react-router-dom";
 import Cookies from "js-cookie";
interface privateRouteUserProps{
    children:ReactNode
}
const PrivateRouteUser:React.FC<privateRouteUserProps>=({children})=> {
    const user = Cookies.get('accessToken')

  return user? children:<Navigate to = "/login"/>
}

export default PrivateRouteUser
