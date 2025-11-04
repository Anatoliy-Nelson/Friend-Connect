import { BaseResponse, instance } from 'api/commonApi'
import { ResultCode } from 'api/profileApi'


export const authAPI = {
    me: async () => {
        const res = await instance.get<BaseResponse<MeResponseData>>(`auth/me`)
        return res.data
    },
    login: async (email: string, password: string, rememberMe = false, captcha: string | null = null) => {
        const res = await instance.post<BaseResponse<LoginResponseData, ResultCode & ResultCodeForCaptcha>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
        return res.data
    },
    logout: async () => {
        const res = await instance.delete<BaseResponse>(`auth/login`)
        return res.data
    }
}


export type MeResponseData = {
    id: number
    email: string
    login: string
}

export type LoginResponseData = {
    userId: number
    email: string
    login: string
    captcha?: string | null
}


export enum ResultCodeForCaptcha {
    CAPTCHA = 10
}