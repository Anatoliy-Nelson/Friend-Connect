import { ChatMessageApi, Status } from 'redux/chat.reducer'

const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriber[],
    'status-changed': [] as StatusChangedSubscriber[]
}


let ws: WebSocket | null = null
type EventsNames = 'messages-received' | 'status-changed'

const closeHandler = () => {
    notifySubscriberAboutStatus('pending')
    setTimeout(createWsChanel, 3000)
}

const notifySubscriberAboutStatus = (status: Status) => {
    subscribers['status-changed'].forEach(s => s(status))
}

const createWsChanel = () => {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscriberAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)

}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessage))
}

const openHandler = () => {
    notifySubscriberAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscriberAboutStatus('error')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

export const chatApi = {
    start() {
        createWsChanel()
    },
    subscribe(eventName: EventsNames, callback: MessagesReceivedSubscriber | StatusChangedSubscriber) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: EventsNames, callback: MessagesReceivedSubscriber | StatusChangedSubscriber) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },

    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    }

}

type MessagesReceivedSubscriber = (messages: ChatMessageApi[]) => void
type StatusChangedSubscriber = (status: Status) => void

