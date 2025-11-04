import { AppRootState } from 'redux/store'
import { createSelector } from 'reselect'
import { UserResponse } from 'api/usersApi'

export const usersSelector = (state: AppRootState) => state.usersPage.users

export const getUsers = createSelector(usersSelector, (users: UserResponse[]) => users.filter(_ => true))
export const pageSizeSelector = (state: AppRootState) => state.usersPage.pageSize
export const totalUsersCount = (state: AppRootState) => state.usersPage.totalCount
export const currentPageSelector = (state: AppRootState) => state.usersPage.currentPage
export const getIsFetching = (state: AppRootState) => state.usersPage.isFetching
export const getFollowingInProgress = (state: AppRootState) => state.usersPage.followingInProgress
export const usersFilterSelector = (state: AppRootState) => state.usersPage.filter


