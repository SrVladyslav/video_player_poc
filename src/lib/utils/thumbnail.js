import generateMediaThumbnail from 'browser-thumbnail-generator';

/**
 * Generates and saves a thumbnail from a video file.
 *
 * @param {File} videoFile - The video file from which to generate the thumbnail.
 * @returns {Promise<File>} - A promise that resolves to the saved thumbnail file.
 */
export const generateAndSaveThumbnail = async (videoFile) => {
    const response = await generateMediaThumbnail({
        file: videoFile, // image/video file
        width: 430,
        height: 250,
        maintainAspectRatio: true,
        timestamp: 0
    })
    return response.thumbnail
};