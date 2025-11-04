import { ReactNode } from 'react'
import s from './Button.module.css'

type Props = {
    children: ReactNode
    callback?: any
    className?: string
    title?: string
    disabled?: boolean
}

export const Button = ({ children, callback, className, title, disabled = false }: Props) => {
    return (
        <button title={title} className={`${s.button} ${className}`} onClick={callback} disabled={disabled}>
            {children}
        </button>
    )
}