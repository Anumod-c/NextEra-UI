import React from 'react'

const  SkeltonSingleCourse:React.FC=()=> {
  return (
    <div className="p-6 animate-pulse space-y-6">
      {/* Skeleton for Course Title */}
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      
      {/* Skeleton for Rating, Enrolled, and Language Info */}
      <div className="flex space-x-4">
        <div className="h-6 bg-gray-300 rounded w-20"></div>
        <div className="h-6 bg-gray-300 rounded w-20"></div>
        <div className="h-6 bg-gray-300 rounded w-20"></div>
      </div>
      
      {/* Skeleton for Demo Video */}
      <div className="w-full bg-gray-300 rounded-lg h-64"></div>
      
      {/* Skeleton for Sections */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
      </div>
      
      {/* Skeleton for Buy Now Button */}
      <div className="h-10 bg-gray-300 rounded w-32"></div>
    </div>
  );
};


export default SkeltonSingleCourse
