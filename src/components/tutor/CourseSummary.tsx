import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { courseEndpoints } from '../../constraints/endpoints/courseEndpoints';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { RiCheckDoubleLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { clearCourseData } from '../../redux/courseSlice';
import tutorAxios from '../../constraints/axios/tutorAxios';

interface CourseSummaryProps {
  onBack: () => void;
}

const CourseSummary: React.FC<CourseSummaryProps> = ({ onBack }) => {
  const tutorId = useSelector((state: RootState) => state.tutor.id);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(null);

  const {
    courseTitle,
    thumbnail,
    courseDesc,
    coursePrice,
    courseDiscountPrice,
    courseCategory,
    courseLevel,
    demoURL,
    prerequisites,
    benefits,
    sections,
  } = useSelector((state: RootState) => state.course.courseDetails);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const UploadCourse = async () => {
    const courseData = {
      tutorId,
      thumbnail,
      title: courseTitle,
      description: courseDesc,
      price: coursePrice,
      discountPrice: courseDiscountPrice,
      category: courseCategory,
      level: courseLevel,
      demoURL,
      prerequisites,
      benefits,
      sections,
    };
    try {
      const response = await tutorAxios.post(courseEndpoints.addCourse, courseData);
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(clearCourseData())
        navigate('/tutor/dashboard');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error uploading course:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center">Course Summary</h2>
      {/* Course Details */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <h3 className="text-3xl font-semibold mb-4">{courseTitle}</h3>
        <div className="flex  flex-col md:flex-row md:space-x-10">
          <img
            src={thumbnail}
            alt="Course Thumbnail"
            className="w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0"
          />
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-lg mb-4 text-gray-700">
                <strong>Price:</strong> ${coursePrice}
              </p>
              {courseDiscountPrice && (
                <p className="text-lg  text-gray-700">
                  <strong>Discount Price:</strong> ${courseDiscountPrice}
                </p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-lg text-gray-700">
                <strong>Description:</strong> {courseDesc}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg mb-4 text-gray-700">
                <strong>Category:</strong> {courseCategory}
              </p>
              <p className="text-lg  text-gray-700">
                <strong>Level:</strong> {courseLevel}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Prerequisites */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Prerequisites</h3>
        <div className="space-y-2">
          {prerequisites.map((prerequisite: string, index: number) => (
            <div className="flex items-center" key={index}>
              <RiCheckDoubleLine className="text-blue-500 mr-2" />
              <p className="text-lg">{prerequisite}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Course Benefits */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Benefits</h3>
        <div className="space-y-2">
          {benefits.map((benefit: string, index: number) => (
            <div className="flex items-center" key={index}>
              <RiCheckDoubleLine className="text-blue-500 mr-2" />
              <p className="text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Course Sections */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Sections</h3>
        {sections.map((section, index) => (
          <div className="section-card mb-4" key={index}>
            <div
              className="flex justify-between items-center cursor-pointer p-4 bg-white shadow-md rounded-md hover:bg-gray-100"
              onClick={() => toggleSection(index)}
            >
              <div className="text-lg font-medium">{section.title}</div>
              {openSection === index ? (
                <CloseIcon className="text-gray-500" />
              ) : (
                <ArrowDropDownIcon className="text-gray-500" />
              )}
            </div>
            {openSection === index && (
              <div className="p-4 bg-white mt-2 shadow-md rounded-md">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div
                    className="lesson-card p-4 border-b border-gray-200 last:border-0"
                    key={lessonIndex}
                  >
                    <div className="flex flex-col md:flex-row items-center md:space-x-6">
                      <div className="md:w-1/2">
                        <video
                          className="w-full rounded-lg shadow-lg"
                          height="300"
                          controls
                        >
                          <source src={lesson.video || ''} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="md:w-1/2 mt-4 md:mt-0">
                        <h4 className="text-xl font-semibold">{lesson.title}</h4>
                        <p className="mt-2 text-gray-600">{lesson.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={UploadCourse}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Upload Course
        </button>
      </div>
    </div>
  );
};

export default CourseSummary;
