import Banner from "../../components/user/Banner";
import Courses from "../../components/user/Courses";
import UserNavbar from "../../components/user/UserNavbar";

import { courseEndpoints } from "../../constraints/endpoints/courseEndpoints";
function UserHome() {
  return (
    <div>
      <UserNavbar />
      <Banner/>
      <Courses fetchUrl={courseEndpoints.mostRatedCourse} title="Most Rated Courses" subTitle="See what students love the most"/>
      <Courses
        fetchUrl={courseEndpoints.fetchlatestCourse}
        title="Latest Courses"
        subTitle="Check out the newest additions"
        
      />
    </div>
  );
}

export default UserHome;
