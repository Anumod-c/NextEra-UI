import Hero from '../../components/user/Hero'
import About from '../../components/user/About'
import Courses from '../../components/user/Courses'
import { courseEndpoints } from '../../constraints/endpoints/courseEndpoints'
import FAQ from '../../components/user/FAQ'
import Footer from '../tutor/Footer'
function UserLandingPage() {  
  return (
    <div className="overflow-hidden">
    <Hero />
    <About />
    <Courses fetchUrl={courseEndpoints.mostRatedCourse} title="Most Rated Courses" subTitle="See what students love the most"/>
    <FAQ/>
    <Footer/>
  </div>
  )
}

export default UserLandingPage
