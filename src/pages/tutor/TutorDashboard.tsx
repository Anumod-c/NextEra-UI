import TutorNavbar from "../../components/tutor/TutorNavbar";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import TutorHeader from "../../components/tutor/TutorHeader";
import TutorBarGraph from "../../components/tutor/TutorBarGraph";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import axios from "axios";

export interface IPayout {
  totalPayout: number; // The total payout for a given period
  _id: number; // A unique identifier for each payout record
}
function TutorDashboard() {
  const tutorId = useSelector((state: RootState) => state.tutor.id);
  const [payouts, setPayouts] = useState<number[]>([]); // Payouts for each period
  const [labels, setLabels] = useState<string[]>([]); // Corresponding labels for the periods

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await axios.get(tutorEndpoints.tutorPayoutsByMonth, {
          params: tutorId,
          withCredentials:true
        },);
        const payoutsData = response.data;
        console.log(payoutsData,'payout data');
        const monthLabels = payoutsData.map((item: IPayout) => {
          switch (item._id) {
            case 1:
              return "January";
            case 2:
              return "February";
            case 3:
              return "March";
            case 4:
              return "April";
            case 5:
              return "May";
            case 6:
              return "June";
            case 7:
              return "July";
            case 8:
              return "August";
            case 9:
              return "September";
            case 10:
              return "October";
            case 11:
              return "November";
            case 12:
              return "December";
            default:
              return "Unknown";
          }
        });
        const totalPayouts = payoutsData.map(
          (item: IPayout) => item.totalPayout
        );
        setLabels(monthLabels);
        setPayouts(totalPayouts);
      } catch (error) {
        console.error("Error fetching payouts data.", error);
      }
    };
    fetchPayouts();
  }, [tutorId]);
  return (
    <div>
      <TutorNavbar />
      <TutorHeader />
      <div className="flex mt-4 pt-4">
        <TutorSidebar />
        <div className="flex-grow bg-white-100 mt-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2  p-4 gap-4">
            <div className="bg-white shadow-lg flex items-center  rounded-lg ">
              <TutorBarGraph labels={labels} payouts={payouts} />
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TutorDashboard;
