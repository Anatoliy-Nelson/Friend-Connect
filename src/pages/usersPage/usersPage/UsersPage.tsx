import { Users } from 'pages/usersPage'
import { Typography } from 'components/common'

type Props = {
    pageTitle: string
}

export const UsersPage = ({ pageTitle }: Props) => {

    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>{pageTitle}</Typography>
            <Users />
        </section>
    )
}
