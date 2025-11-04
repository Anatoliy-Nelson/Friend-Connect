import { ChatMessageApi } from 'redux/chat.reducer'
import { memo } from 'react'
import { Typography } from 'components/common'
import s from './Message.module.css'

type Props = {
    message: ChatMessageApi
}

export const Message = memo(({ message }: Props) => {

    return (
        <div className={s.messageCard}>
            <img className={s.avatar} src={message.photo} alt={'avatar'} />
            <Typography variant={'body2'} className={s.name}>{message.userName}</Typography>
            <div className={s.message}>
                <Typography variant={'body1'}>{message.message}</Typography>
            </div>
        </div>
    )
})