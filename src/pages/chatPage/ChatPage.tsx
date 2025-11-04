import { Chat } from 'pages/chatPage'
import { Typography } from 'components/common'

export const ChatPage = () => {
    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>Messages</Typography>
            <Chat />
        </section>
    )
}
