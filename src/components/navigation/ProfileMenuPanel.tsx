'use client'

import React, { useState }from 'react'

import WhiteButton from '@/components/ui/WhiteButton'
import Link from 'next/link';

import Image from 'next/image';
import { IoLogIn, IoLogOut, IoSettingsSharp } from "react-icons/io5";
import { FaUser, FaUserPlus} from "react-icons/fa6";
import UserButton from '@/components/ui/UserButton';

// ============================================================================
// This only be here for the POC, do not take it in account
import { useUserData } from '@/store/user';
import { mutate } from 'swr';
// ============================================================================


const ProfileMenuPanel =()=>{
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleOpen =()=>{
        // We can set a useEffect to handle resizes of window and change the lock
        if(isOpen){
            document.body.removeAttribute('data-scroll-locked');
            document.body.style.overflow = '';
            setIsOpen(false)
        }else{
            document.body.setAttribute('data-scroll-locked', '1');
            document.body.style.overflow = 'hidden';
            setIsOpen(true)
        }
    }

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


    return <div>
        <UserButton
            startContent={<UserButton/>}
            onClick={handleOpen}
            className='block sm:hidden z-[100]'
        />
        <div className={`fixed top-0 right-0 w-full h-screen z-[9000]
            ${isOpen ? 'bg-black/40 pointer-events-auto':'bg-transparent pointer-events-none'}    
        `}>
            <div className={`w-full max-w-[300px] bg-white h-full absolute top-0 duration-500 ease-in-out
            px-5 py-5 block sm:hidden border-l-[1px] drop-shadow-md
            ${isOpen 
                ? 'block right-0' 
                :'hiddesn right-[-100%]'}
            `}>
                {/* Menu */}
                <nav className='relative flex flex-col gap-5 justify-between h-full pointer-events-auto'>
                    <div className='relative w-full overflow-y-auto'>
                        <div className='relative flex flex-col gap-2 h-fit'>
                            <div className='relative w-full flex justify-end pb-20'>
                                <UserButton
                                    startContent={<UserButton/>}
                                    onClick={handleOpen}
                                    className='block sm:hidden z-[9100]'
                                />
                            </div>
                            <div className='relative w-full border-b-[1px] border-[#f2f2f2] pb-5 mb-1 px-5 font-semibold text-normal pl-1.5'>
                                <span>My Account</span>
                            </div>
                            <Link className={`relative flex flex-row justify-start items-center gap-5 h-[40px]
                                    py-2 px-5 hover:bg-[var(--blue-secondary)] rounded-lg group duration-500`}
                                href={'#'}
                            >
                                <div className={`text-[var(--foreground)]`}>
                                    <FaUser className="mr-2 h-4 w-4" />
                                </div>
                                <span className={`group-hover:text-[var(--foreground)] text-[var(--foreground)] break-nobreak duration-500 font-semibold`}>
                                    Profile
                                </span>
                            </Link>
                            <Link className={`relative flex flex-row justify-start items-center gap-5 h-[40px]
                                    py-2 px-5 hover:bg-[var(--blue-secondary)] rounded-lg group duration-500`}
                                href={'#'}
                            >
                                <div className={`text-[var(--foreground)]`}>
                                    <FaUser className="mr-2 h-4 w-4" />
                                </div>
                                <span className={`group-hover:text-[var(--foreground)] text-[var(--foreground)] break-nobreak duration-500 font-semibold`}>
                                    Settings
                                </span>
                            </Link>
                            <div className='relative w-full border-b-[1px] border-[#f2f2f2] pb-5 mb-1 px-5 font-semibold text-normal pl-1.5 mt-10'>
                                <span>Switch account</span>
                            </div>
                            <button className={`font-semibold text-[var(--foreground)] relative flex flex-row justify-start items-center gap-5 h-[40px]
                                py-2 px-5 hover:bg-[var(--blue-secondary)] rounded-lg group duration-500`}
                                onClick={()=>{
                                    changeUser('user1')
                                }}
                            >
                                <Image 
                                    className="mr-2 h-4 w-4 rounded-full " 
                                    height={20} 
                                    width={20} 
                                    src='/imagine_this_is_s3/user1.avif' 
                                    alt="profile_picture" 
                                />
                                <span>User 1</span>
                            </button>
                            <button className={`font-semibold text-[var(--foreground)] relative flex flex-row justify-start items-center gap-5 h-[40px] 
                                py-2 px-5 hover:bg-[var(--blue-secondary)] rounded-lg group duration-500
                                border-b-[1px] border-[#f2f2f2] pb-5 mb-1 px-5
                            `}
                                onClick={()=>{
                                    changeUser('user2')
                                }}
                            >
                                <Image 
                                    className="mr-2 h-4 w-4 rounded-full " 
                                    height={20} 
                                    width={20} 
                                    src='/imagine_this_is_s3/user2.webp' 
                                    alt="profile_picture" 
                                />
                                <span>User 2</span>
                            </button>
                            <Link className={`relative flex flex-row justify-start items-center gap-5 h-[40px]
                                    py-2 px-5 hover:bg-[var(--blue-secondary)] rounded-lg group duration-500`}
                                href={'#'}
                            >
                                <div className={`text-[var(--foreground)]`}>
                                    <IoLogIn className="mr-2 h-4 w-4" />
                                </div>
                                <span className={`font-semibold group-hover:text-[var(--foreground)] text-[var(--foreground)] break-nobreak duration-500 font-semibold`}>
                                Login new account
                                </span>
                            </Link>
                            <Link className={`relative flex flex-row justify-start items-center gap-5 h-[40px] hover:text-[white] focus:text-[white]
                                    py-2 px-5 text-[var(--red)] hover:bg-[var(--red)] focus:bg-[var(--red)] rounded-lg group duration-500`}
                                href={'#'}
                            >
                                <div className={`text-[var(--foreground)] group-hover:text-white`}>
                                    <IoLogOut className="mr-2 h-4 w-4" />
                                </div>
                                <span className={`font-semibold group-hover:text-white text-[var(--foreground)] break-nobreak duration-500 font-semibold`}>
                                Log out
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
}

export default ProfileMenuPanel