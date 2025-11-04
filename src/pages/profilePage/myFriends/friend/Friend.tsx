import { NavLink } from 'react-router-dom'
import userPhoto from 'assets/img/user.png'
import { Typography } from 'components/common'
import s from './Friend.module.css'
import { UserResponse } from 'api/usersApi'

type Props = {
    friend: UserResponse
}

export const Friend = ({friend}: Props) => {
    return (
        <div className={s.wrapper} >
            <NavLink to={'/profile/' + friend.id} >
                <img className={s.avatar}
                    src={friend.photos.small || userPhoto}
                    alt={'avatar'}  />
                <Typography className={s.text} variant={'subtitle3'}>{friend.name}</Typography>
            </NavLink>
            <Typography className={s.text} variant={'caption1'} >{friend.status}</Typography>
        </div>
    )

}