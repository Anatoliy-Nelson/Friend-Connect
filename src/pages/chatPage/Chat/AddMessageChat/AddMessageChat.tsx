import { useState } from 'react'
import { useSelector } from 'react-redux'
import { sendMessage } from 'redux/chat.reducer'
import { AppRootState, useAppDispatch } from 'redux/store'
import { Button, Typography } from 'components/common'
import s from './AddMessageChat.module.css'

export const AddMessageChat = () => {

    const status = useSelector((state: AppRootState) => state.chat.status)
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (message) {
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    return (
        <>
            <textarea className={s.textarea} placeholder={'Type message'}
                      onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            <Button className={s.button}
                    disabled={status !== 'ready'}
                    callback={sendMessageHandler}>
                <Typography className={s.text} variant={'subtitle3'}>Send message</Typography>
            </Button>
        </>
    )
}