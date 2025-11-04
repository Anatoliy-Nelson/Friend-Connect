import { AppRootState } from 'redux/store'

export const profileSelector = (state: AppRootState) => state.profilePage.profile
export const statusSelector = (state: AppRootState) => state.profilePage.status