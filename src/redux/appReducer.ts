import { getAuthMe } from './authReducer'
import { AppThunk } from './store'

let initialState = {
    isInitialized: false,
    error: null as string | null
}

export const appReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'SET_INITIALIZED' :
            return { ...state, isInitialized: true }
        case 'SET-ERROR' :
            return { ...state, error: action.error }
        default:
            return state || initialState
    }
}

export const setIsInitialized = () => ({ type: 'SET_INITIALIZED' }) as const
export const setError = (error: string | null) => ({ type: 'SET-ERROR', error }) as const

export const initializeApp = (): AppThunk => (dispatch) => {
    dispatch(getAuthMe())
    dispatch(setIsInitialized())
}

type InitialState = typeof initialState
type ActionTypes = ReturnType<typeof setIsInitialized> | ReturnType<typeof setError>