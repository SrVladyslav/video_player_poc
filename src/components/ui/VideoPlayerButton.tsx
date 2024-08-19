import React from 'react'
import { Button } from '@/components/ui/button'

const VideoPlayerButton =({
    icon, onClick, disabled
}:{
    icon: React.ReactNode,
    disabled?: boolean,
    onClick: () => void
})=>{
    return <div>
        <Button variant="ghost" onClick={onClick} disabled={disabled}
            className={`rounded-full hover:bg-white duration-300
            h-8 w-8 min-h-8 min-w-8 p-0 text-white hover:text-[var(--blue-primary)]
        `}>
            {icon}
        </Button>
    </div>
}

export default VideoPlayerButton