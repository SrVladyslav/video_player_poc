'use client'

import React from 'react'
import ExploreListSelector from '@/components/widgets/ExploreListSelector'
import VideoLink from '@/components/ui/VideoLink'
import AllVideos from '@/components/layouts/AllVideos'
import FavoriteVideos from '@/components/layouts/FavoriteVideos'
import MyVideos from '@/components/layouts/MyVideos'

import { useSystemData } from '@/store/system'

const ExploreList =()=>{
    const { exploreListSelectedVideos } = useSystemData()
    
    return <div className='relative w-full h-full flex flex-col gap-3'>
        <ExploreListSelector/>
        {exploreListSelectedVideos === 'all' && <AllVideos/>}
        {exploreListSelectedVideos === 'favorites' && <FavoriteVideos/>}
        {exploreListSelectedVideos === 'my_videos' && <MyVideos/>}
    </div>
}

export default ExploreList