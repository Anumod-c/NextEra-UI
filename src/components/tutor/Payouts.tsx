import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
import tutorAxios from "../../constraints/axios/tutorAxios";

interface Payouts {
  title: string;
  thumbnail: string;
  price: string;
  tutorShare: string;
}

const Payouts: React.FC = () => {
  const [payouts, setPayouts] = useState<Payouts[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tutorId = useSelector((state: RootState) => state.tutor.id);
  useEffect(() => {
    console.log("useeffect worked");
    const fetchPayouts = async (page = 1) => {
      try {
        const response = await tutorAxios.get(tutorEndpoints.payouts, {
          params: { tutorId, page, limit: 6 },
          withCredentials: true,
        });
        console.log(response.data);
        if (response.data.success) {
          setPayouts(response.data.tutorPayouts);
          setTotalPages(response.data.totalPages);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Error in fetching course", error);
      }
    };
    if (tutorId) {
      console.log("tutorId is present", tutorId);
      fetchPayouts(currentPage);
    }
  }, [tutorId, currentPage]);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="px-2">
        <div className="flex justify-center">
          <h2 className="text-2xl mb-4 font-bold ">Your Earnings </h2>
        </div>
        <table className="w-full p-4 bg-white shadow-lg rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">payouts</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <img
                    src={payout.thumbnail}
                    alt={payout.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2">{payout.title}</td>
                <td className="p-2">{payout.price}</td>
                <td className="p-2 text-green-600">+{payout.tutorShare}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center items-center p-2 m-2 ">
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

export default Payouts;
