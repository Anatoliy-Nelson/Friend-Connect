import { AddMessageChat, Messages } from 'pages/chatPage'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening } from 'redux/chat.reducer'
import { AppRootState, useAppDispatch } from 'redux/store'

export const Chat = () => {

    const dispatch = useAppDispatch()
    const status = useSelector((state: AppRootState) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            {status === 'error' && <div style={{ color: 'red' }}>Some error occurred</div>}
            <Messages />
            <AddMessageChat />
        </>
    )
}



