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
        if (page && page !== 'undefined') actualPage = Number(page)

        let actualFilter = filter
        if (term && term !== 'undefined') {
            actualFilter = { ...actualFilter, term: term }
        }
        if (friend && friend !== 'undefined') {
            actualFilter = { ...actualFilter, friend: friend === 'null' ? null : friend === 'true' }
        }
        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams()
        if (filter?.term && filter?.term !== 'undefined') {
            searchParams.append('term', filter.term)
        }
        if (filter?.friend !== undefined && filter?.friend !== null) {
            searchParams.append('friend', String(filter.friend))
        } else if (filter?.friend === null) {
            searchParams.append('friend', 'null')
        }
        searchParams.append('page', String(currentPage))
        navigate({
            pathname: '/users',
            search: searchParams.toString()
        })
    }, [filter, currentPage])

    return (
        <>
            <UsersSearchForm pageSize={pageSize} />


            {isFetching && <Preloader />}

            <div className={s.userWrapper}>
                {users.map(user => <User key={user.id} user={user} />)}
            </div>
            
            {totalCount > pageSize && (
                <PaginationPage currentPage={currentPage}
                                totalCount={totalCount}
                                filter={filter}
                />
            )}
        </>
    )
}

