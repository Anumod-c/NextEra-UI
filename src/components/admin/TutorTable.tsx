import React, { useEffect, useState } from 'react';
import { adminEndpoints } from '../../constraints/endpoints/adminEndpoints';
import adminAxios from '../../constraints/axios/adminAxios';
import {Pagination} from '@mui/material';

interface Tutor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean; // Blocked/Unblocked
  isVerified: boolean; // Verified/Unverified
}

const TutorTable: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTutor = async (page = 1) => {
      try {
        const response = await adminAxios.get(adminEndpoints.getTutor,{
          params: {  page, limit: 6 },
          withCredentials: true,
        });
        console.log(response.data, 'response from fetching tutor');
        setTutors(response.data.tutorData);
        setTotalPages(response.data.totalPages);

      } catch (err) {
        console.error('Error fetching tutors', err);
      }
    };
    fetchTutor(currentPage);
  }, [currentPage]);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  const handleBlockToggle = async (tutorId: string, currentStatus: boolean) => {
    try {
      await adminAxios.patch(adminEndpoints.changeTutorStatus(tutorId), { status: !currentStatus });
      setTutors(prevTutors =>
        prevTutors.map(tutor =>
          tutor._id === tutorId ? { ...tutor, status: !currentStatus } : tutor
        )
      );
    } catch (error) {
      console.log('Error in blocking/unblocking the user', error);
    }
  };

  const handleVerificationToggle = async (tutorId: string, currentVerification: boolean) => {
    try {
      await adminAxios.patch(adminEndpoints.changeTutorVerification(tutorId), { isVerified: !currentVerification });
      setTutors(prevTutors =>
        prevTutors.map(tutor =>
          tutor._id === tutorId ? { ...tutor, isVerified: !currentVerification } : tutor
        )
      );
    } catch (error) {
      console.log('Error in verifying/unverifying the tutor', error);
    }
  };
 
  return (
    <>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="w-full bg-white shadow-lg rounded-lg table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Verification</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor) => (
            <tr key={tutor._id} className="border-b">
              <td className="p-2">{tutor.name}</td>
              <td className="p-2">{tutor.email}</td>
              <td className="p-2">{tutor.phone}</td>
              <td className="p-2">
                <button
                  className={`p-2  text-white rounded ${
                    tutor.status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                  onClick={() => handleBlockToggle(tutor._id, tutor.status)}
                >
                  {tutor.status ? 'Block' : 'Unblock'}
                </button>
              </td>
              <td className="p-2">
                <button
                  className={`  p-2  text-white rounded ${
                    tutor.isVerified ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                  onClick={() => handleVerificationToggle(tutor._id, tutor.isVerified)}
                >
                  {tutor.isVerified ? 'Verified' : 'Pending'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
          <div className='w-full flex justify-center items-center p-2 m-2 '>
          <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
          color="primary"
        />
        </div>
    </>
  );
};

export default TutorTable;
