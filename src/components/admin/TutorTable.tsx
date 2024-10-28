import React, { useEffect, useState } from 'react';
import { adminEndpoints } from '../../constraints/endpoints/adminEndpoints';
import adminAxios from '../../constraints/axios/adminAxios';

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

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await adminAxios.get<Tutor[]>(adminEndpoints.getTutor);
        console.log(response.data, 'response from fetching tutor');
        setTutors(response.data);
      } catch (err) {
        console.error('Error fetching tutors', err);
      }
    };
    fetchTutor();
  }, []);

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
  );
};

export default TutorTable;
