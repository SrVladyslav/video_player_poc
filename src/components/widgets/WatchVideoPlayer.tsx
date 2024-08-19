'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useVideo } from '@/hooks/useVideos'
import { useUserData } from '@/hooks/useUserData'
import { useUserData as userData } from '@/store/user';
import VideoPlayer from '@/components/widgets/VideoPlayer'
import VideoInfoAndLike from '@/components/widgets/VideoInfoAndLike'

interface VideoPlayerProps {
    src: string;
    title: string;
    use_params?: boolean;
}


const WatchVideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, use_params}) => {
  const userToken = userData()?.userToken || '';
  const { user, isLoading, isError } = useUserData(userToken)
  const userID = user?.id;
  // Video info 
  const searchParams = useSearchParams()
  const vid = searchParams.get('vid') || ''
  const {video} = useVideo(vid, userID)

  return (
    <div className="w-full h-auto flex flex-col gap-6">
      <div className='relative w-full aspect-video overflow-hidden
        bg-white rounded-2xl border-[1px] border-[#f2f2f2] shadow-md
      '>
        <VideoPlayer 
          videoURI={video && video.uri || ''} 
          title={title}
        />
      </div>
      <VideoInfoAndLike
        title={video?.title || 'Video with no title'}
        watchCount={video?.watchCount || 0}
        likesCount={video?.likesCount || 0}
        isLiked={video?.isLiked || false}
        videoId={video?.id || ''}
        userId={user?.id || ''}
      />
    </div>
  )
}

export default WatchVideoPlayer;
  