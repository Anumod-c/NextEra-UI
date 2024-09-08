import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { adminEndpoints } from '../../constraints/endpoints/adminEndpoints';


interface Tutor{
  name: string;
  email: string;
  phone: string;
  status: boolean;
}
const  TutorTable:React.FC=()=> {

  const [tutors,setTutors] = useState<Tutor[]>([]);


  useEffect(()=>{
    const fetchTutor = async ()=>{
      try{
        const response = await axios.get<Tutor[]>(adminEndpoints.getTutor);
        console.log(response.data,'response form fetching tutor');
        setTutors(response.data)
        
      }catch(err){
        console.error("Error fetching tutors",err)
      }
    }
    fetchTutor();
  },[])
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
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {tutors.map((tutor, index) => (
          <tr key={index} className="border-b">
            <td className="p-2">{tutor.name}</td>
            <td className="p-2">{tutor.email}</td>
            <td className="p-2">{tutor.phone}</td>
            <td className="p-2">{tutor.status ? 'Active' : 'Inactive'}</td>
            {/* Add more cells as needed */}
          </tr>
         ))}
      </tbody>
    </table>
  </div>
  )
}

export default TutorTable
