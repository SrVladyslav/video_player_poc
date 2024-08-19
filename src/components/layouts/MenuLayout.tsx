import React from 'react'
import Sidebar from '@/components/navigation/Sidebar'
import Navbar from '@/components/navigation/Navbar'

const MenuLayout =({
    children
}:Readonly<{
    children?: React.ReactNode;
}>)=>{
    return (
        // grid grid-cols-1 sm:grid-cols-[300px_1fr] 
        <div className="relative font-sans bg-[var(--bg-primary)]
            flex flex-row w-full h-full
        ">
            <Sidebar/>
            <div className='flex justify-center w-full h-full pb-6'>
                <main className='relative w-full max-w-screen-2xl h-full
                    flex flex-col items-center gap-12 pb-24 overflow-hidden
                '>
                    <Navbar/>
                    <div className="w-full flex justify-center break-all px-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MenuLayout