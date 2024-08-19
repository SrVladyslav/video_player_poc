import { z } from "zod"
import { procedure, router } from '@/server/trpc'
import { 
    createVideo, 
    getVideo, 
    getVideos, 
    getFavoriteVideos,
    getMyVideos,
    likeVideo,
    incrementWatchCount 
} from '@/lib/utils/queries/video_queries'

export const videoRouter = router({
    getVideo: procedure
        .input(z.object({
            vid: z.string(),
            userID: z.string().optional()
        }))
        .query( async ({ input }) => {
            const { vid, userID} = input;
            try{
                const allVideos = await getVideo(vid, userID)
                if(allVideos){
                    /* Increment the watch count of the video by 1.
                    *  We suppose that the same user can watch the same video multiple times
                    */
                    await incrementWatchCount(vid)
                    return allVideos
                }else{
                    throw new Error('Unable to get the videos');
                }
            }catch(e:any){
                console.error('Unable to get the videos:', e);
                throw new Error('Unable to get the videos');
            }
    }),
    getVideos: procedure.query( async () => {
        const allVideos = await getVideos()
        if(allVideos){
            return allVideos
        }else{
            throw new Error('Unable to get the videos');
        }
    }),
    getFavoriteVideos: procedure
        .input(z.object({
            userID: z.string()
        }))
        .query( async ({ input }) => {
            const { userID } = input;
            const favVideos = await getFavoriteVideos(userID)
            if(favVideos){
                return favVideos
            }else{
                throw new Error('Unable to get the videos');
            }
    }),
    getMyVideos: procedure
        .input(z.object({
            userID: z.string()
        }))
        .query( async ({ input }) => {
            const { userID } = input;
            const favVideos = await getMyVideos(userID)
            if(favVideos){
                return favVideos
            }else{
                throw new Error('Unable to get the videos');
            }
    }),
    addVideo: procedure
        .input(z.object({ 
            title: z.string(), 
            url: z.string(),
            uri: z.string(),
            thumbnailURI: z.string(),
            userToken: z.string(),
        }))
        .mutation(async ({ input }) => {
            const { title, url, uri, thumbnailURI, userToken } = input;
            try {
                const newVideo = await createVideo({ 
                    title, 
                    url, 
                    uri, 
                    thumbnailURI, 
                    userToken 
                });
                return newVideo;
            } catch (error) {
                console.error('Error adding video:', error);
                throw new Error('Unable to add video');
            }
        }),
    likeVideo: procedure 
        .input(z.object({ 
            videoId: z.string(), 
            userId: z.string()
        }))
        .mutation(async ({ input }) => {
            const { videoId, userId } = input;
            try {
                await likeVideo(videoId, userId)
                return true;
            } catch (error) {
                console.error('Error liking video:', error);
                throw new Error('Unable to like video');
            }
        }),
})

export type VideoRouter = typeof videoRouter;