import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { captchaUrlSelector, errorSelector, isAuthSelector, useLogin } from 'pages/loginPage/index'
import { Button, Typography } from 'components/common'
import s from 'pages/loginPage/LoginForm/LoginForm.module.css'

export const LoginForm = () => {

    const { formik } = useLogin()
    const { errors, handleSubmit, getFieldProps, touched, values } = formik

    const captchaUrl = useSelector(captchaUrlSelector)
    const isAuth = useSelector(isAuthSelector)
    const error = useSelector(errorSelector)

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.inputWrapper}>
                <Typography variant={'h4'} as={'label'}>Email</Typography>
                <input placeholder={'Enter your email'} className={s.input} {...getFieldProps('email')} />
                {touched.email && errors.email && (
                    <Typography variant={'caption1'} className={s.error}>{errors.email}</Typography>
                )}
                {error && (
                    <Typography variant={'caption1'} className={s.error}>{error}</Typography>
                )}
            </div>

            <div className={s.inputWrapper}>
                <Typography variant={'h4'} as={'label'}>Password</Typography>
                <input placeholder={'Enter your password'} className={s.input}
                       type='password'
                       {...getFieldProps('password')}
                />
                {touched.password && errors.password && (
                    <Typography variant={'caption1'} className={s.error}>{errors.password}</Typography>
                )}

                {error && (
                    <Typography variant={'caption1'} className={s.error}>{error}</Typography>
                )}
            </div>

            <div className={s.rememberMeBlock}>
                <input type={'checkbox'} className={s.checkbox}
                       checked={values.rememberMe}
                       {...getFieldProps('rememberMe')} />
                <Typography variant={'body1'}>Remember me</Typography>
            </div>


            {captchaUrl && <>
                <img className={s.captchaImage} src={captchaUrl} alt='Captcha' />

                <input placeholder={'Enter captcha'} className={`${s.input} ${s.captcha}`}
                       {...getFieldProps('captcha')}
                />
            </>}

            <Button className={s.buttonLogin}>
                <Typography variant={'subtitle2'} className={s.textButton}>LOGIN</Typography>
            </Button>

        </form>
    )
}

