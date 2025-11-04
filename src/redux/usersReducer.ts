import { ResultCode } from 'api/profileApi'
import { Action, Dispatch } from 'redux'
import { updateObjectArray } from 'utils/object-helpers'
import { UserResponse, usersAPI } from 'api/usersApi'
import { AxiosResponse } from 'axios'
import { AppThunk } from 'redux/store'
import { helpersError } from 'utils/helpersError'

export let initialState = {
    users: [] as UserResponse[],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    filter: {
        term: '' as string | null,
        friend: null as boolean | null
    }
}

export const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'FOLLOW' :
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', { followed: false })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', { followed: true })
            }
        case 'SET_USERS':
            return { ...state, users: [...action.users] }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET_TOTAL_COUNT':
            return { ...state, totalCount: action.count }
        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        case 'SET_FILTER':
            return { ...state, filter: action.payload }
        default:
            return state || initialState
    }
}


export const followAC = (id: number) => ({ type: 'FOLLOW', id }) as const
export const unFollowAC = (id: number) => ({ type: 'UNFOLLOW', id }) as const
export const setUsers = (users: UserResponse[]) => ({ type: 'SET_USERS', users }) as const
export const setCurrentPage = (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage }) as const
export const setFilter = (filter: FilterForm) => ({ type: 'SET_FILTER', payload: filter }) as const
export const setTotalUsersCount = (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', count: totalCount }) as const
export const toggleIsFetching = (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching }) as const
export const toggleIsFollowingProgress = (isFetching: boolean, id: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    id
}) as const


export const getUsersTC = (currentPage: number, pageSize: number, filter: FilterForm): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    dispatch(setFilter(filter))
    const usersData = await usersAPI.getUsers(currentPage, pageSize, filter?.term, filter?.friend)
    try {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(usersData.data.items))
        dispatch(setTotalUsersCount(usersData.data.totalCount))
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

export const follow = (id: number): AppThunk => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unFollowUser.bind(usersAPI), followAC)
}

export const unFollow = (id: number): AppThunk => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.followUser.bind(usersAPI), unFollowAC)
}

const followUnfollowFlow = async (dispatch: Dispatch, id: number, apiMethod: ApiMethod, actionCreator: ActionCreator) => {
    dispatch(toggleIsFollowingProgress(true, id))
    const res = await apiMethod(id)
    try {
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(actionCreator(id))
        }
    } catch (e: unknown) {
        helpersError(e, dispatch)
    } finally {
        dispatch(toggleIsFollowingProgress(false, id))
    }
}


type InitialState = typeof initialState
export type FilterForm = typeof initialState.filter
type ApiMethod = (id: number) => Promise<AxiosResponse>
type ActionCreator = (id: number) => Action
type ActionTypes =
    ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>

