import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SkeltonCourse from "./skelton/SkeltonCourse";
import { Rating } from "@mui/material";
import { FaFilter } from "react-icons/fa6";
import { FaSortAmountDown } from "react-icons/fa";
import {Pagination} from '@mui/material';

interface TutorDetails {
  tutorDetails: {
    name: string;
  };
}

interface Course {
  _id: string;
  title: string;
  price: number;
  averageRating?: number;
  discountPrice: number;
  thumbnail: string;
  tutorDetails: TutorDetails;
}

interface CourseProps {
  fetchUrl: string;
  title: string;
  subTitle?: string;
  searchQuery?: string;
  fullCoursePage?: boolean;
}

const Courses: React.FC<CourseProps> = ({
  fetchUrl,
  title,
  subTitle,
  searchQuery,
  fullCoursePage
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async (page = 1) => {
      try {
        const response = await axios.get(fetchUrl, {
          params: {
            search: searchQuery,
            sort: sortOption,
            category: filterCategory,
            level: filterLevel,
            page, 
            limit: 5
          },
        });
        
        const coursesData: Course[] = response.data.courses.map(
          (course: Course) => ({
            _id: course._id,
            title: course.title,
            price: course.price,
            discountPrice: course.discountPrice,
            thumbnail: course.thumbnail,
            tutorDetails: course.tutorDetails,
            averageRating: course.averageRating,
          })
        );
console.log('courseData',response.data)
        setCourses(coursesData);
        setTotalPages(response.data.totalPages)
        setTimeout(() => {
          setLoading(false);
        }, 400);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setLoading(false);
      }
    };

    fetchCourses(currentPage);
  }, [fetchUrl, searchQuery, sortOption, currentPage,filterCategory, filterLevel]);

  useEffect(() => {
    setCurrentPage(1);
}, [searchQuery, sortOption, filterCategory, filterLevel]);


  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  const handleCategoryChange = (category: string) => {
    setFilterCategory(category);
    setShowFilterDropdown(false);
  };

  const handleLevelChange = (level: string) => {
    setFilterLevel(level);
    setShowFilterDropdown(false);
  };

  if (loading) return <SkeltonCourse />;
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <>
    <section className="m-4 p-4 bg-white">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold py-2">{title}</h2>
          <h4 className="text-xl text-gray-500">{subTitle}</h4>
        </motion.div>

        {/* Sort and Filter Options */}
        {fullCoursePage && (
        <div className="flex justify-end mb-4 ">
          {/* Sort Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="px-4 py-2 flex items-center text-white bg-blue-500 rounded hover:bg-blue-600 transition-all duration-200 ease-in-out"
            >
              <span className="mr-2">Sort</span>
              <FaSortAmountDown />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
                <div
                  onClick={() => handleSortChange("price-asc")}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  Price: Low to High
                </div>
                <div
                  onClick={() => handleSortChange("price-desc")}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  Price: High to Low
                </div>
                <div
                  onClick={() => handleSortChange("rating-desc")}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  Highest Rated
                </div>
                <div
                  onClick={() => handleSortChange("rating-asc")}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  Lowest Rated
                </div>
                
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative ml-4 z-50">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="px-4 py-2 flex items-center text-white bg-blue-500 rounded hover:bg-blue-600 transition-all duration-200 ease-in-out"
            >
              <span className="mr-2"> Filter</span>
              <FaFilter />
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
                {/* Category Filter */}
                <div className="p-2">
                  <p className="font-semibold">Category</p>
                  <div
                    onClick={() => handleCategoryChange("React")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    React
                  </div>
                  <div
                    onClick={() => handleCategoryChange("NodeJS")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Node JS
                  </div>
                  <div
                    onClick={() => handleCategoryChange("DataScience")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Data Science
                  </div>
                  <div
                    onClick={() => handleCategoryChange("MongoDB")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    MongoDB
                  </div>
                  <div
                    onClick={() => handleCategoryChange("JavaScript")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    JavaScript
                  </div>
                  <div
                    onClick={() => handleCategoryChange("AI&ML")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Artificial Intelligence
                  </div>
                </div>

                {/* Level Filter */}
                <div className="p-2 border-t">
                  <p className="font-semibold">Level</p>
                  <div
                    onClick={() => handleLevelChange("Beginner")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Beginner
                  </div>
                  <div
                    onClick={() => handleLevelChange("Intermediate")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Intermediate
                  </div>
                  <div
                    onClick={() => handleLevelChange("Advanced")}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Advanced
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
)}

        {/* Course Grid */}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleCourseClick(course._id)}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Instructor: {course.tutorDetails.tutorDetails.name}
              </p>
              {course.averageRating && course.averageRating > 0.5 && (
                <div className="flex items-center m-2 p-2">
                  <p className="text-md font-semibold text-yellow-500 mr-2">
                    {course.averageRating.toFixed(2)}
                  </p>
                  <Rating
                    name="course-rating"
                    value={parseFloat(course.averageRating.toFixed(2))}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
              )}
              <div className="flex justify-between items-center mt-auto">
                <p className="text-xl font-bold text-gray-900 p-2 m-2">
                  ${course.discountPrice}
                </p>
                <p className="text-sm text-red-600 line-through p-2 m-2">
                  ${course.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {fullCoursePage &&( 
    <div className="w-full   flex justify-center items-center p-4 m-4 ">
<Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
          color="primary"
        />  </div>

    )}
    </section>
    
  </>
  );
};

export default Courses;
