import { ProfileResponse } from 'api/profileApi'
import s from './ProfileData.module.css'
import { Typography } from 'components/common'
import { Contact } from 'pages/profilePage/profile/profileData/contact'


type Props = {
    profile: ProfileResponse
}

export const ProfileData = ({ profile }: Props) => {
    return (
        <div className={s.wrapper}>

            <div className={s.item}>
                <Typography variant={'subtitle2'}>About me:{' '} </Typography>
                <Typography variant={'subtitle3'}>{profile.aboutMe}</Typography>
            </div>
            <div className={s.item}>
                <Typography variant={'subtitle2'}>My Skills:{' '} </Typography>
                <Typography variant={'subtitle3'}>{profile.lookingForAJobDescription}</Typography>
            </div>


            <div className={`${s.item} ${s.contacts}`}>
                <Typography variant={'subtitle2'}> Contacts: </Typography>

                {profile?.contacts && Object.entries(profile?.contacts).map(([key, value]) => {
                    return <Contact key={key} contactTitle={key} contactValue={value} />
                })}
            </div>
        </div>
    )
}

