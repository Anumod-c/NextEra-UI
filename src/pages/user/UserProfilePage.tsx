import React from 'react';
import UserNavbar from '../../components/user/UserNavbar';
import Profile from '../../components/user/profile/Profile';
import profileImage from '../../assets/profile.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ProfileDetails from '../../components/user/profile/ProfileDetails';
const UserProfile: React.FC = () => {
  const {id,email,name,phone,bio,age,facebook,instagram,linkedin,twitter, profilePicture,coursesEnrolled} = useSelector((state:RootState)=>state.user)
  return (

    <>
      <UserNavbar />
      <Profile name={name} profilePicture={profilePicture||profileImage}  coursesEnrolled={coursesEnrolled||[]} id={id}/>

      <ProfileDetails  name={name} email={email} age={age} bio={bio}  phone={phone} facebook={facebook} linkedin={linkedin} instagram={instagram} twitter={twitter}/>

    </>

  );
};

export default UserProfile;
