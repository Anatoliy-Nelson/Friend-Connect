import { AppThunk, InferActions } from './store'
import { chatApi } from 'api/chat.api'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

let initialState = {
    messages: [] as ChatMessage[],
    status: 'pending' as Status
}

export const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_MESSAGES' :
            return { ...state, messages: [...state.messages, ...action.payload.messages
                    .map(m => ({ ...m, id: v1() }))]
                    .filter((_, index, array) => index >= array.length - 100) }
        case 'CHANGE_STATUS' :
            return { ...state, status: action.payload.status }
        default:
            return state || initialState
    }
}

export const chatActions = {
    setMessages: (messages: ChatMessageApi[]) => ({ type: 'SET_MESSAGES', payload: { messages } }) as const,
    changeStatus: (status: Status) => ({ type: 'CHANGE_STATUS', payload: { status } }) as const
}

let _newMessageHandler: ((messages: ChatMessageApi[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.setMessages(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: Status) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(chatActions.changeStatus(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): AppThunk => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): AppThunk => async (dispatch) => {
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): AppThunk => async () => {
    chatApi.sendMessage(message)
}

type InitialStateType = typeof initialState
export type ActionTypes = InferActions<typeof chatActions>
export type ChatMessageApi = {
    message: string
    photo: string
    userId: number
    userName: string

}
export type ChatMessage = ChatMessageApi & { id: string }
export type Status = 'pending' | 'ready' | 'error'
