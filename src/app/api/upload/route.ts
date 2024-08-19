import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 
import { allowedMimeTypes } from '@/constants/video'
import { ensureDirectoryExists } from '@/lib/utils/helpers'

/**
 * =============================================================================
 * IMPORTANT: In this development environment, we store data in a local folder 
 * for DEV BUILD as the test specifies that we should use in-house storage rather than an 
 * external CDN. For production environments, it is recommended to use a 
 * storage service like AWS S3, a CDN, or another external storage solution 
 * rather than storing data in the public folder.
 *
 * Example implementation for uploading files to AWS S3:
 * 
 * const uploadToS3 = async (buffer: Buffer, filename: string, bucket: string) => {
 *   const params = {
 *       Bucket: bucket,
 *       Key: filename,
 *       Body: buffer,
 *       ContentType: 'application/octet-stream',
 *   };
 *
 *   return s3.upload(params).promise();
 * };
 * =============================================================================
 * 
 * 
 * Handles file uploads from the client.
 * 
 * This function processes a `POST` request containing a video file in the form data. It performs the following tasks:
 * 
 * 1. **Form Data Extraction**: Retrieves the file with the key `'video'` from the submitted form data.
 * 2. **File Naming and Path**: Generates a unique file name using `uuidv4()` and constructs the path for saving the file.
 * 3. **File Writing**: 
 *    - Creates a writable stream to save the file to the server's `./public/videos/` directory.
 *    - Converts the uploaded file to a buffer and writes it to the file stream.
 *    - Handles errors during file writing and logs them.
 *    - Resolves successfully upon completion of the file write operation.
 * 4. **Response Handling**: 
 *    - Returns a `200 OK` response with a success message if the file is saved successfully.
 *    - Returns a `400 Bad Request` response if no file is found in the request.
 *    - Returns a `500 Internal Server Error` response for unexpected errors.
 * 
 * @param {NextRequest} request - The incoming request object containing the file upload.
 * @returns {NextResponse} - A JSON response indicating the result of the file upload operation.
 */
export async function POST(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    message: string;
    uri: string;
}>>{
    try {
        const formData = await request.formData()
        const video = formData.get('video') as File | null
        const thumbnail = formData.get('thumbnail') as File | null

        if (!video) {
         return NextResponse.json({ error: 'No video file found' }, { status: 400 })
        }
        // Is the file type allowed?
        if (!allowedMimeTypes.includes(video.type.toLowerCase())) {
            return NextResponse.json({ error: 'Unsupported file MIME type' }, { status: 400 })
        }
        // Is the file size within the allowed limit?
        if (video.size > parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '1024209715200')) {
            return NextResponse.json({ error: 'File size exceeds the maximum allowed' }, { status: 400 })
        }

        // Generating the unique file name and its path
        const uniqueFileID = uuidv4()
        const extension = path.extname(video.name)
        const filename = path.join(process.cwd(), `./public/videos/${uniqueFileID}${extension}`)
        const videoURL = process.env.NEXT_PUBLIC_SERVER_URL + '/videos/' + uniqueFileID + extension
        const videoURI = '/videos/' + uniqueFileID + extension

        // Paths for video and thumbnail
        const videosDir = path.join(process.cwd(), './public/videos');
        const thumbnailsDir = path.join(process.cwd(), './public/thumbnails');

        // Ensure directories exist
        await ensureDirectoryExists(videosDir);
        await ensureDirectoryExists(thumbnailsDir);

        // Creating the writable stream to the destination file
        const fileStream = fs.createWriteStream(filename)

        // Converting the file to an array buffer
        const buffer = Buffer.from(await video.arrayBuffer())

        // Promise to handle the file writing
        const writeFilePromise = new Promise<void>((resolve, reject) => {
            fileStream.on('error', (error) => {
                console.error('Error while saving the file:', error)
                reject(new Error('Upload failed'))
            });
            fileStream.on('finish', () => {
                console.log('File saved successfully')
                resolve()
            });
            // Write the buffer to the file
            fileStream.write(buffer)
            fileStream.end() // End the stream
        });
        await writeFilePromise; // Waiting for the file writing to finish

        // ============================================================================
        // Saving the thumbnail
        // ============================================================================
        if (thumbnail) {
            const thumbnailPath = path.join(process.cwd(), `./public/thumbnails/${uniqueFileID}.jpeg`)
            const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer())
            fs.writeFileSync(thumbnailPath, thumbnailBuffer)
        }
        const thumbnailURI = '/thumbnails/' + uniqueFileID + '.jpeg'

        return NextResponse.json({ 
            message: 'File saved successfully',
            url: videoURL,
            uri: videoURI,
            thumbnailURI: thumbnailURI
        }, { status: 200 })

    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 })
    }
}
