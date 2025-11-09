import React, { useEffect } from 'react'
import { getNews } from 'redux/newsReducer'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { Preloader, Typography } from 'components/common'
import { useNavigate, useParams } from 'react-router-dom'
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
    let { country } = useParams()
    let { category } = useParams()
    let { q } = useParams()

    const pageSize = 10

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onPageChanged = (page: number, pageSize: number) => {
        dispatch(getNews(page, pageSize, filter))
    }

    useEffect(() => {
        let actualFilter = filter
        if (country) {
            actualFilter = { ...actualFilter, country: filter.country }
        }
        if (category) {
            actualFilter = { ...actualFilter, category: filter.category }
        }
        if (q) {
            actualFilter = { ...actualFilter, search: filter.search }
        }
        dispatch(getNews(currentPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: '/news',
            search: `?country=${filter?.country}&q=${filter?.search}&category=${filter?.category}`
        })
    }, [filter?.country, filter?.category, filter?.search])


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