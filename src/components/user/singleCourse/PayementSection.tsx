import React from 'react'
import StarIcon from '@mui/icons-material/Star';

import  TutorImage from '../../../assets/profile.png'
export const PayementSection: React.FC = () => {
    return (
        <div className='payement section col-span-1  p-2 flex-col shadow-xl '>
            <div className='price flex justify-start m-4 p-4 '>
                <h1 className='text-4xl'>$4500</h1>
            </div>
            <div className='addtional information flex flex-col p-2 m-2 shadow-xl'>
                <div className='text-2xl p-4 m-2'>This course includes</div>
                <div className='flex  justify-between p-4'>
                    <p className='text-xl'>Lectures</p>
                    <p className='text-xl'>1</p>
                </div>
                <div className='flex  justify-between p-4'>
                    <p className='text-xl'>Duration</p>
                    <p className='text-xl'>1hr  0min</p>
                </div>
                <div className='flex  justify-between p-4'>
                <p className='text-xl'>Level</p>
                <p className='text-xl'>Beginner</p>
                </div>
                <div className='flex  justify-between p-4'>
                <p className='text-xl'>Lanugage</p>
                <p className='text-xl'>English</p>
                </div>

            </div>
            <div className='button flex bg-green-500 justify-center '>
                <button className=' p-2 m-2  w-full'>Buy Now</button>
            </div>
            <div className='tutor details bg-gray-100 shadow-xl p-4 m-2'>
                <div className='img/name p-4 m-2 flex '>
                    {/* image yet to be added */}
                    <img className='rounded-full w-28 h-28' src={TutorImage} alt="" />
                    <div className='flex items-center px-4 mx-2 text-3xl'>
                    Anumod
                    </div>
                </div>
                <div className='rating px-4 mx-2'>
                <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                </div>
            </div>
        </div>
    )
}
