import React, { useState }from 'react'
import { IoCloseCircle, IoCloudUpload} from "react-icons/io5";
import { allowedMimeTypesStr, allowedMimeTypes, allowedMimeTypesExtensions} from '@/constants/video'
import { toast } from "sonner"

const FileDragAndDrop =({
    onChange,
    progress  
}:{
    onChange: (event: File | undefined) => void;
    progress: React.ReactNode;
})=>{
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [drag, setDrag] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const checkFileType = (file: File) => {
        const fileType = file.type.toLowerCase();
        const allowedFileTypes = allowedMimeTypes;
        return allowedFileTypes.includes(fileType);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | File) => {
        let selectedFile: File | undefined;
        
        if(event instanceof File) {
            selectedFile = event;
        }else{
            selectedFile = event.target.files?.[0];
        }
        if (selectedFile) {
            if(!checkFileType(selectedFile)) {
                toast.error("File type not allowed", {duration: 3000});
                return
            }
            const url = URL.createObjectURL(selectedFile);
            setVideoUrl(url);
            onChange(selectedFile);
        }
    };

    // Delete the current image
    const resetImage =()=>{
        try{
            onChange(undefined)
            setVideoUrl(null)
        }catch(e){}
    }

    // Drag Functions
    function dragStartHandler(e:any) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e:any){
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e:any){
        e.preventDefault()
        setDrag(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            handleFileChange(droppedFile);
        }
    }

    return (
        <div className='realtive w-fit flex flex-col gap-2'>
            <div className={`
                relative w-fit h-fit min-h-[150px] min-w-[250px]
                border border-2 border-dashed
                ${isFocused ? 'border-[var(--blue-primary)]' : 'border-[var(--foreground)] '}
                duration-75 rounded-3xl p-2 
            `}>
                {drag?
                    <div
                        className='realtive h-full w-full min-h-[150px]
                            min-w-[250px] flex flex-col justify-center cursor-pointer
                            items-center  rounded-2xl
                        '
                        onDragStart={e=>dragStartHandler(e)}
                        onDragLeave={e=>dragLeaveHandler(e)}
                        onDragOver={e=>dragStartHandler(e)}
                        onDrop={e=> onDropHandler(e)}
                    >
                        <span className='text-[var(--foreground-active)] text-normal'>Drop your video here</span>
                    </div>
                    :<div
                        className={`relative min-h-[150px] min-w-[250px] h-[auto] 
                            w-[auto] max-h-[350px] max-w-[350px] flex justify-center
                            items-center rounded-2xl text-center cursor-pointer overflow-hidden
                            bg-[var(--background)] group
                            ${videoUrl ?'':'hover:bg-[var(--blue-secondary)]'}    
                        `}
                        onDragStart={e=>dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e=>dragStartHandler(e)}
                    >
                        {videoUrl?
                            <>  
                                <div className='relative h-full w-full flex overflow-hidden
                                    justify-center items-center'>
                                    {videoUrl && (
                                        <div className='relative w-full pb-[56.25%] overflow-hidden
                                            bg-[#f2f2f2] rounded-2xl border-[1px] border-[#f2f2f2] shadow-lg
                                        '>
                                            <video controls={false} className="absolute top-0 left-0 w-full h-full border-[1px] border-[var(--blue-secondary)]">
                                                <source src={videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}
                                </div>
                                <div className='absolute top-2 right-2 z-[999] icon-mini
                                    rounded-full bg-white group
                                '
                                    onClick={resetImage}
                                >
                                    <IoCloseCircle className='relative group-hover:stroke-[var(--red)]
                                        h-5 w-5 min-h-5 min-w-5
                                        stroke-[var(--foreground)]'/>
                                </div>
                            </>:<>
                                <input 
                                    type="file"
                                    name='banner'
                                    accept={allowedMimeTypesStr}
                                    onChange={handleFileChange}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className='absolute top-0 left-0 w-full h-full
                                        opacity-0 pointer-events-auto cursor-pointer
                                        rounded-2xl pointer'
                                />  
                                <div className='flex flex-col gap-1 pointer-events-none'>
                                    <div className='relative w-full flex justify-center'>
                                        <IoCloudUpload className='h-6 w-6 min-h-6 min-w-6'/>
                                    </div>
                                    <h2 className='text-[var(--foreground-active)] text-normal font-semibold'>Upload your video</h2>
                                    <h3 className='text-sm gray-text'>{allowedMimeTypesExtensions}</h3>
                                </div>
                            </>
                        }
                    </div>
                }
            </div>
            {videoUrl && 
                <>
                    {progress}
                </>
            }
        </div>
    )
}

export default FileDragAndDrop