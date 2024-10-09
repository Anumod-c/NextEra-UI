import React from 'react';
import UserNavbar from '../../components/user/UserNavbar';
import Profile from '../../components/user/profile/Profile';
import profileImage from '../../assets/profile.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ProfileDetails from '../../components/user/profile/ProfileDetails';
import { courseEndpoints } from '../../constraints/endpoints/courseEndpoints';
import MyCourses from '../../components/user/MyCourses';
const UserProfile: React.FC = () => {
  const {id,email,name,phone,bio,age,facebook,instagram,linkedin,twitter, profilePicture,purchasedCourses} = useSelector((state:RootState)=>state.user)
  return (

    <>
      <UserNavbar />
      <Profile name={name} profilePicture={profilePicture||profileImage}  coursesEnrolled={purchasedCourses||[]} id={id}/>

      <ProfileDetails  name={name} email={email} age={age} bio={bio}  phone={phone} facebook={facebook} linkedin={linkedin} instagram={instagram} twitter={twitter}/>
      {/* Ongoing Courses Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <MyCourses fetchUrl={courseEndpoints.fetchMyCourses} title="My Courses" subTitle="Courses brought by me" purchasedCourses={purchasedCourses||[]}  />
        </div>
    </>

  );
};

export default UserProfile;
