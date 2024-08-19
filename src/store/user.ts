import { create } from 'zustand'

type UserData = {
  username: string, 
  email: string,
  profile_picture?: string,
}

type UserStore = {
  userToken: string | null;
  userData: UserData | null;
  setUserToken: (newToken: string) => void;
  setUserData: (newData: UserData) => void;
  setUser1: () => void;
  setUser2: () => void;
}

export const useUserData = create<UserStore>((set) => ({
  userToken: process.env.NEXT_PUBLIC_USER_ID_1,
  userData: {
    username: 'user1',
    email: 'user1@email.com',
    profile_picture: ''
  },
  setUserToken: (newToken: string) => set({ userToken: newToken }),
  setUserData: (newData: UserData) => set({ userData: newData }),
  setUser1: () => set({ 
    userData: {
      username: 'user1',
      email: 'user1@email.com',
      profile_picture: '/imagine_this_is_s3/user1.avif'
    },
    userToken: process.env.NEXT_PUBLIC_USER_ID_1
  }),
  setUser2: () => set({ 
    userData: {
      username: 'user2',
      email: 'user2@email.com',
      profile_picture: '/imagine_this_is_s3/user2.webp'
    },
    userToken: process.env.NEXT_PUBLIC_USER_ID_2
  }),
}))
