import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { profileReducer } from './profileReducer'
import { usersReducer } from './usersReducer'
import { authReducer } from './authReducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer'
import { chatReducer } from 'redux/chat.reducer'
import { useDispatch } from 'react-redux'
import { newsReducer } from 'redux/newsReducer'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
    news: newsReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export type InferActions<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()


// @ts-ignore
window.store = store