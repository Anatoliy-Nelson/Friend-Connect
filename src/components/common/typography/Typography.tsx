import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import s from './Typography.module.css'

type TypographyProps<T extends ElementType = 'span'> = {
    as?: T
    children: ReactNode
    className?: string
    variant?:
        | 'body1'
        | 'body2'
        | 'caption1'
        | 'caption2'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'subtitle1'
        | 'subtitle2'
        | 'subtitle3'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'span'>(
    props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
    const { as: Component = 'span', className, variant = 'body1', ...rest } = props
    const finalClassName = className ? `${s[variant]} ${className}` : s[variant];

    return <Component className={finalClassName} {...rest} />
}
