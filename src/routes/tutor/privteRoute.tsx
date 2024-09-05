import React,{ReactNode} from "react";

import Cookies from "js-cookie";

import { Navigate } from "react-router-dom";

interface PrivateTutorRouteProps{
    children:ReactNode
}

const PrivateTutorRoute:React.FC<PrivateTutorRouteProps>=({children})=>{
    const tutor = Cookies.get('accessToken')
    return tutor? <Navigate to='/tutor/dashboard'/>:<>{children}</>
}

export default PrivateTutorRoute;