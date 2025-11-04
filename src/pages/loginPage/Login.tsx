import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { LoginForm, isAuthSelector } from 'pages/loginPage/index'
import { Typography } from 'components/common'
import s from './Login.module.css'

export const Login = () => {

    const isAuth = useSelector(isAuthSelector)

    if (isAuth) {
        return <Navigate to={'/profile'} />
    }
    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>Login</Typography>
            <Typography variant={'body1'} className={s.text}>
                Enter your email and password.
                <br />
                If you don't have an account yet, register {' '}
                <Typography variant={'subtitle2'} as={'a'} href={'https://social-network.samuraijs.com/'}>
                    here
                </Typography>
            </Typography>
            <LoginForm />
        </section>
    )
}


