import prisma from '@/lib/prisma'
import { CreateVideoInput } from '@/lib/types'

// ============================================================== GET
/**
 * Retrieves a video by its ID.
 * 
 * @param {string} vid - The ID of the video to retrieve.
 * @param {string} [userID] - Optional user ID to check if the video is liked by the user.
 * @returns {Promise<Object|null>} - A promise that resolves to a video object with:
 *   - `id`, `title`, `url`, `uri`, `thumbnailURI`, `createdBy`, `created`, `likesCount`, `watchCount`, `iLiked`.
 *   Returns `null` if the video is not found.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const getVideo = async (vid: string, userID?:string) => {
    try{
        const video = await prisma.video.findUnique({
            where: {
                id:vid,
            },
            include: {
                likes: true,
                createdBy: true
            },
        })
        if (!video) return null

        return {
            id: video.id,
            title: video.title,
            url: video.url,
            uri: video.uri,
            thumbnailURI: video.thumbnailURI,
            createdBy: {
                id: video.createdBy.id
            },
            created: video.created,
            likesCount: video.likes.length,
            watchCount: video.watchCount,
            isLiked: userID ? video.likes.some(like => like.userId === userID) : false,
        }
    }catch(e:any){
        console.error('Error fetching video:',e)
        throw new Error('Unable to fetch video')
    }
}

/**
 * Fetches a list of videos from the database.
 * 
 * This function retrieves all videos, including information about the number of likes
 * and the user who created each video. The videos are ordered by creation date in descending
 * order. The function formats the video data to include only necessary fields.
 * 
 * @async
 * @function getVideos
 * @returns {Promise<Array|null>} - A promise that resolves to an array of video objects, 
 * or `null` if an error occurs. Each video object contains:
 *   - `id` {string} - The unique identifier of the video.
 *   - `title` {string} - The title of the video.
 *   - `url` {string} - The URL of the video.
 *   - `uri` {string} - The URI of the video.
 *   - `thumbnailURI` {string} - The URI of the video's thumbnail.
 *   - `createdBy` {Object} - An object containing the ID of the user who created the video:
 *     - `id` {string} - The unique identifier of the user.
 *   - `created` {Date} - The date and time when the video was created.
 *   - `likesCount` {number} - The number of likes the video has.
 *   - `watchCount` {number} - The number of times the video has been watched.
 * 
 * @throws {Error} - Throws an error if there is an issue fetching the videos.
 */  
export const getVideos = async () => {
    try{
        const videos = await prisma.video.findMany({
            // take: 20, // TODO: Create batch loading of size 20
            include: {
                likes: true,
                createdBy: true
            },
            orderBy: {
                created: 'desc',
            },
        })
        // Formatting the data
        return videos.map(video => ({
            id: video.id,
            title: video.title,
            url: video.url,
            uri: video.uri,
            thumbnailURI: video.thumbnailURI,
            createdBy: {
                id: video.createdBy.id
            },
            created: video.created,
            likesCount: video.likes.length,
            watchCount: video.watchCount,
        }));
    }catch(e:any){
        console.error('Error fetching videos:', e)
        return null
    }
}

/**
 * Fetches all videos liked by a specific user.
 *
 * @param userId - The ID of the user whose liked videos are to be fetched.
 * @returns An array of videos liked by the specified user, including video details.
 */
export const getFavoriteVideos = async (userId: string) => {
    try {
        // Fetch all video IDs liked by the user
        const likedVideos = await prisma.videoLikes.findMany({
            // take: 20, // TODO: Create batch loading of size 20
            where: { userId },
            select: { videoId: true },
        });

        // Extract video IDs from the liked videos
        const videoIds = likedVideos.map(like => like.videoId)

        // Fetch the video details for the liked video IDs
        const videos = await prisma.video.findMany({
            where: { id: { in: videoIds } },
            include: {
                createdBy: true, // Include details of the user who created the video
                likes: true,     // Include the number of likes
            },
            orderBy: {
                created: 'desc',
            },
        });

        // Formatting the data
        return videos.map(video => ({
            id: video.id,
            title: video.title,
            url: video.url,
            uri: video.uri,
            thumbnailURI: video.thumbnailURI,
            createdBy: {
                id: video.createdBy.id,
                username: video.createdBy.username,
                email: video.createdBy.email,
            },
            created: video.created,
            likesCount: video.likes.length,
            watchCount: video.watchCount,
        }));
    } catch (e: any) {
        console.error('Error fetching liked videos:', e)
        throw new Error('Unable to fetch liked videos')
    }
}

