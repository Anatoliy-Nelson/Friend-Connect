import { Photos, profileAPI, ProfileResponse, ResultCode } from 'api/profileApi'
import { AppRootState, AppThunk } from 'redux/store'
import { stopSubmit } from 'redux-form'
import { helpersError } from 'utils/helpersError'
import { setError } from 'redux/appReducer'

let initialState = {
    profile: null as ProfileResponse | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return { ...state, profile: action.profile }
        case 'SET_STATUS':
            return { ...state, status: action.status }
        case 'SET_PHOTO':
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        default:
            return state || initialState
    }
}

export const setUserProfile = (profile: ProfileResponse) => ({ type: 'SET_USER_PROFILE', profile }) as const
export const setStatus = (status: string) => ({ type: 'SET_STATUS', status }) as const
export const setPhoto = (photos: Photos) => ({ type: 'SET_PHOTO', photos }) as const


export const getProfile = (id: number): AppThunk => async (dispatch) => {
    let data = await profileAPI.getUserProfile(id)
    try {
        if (data) {
            dispatch(setUserProfile(data))
        }
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

export const getStatus = (userId: number): AppThunk => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    try {
        dispatch(setStatus(data))
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

export const updateStatus = (status: string): AppThunk => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    try {
        if (data.resultCode === ResultCode.SUCCESS) {
            dispatch(setStatus(status))
        } else {
            dispatch(setError(data.messages[0]))
        }
    } catch (e) {
        helpersError(e, dispatch)
    }
}

export const savePhoto = (file: File): AppThunk => async (dispatch) => {
    let photoData = await profileAPI.savePhoto(file)
    try {
        if (photoData.resultCode === ResultCode.SUCCESS) {
            dispatch(setPhoto(photoData.data.photos))
        }
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

export const saveProfile = (profile: ProfileResponse): AppThunk =>
    async (dispatch, getState: () => AppRootState) => {
        const userId = getState().auth.id
        try {
            if (!!userId) {
                const data = await profileAPI.saveProfile(profile)
                if (data.resultCode === ResultCode.SUCCESS) {
                    dispatch(getProfile(userId))
                    return Promise.resolve()
                } else {
                    dispatch(stopSubmit('edit-profilePage', { _error: data.messages[0] }))
                    return Promise.reject(data.messages[0])
                }
            }
        } catch (e: unknown) {
            helpersError(e, dispatch)
        }
    }


type InitialState = typeof initialState
type ActionTypes = ReturnType<typeof setUserProfile> | ReturnType<typeof setStatus> | ReturnType<typeof setPhoto>