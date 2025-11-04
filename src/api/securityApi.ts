import { instance } from 'api/commonApi'


export const securityAPI = {
    getCaptchaUrl: async () => {
        const res = await instance.get<CaptchaResponse>(`security/get-captcha-url`)
        return res.data
    }
}


export type CaptchaResponse = {
    url: string
}