import React,{ReactNode} from 'react';
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps{
  children:ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps>=({children})=> {
const user = Cookies.get('userToken')

  return  user? <Navigate to='/home'/>:<>{children}</>
}
export default PrivateRoute;
