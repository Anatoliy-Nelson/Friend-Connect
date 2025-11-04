import { AppRootState } from 'redux/store'

export const filterSelector = (state: AppRootState) => state.news.filter

export const newsListSelector = (state: AppRootState) => state.news.news

export const currentPageNewsSelector = (state: AppRootState) => state.news.currentPage

export const totalCountNewsSelector = (state: AppRootState) => state.news.totalCount

export const isLoadingSelector = (state: AppRootState) => state.news.isLoading
