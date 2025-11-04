import { BaseResponse, instance } from 'api/commonApi'
import { Photos } from 'api/profileApi'


export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number, term: string  | null='' , friend: null | boolean = null) => {
         return instance
            .get<UsersResponse>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend=== null ? '' : `&friend=${friend}`))
    },
    followUser: (userId: number) => {
        return instance.post<BaseResponse>(`follow/${userId}`, {})
    },
    unFollowUser: (userId: number) => {
        return instance.delete<BaseResponse>(`follow/${userId}`)
    }
}
export type UsersResponse = {
    items: UserResponse[]
    totalCount: number
    error: string | null
}

export type UserResponse = {
    name: string
    id: number
    photos: Photos
    status: string | null,
    followed: boolean
}