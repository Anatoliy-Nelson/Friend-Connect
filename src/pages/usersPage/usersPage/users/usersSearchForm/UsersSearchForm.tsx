import { FilterForm, getUsersTC } from 'redux/usersReducer'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { usersFilterSelector } from 'pages/usersPage'
import { Form, Input, Select } from 'antd'
import { useAppDispatch } from 'redux/store'
import s from './UsersSearchForm.module.css'
import { Button } from 'components/common'


type Props = {
    pageSize: number
}

export const UsersSearchForm = ({ pageSize }: Props) => {

    const filter = useSelector(usersFilterSelector)
    const dispatch = useAppDispatch()

    const onFilterChanged = (filter: FilterForm) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }

    const formik = useFormik({
        initialValues: {
            term: '',
            friend: null
        },

        onSubmit: (values: FilterForm) => {
            onFilterChanged(values)
        }
    })

    return (

        <Form onFinish={formik.handleSubmit} initialValues={{ term: filter?.term, friend: filter?.friend }}
              className={s.formBlock}>

            <Input
                className={s.input}
                id='firstName'
                name='term'
                type='text'
                onChange={formik.handleChange} placeholder={'Type name'}

            />

            <Select
                onChange={(value) => formik.setFieldValue('friend', value)}
                className={s.select}
                defaultValue={'null'}
            >
                <Select.Option value='null'>All</Select.Option>
                <Select.Option value='true'>Only followed</Select.Option>
                <Select.Option value='false'>Only unfollowed</Select.Option>
            </Select>

            <Button children={'Find'}/>

        </Form>


    )
}
