import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { logout } from 'redux/authReducer'
import userPhoto from 'assets/img/user.png'
import logo from 'assets/img/logo.svg'
import { Button, Typography } from 'components/common'
import { avatarSelector, isAuthSelector, loginSelector } from 'pages/loginPage/model'
import s from './Header.module.css'

export const AppHeader = () => {
    const isAuth = useSelector(isAuthSelector)
    const login = useSelector(loginSelector)
    const avatar = useSelector(avatarSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }


    return (
        <header className={s.headerBlock}>
            <NavLink to={'/'}>
                <img className={s.logo} src={logo} alt={'logo'} />
            </NavLink>
            {isAuth && (
                <div className={s.loginInfo}>
                    <Typography variant={'body1'} className={s.login}>{login}</Typography>
                    <img alt={login || ''}
                         className={s.avatar}
                         src={avatar || userPhoto}
                    />
                    <Button callback={logoutHandler}>
                        <Typography variant={'body2'}>LOGOUT</Typography>
                    </Button>
                </div>
            )}
            {!isAuth && (
                <Button className={s.button}>
                    <NavLink to={'/login'} className={s.link}>
                        <Typography variant={'body2'}>LOGIN</Typography>
                    </NavLink>
                </Button>
            )}
        </header>
    )
}