import TutorNavbar from "../../components/tutor/TutorNavbar"
import TutorProfile from "../../components/tutor/TutorProfile"
import TutorSidebar from "../../components/tutor/TutorSidebar"
import Footer from "./Footer"

const TutorProfilePage:React.FC=()=>{
  return (
    <>
      <TutorNavbar/>
      {/* <TutorHeader/> */}
      <div className="flex">
        <div className="flex p-4 ">
        <TutorSidebar/>

        </div>

        <div className="flex-grow mt-4 ">
        <TutorProfile/>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default TutorProfilePage