/**
 * Retrieves videos created by a specific user.
 * 
 * @param {string} userID - The ID of the user whose videos are to be fetched.
 * @returns {Promise<Array>} - A promise that resolves to an array of video objects, each containing:
 *   - `id`, `title`, `url`, `uri`, `thumbnailURI`, `createdBy`, `created`, `likesCount`, `watchCount`.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const getMyVideos = async (userID: string) => {
    try {
        // Fetch the video details for the liked video IDs
        const myVideos = await prisma.video.findMany({
            where: {
              userId: userID,
            },
            include: {
                createdBy: true, // Include details of the user who created the video
                likes: true,     // Include the number of likes
            },
        });

        // Formatting the data
        return myVideos.map(video => ({
            id: video.id,
            title: video.title,
            url: video.url,
            uri: video.uri,
            thumbnailURI: video.thumbnailURI,
            createdBy: {
                id: video.createdBy.id
            },
            created: video.created,
            likesCount: video.likes.length,
            watchCount: video.watchCount,
        }));
    } catch (e: any) {
        console.error('Error fetching my videos:', e);
        throw new Error('Unable to fetch my videos');
    }
};
// ============================================================== CREATE
/**
 * Creates a new video record in the database.
 *
 * @param {CreateVideoInput} params - An object containing the details of the video to be created.
 * @param {string} params.title - The title of the video.
 * @param {string} params.url - The URL of the video.
 * @param {string} params.uri - The URI of the video.
 * @param {string} params.thumbnailURI - The thumbnailURI of the video.
 * @param {string} params.userToken - The token representing the user creating the video. This is used to associate the video with the user.
 *
 * @returns {Promise<{
*   id: string;
*   title: string;
*   url: string;
*   uri: string;
*   thumbnailURI: string;
*   userId: string;
*   created: Date;
* }>} - A promise that resolves to the newly created video record.
*
* @throws {Error} - Throws an error if the video creation fails.
*
* @example
* const video = await createVideo({
*   title: 'Amazing Video',
*   url: 'https://example.com/video.mp4',
*   userToken: 'user-id-123',
* });
* console.log(video);
*/
export const createVideo = async ({ title, url, uri, thumbnailURI, userToken }: CreateVideoInput): Promise<{
    id: string;
    title: string;
    url: string;
    uri: string;
    thumbnailURI: string;
    userId: string;
    created: Date;
}> => {
    try {
        // ===========================================================================
        // Suppose that here we obtain the user ID from the DB searching by User Token
        // For simplicity, in my case the token actually is the user ID
        const userID = userToken
        // ===========================================================================
        const newVideo = await prisma.video.create({
            data: {
                title,
                url,
                uri,
                thumbnailURI,
                createdBy: {
                    connect: {
                        id: userID,
                    },
                },
            },
        });
        return newVideo;
    } catch (error) {
        console.error('Error creating video:', error);
        throw new Error('Unable to create video');
    }
}

// ============================================================== PUT
/**
 * Increments the watch count of a video by 1.
 *
 * @param videoId - The unique identifier of the video to update.
 * 
 * @returns {Promise<void>} - Resolves when the update is complete.
 */
export const incrementWatchCount = async (videoId: string) => {
    try {
        await prisma.video.update({
            where: { id: videoId },
            data: { watchCount: { increment: 1 } },
        });
    } catch (error) {
        console.error('Failed to update watch count:', error);
    }
};

/**
 * Likes a video if the user has not liked it yet.
 * 
 * @param {string} videoId - The ID of the video to like.
 * @param {string} userId - The ID of the user giving the like.
 * @returns {Promise<boolean>} - Returns `true` if the video was successfully liked, `false` if the user had already liked the video.
 * @throws {Error} - Throws an error if the operation fails.
 */
export const likeVideo = async (videoId: string, userId: string): Promise<boolean> => {
    try {
        // Check if the user has already liked the video
        const existingLike = await prisma.videoLikes.findUnique({
            where: {
                videoId_userId: {
                    videoId,
                    userId
                }
            }
        });

        // If the like already exists, return false
        if (existingLike) {
            return false;
        }

        // Create a new like
        await prisma.videoLikes.create({
            data: {
                videoId,
                userId
            }
        });
        return true;
    } catch (error) {
        console.error('Error liking video:', error);
        throw new Error('Unable to like the video');
    }
};