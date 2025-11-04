import { Message } from 'pages/chatPage'
import { useSelector } from 'react-redux'
import { AppRootState } from 'redux/store'
import React, { useEffect, useRef, useState } from 'react'
import { ChatMessage } from 'redux/chat.reducer'
import s from './Messages.module.css'

export const Messages = () => {

    const messages = useSelector((state: AppRootState) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 30) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className={s.messagesBlock} onScroll={scrollHandler}>
            {messages?.map((message: ChatMessage) => <Message key={message.id} message={message} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}