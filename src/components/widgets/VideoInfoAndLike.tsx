import React from 'react'

import WhiteButton from '@/components/ui/WhiteButton';
import { TbThumbUpFilled, TbEyeFilled } from "react-icons/tb";

import { likeVideo } from '@/app/actions/videoActions';

const VideoInfoAndLike =({
    title, watchCount, likesCount, isLiked, videoId, userId
}:{
    title: string,
    watchCount:number,
    likesCount:number,
    isLiked:boolean,
    videoId:string,
    userId:string
})=>{
    // const handleLike = useLikeMutation();

    return <div className='relative w-full h-fit flex flex-col gap-3
        border-b-2 border-b-white lg:border-b-transparent pb-10 mb-7
    '>
        <h2 className='text-3xl font-semibold text-[var(--foreground-active)]'>{title}</h2>
        <div className='relative flex flex-row gap-6 items-center text-[var(--foreground)]
            justify-between sm:justify-start w-full
        '>
            <div className='relative flex flex-row gap-1 items-center justify-center'>
                <TbEyeFilled className='relative h-4 w-4 min-h-4 min-w-4 mt-[1px]'/>
                <span className='text-[var(--foreground)] font-semibold'>{watchCount} views</span>
            </div>
            <WhiteButton
                // isActive={isLiked}
                startContent={<TbThumbUpFilled className={`
                    relative h-5 w-5 min-h-5 min-w-5 mt-[1px] group-hover:text-white duration-300
                    ${isLiked ? 'text-[var(--blue-primary)]' : 'text-[var(--foreground)]'}
                `}/>}
                className='group'
                onClick={() => {
                    !isLiked && likeVideo(videoId, userId);

                }}
            >{isLiked ? `${likesCount} > You liked it!` : `${likesCount} likes`}</WhiteButton>
        </div>
    </div>
}

export default VideoInfoAndLike