'use client'

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image';
import { IoLogIn, IoLogOut, IoSettingsSharp } from "react-icons/io5";
import { FaUser, FaUserPlus} from "react-icons/fa6";
import UserButton from './UserButton';

// ============================================================================
// This only be here for the POC, do not take it in account
import { useUserData } from '@/store/user';
import { mutate } from 'swr';
// ============================================================================

const UserMenuDropdown =()=>{
    // ============================================================================
    // This only be here for the POC, do not take it in account
    const { setUser1, setUser2 } = useUserData()
    const changeUser =(user:string)=> {
        if(user === 'user1'){
            setUser1() 
        }else{
            setUser2()
        }
        mutate(() => true)
    }
    // ============================================================================

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <UserButton/>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
            sideOffset={10}
            // alignOffset={8}
            align='end'
            className="w-56 p-2"
        >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-[#f2f2f2]'/>
            <DropdownMenuGroup>
                <DropdownMenuItem className='cursor-pointer hover:bg-[var(--blue-secondary)] focus:bg-[var(--blue-secondary)]'>
                    <FaUser className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer hover:bg-[var(--blue-secondary)] focus:bg-[var(--blue-secondary)]'>
                    <IoSettingsSharp className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className='cursor-pointer hover:bg-[var(--blue-secondary)] focus:bg-[var(--blue-secondary)] open:bg-[var(--blue-secondary)]'>
                        <FaUserPlus className="mr-2 h-4 w-4" />
                        <span>Switch account</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem 
                                onClick={()=>{
                                    changeUser('user1')
                                }}
                                className='cursor-pointer hover:bg-[var(--blue-secondary)] focus:bg-[var(--blue-secondary)]'
                            >
                                <Image 
                                    className="mr-2 h-4 w-4 rounded-full " 
                                    height={20} 
                                    width={20} 
                                    src='/imagine_this_is_s3/user1.avif' 
                                    alt="profile_picture" 
                                />
                                <span>User 1</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={()=>{
                                    changeUser('user2')
                                }}
                                className='cursor-pointer hover:bg-[var(--blue-secondary)] focus:bg-[var(--blue-secondary)]'
                            >
                                <Image 
                                    className="mr-2 h-4 w-4 rounded-full " 
                                    height={20} 
                                    width={20} 
                                    src='/imagine_this_is_s3/user2.webp' 
                                    alt="profile_picture" 
                                />
                                <span>User 2</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <IoLogIn className="mr-2 h-4 w-4" />
                                <span>Login new account</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer text-[var(--red)] hover:bg-[var(--red)] focus:bg-[var(--red)]
                hover:text-[white] focus:text-[white]
            '>
                <IoLogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
}

export default UserMenuDropdown