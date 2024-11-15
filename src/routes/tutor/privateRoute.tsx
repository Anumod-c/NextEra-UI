import React,{ReactNode} from "react";

import Cookies from "js-cookie";

import { Navigate } from "react-router-dom";

interface PrivateTutorRouteProps{
    children:ReactNode
}

const PrivateTutorRoute:React.FC<PrivateTutorRouteProps>=({children})=>{
    const tutor = Cookies.get('tutorToken')
    const tutorRefreshToken = Cookies.get('tutorRefreshToken')

    return tutor||tutorRefreshToken? <Navigate to='/tutor/dashboard'/>:<>{children}</>
}

export default PrivateTutorRoute;