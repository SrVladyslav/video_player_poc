'use client'

import React from 'react'
import { Button, ButtonProps } from './button'
import { useUserData } from '@/store/user'
import UserAvatar from '@/components/ui/UserAvatar'
import { cn } from "@/lib/utils"

interface UserButtonProps extends ButtonProps {
    startContent?: React.ReactNode,
    endContent?: React.ReactNode,
    isLoading?: boolean,
    isDisabled?: boolean,
}

const UserButton: React.FC<UserButtonProps> = ({
    startContent,
    endContent,
    isLoading, 
    isDisabled,
    size = 'default',
    asChild,
    className,
    ...props
}) => {
    const { userData } = useUserData()
    const { profile_picture } = userData || {}

    return (
        <Button 
            className={cn('relative bg-[var(--bg-secondary)] hover:bg-[var(--blue-primary)] text-[var(--foreground)] hover:text-white group duration-200 flex flex-row gap-2 px-2 pr-3 border-1 border-[#f2f2f2] drop-shadow-sm', className)} 
            size={size}
            asChild={asChild}
            disabled={isDisabled || isLoading}
            {...props} // Pass the rest of the props to Button
        >
            <UserAvatar profile_picture={profile_picture}/>
            <span className='font-semibold hidden sm:block'>{userData?.username || 'Username'}</span>
            {endContent}
        </Button>
    )
}

export default UserButton
