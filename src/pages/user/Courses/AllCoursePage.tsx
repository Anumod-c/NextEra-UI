import React from 'react'
import UserNavbar from '../../../components/user/UserNavbar'
import Courses from '../../../components/user/Courses'
import { courseEndpoints } from '../../../constraints/endpoints/courseEndpoints'
const AllCoursePage:React.FC=()=> {
  return (
    <div>
      <UserNavbar/>
      <Courses fetchUrl={courseEndpoints.fetchAllCourse}title={"All Courses"} subTitle={"Browse through all available courses"}/>
    </div>
  )
}

export default AllCoursePage
