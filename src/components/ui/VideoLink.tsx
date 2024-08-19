'use client'

import React, { useRef, useState} from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import VideoCountsLabel from '@/components/ui/VideoCountsLabel'
import { MdImageNotSupported } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";

const VideoLink =({
    src, redirectTo, thumbnailURI, watchCount, likesCount
}:{
    src: string,
    thumbnailURI: string,
    redirectTo: string,
    watchCount: number,
    likesCount: number
})=>{
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const router = useRouter()
    
    // Play the video 
    const handleMouseEnter =()=>{
        try{
            setIsPlaying(true)
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play()
                }
            }, 100)
        }catch(e){
            console.error('Error playing video:', e)
        }
    }
    
    // Pause the video 
    const handleMouseLeave =()=>{
        try{
            setIsPlaying(false)
            if (videoRef.current) {
                videoRef.current.pause()
            }
        }catch(e){
            console.error('Error pausing video:', e)
        }
    }

    // Redirect to the video page
    const handleClick =()=>{
        setIsPlaying(false)
        router.push(redirectTo)
    }

    return <div className='relative w-full max-w-full md:max-w-[600px] h-auto aspect-video
            overflow-hidden bg-[var(--blue-secondary)] shadow-sm flex items-end justify-center
            rounded-2xl border-[1px] border-[var(--foreground-secondary)] cursor-pointer
        '
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
    >
        {thumbnailURI && thumbnailURI.length > 1 
            ?<Image
                src={thumbnailURI}
                alt="thumbnail"
                fill
                className={`absolute top-0 left-0 w-full h-full object-cover pointer-events-none
                    duration-500 transition-opacity z-1
                `}
                onError={(e) => console.error('Error loading thumbnail:', e)}
            />
            :<div className='absolute top-0 left-0 z-[1000] pointer-events-none
                w-full h-full flex justify-center items-center
            '><MdImageNotSupported className="h-5 w-5"/></div>
        }
        {isPlaying && 
            <video
                ref={videoRef}
                src={src}
                muted 
                onError={(e) => console.error('Error loading video:', e)}
                className='cursor-pointer pointer-events-none absolute top-0 left-0 
                    w-full h-full object-cover z-[50] duration-500 transition-opacity'
            />
        }
        {/* Video info */}
        <div className='absolute top-0 left-0 w-full h-full z-50
            p-2 flex items-end justify-center group
            bg-gradient-to-b from-transparent via-[#262626]/30 to-[#262626]/60
        '>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                group-hover:opacity-100 opacity-0 transition-opacity duration-500
            '>
                <div className='relative p-3 rounded-full bg-black/60'>
                    <FaPlay className="h-5 w-5 min-h-5 min-w-5 text-white"/>
                </div>
            </div>
            <VideoCountsLabel watchCount={watchCount} likesCount={likesCount}/>
        </div>
    </div>
}

export default VideoLink