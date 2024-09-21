import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import TutorImage from '../../../assets/profile.png';


interface Lesson {
  title: string;
  video: string;
  description: string;
}
interface Section {
  title: string;
  lessons: Lesson[];
}

interface PaymentProps {
    course: {
      price: number;
      discountPrice: number;
      sections: Section[];
      level: string;
      language?: string;
      instructor?: string;
      rating?: number;
    };
  }


export const PaymentSection: React.FC<PaymentProps> = ({ course }) => {

  const totalLessons = course.sections.reduce((count,section)=>count +section.lessons.length,0)
    return (
    <div className='payment-section p-4 col-span-1 flex flex-col shadow-xl rounded-lg bg-white md:max-w-xs max-w-full'>
       {/* Price Section */}
       <div className='price mb-4 text-center'>
       <h1 className='text-4xl font-bold'>${course.discountPrice || course.price}</h1>
      </div>

      {/* Additional Information Section */}
      <div className='additional-information mb-4 bg-gray-50 p-4 rounded-lg shadow-sm'>
        <h2 className='text-xl font-semibold mb-2'>This course includes:</h2>
        <div className='flex justify-between mb-2'>
          <p className='text-md'>Lectures</p>
          <p className='text-md'>{totalLessons}</p>
        </div>
        <div className='flex justify-between mb-2'>
          <p className='text-md'>Level</p>
          <p className='text-md'>{course.level || 'N/A'}</p>
        </div>
        <div className='flex justify-between mb-2'>
          <p className='text-md'>Language</p>
          <p className='text-md'>{course.language||'English'}</p>
        </div>
      </div>

       {/* Buy Now Button */}
       <div className='button mb-4'>
        <button className='w-full bg-green-500 text-white py-2 rounded-md text-lg shadow hover:bg-green-600'>
          Buy Now
        </button>
      </div>


       {/* Tutor Details Section */}
       <div className='tutor-details bg-gray-50 p-4 rounded-lg shadow-sm'>
        <div className='img-name flex items-center mb-4'>
          <img className='rounded-full w-16 h-16 mr-4' src={TutorImage} alt='Tutor' />
          <div className='text-lg font-semibold'>{course.instructor || 'Instructor Name'}</div>
        </div>
        <div className='rating flex items-center'>
          <StarIcon style={{ color: 'gold' }} />
          <StarIcon style={{ color: 'gold' }} />
          <StarIcon style={{ color: 'gold' }} />
          <StarIcon style={{ color: 'gold' }} />
          <StarIcon style={{ color: 'gold' }} />
          <p className='ml-2 text-md'>{course.rating || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};