import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface EnrollmentData {
  courseName: string;
  enrolledCount: number;
}

interface TutorPieGraphProps {
  enrollmentData: EnrollmentData[];
}

const TutorDonutGraph: React.FC<TutorPieGraphProps> = ({ enrollmentData }) => {
  const labels = enrollmentData.map((item) => item.courseName);
  const dataValues = enrollmentData.map((item) => item.enrolledCount);

  const data = {
    labels, 
    datasets: [
      {
        label: "Enrolled Students", 
        data: dataValues, 
        backgroundColor: [
          "#0088FE",
          "#00C49F",
          "#FFBB28",
          "#FF8042",
          "#AF19FF",
          "#FF5F7E",
        ], 
        borderColor: ["#ffffff"], 
        borderWidth: 2, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const, 
      },
      title: {
        display: true,
        text: "Course Enrollments Donut Chart", 
      },
    },
    cutout: "50%", 
  };
  return (
    <div className="flex justify-center " style={{ width: '100%', height: '550px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TutorDonutGraph;
