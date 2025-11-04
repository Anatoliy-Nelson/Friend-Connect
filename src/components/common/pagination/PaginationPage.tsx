import React from 'react'
import { FilterForm, getUsersTC } from 'redux/usersReducer'
import { Pagination } from 'antd'
import { useAppDispatch } from 'redux/store'

type Props = {
    totalCount: number
    currentPage: number
    filter: FilterForm
}

export const PaginationPage = ({ totalCount, currentPage, filter }: Props) => {

    const dispatch = useAppDispatch()

    const onPageChanged = (page: number, pageSize: number) => {
        dispatch(getUsersTC(page, pageSize, filter))
    }

    return (
        <Pagination defaultCurrent={1} total={totalCount}
                    style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
                    onChange={(page, pageSize) => onPageChanged(page, pageSize)}
                    current={currentPage}
                    pageSizeOptions={[10, 20, 50]} />
    )
}