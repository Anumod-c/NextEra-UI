import React from 'react';
import TutorNavbar from '../../components/tutor/TutorNavbar';
import TutorSidebar from '../../components/tutor/TutorSidebar';
import TutorHeader from '../../components/tutor/TutorHeader';
import TutorBarGraph from '../../components/tutor/TutorBarGraph';
import TutorPieGraph from '../../components/tutor/TutorPieGraph';
import Footer from './Footer';

function TutorDashboard() {
  return (
    <div >
      <TutorNavbar />
      <TutorHeader />
      <div className="flex mt-4 pt-4">
        <TutorSidebar  />
        <div className="flex-grow bg-white-100 mt-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2  p-4 gap-4">
            <div className="bg-white shadow-lg flex items-center  rounded-lg ">
              <TutorBarGraph />
            </div>
            <div className="bg-white flex items-center shadow-lg   rounded-lg ">
              <TutorPieGraph />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TutorDashboard;
