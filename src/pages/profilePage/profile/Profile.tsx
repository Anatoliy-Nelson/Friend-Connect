import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { savePhoto, saveProfile } from 'redux/profileReducer'
import { ProfileResponse } from 'api/profileApi'
import userPhoto from 'assets/img/user.png'
import { Button, Icon, Typography } from 'components/common'
import s from './Profile.module.css'
import { loginSelector } from 'pages/loginPage'
import { ProfileStatus } from 'pages/profilePage/profile/profileStatus'
import { ProfileReduxDataForm } from 'pages/profilePage/profile/profileDataForm'
import { ProfileData } from 'pages/profilePage/profile/profileData'
import { profileSelector } from 'pages/profilePage/model/profileSelector'

type Props = {
    isOwner: boolean
}

export const Profile = ({ isOwner }: Props) => {

    const [editMode, setEditMode] = useState(false)
    const profile = useSelector(profileSelector)
    const user = useSelector(profileSelector)
    const login = useSelector(loginSelector)
    const dispatch = useAppDispatch()

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length) {
            dispatch(savePhoto(e.currentTarget.files[0]))
        }
    }

    const onSubmit = async (formData: ProfileResponse) => {
        try {
            dispatch(saveProfile(formData))
            setEditMode(false)
        } catch (e) {
            console.log(e)
        }
    }

    const changeEditModeHandler = () => {
        setEditMode(!editMode)
    }

    if (!profile) return <Preloader />

    return (

        <div className={s.wrapper}>
            <div className={s.photoWrapper}>
                <img
                    src={profile.photos.large || userPhoto}
                    className={s.mainPhoto}
                    alt='logo-main' />
                {isOwner && (
                    <label title={'edit photo'} className={s.inputFile}>
                        <input type='file' name='file' onChange={onMainPhotoSelected} />
                        <Icon id={'edit'} width={'20'} height={'20'} viewBox={'0 0 25 25'} />
                    </label>
                )}
            </div>


            <div>
                <div className={s.nameWrapper}>
                    <Typography variant={'h3'} as={'h3'}>{user?.fullName || login || ''}</Typography>
                    {profile.lookingForAJob &&
                        <Typography variant={'caption1'} className={s.smallText}>in looking of work</Typography>}
                </div>
                < ProfileStatus />
                {editMode && <ProfileReduxDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} />}
                {!editMode && <ProfileData profile={profile} />}


                {!editMode && isOwner && (
                    <Button title={'Edit profilePage'} className={s.buttonEdit} callback={changeEditModeHandler}>
                        <Icon id={'edit'} width={'18'} height={'18'} />
                        <Typography variant={'body2'}>Edit Profile</Typography>
                    </Button>
                )}
            </div>

        </div>
    )
}
