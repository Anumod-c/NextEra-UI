import  { Suspense, lazy } from "react";
import { courseEndpoints } from "../../constraints/endpoints/courseEndpoints";
import Spinner from "../../components/user/Spinner";
const UserNavbar = lazy(() => import("../../components/user/UserNavbar"));
const Banner = lazy(() => import("../../components/user/Banner"));
const Courses = lazy(() => import("../../components/user/Courses"));
const Footer = lazy(() => import("../tutor/Footer"));
function UserHome() {
  return (
    <Suspense fallback={<Spinner/>}>
    <div>
      <UserNavbar />
      <Banner/>
      <Courses fetchUrl={courseEndpoints.mostRatedCourse} title="Most Rated Courses" subTitle="See what students love the most"/>
      <Courses
        fetchUrl={courseEndpoints.fetchlatestCourse}
        title="Latest Courses"
        subTitle="Check out the newest additions"
      />
       <Courses
        fetchUrl={courseEndpoints.mostPurchasedCourse}
        title="Most purhcased Courses"
        subTitle="Discover the most popular courses among students"
      />
      <Footer/>
    </div>
    </Suspense>
  );
}

export default UserHome;
