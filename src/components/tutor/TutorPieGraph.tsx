import { PieChart } from '@mui/x-charts/PieChart';

interface TutorPieGraphProps {
  totalCourses: number;
  totalLiveCourses: number;
  totalStudents: number;
}


export default function TutorPieGraph({ totalCourses, totalLiveCourses, totalStudents }: TutorPieGraphProps) {
  const data = [
    { id: 0, value: totalCourses, label: 'Total Courses' },
    { id: 1, value: totalLiveCourses, label: 'Total Live Courses' },
    { id: 2, value: totalStudents, label: 'Total Students' },
  ];
  return (
    <PieChart 
    series={[{
      data,
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
    }]}
    height={200}
  />
  );
}
