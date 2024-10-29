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
    <Courses fetchUrl={courseEndpoints.fetchlatestCourse} title="Most Rated Courses" subTitle="See what students love the most"/>

  </div>
  )
}

export default UserLandingPage
