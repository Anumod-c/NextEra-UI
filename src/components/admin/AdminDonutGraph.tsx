import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
interface BarGraphProps {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
}
const AdminDonutGraph: React.FC<BarGraphProps> = ({
  totalCourses,
  totalInstructors,
  totalStudents,
}) => {
  const data = {
    labels: ["Tutors", "Users", "Courses"],
    datasets: [
      {
        label: "Total Count",
        data: [totalInstructors, totalStudents, totalCourses],
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Admin Dashboard Donut Chart",
      },
    },
    cutout: "50%",
  };

  return (
    <div className="flex justify-center" style={{ width: "100%", height: "360px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AdminDonutGraph;
