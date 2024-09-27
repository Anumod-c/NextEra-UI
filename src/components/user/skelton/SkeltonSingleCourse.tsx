
const SkeletonSingleCourse = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4'>
      {/* Content Section Skeleton */}
      <div className='md:col-span-3'>
        <div className='flex flex-col shadow-xl bg-white rounded-lg p-6 animate-pulse'>
          <div className='h-8 bg-gray-300 rounded mb-4'></div>
          <div className='flex items-center space-x-16 mb-4'>
            <div className='flex items-center space-x-2'>
              <div className='h-4 bg-gray-300 rounded w-16'></div>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-4 bg-gray-300 rounded w-16'></div>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-4 bg-gray-300 rounded w-16'></div>
            </div>
          </div>
          <div className='relative w-full'>
            <div className='h-60 bg-gray-300 rounded'></div>
          </div>
          <div className='bg-gray-50 p-4 rounded-lg mt-4'>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
          </div>
          <div className='bg-gray-50 p-4 rounded-lg mt-4'>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
          </div>
          <div className='bg-gray-50 p-4 rounded-lg mt-4'>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
          </div>
          {/* Sections Skeleton */}
          <div className='bg-gray-50 p-4 rounded-lg mt-4'>
            <div className='h-4 bg-gray-300 rounded mb-4'></div>
            <div className='animate-pulse'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className='flex justify-between mb-2'>
                  <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-300 rounded w-10'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section Skeleton */}
      <div className='col-span-1 md:col-span-1 mt-4 p-6'>
        <div className='flex flex-col shadow-xl rounded-lg bg-white p-4 animate-pulse'>
          <div className='h-8 bg-gray-300 rounded mb-4'></div>
          <div className='h-10 bg-gray-300 rounded mb-4'></div>
          <div className='bg-gray-50 p-4 rounded-lg mb-4'>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
          </div>
          <div className='h-10 bg-gray-300 rounded mb-4'></div>
          <div className='bg-gray-50 p-4 rounded-lg mb-4'>
            <div className='h-4 bg-gray-300 rounded mb-2'></div>
            <div className='flex items-center mb-2'>
              <div className='h-10 w-10 bg-gray-300 rounded-full mr-4'></div>
              <div className='h-4 bg-gray-300 rounded w-2/3'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSingleCourse;
