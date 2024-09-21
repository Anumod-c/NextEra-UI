import CourseDetails from "../../components/tutor/CourseDetails"
import TutorNavbar from "../../components/tutor/TutorNavbar"
import TutorSidebar from "../../components/tutor/TutorSidebar"
import Footer from "./Footer"

function CourseDetailsPage() {
  return (
    <div>
      <TutorNavbar />
      <div className="flex mt-4 pt-4">
      <TutorSidebar  />
      <div className="flex-grow bg-white-100 mt-4 p-4">
        <CourseDetails/>
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default CourseDetailsPage
