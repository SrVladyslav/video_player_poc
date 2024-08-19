'use server'

import { trpc_client } from '@/utils/trpc_client';

/**
 * Likes a video by calling the tRPC mutation.
 * 
 * @param {string} videoId - The ID of the video to like.
 * @param {string} userId - The ID of the user giving the like.
 * @returns {Promise<boolean>} - Returns `true` if the video was successfully liked, `false` if the operation failed.
 */
export const likeVideo = async (videoId: string, userId: string) => {
    try{
        const liked = await trpc_client.video.likeVideo.mutate({
            videoId, 
            userId
        })
        return liked // Assuming `liked` is a boolean indicating success
    }catch(e:any) {
        console.error('Failed to like the video:', e);
        return false
    }
};