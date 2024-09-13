import React from 'react'
import StarIcon from '@mui/icons-material/Star';

const  ContentSection:React.FC=()=> {
  return (
    <div className='content col-span-2 flex flex-col shadow-xl'>
        <div className='name/rating flex flex-col p-4 m-4'>
            <div className='name text-2xl'>Complete Web Development</div>
            <div className='rating enrolled enlgish flex p-2 m-2'>
                <div className='flex  m-2 p-3'>
                    <StarIcon/>Rating</div>
                <div className='flex  m-2 p-3'><StarIcon/>Enrolled</div>
                <div className='flex  m-2 p-3'><StarIcon/>Language</div>
            </div>
        </div>
        <div className='demoUrl relative w-full '>


    <video src="https://www.youtube.com/watch?v=SqcY0GlETPk&t=2s" muted controls></video>
        {/* Image will come here */}


        </div>
        <div className='courseDescription flex flex-col'>
            <div className='desc heading text-2xl p-4 '>Course Descritpions</div>
            <hr />
            <div className='desc-content mx-2 p-4'>
            C# 9.0 is supported on .NET 5. For more information, see C# language versioning.
 This course will be a quick dive into the world of C# and .NET. By the end,
 you should be able to build your own small websites and applications using C#.
 The C# language is used by the Unity engine to make games, mobile apps, websites, 
software, servers and more
            </div>
        </div>
        <div className='benifits flex flex-col p-4 mx-2'>
            <div className='heading text-2xl'>What are the Prerequistite for starting the course</div>
            <div className='content p-2 m-2'>
                <p className='content p-2 '><StarIcon/>3.5 hours on-demand video</p>
                <p className='content p-2 '><StarIcon/>3.5 hours on-demand video</p>
                <p className='content p-2 '><StarIcon/>3.5 hours on-demand video</p>
            </div>
        </div>
        <div className='prerequiste flex flex-col p-4 m-2'>
            <div className='heading text-2xl'>What you'll learn</div>
            <div className='content'>
                <p  className='content p-2 '><StarIcon/>3.5 hours on-demand video</p>
                <p  className='content p-2 '><StarIcon/>3.5 hours on-demand video</p>
                <p  className='content p-2 '><StarIcon/>3.5 hours on-demand video</p>
            </div>
        </div>
        <div className='sections flex flex-col m-2 p-4'>
            <div className='section heading text-2xl '>Sections</div>
            <div className='section-card p-4 m-2'>
                <div className='p-4 m-2 bg-white'>card 1</div>
                <div className='p-4 m-2 bg-white'>Card 2</div>
                <div className='p-4 m-2 bg-white'>Card 3</div>
                <div className='p-4 m-2 bg-white'>Card 4</div>
            </div>
        </div>

    </div>
  )
}

export default ContentSection
