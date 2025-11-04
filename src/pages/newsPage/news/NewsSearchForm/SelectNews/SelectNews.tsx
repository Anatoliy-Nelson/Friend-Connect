import { Typography } from 'components/common'
import { Select } from 'antd'
import { SelectItem } from 'api/newsApi'
import s from './SelectNews.module.css'

type Props = {
    label: string
    values: SelectItem[]
    onChange: (type: string, value: string) => void
    defaultValue: string
    type: string
}

export const SelectNews = ({ label, values, onChange, defaultValue, type }: Props) => {
    return (
        <div className={s.wrapper}>
            <Typography variant={'caption2'} className={s.label} as={'label'}>{label}</Typography>
            <Select onChange={(value) => onChange(type, value)} defaultValue={defaultValue}>
                {values.map((item: SelectItem) => {
                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                })}
            </Select>

        </div>
    )
}