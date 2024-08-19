import { create } from 'zustand'
import { exploreListTypes } from '@/constants/video'

interface SystemDataState {
    sidebarActiveState: boolean;
    exploreListSelectedVideos:string,
    setSidebarActiveState: (sidebarState: boolean) => void;
    setExploreListSelectedVideos: (vType: string) => void;
}

export const useSystemData = create<SystemDataState>((set) => ({
    sidebarActiveState: true,
    exploreListSelectedVideos: 'all',
    setSidebarActiveState: (sidebarState:boolean) => set({ sidebarActiveState: sidebarState }),
    setExploreListSelectedVideos: (vType:string) => {
        const validType = exploreListTypes.includes(vType) ? vType : 'all';
        set({ exploreListSelectedVideos: validType });
    },
}))
