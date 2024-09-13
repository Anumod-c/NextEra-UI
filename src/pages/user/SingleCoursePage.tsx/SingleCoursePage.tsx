import ContentSection from '../../../components/user/singleCourse/ContentSection'
import { PayementSection } from '../../../components/user/singleCourse/PayementSection'
import UserNavbar from '../../../components/user/UserNavbar'

function SingleCoursePage() {
  return (
    <>
    <UserNavbar/>
    <div className='grid grid-cols-3'>
      <ContentSection/>
      <PayementSection/>
    </div>
    </>
    
  )
}

export default SingleCoursePage
