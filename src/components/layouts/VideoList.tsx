import React from 'react'

import VideoLink from '@/components/ui/VideoLink'
import { VideoListItem } from '@/lib/types';

const VideoList =({
    videos, isSideList=false
}:{
    videos: VideoListItem[] | undefined,
    isSideList?: boolean,
})=>{
    // return <div className='relative flex w-full h-full flex-row justify-center gap-3 flex-wrap'>
    return <div className={`relative w-full h-fit justify-center gap-3 grid 
        grid-cols-1 sm:grid-cols-2 ${isSideList ? 'lg:grid-cols-1': 'lg:grid-cols-3'}`}>
        {videos && videos.map((video:VideoListItem, index)=>{
            return <VideoLink 
                key={index} 
                src={video.url} 
                thumbnailURI={video.thumbnailURI}
                redirectTo={`/watch?vid=${video.id}`}
                watchCount={video.watchCount}
                likesCount={video.likesCount}
            />
        })}
        {videos == undefined || videos.length == 0 && <div className='text-center text-sm text-[var(--foreground)]'>No videos found</div>}
    </div>
}

export default VideoList 