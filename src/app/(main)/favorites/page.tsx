import React from 'react'
import FavoriteVideos from '@/components/layouts/FavoriteVideos'

const page =()=>{
    return (
        <div className='relative w-full h-full overflow-hidden'>
            <FavoriteVideos isSideList={false}/>
        </div>
    );
}

export default page