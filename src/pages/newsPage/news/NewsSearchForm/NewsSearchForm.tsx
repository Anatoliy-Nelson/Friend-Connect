import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Form, Input } from 'antd'
import { useAppDispatch } from 'redux/store'
import { getNews } from 'redux/newsReducer'
import { FilterNewsForm } from 'api/newsApi'
import { filterSelector } from 'pages/newsPage/model'
import { SelectNews } from 'pages/newsPage/news/NewsSearchForm/SelectNews'
import s from './NewsSearchForm.module.css'
import { Button } from 'components/common'


const countries = [
    { id: 'ae', name: 'UAE' },
    { id: 'ar', name: 'Argentina' },
    { id: 'at', name: 'Austria' },
    { id: 'au', name: 'Australia' },
    { id: 'be', name: 'Belgium' },
    { id: 'bg', name: 'Bulgaria' },
    { id: 'br', name: 'Brazil' },
    { id: 'ca', name: 'Canada' },
    { id: 'ch', name: 'Switzerland' },
    { id: 'cn', name: 'China' },
    { id: 'co', name: 'Colombia' },
    { id: 'cu', name: 'Cuba' },
    { id: 'cz', name: 'Czech Republic' },
    { id: 'de', name: 'Germany' },
    { id: 'eg', name: 'Egypt' },
    { id: 'fr', name: 'France' },
    { id: 'gb', name: 'United Kingdom' },
    { id: 'gr', name: 'Greece' },
    { id: 'hk', name: 'Hong Kong' },
    { id: 'hu', name: 'Hungary' },
    { id: 'id', name: 'Indonesia' },
    { id: 'ie', name: 'Ireland' },
    { id: 'il', name: 'Israel' },
    { id: 'in', name: 'India' },
    { id: 'it', name: 'Italy' },
    { id: 'kr', name: 'South Korea' },
    { id: 'lt', name: 'Lithuania' },
    { id: 'lv', name: 'Latvia' },
    { id: 'ma', name: 'Morocco' },
    { id: 'mx', name: 'Mexico' },
    { id: 'my', name: 'Malaysia' },
    { id: 'ng', name: 'Nigeria' },
    { id: 'nl', name: 'Netherlands' },
    { id: 'no', name: 'Norway' },
    { id: 'nz', name: 'New Zealand' },
    { id: 'ph', name: 'Philippines' },
    { id: 'pl', name: 'Poland' },
    { id: 'pt', name: 'Portugal' },
    { id: 'ro', name: 'Romania' },
    { id: 'rs', name: 'Serbia' },
    { id: 'ru', name: 'Russia' },
    { id: 'sa', name: 'Saudi Arabia' },
    { id: 'se', name: 'Sweden' },
    { id: 'sg', name: 'Singapore' },
    { id: 'si', name: 'Slovenia' },
    { id: 'sk', name: 'Slovakia' },
    { id: 'th', name: 'Thailand' },
    { id: 'tr', name: 'Turkey' },
    { id: 'tw', name: 'Taiwan' },
    { id: 'ua', name: 'Ukraine' },
    { id: 'us', name: 'USA' },
    { id: 've', name: 'Venezuela' },
    { id: 'za', name: 'South Africa' }
]
const categories = [
    { id: '', name: 'All' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'general', name: 'General' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Technology' }
]

type Props = {
    pageSize: number
    currentPage: number
}

export const NewsSearchForm = ({ pageSize, currentPage }: Props) => {

    const filter = useSelector(filterSelector)
    const dispatch = useAppDispatch()

    const onFilterChanged = (filter: FilterNewsForm) => {
        dispatch(getNews(currentPage, pageSize, filter))
    }

    const formik = useFormik({
        initialValues: {
            search: '',
            country: 'us',
            category: ''
        },

        onSubmit: (values: FilterNewsForm) => {
            onFilterChanged(values)
        }
    })

    return (
        <Form className={s.form} onFinish={formik.handleSubmit}
              initialValues={{ country: filter?.country, category: filter?.category }}>
            <Input
                name='search'
                type='text'
                onChange={formik.handleChange} placeholder={'Search'}
            />
            <SelectNews label={'Choose a country'} values={countries} onChange={formik.setFieldValue}
                        defaultValue={'us'}
                        type={'country'} />
            <SelectNews label={'Choose a category'} values={categories} onChange={formik.setFieldValue}
                        defaultValue={'All'}
                        type={'category'} />
            <Button className={s.button} children={'Find'} />
        </Form>
    )
}
