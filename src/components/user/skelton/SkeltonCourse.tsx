import React from 'react'

const SkeltonCourse:React.FC=()=> {
    const skeletons = Array(10).fill(0); 

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between h-full animate-pulse"
          >         
            <div className="w-full md:h-40 bg-gray-300 rounded-md mb-4"></div>           
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>            
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>          
            <div className="flex items-center mb-4">
              <div className="h-6 bg-gray-300 rounded w-10 mr-2"></div>
              <div className="flex">
                <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default SkeltonCourse
