'use client'

import React, {useRef} from 'react'

import WhiteButton from '@/components/ui/WhiteButton'

import { useSideDraggableScroll } from '@/hooks/useSideDraggableScroll'
import { useSystemData } from '@/store/system'
import { links } from '@/constants/sidebarLinks'


const ExploreListSelector =()=>{
    const { exploreListSelectedVideos, setExploreListSelectedVideos } = useSystemData()
    
    // Sidebar scroll with mouse
    const sideMenuRef = useRef<HTMLDivElement>(null); // We will use React useRef hook to reference the wrapping div:
    const { events } = useSideDraggableScroll(sideMenuRef, {
        decayRate: 0.96,
        safeDisplacement: 11,
        applyRubberBandEffect: true,
    });

    return <div className='relative w-full h-fit overflow-x-auto scrollbar-hide pb-1'
        ref={sideMenuRef}
        {...events}
    >
        <div className='relative w-full h-fit flex flex-row gap-3'>
            {links && links.map((link, index) => {
                return <div key={index}>
                    <WhiteButton
                        // primary 
                        isActive={exploreListSelectedVideos === link.id}
                        startContent={link.icon}
                        onClick={() => {
                            setExploreListSelectedVideos(link.id)
                        }}
                    >{link.name}</WhiteButton>
                </div>
            })}
        </div>
    </div>
}

export default ExploreListSelector