import React, { useState, useEffect } from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminBarGraph from '../../components/admin/AdminBarGraph';
import AdminPieGraph from '../../components/admin/AdminPieGraph';
import UserTable from '../../components/admin/UserTable';
import TutorTable from '../../components/admin/TutorTable';
import CourseTable from '../../components/admin/CourseTable';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('dashboard');
  // const [totalStudents, setTotalStudents] = useState<number>(0);
  // const [totalInstructors, setTotalInstructors] = useState<number>(0);
  // const [totalCourses, setTotalCourses] = useState<number>(0);
  // const [totalLiveCourses, setTotalLiveCourses] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const [studentsResponse] = await Promise.all([
  //         axios.get<number>(adminEndpoints.getTotalStudents),
  //         // axios.get<number>(adminEndpoints.getTotalInstructors),
  //         // axios.get<number>(adminEndpoints.getTotalCourses),
  //         // axios.get<number>(adminEndpoints.getTotalLiveCourses),
  //       ]);

  //       setTotalStudents(studentsResponse.data);
  //       // setTotalInstructors(instructorsResponse.data);
  //       // setTotalCourses(coursesResponse.data);
  //       // setTotalLiveCourses(liveCoursesResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'users':
        return <UserTable />;
      case 'tutors':
        return <TutorTable />;
      case 'courses':
        return <CourseTable />;
      default:
        return (
          <>
            <div className="flex justify-center text-3xl font-semibold m-4 p-4">
              Sales report
            </div>
            <div className="flex-grow bg-white mt-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
                <div className="bg-slate-100 shadow-lg flex items-center rounded-lg">
                  <AdminBarGraph />
                </div>
                <div className="bg-slate-100 flex items-center shadow-lg rounded-lg">
                  <AdminPieGraph />
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
      <AdminSideBar isSidebarOpen={isSidebarOpen}  toggleSidebar={toggleSidebar} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        {/* Navbar */}
        <AdminNavbar  toggleSidebar={toggleSidebar}/>
        <AdminHeader
          // totalStudents={totalStudents}
          // totalInstructors={totalInstructors}
          // totalCourses={totalCourses}
          // totalLiveCourses={totalLiveCourses}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
