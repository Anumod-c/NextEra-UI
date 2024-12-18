import React, { useEffect, useState } from "react";
import { adminEndpoints } from "../../constraints/endpoints/adminEndpoints";
import adminAxios from "../../constraints/axios/adminAxios";
import { Pagination } from "@mui/material";

interface Payouts {
  title: string;
  thumbnail: string;
  price: string;
  adminShare: string;
  tutorDetails: {
    tutorDetails: {
      name: string;
    };
  };
}

const Payouts: React.FC = () => {
  const [payouts, setPayouts] = useState<Payouts[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log("useeffect worked");
    const fetchPayouts = async (page = 1) => {
      try {
        console.log("lglglglggl");
        const response = await adminAxios.get(adminEndpoints.payouts, {
          params: { page, limit: 6 },
          withCredentials: true,
        });
        console.log(response.data, "hyhyhyhyhy");
        setPayouts(response.data.adminPayouts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Error in fetching course", error);
      }
    };
    fetchPayouts(currentPage);
  }, [currentPage]);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="p-4">
        <div className="flex justify-center  py -4 mb-4 ">
          <h2 className="text-2xl font-bold ">Your Earnings </h2>
        </div>
        <table className="w-full p-4 bg-white shadow-lg rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Tutor</th>
              <th className="p-2 text-left">SoldPrice</th>
              <th className="p-2 text-left">payouts</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">
                  <img
                    src={payout.thumbnail}
                    alt={payout.title}
                    className="w-24 h-16 object-cover"
                  />
                </td>
                <td>{payout.title}</td>
                <td>{payout.tutorDetails.tutorDetails.name || "NA"}</td>
                <td>{payout.price}</td>
                <td className=" text-green-600">+{payout.adminShare}</td>
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
