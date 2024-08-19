
import useSWR from 'swr';
import { trpc_client } from '@/utils/trpc_client';

/**
 * Custom hook for fetching and managing video data.
 *
 * This hook uses `useSWR` to fetch video data from the `/getVideos` RTPC endpoint.
 * It provides functionality to handle loading, error states, and automatic
 * retries in case of fetch failures.
 *
 * @returns An object containing:
 * - `videos`: The video data fetched from the server. This will be an array of video objects or `undefined` if the data is not yet loaded or an error occurred.
 * - `isLoading`: A boolean indicating whether the data is currently being loaded.
 * - `isError`: A boolean indicating whether an error occurred during data fetching.
 * - `mutate`: A function to manually revalidate the data or update the cache.
 *
 * The hook automatically retries fetching data if an error occurs, up to 2 retries,
 * with a 5-second delay between retries. The hook does not automatically revalidate
 * on focus or reconnect.
 */
export const useVideos = () => {
    const { data, error, isLoading, mutate } = useSWR('/getVideos', async () => {
        const videos = await trpc_client.video.getVideos.query();
        return videos
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) =>{
            if (retryCount >= 2) return []
            setTimeout(() => revalidate({ retryCount }), 5000)
        }
    })

    return {
        videos: data,
        isLoading,
        isError: !!error,
        mutate
    }
}

/**
 * Fetches a user's favorite videos using SWR.
 * 
 * @param {string} userID - User ID to fetch favorite videos for.
 * @returns {Object} - An object containing:
 *   - `videos`: List of favorite videos.
 *   - `isLoading`: Boolean indicating if the request is in progress.
 *   - `isError`: Boolean indicating if there was an error.
 *   - `mutate`: Function to re-fetch the favorite videos data.
 */
export const useFavoriteVideos = (userID:string) => {
    const { data, error, isLoading, mutate } = useSWR('/getFavoriteVideos'+userID, async () => {
        const videos = await trpc_client.video.getFavoriteVideos.query({userID:userID});
        return videos
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) =>{
            if (retryCount >= 2) return []
            setTimeout(() => revalidate({ retryCount }), 5000)
        }
    })

    return {
        videos: data,
        isLoading,
        isError: !!error,
        mutate
    }
}

/**
 * Fetches videos created by a specific user using SWR.
 * 
 * @param {string} userID - User ID to fetch videos for.
 * @returns {Object} - An object containing:
 *   - `videos`: The list of videos created by the user.
 *   - `isLoading`: Boolean indicating if the request is in progress.
 *   - `isError`: Boolean indicating if there was an error.
 *   - `mutate`: Function to re-fetch the videos data.
 */
export const useMyVideos = (userID:string) => {
    const { data, error, isLoading, mutate } = useSWR('/getMyVideos'+userID, async () => {
        const videos = await trpc_client.video.getMyVideos.query({userID:userID});
        return videos
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) =>{
            if (retryCount >= 2) return []
            setTimeout(() => revalidate({ retryCount }), 5000)
        }
    })

    return {
        videos: data,
        isLoading,
        isError: !!error,
        mutate
    }
}

/**
 * Fetches video data using SWR.
 * 
 * @param {string} vid - Video ID.
 * @param {string} [userID] - Optional user ID to check video details.
 * @returns {Object} - An object containing:
 *   - `video`: The video data.
 *   - `isLoading`: Boolean indicating if the request is in progress.
 *   - `isError`: Boolean indicating if there was an error.
 *   - `mutate`: Function to re-fetch the video data.
 */
export const useVideo = (vid: string, userID?:string) => {
    const { data, error, isLoading, mutate } = useSWR('/getVideo'+vid+userID, async () => {
        const video = await trpc_client.video.getVideo.query({
            vid, 
            userID:userID
        });
        return video
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) =>{
            if (retryCount >= 2) return null
            setTimeout(() => revalidate({ retryCount }), 5000)
        }
    })

    return {
        video: data,
        isLoading,
        isError: !!error,
        mutate
    }
}