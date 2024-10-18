import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
interface BarGraphProps{
  totalStudents : number;
  totalInstructors : number;
  totalCourses : number;
}
const AdminDonutGraph: React.FC<BarGraphProps>= ({totalCourses,totalInstructors,totalStudents}) => {
  // Data for the donut chart
  const data = {
    labels: ['Tutors', 'Users', 'Courses'],
    datasets: [
      {
        label: 'Total Count',
        data: [totalInstructors,totalStudents,totalCourses], // Example data: number of tutors, users, courses, and payouts
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], // Donut segments colors
        borderColor: ['#ffffff'], // Border color
        borderWidth: 2, // Border width around the segments
      },
    ],
  };

  // Configuration options for the donut chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Position the legend at the top
      },
      title: {
        display: true,
        text: 'Admin Dashboard Donut Chart', // Chart title
      },
    },
    cutout: '50%', // Makes it a donut chart (50% cutout in the middle)
  };

  return (
    <div style={{ width: '100%',height:'400px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AdminDonutGraph;
