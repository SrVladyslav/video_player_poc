'use client'

import React, { useState, useRef } from 'react';
import VideoPlayerButton from '@/components/ui/VideoPlayerButton'

import { LuLoader } from "react-icons/lu";
import { Slider } from "@/components/ui/slider"

import { FaPlay, FaPause, FaVolumeHigh, FaVolumeLow, FaVolumeXmark} from "react-icons/fa6";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { CgMiniPlayer } from "react-icons/cg";

const VideoPlayer =({
    videoURI, title
}:{
    videoURI: string,
    title: string
})=>{
    
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const volumeSliderRef = useRef<HTMLInputElement | null>(null)
    const timelineProgressRef = useRef<HTMLInputElement | null>(null)
    const [wasPaused, setWasPaused] = useState(true)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [isMiniPlayerBlocked, setIsMiniPlayerBlocked] = useState(false)
    const [volumeLevel, setVolumeLevel] = useState('off')
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [percent, setPercent] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1)
    
    // Toggle play/pause of the video
    const togglePlay = () => {
        const currentRef = videoRef.current;
        if (currentRef) {
            if (currentRef.paused) {
                currentRef.play();
                console.log('playing');
            } else {
                currentRef.pause();
                console.log('pausing');
            }
        }
    }

    // Toggle full screen mode, calls the wrapperRef to get the current element
    const toggleFullScreenMode = () => {
        const currentRef = wrapperRef.current;
        if (currentRef) {
            if (document.fullscreenElement == null) {
                currentRef.requestFullscreen()
                setIsFullScreen(true)
            } else {
                document.exitFullscreen()
                setIsFullScreen(false)
            }
        }
    }

    // Is accepted (Not in firefoz), creates a mini player
    const toggleMiniPlayerMode = () => {
        const currentRef = videoRef.current;
        try {
            if (currentRef && !isMiniPlayerBlocked) {
                if (document.pictureInPictureElement == null) {
                    currentRef.requestPictureInPicture();
                } else {
                    document.exitPictureInPicture();
                }
            }
        }catch(e:any){
            setIsMiniPlayerBlocked(true)
        }
    };

    // Volume handling
    const toggleMute = () => {
        const currentRef = videoRef.current
        if (currentRef) {
            currentRef.muted = !currentRef.muted
            setVolumeLevel(currentRef.muted || currentRef.volume === 0 ? 'muted' : currentRef.volume > 0.5 ? 'high' : 'low');
        }
    }

    const changeVolume = (value: number) => {
        const currentRef = videoRef.current
        if (currentRef) {
            currentRef.volume = value
            currentRef.muted = value == 0
            setVolumeLevel(currentRef.muted || currentRef.volume === 0 ? 'muted' : currentRef.volume > 0.5 ? 'high' : 'low');
        }
    }

    const onVolumeChange = (e: any) => {
        const currentRef = videoRef.current;
        const volumeSlider = volumeSliderRef.current;
        
        if (currentRef && volumeSlider) {
            volumeSlider.value = e.target.volume
            if(currentRef.muted || currentRef.volume === 0){
                volumeSlider.value = '0'
                setVolumeLevel('muted')
            }else if(currentRef.volume > 0.5){
                setVolumeLevel('high')
            }else{
                setVolumeLevel('low')
            }
        }
    }

    // Duration 
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2
    })

    const formatDuration = (duration: number) => {
        const seconds = Math.floor(duration % 60);
        const minutes = Math.floor(duration / 60) % 60;
        const hours = Math.floor(duration / 3600);
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${minutes}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    const onLoadedData =()=>{
        const currentRef = videoRef.current;
        if (currentRef) {
            setDuration(currentRef.duration)
            setCurrentTime(currentRef.currentTime)
        }
    }

    const onTimeUpdate =()=>{
        const currentRef = videoRef.current;
        if (currentRef) {
            setCurrentTime(currentRef.currentTime)
            const percent = currentRef.currentTime / currentRef.duration;
            setPercent(percent)

            const timeLineBar = timelineProgressRef.current
            if(timeLineBar) {
                timeLineBar.value = percent.toString()
            }
        }
    }

    // Playback speed
    const changePlaybackSpeed = () => {
        let newPlaybackRate = playbackRate + 0.25;
        if (newPlaybackRate > 2) newPlaybackRate = 0.25;
        setPlaybackRate(newPlaybackRate);
        const currentRef = videoRef.current;
        if (currentRef) {
            currentRef.playbackRate = newPlaybackRate;
        }
    }

    if(!videoURI) 
        return <div className='relative w-full h-full flex items-center justify-center'>
            <LuLoader className="animate-spin h-6 w-6 min-h-6 min-w-6 stroke-[var(--blue-primary)]"/>
        </div>;
    // if(!videoURI) return <Skeleton className='absolute top-0 left-0 w-full h-full'/>
    
    return <div ref={wrapperRef} className='relative w-full h-full aspect-video group'>
        <div className={`absolute bottom-0 left-0 right-0 z-[10]
            transition-all duration-150 ease-in-out opacity-0 group-hover:opacity-100
            ${wasPaused || isFullScreen ? 'opacity-100' : 'opacity-0'}
            ${isFullScreen ? 'max-w-full' : 'max-w-[1000px]'}
        `}>
            {/* Timeline */}
            <div className='relative flex w-full px-[0.5rem] z-[20]'
                onMouseDown={()=>{console.log("MouseDown")}}
                onMouseUp={()=>{console.log("MouseUp")}}
            >
                <Slider min={0} max={1} step={0.01}
                    ref={timelineProgressRef}
                    className={`relative w-full h-[20px] color-[red]`}
                    value={[percent]}
                />
            </div>
            {/* Controls */}
            <div className='relative flex gap-0.5 p-[0.25rem] items-center z-[50] justify-between'>
                <div className='relative flex gap-0.5 items-center z-[50]'>
                    <VideoPlayerButton
                        icon={ wasPaused ? <FaPlay/> : <FaPause/>}
                        onClick={togglePlay}
                    />
                    {/* Duration container */}
                    <div className='flex items-center text-white gap-[0.25rem] px-[0.25rem]'>
                        <span className='text-xs'>{formatDuration(currentTime)}</span>
                        /
                        <span className='text-xs'>{formatDuration(duration)}</span>
                    </div>
                    {/* Sound button */}
                    <VideoPlayerButton
                        icon={ volumeLevel == 'muted' 
                                ?<FaVolumeXmark/>
                                : volumeLevel == 'high'
                                    ?<FaVolumeHigh/>
                                    :<FaVolumeLow/>
                        }
                        onClick={toggleMute}
                    />
                    <Slider min={0} max={1} step={0.01} defaultValue={[1]}
                        ref={volumeSliderRef}
                        className={`relative w-[60px] sm:w-[100px] h-[30px]
                            ${volumeLevel == 'muted' ? 'opacity-[0.5]' : 'opacity-100'}
                        `}
                        onValueChange={(e:any)=>{changeVolume(e[0])}}
                    />
                </div>
                <div className='relative flex gap-0.5 p-[0.25rem] items-center z-[50]'>
                    {/* Spreed Button */}
                    <VideoPlayerButton
                        icon={ <span className='relative font-bold flex items-center p-[0.25rem] rounded-2xl text-xs'>{playbackRate}x</span>}
                        onClick={changePlaybackSpeed}
                    />
                    {/* Screen on screen player */}
                    <VideoPlayerButton
                        icon={ <CgMiniPlayer/>}
                        disabled={isMiniPlayerBlocked}
                        onClick={toggleMiniPlayerMode}
                    />
                    {/* Full screen */}
                    <VideoPlayerButton
                        icon={ isFullScreen ? <RxExitFullScreen/> : <RxEnterFullScreen/>}
                        onClick={toggleFullScreenMode}
                    />
                </div>
            </div>
            {/* Fade background */}
            <div className='absolute bottom-0 left-0 w-full z-1 aspect-[6/1]
                bg-gradient-to-t from-[rgba(0,0,0,.75)]  to-transparent
            '/>
        </div>
        {/* Video */}
        <video ref={videoRef}
            onPause={() => setWasPaused(true)}
            onPlay={() => setWasPaused(false)}
            onClick={() => togglePlay()}
            onVolumeChange={(e)=>{onVolumeChange(e)}}
            onKeyUp={(e) => {
                if (e.key === 'Enter') togglePlay()
            }}
            onLoadedData={onLoadedData}
            onTimeUpdate={onTimeUpdate}
            onError={()=>{console.log("Error")}}
            className="absolute top-0 left-0 w-full h-full object-contain"
        >
            <source src={videoURI} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
}

export default VideoPlayer