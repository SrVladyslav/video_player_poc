import { FaHeart } from "react-icons/fa"
import { BiSolidVideos } from "react-icons/bi"
import { FaFireFlameCurved } from "react-icons/fa6"
import { MdOutlineHelp } from "react-icons/md"
import { IoSettingsSharp } from "react-icons/io5";

interface SidebarLink {
    icon: React.ReactNode;
    name: string;
    href: string;
    id:string;
}

const links:SidebarLink[] = [
    {
        icon: <FaFireFlameCurved className='h-4 w-4 min-h-4 min-w-4'/>,
        name: 'Todo',
        href: '/',
        id: 'all'
    },
    {
        icon: <BiSolidVideos className='h-4 w-4 min-h-4 min-w-4'/>,
        name: 'Tus videos',
        href: '/my_videos',
        id: 'my_videos'
    },
    {
        icon: <FaHeart className='h-4 w-4 min-h-4 min-w-4'/>,
        name: 'Favoritos',
        href: '/favorites',
        id: 'favorites'
    }
]

const helpLinks:SidebarLink[] = [
    {
        icon: <IoSettingsSharp className='h-5 w-5 min-h-5 min-w-5'/>,
        name: 'Settings',
        href: '#',
        id: 'settings'
    },
    {
        icon: <MdOutlineHelp className='h-5 w-5 min-h-5 min-w-5'/>,
        name: 'Help',
        href: '#',
        id: 'help'
    }
]

export {
    links,
    helpLinks
}