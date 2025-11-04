import s from './Contact.module.css'

type Props = {
    contactTitle: string
    contactValue: string | null
}


export const Contact = ({ contactTitle, contactValue }: Props) => {
    return (
        <div className={s.contact}>
            <span className={s.subtitle}>{`${contactTitle}: `}</span>
            <a className={s.text} href={contactValue || '#'}>{contactValue}</a>
        </div>
    )

}
