import { Typography } from 'components/common'
import s from './MyFriends.module.css'
import { useSelector } from 'react-redux'
import { usersSelector } from 'pages/usersPage'
import { useEffect } from 'react'
import { getUsersTC } from 'redux/usersReducer'
import { useAppDispatch } from 'redux/store'
import { Friend } from 'pages/profilePage/myFriends/friend/Friend'

export const MyFriends = () => {
    const friends = useSelector(usersSelector)
    const filter = { term: '', friend: true }
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersTC(1, 100, filter))
    }, [])

    return (
        <div className={s.wrapper}>
            <Typography variant={'h3'}> My friends</Typography>
            <div className={s.friendsWrapper}>
                {friends.map(friend => <Friend key={friend.id} friend={friend} />)}
            </div>
        </div>
    )
}
