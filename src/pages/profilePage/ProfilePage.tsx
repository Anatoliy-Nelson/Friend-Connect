import { useEffect } from 'react'
import { Profile } from 'pages/profilePage/profile'
import { useSelector } from 'react-redux'
import { getProfile, getStatus } from 'redux/profileReducer'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'redux/store'
import { Typography } from 'components/common'
import { authorizedUserIdSelector } from 'pages/loginPage'
import { MyFriends } from 'pages/profilePage/myFriends/MyFriends'

type PathParams = {
    userId?: string | undefined
}

export const ProfilePage = () => {

    const authorizedUserId = useSelector(authorizedUserIdSelector)
    const { userId } = useParams<PathParams>()
    const dispatch = useAppDispatch()

    const meId = String(authorizedUserId)

    let id = userId ? Number(userId) : authorizedUserId

    const refreshProfile = async () => {
        if (id) {
            dispatch(getProfile(id))
            dispatch(getStatus(id))
        }
    }

    useEffect(() => {
        refreshProfile().then()
    }, [userId])

    let showFriends = id && meId && (String(id) === meId)

    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>Profile</Typography>
            <Profile isOwner={!userId} />
            {showFriends && <MyFriends />}
        </section>
    )
}
