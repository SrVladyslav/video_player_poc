import React from 'react'
import { TbThumbUpFilled, TbEyeFilled } from "react-icons/tb";

const VideoCountsLabel =({
    watchCount, likesCount
}:{
    watchCount:number, likesCount:number
})=>{
    return <div className='relative flex flex-row gap-4 text-xs font-semibold z-[500] 
        font-semibold text-white bg-[black] w-fit px-2 py-1 rounded-2xl drop-shadow-md 
    '>
        <div className='relative flex flex-row gap-1 items-center justify-center'>
            <TbEyeFilled className='realtive h-3 w-3 min-h-3 min-w-3'/>
            <span>{watchCount}</span>
        </div>
        <div className='relative flex flex-row gap-1 items-center justify-center'>
            <TbThumbUpFilled className='realtive h-3 w-3 min-h-3 min-w-3'/>
            <span>{likesCount}</span>
        </div>
    </div>
}

export default VideoCountsLabel