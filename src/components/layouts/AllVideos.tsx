'use client'
import React from 'react'
import VideoList from '@/components/layouts/VideoList';
import { LuLoader } from "react-icons/lu";

import { useVideos } from '@/hooks/useVideos';

/** Returns all videos in a responsive list*/
const AllVideos =({
    isSideList=true
}:{
    isSideList?:boolean
})=>{
    const { videos, isLoading, isError } = useVideos()

    if (isLoading) {
        return <div className='relative w-full mt-10 flex items-center justify-center'>
            <LuLoader className="animate-spin h-6 w-6 min-h-6 min-w-6 stroke-[var(--blue-primary)]"/>
        </div>;
    }

    if (isError) {
        return <div className='relative w-full h-full flex items-center justify-center'>
            <div className='text-[var(--red)]'>Error</div>
        </div>;
    }

    return (
        <div className='relative w-full h-full overflow-hidden'>
            <VideoList videos={videos} isSideList={isSideList}/>
        </div>
    );
}

export default AllVideos