import React from 'react'
import Hero from '../../components/user/Hero'
import Features from '../../components/user/Features'
import About from '../../components/user/About'
import Courses from '../../components/user/Courses'
import { courseEndpoints } from '../../constraints/endpoints/courseEndpoints'
function UserLandingPage() {
    // const navigate = useNavigate()

    
  return (

    <div>
    <Hero />
    <Features />
    <About />
    <Courses fetchUrl={courseEndpoints.fetchAllCourse} title="Most Rated Courses" subTitle="See what students love the most"/>

  </div>
    // <div className='flex  justify-center '>
        
    //     <div className=' m-4 p-4'>
    //     <button className='border bg-green-500' onClick={()=>navigate('/login')}>user</button>

    //     </div>
    //     <div className='m-4 p-4'>
    //     <button className='border bg-blue-500' onClick={()=>navigate('/tutor')}>Tutor</button>
    //     </div>

        
      
    // </div>
  )
}

export default UserLandingPage
