import React,{ReactNode} from "react";
import { Navigate } from "react-router-dom";
 import Cookies from "js-cookie";
interface privateRouteTutorProps{
    children:ReactNode
}
const PrivateRouteTutor:React.FC<privateRouteTutorProps>=({children})=> {
    const user = Cookies.get('tutorToken')

  return user? children:<Navigate to = "/tutor"/>
}

export default PrivateRouteTutor
