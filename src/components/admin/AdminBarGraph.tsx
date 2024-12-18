import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AdminBarGraphProps {
  labels: string[];
  payouts: number[];
}
const AdminBarGraph: React.FC<AdminBarGraphProps> = ({ labels, payouts }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Payouts by Month",
        data: payouts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Light Red
          "rgba(54, 162, 235, 0.2)", // Light Blue
          "rgba(255, 206, 86, 0.2)", // Light Yellow
          "rgba(75, 192, 192, 0.2)", // Light Teal
          "rgba(153, 102, 255, 0.2)", // Light Purple
          "rgba(255, 159, 64, 0.2)", // Light Orange
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(255, 206, 86, 1)", // Yellow
          "rgba(75, 192, 192, 1)", // Teal
          "rgba(153, 102, 255, 1)", // Purple
          "rgba(255, 159, 64, 1)", // Orange
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.4)", // Darker Light Red on hover
          "rgba(54, 162, 235, 0.4)", // Darker Light Blue on hover
          "rgba(255, 206, 86, 0.4)", // Darker Light Yellow on hover
          "rgba(75, 192, 192, 0.4)", // Darker Light Teal on hover
          "rgba(153, 102, 255, 0.4)", // Darker Light Purple on hover
          "rgba(255, 159, 64, 0.4)", // Darker Light Orange on hover
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Admin Dashboard Statistics",
      },
    },
  };

  return (
    <div className="flex justify-center items-center" style={{ width: "100%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AdminBarGraph;
