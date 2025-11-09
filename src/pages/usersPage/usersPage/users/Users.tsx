import { useEffect } from 'react'
import { PaginationPage, Preloader } from 'components/common'
import {
    currentPageSelector,
    getIsFetching,
    pageSizeSelector,
    totalUsersCount,
    User,
    usersFilterSelector,
    UsersSearchForm,
    usersSelector
} from 'pages/usersPage'
import { getUsersTC } from 'redux/usersReducer'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'redux/store'
import s from './Users.module.css'

export const Users = () => {

    const users = useSelector(usersSelector)
    const totalCount = useSelector(totalUsersCount)
    const currentPage = useSelector(currentPageSelector)
    const pageSize = useSelector(pageSizeSelector)
    const filter = useSelector(usersFilterSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isFetching = useSelector(getIsFetching)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = searchParams.get('page')
        const term = searchParams.get('term')
        const friend = searchParams.get('friend')

        let actualPage = currentPage
        if (page) actualPage = Number(page)

        let actualFilter = {...filter} // Создаем копию фильтра
        if (term !== null) { // Проверяем на null, а не на falsy
            actualFilter = { ...actualFilter, term: term || '' }
        }
        if (friend !== null) { // Проверяем на null, а не на falsy
            actualFilter = { ...actualFilter, friend: friend === 'null' ? null : friend === 'true' }
        }
        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const params = new URLSearchParams()
        
        // Добавляем параметр page
        params.set('page', currentPage.toString())
        
        // Добавляем параметр term, если он не пустой
        if (filter?.term && filter.term !== '') {
            params.set('term', filter.term)
        } else {
            params.set('term', '') // Устанавливаем пустую строку для термина
        }
        
        // Добавляем параметр friend
        if (filter?.friend === null) {
            params.set('friend', 'null')
        } else {
            params.set('friend', filter.friend ? 'true' : 'false')
        }
        
        navigate({
            pathname: '/users',
            search: `?${params.toString()}`
        })
    }, [filter, currentPage])

    return (
        <>
            <UsersSearchForm pageSize={pageSize} />


            <PaginationPage currentPage={currentPage}
                            totalCount={totalCount}
                            filter={filter}
            />

            {isFetching && <Preloader />}

            <div className={s.userWrapper}>
                {users.map(user => <User key={user.id} user={user} />)}
            </div>
            <PaginationPage currentPage={currentPage}
                            totalCount={totalCount}
                            filter={filter}
            />
        </>
    )
}

