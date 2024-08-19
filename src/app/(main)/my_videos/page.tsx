import React from 'react'
import MyVideos from '@/components/layouts/MyVideos'

const page =()=>{
    return (
        <div className='relative w-full h-full overflow-hidden'>
            <MyVideos isSideList={false}/>
        </div>
    );
}

export default page