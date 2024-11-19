import CourseList from '../../components/tutor/CourseList'
import TutorHeader from '../../components/tutor/TutorHeader'
import TutorNavbar from '../../components/tutor/TutorNavbar'
import TutorSidebar from '../../components/tutor/TutorSidebar'
import Footer from './Footer'

function CourseListPage() {
  return (
    <div >
    <TutorNavbar />
    <TutorHeader />
    <div className="flex mt-4 pt-4">
      <TutorSidebar  />
      <div className="flex-grow bg-white-100 mt-4 p-4">
        <CourseList/>
      </div>
    </div>
    <Footer />
  </div>
  )
}
export default CourseListPage
