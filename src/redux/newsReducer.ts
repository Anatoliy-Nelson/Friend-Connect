import { AppThunk } from './store'
import { Articles, FilterNewsForm, newsAPI } from 'api/newsApi'
import { helpersError } from 'utils/helpersError'

let initialState = {
    news: [] as Articles[],
    filter: {
        search: '',
        country: 'us',
        category: ''
    },
    totalCount: 0,
    currentPage: 1,
    isLoading: false
}

export const newsReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'SET_NEWS_DATA' :
            return { ...state, news: action.data.filter((i: Articles) => i.title !== '[Removed]') }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET_TOTAL_COUNT':
            return { ...state, totalCount: action.totalCount }
        case 'SET_FILTER':
            return { ...state, filter: action.filter }
        case 'SET_IS-LOADING':
            return { ...state, isLoading: action.isLoading }
        default:
            return state || initialState
    }
}

export const getNewsData = (data: Articles[]) => ({ type: 'SET_NEWS_DATA', data }) as const
export const setCurrentPage = (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage }) as const
export const setTotalCount = (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', totalCount }) as const
export const setFilter = (filter: FilterNewsForm) => ({ type: 'SET_FILTER', filter }) as const
export const setIsLoading = (isLoading: boolean) => ({ type: 'SET_IS-LOADING', isLoading }) as const


export const getNews = (page: number, pageSize: number, filter: FilterNewsForm): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
    dispatch(setFilter(filter))
    dispatch(setCurrentPage(page))
    const res = await newsAPI.getNews(page, pageSize, filter?.country, filter?.category, filter?.search)
    try {
        dispatch(setTotalCount(res.data.totalResults))
        dispatch(getNewsData(res.data.articles))
        dispatch(setIsLoading(false))
    } catch (e: unknown) {
        helpersError(e, dispatch)
    }
}

type InitialState = typeof initialState
export type ActionTypes = NewsActions
type NewsActions =
    ReturnType<typeof getNewsData>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setIsLoading>