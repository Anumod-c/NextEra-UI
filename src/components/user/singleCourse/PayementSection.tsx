import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import TutorImage from '../../../assets/profile.png';
import { toast } from 'sonner';
import userAxios from '../../../constraints/axios/userAxios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {loadStripe} from '@stripe/stripe-js'
import { userEndpoints } from '../../../constraints/endpoints/userEndPoints';
import { useDispatch } from 'react-redux';
import { setOrderData } from '../../../redux/OrderDataSlice';

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
    _id: string;
    tutorId: string;
    title?: string;
    category?: string;
    thumbnail: string;
    price: number;
    discountPrice: number;
    sections: Section[];
    level: string;
    language?: string;
    instructor?: string;
    rating?: number;
  };
  tutor?: {
    name: string;
  };
}


export const PaymentSection: React.FC<PaymentProps> = ({ course ,tutor}) => {
  console.log('coirseeeeeeeeprops',course);
  const dispatch = useDispatch()
  const user= useSelector((state:RootState)=>state.user)
  const totalLessons = course.sections.reduce((count,section)=>count +section.lessons.length,0);
  
  const handlePayement=async (courseId:string)=>{
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      const courseData={
        courseId:course._id,
        userId:user.id,
        tutorId:course.tutorId,
        category:course.category,
        thumbnail:course.thumbnail,
        title:course.title,
        price:course.price,
        level:course.level,
        totalLessons:totalLessons,
        discountPrice:course.discountPrice,
       

      }
      

      console.log("course Idddd",courseId,"userID",user.id);


      // payement API be completed
      const response =  await userAxios.post(userEndpoints.makepayement,courseData);
      console.log('hayyyy stripe',response.data);
      dispatch(setOrderData(response.data.orderData))
      const  sessionId = response.data.sessionId;

      if(stripe && sessionId){
        console.log("stripeIDddddd")
        const result = await stripe.redirectToCheckout({sessionId});

        if(result.error){
          toast.error(result.error.message)
        }
      }else{
        toast.error("Stripe could not be loaded or session ID is missing.")
      }
      

    } catch (error) {
      toast.error("Couldnt buy Course")
    }
  }
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
        <button onClick={()=>handlePayement(course._id)} className='w-full bg-green-500 text-white py-2 rounded-md text-lg shadow hover:bg-green-600'>
          Buy Now
        </button>
      </div>


       {/* Tutor Details Section */}
       <div className='tutor-details bg-gray-50 p-4 rounded-lg shadow-sm'>
        <div className='img-name flex items-center mb-4'>
          <img className='rounded-full w-16 h-16 mr-4' src={TutorImage} alt='Tutor' />
          <div className='text-lg font-semibold'>{tutor?.name || 'Instructor Name'}</div>
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