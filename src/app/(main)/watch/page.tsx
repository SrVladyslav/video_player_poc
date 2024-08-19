import React from 'react'
import WatchVideoPlayer from '@/components/widgets/WatchVideoPlayer'
import ExploreList from '@/components/widgets/ExploreList'
import { Suspense } from 'react'

const page =()=>{
    return <div className='realtive w-full h-full gap-5
        grid grid-cols-1 lg:grid-cols-[1fr_270px] xl:grid-cols-[1fr_350px]
    '>
        <Suspense fallback={<div>OMG</div>}>
            <WatchVideoPlayer src={`/videos/poc.MOV`} title='' use_params/>
        </Suspense>
        <ExploreList/>
    </div>
}

export default page