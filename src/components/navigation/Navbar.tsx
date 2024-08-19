import React from 'react'
import UserMenuDropdown from '@/components/ui/UserMenuDropdown'
import WhiteButton from '@/components/ui/WhiteButton'
import SideMenuPanel from '@/components/navigation/SideMenuPanel'
import ProfileMenuPanel from '@/components/navigation/ProfileMenuPanel'

import { RiVideoAddFill } from "react-icons/ri";

const Navbar =()=>{
    return <div className='sticky top-0 left-0 w-full z-[8888]
        backdrop-blur-3xl bg-[var(--bg-primary)] pt-5 px-6 pb-2
        flex flex-row justify-between sm:justify-end max-w-screen-2xl
    '>
        {/* Logo here TODO */}
        <span className='relative font-bold p-2 min-w-[40px] w-[40px] text-center
                bg-[var(--blue-primary)] text-white rounded-lg block sm:hidden'>VP</span>
        {/* Menu */}
        <div className='w-fit flex flex-row gap-2 sm:gap-3 items-center'>
            <WhiteButton href='/upload'>
                <RiVideoAddFill className='h-4 w-4'/>
            </WhiteButton>
            <div className='relative w-full h-full hidden sm:block'>
                <UserMenuDropdown/>
            </div>
            <div className='relative w-full h-full block sm:hidden'>
                <ProfileMenuPanel/>
            </div>
            <SideMenuPanel/>
        </div>
    </div>
}

export default Navbar