import React, { useEffect } from 'react'
import { getNews } from 'redux/newsReducer'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { Preloader, Typography } from 'components/common'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    currentPageNewsSelector,
    filterSelector,
    isLoadingSelector,
    newsListSelector,
    totalCountNewsSelector
} from 'pages/newsPage/model'
import { News, NewsSearchForm } from 'pages/newsPage/news'
import { Pagination } from 'antd'
import s from './NewsPage.module.css'

export const NewsPage = () => {
    const newsList = useSelector(newsListSelector)
    const filter = useSelector(filterSelector)
    const isLoading = useSelector(isLoadingSelector)
    const totalCount = useSelector(totalCountNewsSelector)
    const currentPage = useSelector(currentPageNewsSelector)
    const [searchParams] = useSearchParams()
    const country = searchParams.get('country')
    const category = searchParams.get('category')
    const q = searchParams.get('q')
    const pageParam = searchParams.get('page')
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1

    const pageSize = 10

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onPageChanged = (page: number, pageSize: number) => {
        dispatch(getNews(page, pageSize, filter))
        // Обновляем URL при смене страницы, чтобы сохранить параметры фильтрации и номер страницы
        const searchParams = new URLSearchParams()
        if (filter?.country && filter?.country !== 'undefined') {
            searchParams.append('country', filter.country)
        }
        if (filter?.search && filter?.search !== 'undefined') {
            searchParams.append('q', filter.search)
        }
        if (filter?.category && filter?.category !== 'undefined') {
            searchParams.append('category', filter.category)
        }
        searchParams.append('page', page.toString())
        navigate({
            pathname: '/news',
            search: searchParams.toString()
        })
    }

    useEffect(() => {
        let actualFilter = filter
        if (country && country !== 'undefined') {
            actualFilter = { ...actualFilter, country: country }
        }
        if (category && category !== 'undefined') {
            actualFilter = { ...actualFilter, category: category }
        }
        if (q && q !== 'undefined') {
            actualFilter = { ...actualFilter, search: q }
        }
        dispatch(getNews(initialPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams()
        if (filter?.country && filter?.country !== 'undefined') {
            searchParams.append('country', filter.country)
        }
        if (filter?.search && filter?.search !== 'undefined') {
            searchParams.append('q', filter.search)
        }
        if (filter?.category && filter?.category !== 'undefined') {
            searchParams.append('category', filter.category)
        }
        navigate({
            pathname: '/news',
            search: searchParams.toString()
        })
    }, [filter?.country, filter?.category, filter?.search])
    
    // Обработка изменения параметра страницы в URL
    useEffect(() => {
        if (pageParam) {
            const newPage = parseInt(pageParam, 10)
            if (newPage !== currentPage && !isNaN(newPage)) {
                dispatch(getNews(newPage, pageSize, filter))
            }
        }
    }, [pageParam, currentPage, filter, pageSize, dispatch])


    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>News</Typography>

            <NewsSearchForm pageSize={pageSize} currentPage={currentPage} />
            {totalCount > 10 && <Pagination defaultCurrent={1}
                                            total={totalCount}
                                            className={s.pagination}
                                            onChange={(page, pageSize) => onPageChanged(page, pageSize)}
                                            current={currentPage}
            />}
            {isLoading && <Preloader />}
            {newsList && newsList.map((news) => <News news={news} key={news.url} />)}
            {!newsList.length &&
                <Typography className={s.text} variant={'body1'}> No results were found for your request</Typography>}
        </section>
    )
}