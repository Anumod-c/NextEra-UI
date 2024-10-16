import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminBarGraph from '../../components/admin/AdminBarGraph';
import UserTable from '../../components/admin/UserTable';
import TutorTable from '../../components/admin/TutorTable';
import CourseTable from '../../components/admin/CourseTable';
import Payouts from '../../components/admin/Payouts';
import AdminDonutGraph from '../../components/admin/AdminDonutGraph';
import { adminEndpoints } from "../../constraints/endpoints/adminEndpoints";
import adminAxios from "../../constraints/axios/adminAxios";

export interface IPayout {
  totalPayout: number;  // The total payout for a given period
  _id: number;          // A unique identifier for each payout record
}

const AdminDashboard: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalInstructors, setTotalInstructors] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);

  const [payouts, setPayouts] = useState<number[]>([]); // Payouts for each period
  const [labels, setLabels] = useState<string[]>([]); // Corresponding labels for the periods
  // const [totalLiveCourses, setTotalLiveCourses] = useState<number>(0);
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [studentsResponse, instructorsResponse, coursesResponse] = await Promise.all([
          adminAxios.get<number>(adminEndpoints.getStudentsCount),
          adminAxios.get<number>(adminEndpoints.getInstructorsCount),
          adminAxios.get<number>(adminEndpoints.getTotalCourses),
        ]);

        setTotalStudents(studentsResponse.data);
        setTotalInstructors(instructorsResponse.data);
        setTotalCourses(coursesResponse.data);
        // setTotalLiveCourses(liveCoursesResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchHeaderData();
  }, []);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await adminAxios.get('/payoutsByMonth');
        const payoutsData = response.data;
        console.log(payoutsData)
        const monthLabels = payoutsData.map((item: IPayout) => {
          switch (item._id) {
            case 1: return 'January';
            case 2: return 'February';
            case 3: return 'March';
            case 4: return 'April';
            case 5: return 'May';
            case 6: return 'June';
            case 7: return 'July';
            case 8: return 'August';
            case 9: return 'September';
            case 10: return 'October';
            case 11: return 'November';
            case 12: return 'December';
            default: return 'Unknown';
          }
        });
        const totalPayouts = payoutsData.map((item: IPayout) => item.totalPayout);
        setLabels(monthLabels)
        setPayouts(totalPayouts)
      } catch (error) {
        console.error("Error fetching payouts data.", error)
      }
    }
    fetchPayouts();
  }, [])


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashbaord':
        return <AdminDashboard />;
      case 'users':
        return <UserTable />;
      case 'tutors':
        return <TutorTable />;
      case 'courses':
        return <CourseTable />;
      case 'payouts':
        return <Payouts />
      default:
        return (
          <>
            <div className="flex justify-center text-3xl font-semibold m-4 p-4">
              Sales report
            </div>
            <div className="flex-grow bg-white mt-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div className="flex items-center justify-center shadow-lg rounded-lg p-4">
                  <AdminBarGraph  labels={labels} payouts={payouts} />
                </div>
                <div className="flex items-center justify-center shadow-lg bg-white rounded-lg p-4">
                  <AdminDonutGraph totalStudents={totalStudents}
                    totalInstructors={totalInstructors}
                    totalCourses={totalCourses} />
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        {/* Navbar */}
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <AdminHeader
          totalStudents={totalStudents}
          totalInstructors={totalInstructors}
          totalCourses={totalCourses}
        // totalLiveCourses={totalLiveCourses}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
