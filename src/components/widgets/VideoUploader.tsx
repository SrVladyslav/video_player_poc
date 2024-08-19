'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { IoCloudUpload } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";

import FileDragAndDrop from '@/components/widgets/FileDragAndDrop'
import CTAButton from '@/components/ui/CTAButton'
import WhiteButton from '@/components/ui/WhiteButton'
import InputWithLabel from "@/components/ui/InputWithLabel";
import { Progress } from "@/components/ui/progress"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { trpc_client } from "@/utils/trpc_client";
import { useUserData } from "@/store/user";

// Form schema
const uploadVideoSchema = z.object({
    title: z.string().min(0).max(60, {message: "Title must be between 0 and 60 characters"}).optional(),
    file: z.instanceof(File, {message: "Video must be selected"})
            .refine((file) => file.size < parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || "209715200", 10), {message: "File size must be less than 200 MB"}),
})
// Type for form data
type FormData = z.infer<typeof uploadVideoSchema>;

import {generateAndSaveThumbnail} from "@/lib/utils/thumbnail"; // DELET

function VideoUploader() {
    const [isLoading, setIsLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [videoURI, setVideoURI] = useState<string>('');
    const { userToken } = useUserData();
    const router = useRouter()

    // Initialize React Hook Form
    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(uploadVideoSchema),
        defaultValues: {
            title: "",
            file: undefined
        }
    });

    /**
     * Updates the database with the details of a new video.
     * 
     * - Uses TRPC client to mutate the database by adding a video entry.
     * - Requires a valid `userToken` for authorization.
     * - Logs the mutation result or any errors encountered during the process.
     * 
     * @param title - The title of the video.
     * @param url - The URL where the video is hosted.
     * @param userToken - The authentication token of the user; must be non-null for the update to proceed.
     * 
     * @returns {Promise<void>} - A promise that resolves when the database update is complete.
     */
    const handleDBUpdate = async (
        title: string, 
        url: string, 
        uri:string, 
        thumbnailURI:string, 
        userToken: string | null
    ) => {
        try {
            if (!userToken) return;
            const mutation = await trpc_client.video.addVideo.mutate({
                title: title,
                url: url,
                uri: uri,
                thumbnailURI: thumbnailURI,
                userToken: userToken ,
            })
            const videoURI = `/watch?vid=${mutation.id}`
            setVideoURI(videoURI)
            setIsLoading(false)
            setUploaded(true)
        }catch(e:any){
            console.log("HA petao :" + e)
            setIsLoading(false)
        }
    }

    /**
     * Handles file upload to the server and updates the database with the file's URL.
     * Tracks upload progress, handles server responses, and manages errors.
     * 
     * - Sends a POST request to "/api/upload" with the selected file.
     * - Updates progress via `setProgress`.
     * - On success, updates the database and sets a success message.
     * - On failure, sets an error message.
     * - Handles network errors and issues during form data preparation.
     */
    const onFileUpload = async (file: File, title?:string) => {
        setError(null)
        setIsLoading(true)

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload", true);

        // Track upload progress
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded * 100) / event.total);
                setProgress(percentComplete);
            }
        };

        // Handle server response
        xhr.onload = () => {
            try{
                const response = JSON.parse(xhr.responseText);
                if (xhr.status === 200 && response.uri) {
                    const processedTitle = title ? title : 'Video without title'
                    handleDBUpdate(processedTitle, response.url, response.uri, response.thumbnailURI ,userToken)
                } else if (xhr.status != 200 ||response.error) {
                    setError(response.error);
                } else {
                    setError("Unexpected response format");
                }
            }catch(e:any){
                setError("Unexpected response format");
                setIsLoading(false)
            }
        };

        // Handle network errors
        xhr.onerror = (e:any) => {
            setError("An error occurred: " + e.message);
            setIsLoading(false)
        };

        try{
            const thumbnail = await generateAndSaveThumbnail(file) // DELETE ME

            const formData = new FormData();
            formData.append("video", file);
            formData.append("thumbnail", thumbnail)
            xhr.send(formData);
        }catch(e:any){
            setError("An error occurred while preparing the upload: " + (e.message || "Unknown error"));
            setIsLoading(false)
        }
    };

    // Handle form submit
    const onSubmit = (data: FormData) => {
        console.log('FORM DATA: ', data)
        if (data.file) {
            onFileUpload(data.file, data.title);
        }
    };

    return (
        <div className="relative w-full h-fit flex flex-col gap-8 items-start">
            <h1 className="text-4xl font-semibold">Upload new video</h1>
            {uploaded 
                ?<>
                    <p className="text-[var(--foreground)] pb-6">Video uploaded successfully!</p>
                    <div className="relative w-full flex flex-col gap-2">
                        <CTAButton 
                            startContent={
                                <FaLink className="h-4 w-4 min-h-4 min-w-4"/>
                            } 
                            onClick={
                                ()=>{router.push(`${videoURI}`)}
                            }
                        >Go to video</CTAButton>
                        <WhiteButton 
                            primary
                            startContent={
                                <IoCloudUpload className="h-4 w-4 min-h-4 min-w-4"/>
                            } 
                            onClick={()=>{ window.location.reload() }}
                        >Upload another video</WhiteButton>
                    </div>
                </>:<>
                    <p className="text-[var(--foreground)] pb-6">Simply select the video you like the most and ensure it has the correct format.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                        <Controller
                            name="file"
                            control={control}
                            render={({ field }) => (
                                <FileDragAndDrop
                                    onChange={(video) => {
                                        if (video) {
                                            console.log("video: " + video)
                                            setValue("file", video);
                                            setProgress(0);
                                        }
                                    }}
                                    progress={
                                        field.value && progress > 0 && <Progress value={progress} className="w-[270px] h-2" color="red"/>
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="title"
                            control={control}
                            render={({ field}) => (
                                <InputWithLabel
                                    isFullWidth
                                    disabled={isLoading}
                                    label="Video title"
                                    endContent={<span className="text-xs text-[var(--blue-primary)] bg-[var(--blue-secondary)] py-0.5 px-1.5 rounded-2xl">Optional</span>}
                                    placeholder="Video title"
                                    {...field}
                                />
                            )}
                        />
                        <CTAButton 
                            type="submit"
                            startContent={
                                <IoCloudUpload className="h-4 w-4 min-h-4 min-w-4"/>
                            } 
                            isFullWidth  
                            onClick={handleSubmit(onSubmit)}
                        >Upload</CTAButton>
                        <div className="relative w-full flex flex-col gap-2">
                            {errors.file && (
                                <p className="pl-2 mb-2 text-sm text-[var(--red)]">- {errors.file.message}</p>
                            )}
                            {error && (
                                <p className="pl-2 mb-2 text-sm text-[var(--red)]">- {error}</p>
                            )}
                        </div>
                    </form>
                </>
            }
        </div>
    );
}

export default VideoUploader;
