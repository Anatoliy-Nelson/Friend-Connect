import { AppRootState } from 'redux/store'

export const captchaUrlSelector = (state: AppRootState) => state.auth.captchaUrl

export const isAuthSelector = (state: AppRootState) => state.auth.isAuth

export const loginSelector = (state: AppRootState) => state.auth.login

export const errorSelector = (state: AppRootState) => state.app.error

export const avatarSelector = (state: AppRootState) => state.auth.avatar

export const authorizedUserIdSelector = (state: AppRootState) => state.auth.id