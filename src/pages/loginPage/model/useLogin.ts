import { useFormik } from 'formik'
import { login } from 'redux/authReducer'
import { useAppDispatch } from 'redux/store'

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: null
        },
        validate: (values) => {
            const errors: Error = {}
            const regs = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

            if (!values.email) {
                errors.email = 'Required'
            } else if (!regs.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Must be more 3 symbols'
            }

            return errors
        },
        onSubmit: (values: LoginFormData) => {
            dispatch(login(values.email, values.password, values.rememberMe, values.captcha)
            )
        }
    })
    return { formik }
}

type Error = {
    email?: string
    password?: string
}

export type LoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string | null;
};