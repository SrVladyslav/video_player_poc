'use client'

import React from 'react'
import { useSystemData } from '@/store/system'
import Link from 'next/link'

import { links, helpLinks } from '@/constants/sidebarLinks'
import { usePathname } from 'next/navigation'
import { IoIosArrowBack } from "react-icons/io";

const Sidebar =()=>{
    const { sidebarActiveState, setSidebarActiveState } = useSystemData()
    const pathname = usePathname()

    return <div className={`sticky top-0 left-0
        hidden sm:flex flex-col gap-14
        h-screen min-h-[100vh] duration-500
        bg-[var(--bg-secondary)] border-r border-r-1 border-r-[#f2f2f2]
        drop-shadow-sm py-5 px-5
        ${sidebarActiveState ? 'max-w-[230px] md:max-w-[300px] w-full md:px-8' : 'max-w-[200px] w-fit md:px-5'}
    `}>
        {/* Logo */}
        <div className={`relative h-[40px] min-h-[40px] flex items-center duration-500
            ${sidebarActiveState ? 'justify-start': 'justify-center'}`
        }>
            <span className='relative font-bold p-2 min-w-[40px] w-[40px] text-center
                bg-[var(--blue-primary)] text-white rounded-lg'>VP</span>
            {sidebarActiveState &&
                <span className='relative font-bold p-2 text-[var(--foreground)]'>VideoPlayer</span>
            }
        </div>
        {/* Toggle burguer */}
        <div className={`absolute top-8 cursor-pointer pointer-events-auto duration-500
            ${sidebarActiveState ? 'right-1.5' : 'right-[2px]'}
        `} 
            onClick={
                ()=>{setSidebarActiveState(!sidebarActiveState)}
            }
        >
            <div className='relative bg-[var(--blue-primary)] h-5 w-5 min-h-5 min-w-5 rounded-full
                flex items-center justify-center duration-500 pointer-events-none
            '>
                <IoIosArrowBack className={`h-4 w-4 min-h-4 min-w-4 fill-white pointer-events-none duration-500
                    ${sidebarActiveState ? 'rotate-0' : 'rotate-180'}
                `}/>
            </div>
        </div>
        {/* Menu */}
        <nav className='relative flex flex-col gap-5 justify-between h-full'>
            <div className='relative w-full overflow-y-auto'>
                <div className='relative flex flex-col gap-2 h-fit'>
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
                                ${sidebarActiveState 
                                    ?'block'
                                    :'hidden'}
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
                            ${sidebarActiveState 
                                ?'block'
                                :'hidden'}
                        `}>{link?.name}</span>
                    </Link>
                    ))
                }
            </div>
        </nav>
    </div>
}

export default Sidebar