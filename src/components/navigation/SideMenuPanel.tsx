'use client'

import React, { useState }from 'react'

import WhiteButton from '@/components/ui/WhiteButton'
import Link from 'next/link';

import { HiDotsVertical } from "react-icons/hi";
import { links, helpLinks } from '@/constants/sidebarLinks'
import { usePathname } from 'next/navigation'

const SideMenuPanel =()=>{
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
    const pathname = usePathname()

    return <div>
        <WhiteButton 
            startContent={<HiDotsVertical/>}
            onClick={handleOpen}
            className='block sm:hidden z-[100]'
        />
        <div className={`fixed top-0 right-0 w-full h-screen z-[9000] pointer-events-none
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
                                <WhiteButton 
                                    startContent={<HiDotsVertical/>}
                                    onClick={handleOpen}
                                    className='block sm:hidden z-[9100]'
                                />
                            </div>
                            {links.map((link, index) => (
                                <Link
                                    className={`relative flex flex-row justify-start items-center gap-5 h-[40px]
                                        py-2 px-5 hover:bg-[var(--blue-secondary)] rounded-lg group duration-500
                                        ${pathname === link?.href ? 'bg-[var(--blue-primary)]' : ''}
                                    `}
                                    href={link?.href}
                                    key={index}
                                >
                                    <div className={`${pathname === link?.href 
                                        ?'text-white group-hover:text-[var(--foreground)]'
                                        :'text-[var(--foreground)]'}
                                    `}>
                                        {link.icon}
                                    </div>
                                    <span className={`group-hover:text-[var(--foreground)] break-nobreak duration-500 font-semibold
                                        ${pathname === link?.href 
                                            ?'text-white' 
                                            :'text-[var(--foreground)]'}
                                    `}>{link?.name}</span>
                                </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className='relative flex flex-col gap-2'>
                        <div className='realtive h-[1px] bg-[#f2f2f2] w-full'/>
                        {helpLinks.map((link, index) => (
                            <Link
                                className={`relative flex flex-row justify-start items-center gap-5 h-[40px]
                                    py-2 px-5 hover:bg-[var(--blue-secondary)] rounded-lg group duration-500
                                    ${pathname === link?.href ? 'bg-[var(--blue-primary)]' : ''}
                                `}
                                href={link?.href}
                                key={index}
                            >
                                <div className={`${pathname === link?.href 
                                    ?'text-white group-hover:text-[var(--foreground)]'
                                    :'text-[var(--foreground)]'}
                                `}>
                                    {link.icon}
                                </div>
                                <span className={`group-hover:text-[var(--foreground)] break-nobreak duration-500 font-semibold
                                    ${pathname === link?.href 
                                        ?'text-white' 
                                        :'text-[var(--foreground)]'}
                                `}>{link?.name}</span>
                            </Link>
                            ))
                        }
                    </div>
                </nav>
            </div>
        </div>
    </div>
}

export default SideMenuPanel