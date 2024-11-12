import React, { useEffect, useState } from 'react';
import { adminEndpoints } from '../../constraints/endpoints/adminEndpoints';
import adminAxios from '../../constraints/axios/adminAxios';
import {Pagination} from '@mui/material';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async (page = 1) => {
      setLoading(true);
      try {
        const response = await adminAxios.get(adminEndpoints.getUser,{
          params: {  page, limit: 6 },
          withCredentials: true,
        });
        console.log(response.data, 'fetched users');
        setUsers(response.data.userData);
        setTotalPages(response.data.totalPages);

      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers(currentPage);
  },[currentPage]);

  const handleBlockToggle = async (userId: string, currentStatus: boolean) => {
    try {
      // Call the API to change user status (block/unblock)
      await adminAxios.patch(adminEndpoints.changeStatus(userId), { status: !currentStatus });

      // Update the user list after toggling the status
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, status: !currentStatus } : user
        )
      );
    } catch (error) {
      console.log('Error in blocking/unblocking the user', error);
    }
  };
 
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
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
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.phone}</td>
              <td className="p-2">
                <button
                  className={`px-4 py-2 text-white rounded ${
                    user.status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                  onClick={() => handleBlockToggle(user._id, user.status)}
                >
                  {user.status ? 'Block' : 'Unblock'}
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
        />  </div>
    </>
  );
};

export default UsersTable;
