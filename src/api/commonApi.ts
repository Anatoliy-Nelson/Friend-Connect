import axios from 'axios'
import { ResultCode } from 'api/profileApi'

export const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': '7f15f5e2-c88e-46d5-bb4f-7b74dff49da1' },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export type BaseResponse<T = {}, R = ResultCode> = {
    data: T
    messages: string[]
    resultCode: R
}