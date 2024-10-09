import courseImage from '../../../assets/Nextera_Logo.jpg'
const CourseList: React.FC = () => {
    return (
        <div className="w-1/4 bg-gray-500 flex flex-col" >
            <div className="courselis_heading p-2 m-2 bg-green-300">Dicussions

            </div>
            <div className="course_list flex flex-col">
                <div className='flex p-3    m-2'>
                <img  className=' w-9 h-9 rounded-full mr-4' src={courseImage} alt="" />
                    <p>Compleeeete webdevelopment</p>
                </div>
                <div className='flex p-3 m-2'>
                <img  className=' w-9 h-9 mr-4  rounded-full' src={courseImage} alt="" />
                    <p>Complete webdevelopment</p>
                </div>
                <div className='flex p-3 m-2'>
                <img  className=' w-9 h-9 mr-4  rounded-full' src={courseImage} alt="" />
                    <p>Complete Javascript</p>
                </div>
                <div className='flex p-3 m-2'>
                <img  className=' w-9 h-9 mr-4  rounded-full' src={courseImage} alt="" />
                    <p>Complete Nodejs</p>
                </div>
                <div className='flex p-3 m-2'>
                <img  className=' w-9 h-9 mr-4  rounded-full' src={courseImage} alt="" />
                    <p>Complete webdevelopment</p>
                </div>
                <div className='flex p-3 m-2'>
                <img  className=' w-9 h-9 mr-4  rounded-full' src={courseImage} alt="" />
                    <p>Complete webdevelopment</p>
                </div>
                <div className='flex p-3 m-2'>
                <img  className=' w-9 h-9 mr-4  rounded-full' src={courseImage} alt="" />
                    <p>Complete webdevelopment</p>
                </div>
                <div className='flex p-3 m-2'>
                <img  className=' w-9 h-9 mr-4  rounded-full' src={courseImage} alt="" />
                    <p>Complete webdevelopment</p>
                </div>
            </div>
        </div>
    )
}

export default CourseList