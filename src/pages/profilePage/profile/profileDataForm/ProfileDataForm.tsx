import { Input, Textarea } from 'components/common/formsControls/FormControls'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileResponse } from 'api/profileApi'
import { createField } from 'utils/createField/createField'
import { Button, Icon, Typography } from 'components/common'
import s from './ProfileDataForm.module.css'

type ProfileFormData = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

type ProfileFormPropertiesType = Extract<keyof ProfileFormData, string>
type ProfileOwnProps = {
    profile: ProfileResponse | null
}

type Props = InjectedFormProps<ProfileResponse, ProfileOwnProps> & ProfileOwnProps

const ProfileDataForm = ({ handleSubmit, error, profile }: Props) => {
    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <div>
                <Button title={'Edit profilePage'} className={s.button}>
                    <Icon id={'save'} width={'18'} height={'18'} />
                    <span>Save Profile</span>
                </Button>
                {error && <div> {error} </div>}
            </div>

            <Typography variant={'subtitle2'}> Full name: </Typography>
            {createField<ProfileFormPropertiesType>('Full name...', 'fullName', [], Input)}
            <Typography variant={'subtitle2'}> About me: </Typography>
            {createField<ProfileFormPropertiesType>('About me...', 'aboutMe', [], Textarea)}
            <div style={{ display: 'flex', gap: 10 }}>
                <Typography variant={'subtitle2'}> Looking for a job: </Typography>
                <div
                    style={{ width: '30px' }}>{createField<ProfileFormPropertiesType>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}</div>
            </div>
            <Typography variant={'subtitle2'}> My skills: </Typography>
            {createField<ProfileFormPropertiesType>('My skills...', 'lookingForAJobDescription', [], Textarea)}
            <div>
                {profile?.contacts && Object.keys(profile?.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <Typography variant={'subtitle2'}>{key}: </Typography>
                            {createField(`${key}`, 'contacts.' + key, [], Input)}
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

export const ProfileReduxDataForm = reduxForm<ProfileResponse, ProfileOwnProps>({ form: 'edit-profilePage' })(ProfileDataForm)