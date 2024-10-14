import React, { useState } from 'react'
import UserNavbar from '../../../components/user/UserNavbar'
import Courses from '../../../components/user/Courses'
import { courseEndpoints } from '../../../constraints/endpoints/courseEndpoints'
const AllCoursePage:React.FC=()=> {

  const [searchQuery,setSearchQuery]= useState<string>("");
  const handleSearch =(query:string)=>{
    setSearchQuery(query);//set the search qyuery
  }
  return (
    <div>
      <UserNavbar onSearch={handleSearch} showSearch={true}/>
      <Courses fetchUrl={courseEndpoints.fetchAllCourse}title={"All Courses"} subTitle={"Browse through all available courses"} searchQuery={searchQuery}/>
    </div>
  )
}

export default AllCoursePage
