import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUserCircle } from "react-icons/fa";

const UserAvatar =({profile_picture}:{profile_picture?:string})=>{
    return (
        <Avatar className='relative flex items-center justify-center h-6 w-6 min-h-6 min-w-6 rounded-full
            border-[2px] border-[var(--blue-primary)] group-hover:border-white duration-200
        '>
            <AvatarImage src={profile_picture || "https://github.com/shadcn.png"}/>
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar