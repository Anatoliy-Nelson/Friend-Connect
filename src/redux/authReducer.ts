import { profileAPI, ResultCode } from 'api/profileApi'
import { AppThunk } from './store'
import { authAPI, ResultCodeForCaptcha } from 'api/authApi'
import { securityAPI } from 'api/securityApi'
import { helpersError } from 'utils/helpersError'
import { setError } from 'redux/appReducer'

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    avatar: null as string | null
}

export const authReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'SET_USER_DATA' :
            return { ...state, ...action.data, isAuth: true }
        case 'LOGOUT_USER' :
            return { ...state, ...action.data, isAuth: false }
        case 'GET_CAPTCHA' :
            return { ...state, ...action.payload }
        default:
            return state || initialState
    }
}


export const setUserData = (data: InitialState) => ({ type: 'SET_USER_DATA', data }) as const
export const logoutUser = (data: InitialState) => ({ type: 'LOGOUT_USER', data }) as const
export const getCaptcha = (captchaUrl: string | null) => ({
    type: 'GET_CAPTCHA', payload: { captchaUrl }
}) as const

export const getAuthMe = (): AppThunk => async (dispatch) => {
    const meData = await authAPI.me()
    const profileData = await profileAPI.getUserProfile(meData.data.id)
    try {
        const avatar = profileData?.photos?.large
        if (meData.resultCode === ResultCode.SUCCESS) {
            const { id, login, email } = meData.data
            dispatch(setUserData({ id, email, login, isAuth: true, captchaUrl: null, avatar: avatar || null }))
        }
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

export const login = (email: string, password: string, rememberMe: boolean = true, captcha: string | null): AppThunk =>
    async (dispatch) => {
        try {
            const data = await authAPI.login(email, password, rememberMe, captcha)
            if (data.resultCode === ResultCode.SUCCESS) {
                dispatch(getAuthMe())
                dispatch(setError(null))
            } else if (data.resultCode === ResultCodeForCaptcha.CAPTCHA) {
                dispatch(getCaptchaUrl())
            } else if (data.resultCode === ResultCode.ERROR) {
                if (data.messages.length) {
                    dispatch(setError(data.messages[0]))
                    console.log(data.messages[0])
                } else {
                    dispatch(setError('Some error occurred'))
                }
            }
        } catch (e: unknown) {
            helpersError(e, dispatch)
        }
    }

export const getCaptchaUrl = (): AppThunk => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl()
    try {
        dispatch(getAuthMe())
        let captchaUrl = captchaData.url
        dispatch(getCaptcha(captchaUrl))
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    let logoutData = await authAPI.logout()
    try {
        if (logoutData.resultCode === ResultCode.SUCCESS) {
            dispatch(logoutUser({ id: null, login: null, email: null, isAuth: false, captchaUrl: null, avatar: null }))
        }
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

type InitialState = typeof initialState
export type ActionTypes =
    ReturnType<typeof setUserData>
    | ReturnType<typeof logoutUser>
    | ReturnType<typeof getCaptcha>

