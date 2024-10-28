import TutorNavbar from "../../components/tutor/TutorNavbar";
import TutorProfile from "../../components/tutor/TutorProfile";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import Footer from "./Footer";

const TutorProfilePage: React.FC = () => {
  return (
    <>
      <TutorNavbar />
      <div className="flex">
        {/* Sidebar with fixed position on the left */}
        <div className="w-64  sticky top-20 self-start">
          <TutorSidebar />
        </div>
        
        {/* Main content with left margin to avoid overlap */}
        <div className="flex-grow ml-4  p-4 mt-4">
          <TutorProfile />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorProfilePage;
