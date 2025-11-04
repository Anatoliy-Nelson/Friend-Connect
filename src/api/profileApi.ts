import { BaseResponse, instance } from 'api/commonApi'

export const profileAPI = {
    getUserProfile: async (userId: number) => {
        if (userId) {
            const res = await instance.get<ProfileResponse>(`profile/${userId}`)
            return res.data
        }
    },
    getStatus: async (userId: number) => {
        const res = await instance.get<string>(`profile/status/${userId}`)
        return res.data
    },
    updateStatus: async (status: string) => {
        const res = await instance.put<BaseResponse>(`profile/status`, { status })
        return res.data
    },
    savePhoto: async (file: File) => {
        let formData = new FormData()
        formData.append('image', file)
        const res = await instance.put<BaseResponse<{ photos: Photos }>>(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    },
    saveProfile: async (profile: ProfileResponse) => {
        const res = await instance.put<BaseResponse>('profile', profile)
        return res.data
    }
}


export type ProfileResponse = {
    userId?: number | undefined
    lookingForAJob?: boolean | undefined
    lookingForAJobDescription?: string | undefined
    fullName?: string | undefined
    contacts?: ContactsType | undefined | {}
    photos: Photos
    aboutMe?: string | undefined // or mainLink
}

export type ContactsType = {
    facebook?: string | null
    website?: string | null
    vk?: string | null
    twitter?: string | null
    instagram?: string | null
    youtube?: string | null
    github?: string | null
    mainLink?: string | null
}

export type Photos = {
    small: string | null
    large: string | null
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
}

