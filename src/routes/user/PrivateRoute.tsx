import React,{ReactNode} from 'react';
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps{
  children:ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps>=({children})=> {
const user = Cookies.get('userToken')
const userRefreshToken = Cookies.get('userRefreshToken')
  return  user||userRefreshToken? <Navigate to='/home'/>:<>{children}</>
}
export default PrivateRoute;
