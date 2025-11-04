import s from './preloader.module.css'
import React from 'react'
import { Spin } from 'antd'

export const Preloader = () => {
    return (
        <div className={s.wrapper}>
            <Spin size='large' />
        </div>
    )
}