import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';


//Resources
import { UserBaseImage } from '../../StaticResources_routes';
import { parseJwt, ReadLocalStorage } from '../../Fuctions';
import { API_address, fileStorageGetUserImage } from '../../API_routes';


//Components
import Loading from '../Loading';
import DeleteAccountModal from './DeleteAccountModal';


//Helpers
import { GetUserProfileById, PatchUserProfile } from '../../helpers/PostHelper';
import { DeleteAccount, ChangePassword } from '../../helpers/AccountHelper';


//Styles
import { default as UserStyles } from './User.module.scss'


const User = () => {

    //useParams
    const userId = useParams().userId;


    //useNavigate
    const navigate = useNavigate();


    //useContext
    const { isLoggedIn, setIsLoggedIn } = useContext(StoreContext)


    //useState
    const [userObject, setUserObject] = useState(null);
    const [view, setView] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(0);
    //displayFields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [description, setDescription] = useState('');
    //editFields
    const [e_name, setE_Name] = useState('');
    const [e_surname, setE_Surname] = useState('');
    const [e_description, setE_Description] = useState('');
    //Flags
    const [editMode, setEditMode] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    //changePasswordsFields
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [pcValidationMsg, setPcValidationMsg] = useState('');



    //useEffect
    useEffect(() => {
        setUserObject(null);
        GetUserProfile();
    }, [])

    useEffect(() => {
        if (userObject != null) {
            userObject.name != null
                ? setName(userObject.name)
                : setName('');

            userObject.surname != null
                ? setSurname(userObject.surname)
                : setName('');

            userObject.description != null
                ? setDescription(userObject.description)
                : setName('')

            userObject.name != null
                ? setE_Name(userObject.name)
                : null;

            userObject.surname != null
                ? setE_Surname(userObject.surname)
                : null;

            userObject.description != null
                ? setE_Description(userObject.description)
                : null;
        }
    }, [userObject])


    //Functions
    const ReplaceDisplayValuesForEditValues = () => {
        setName(e_name);
        setSurname(e_surname);
        setDescription(e_description);
    }
    //API
    const GetUserProfile = async () => GetUserProfileById(userId, setUserObject, setLoading);
    const PatchUserProfileOnClick = async () => {
        if (ValidateEditUserDataForm()) {
            setLoading(true);
            await PatchUserProfile(e_name, e_surname, e_description, setLoading);
            ReplaceDisplayValuesForEditValues();
            setEditMode(false);
        }
        else
            alert('Niepoprawnie uzupełniony profil');

    }
    const DeleteAccountHandler = async(cPassword, sLoading, sError) => {
        await DeleteAccount(cPassword, sLoading, setIsLoggedIn, setView, sError, setDeleteModalOpen);
    }
    //Other
    const ChangePasswordOnClick = async () => {
        ValidatePasswordChangeForm()
            ? await ChangePassword(currentPassword, newPassword, setLoading, setIsLoggedIn, setView, setError) : alert('Niepoprawnie wypełniony formularz');
    }
    const RenderSubView = (view) => {
        if (view == 0)
            return UserDataView();

        if (view == 1)
            return UserAccountControlView();

        if (view == 11)
            return <div>OK</div>

        if (view == 12)
            return AccountChangeFailed();
    }
    //Validators
    const ValidateEditUserDataForm = () => {
        if (!(e_name?.length < 64))
            return false;

        if (!(e_surname?.length < 64))
            return false;

        if (e_description > 256)
            return false;

        return true;
    }
    const ValidatePasswordChangeForm = () => {
        if (newPassword.length > 0 && newPassword == repeatNewPassword && currentPassword.length > 0)
            return true;

        return false;
    }


    //Handlers
    //ProfileHandlers
    const e_NameChangeHandler = (event) => setE_Name(event.target.value);
    const e_SurnameChangeHandler = (event) => setE_Surname(event.target.value);
    const e_DescriptionChangeHandler = (event) => {
        event.target.value.length <= 256
            ? setE_Description(event.target.value)
            : null;
    }
    //Other
    const SwitchEditModeHandler = () => setEditMode(!editMode);
    const NavigateToUserPostsHandler = () => (userObject != null ? navigate('/userposts/' + userObject.userName) : null);
    const SwitchToAccountPanelHandler = () => {
        setEditMode(false);
        setView(1);
    }
    const SwitchToInformationViewHanlder = () => {
        setEditMode(false);
        setView(0);
    }
    //PasswordChangeHandlers
    const CurrentPasswordChangeHandler = (event) => setCurrentPassword(event.target.value);
    const NewPasswordChangeHandler = (event) => setNewPassword(event.target.value);
    const RepeatNewPasswordChangeHandler = (event) => setRepeatNewPassword(event.target.value);




    //SubViews
    //UserDataView
    const UserDataView = () => {
        return (
            <div className='UserDataView'>
                <div className='Information'>
                    Dane użytkownika:
                </div>

                <div className='DataContainer'>
                    {
                        !(name == '' && surname == '' && description == '') || editMode
                            ? <div className='UserDataViewDisplay'>
                                {
                                    name != '' || editMode
                                        ? <div className='UserInformation'>
                                            <div className='UserInformationLabel'>Imię:</div>
                                            {
                                                editMode == false
                                                    ? <div className='UserInformationValue'>{name}</div>
                                                    : <input
                                                        className='UserInformationValue-Input'
                                                        value={e_name}
                                                        onChange={e_NameChangeHandler}></input>
                                            }

                                        </div>
                                        : null
                                }

                                {
                                    surname != '' || editMode
                                        ? <div className='UserInformation'>
                                            <div className='UserInformationLabel'>Nazwisko:</div>
                                            {
                                                editMode == false
                                                    ? <div className='UserInformationValue'>{surname}</div>
                                                    : <input
                                                        className='UserInformationValue-Input'
                                                        value={e_surname}
                                                        onChange={e_SurnameChangeHandler}></input>
                                            }
                                        </div>
                                        : null
                                }

                                {
                                    description != '' || editMode
                                        ? <div className='UserDescription'>
                                            <div className='UserDescriptionLabel'>O mnie:</div>
                                            {
                                                editMode == false
                                                    ? <div className='UserDescriptionValue'>{description}</div>
                                                    : <textarea
                                                        className='UserDescriptionValue-Input'
                                                        value={e_description}
                                                        onChange={e_DescriptionChangeHandler}></textarea>
                                            }
                                        </div>
                                        : null
                                }
                            </div>
                            : <div className='UserDataViewDisplay'>
                                <div className='UserDescription'>
                                    <div className='UserDescriptionLabel'>Brak informacji:</div>
                                    <div className='UserDescriptionValue'>Ten użytkownik nie udostępnił żadnych informacji o sobie
                                    </div>
                                </div>
                            </div>

                    }
                </div>
            </div>
        )
    }
    //UserChangePassword
    const UserAccountControlView = () => {
        return (
            <div className='UserAccountControlView'>
                <div className='PasswordControl'>
                    <div className='Information'>Zmiana hasła:</div>
                    <div className={error != -2 ? 'Field' : 'Field-Invalid'}>
                        <div className='FieldLabel'>Obecne hasło:</div>
                        <input
                            type='password'
                            className='FieldValue'
                            value={currentPassword}
                            onChange={CurrentPasswordChangeHandler}></input>
                    </div>

                    <div className='Field'>
                        <div className='FieldLabel'>Nowe hasło:</div>
                        <input
                            type='password'
                            className='FieldValue'
                            value={newPassword}
                            onChange={NewPasswordChangeHandler}></input>
                    </div>

                    <div className='Field'>
                        <div className='FieldLabel'>Nowe hasło:</div>
                        <input
                            type='password'
                            className='FieldValue'
                            value={repeatNewPassword}
                            onChange={RepeatNewPasswordChangeHandler}></input>
                    </div>

                    <button
                        className='Button'
                        onClick={ChangePasswordOnClick}>
                        Zmień hasło
                    </button>
                </div>

                <div className='DeleteAccountControl'>
                    {
                        deleteModalOpen
                        ? <DeleteAccountModal 
                            DeleteAction={DeleteAccountHandler}
                            OnCancel={ () => setDeleteModalOpen(false) }/>
                        : null
                    }

                    <button
                        className='DeleteAccount'
                        onClick={() => setDeleteModalOpen(true)}>
`                           Usuń konto
                    </button>
                </div>
            </div>
        )
    }
    const AccountChangeFailed = () => {
        return (
            <div className='AccountChangeFailed'>
                <div className='InfoContainer'>
                    <div className='Information'>Wystąpił błąd</div>
                    <div className='Description'>Coś poszło nie tak podczas operacji na danych twojego konta, spróbuj ponownie za chwile</div>
                </div>

                <button
                    className='GoBackButton'
                    onClick={SwitchToAccountPanelHandler}>
                    Powrót
                </button>
            </div>
        )
    }







    if (loading == false)
        return (
            <div className='User'>
                <div className='Info'>
                    <div className='UserInformation'>
                        <div className='UserNameLabel'>
                            U/
                            <div className='UserName'>
                                {userObject.userName}
                            </div>
                        </div>

                        <img
                            className='UserImage'
                            src={
                                userObject.file != null
                                    ? `${API_address}${fileStorageGetUserImage}/${userObject.file.id}`
                                    : UserBaseImage
                            }>
                        </img>
                    </div>

                    <div className='UserStats'>
                        <div
                            className='StatContainer-Posts'
                            onClick={NavigateToUserPostsHandler}>
                            <div className='StatLabel'>Posty:</div>
                            <div className='StatValue'>{userObject.amountOfPosts}</div>
                        </div>

                        <div className='StatContainer'>
                            <div className='StatLabel'>Komentarze:</div>
                            <div className='StatValue'>{userObject.amountOfComments}</div>
                        </div>
                    </div>

                    {
                        editMode && view == 0
                            ? <div className='SaveButtonContainer'>
                                <button
                                    className='SaveButton'
                                    onClick={PatchUserProfileOnClick}>
                                    Zapisz
                                </button>
                            </div>
                            : null
                    }
                </div>

                <div className='Display'>
                    {RenderSubView(view)}
                </div>

                {
                    isLoggedIn && parseJwt(ReadLocalStorage('jwt')).UserId == userObject?.id
                        ? <div className='ManipulationPanel'>
                            {
                                view == 0
                                ? <button
                                    className={
                                        editMode
                                        ? 'SwitchButton-Active'
                                        : 'SwitchButton'
                                    }
                                    onClick={view == 0 ? SwitchEditModeHandler : null}>
                                        Edycja
                                </button>
                                : null
                            }

                            <button
                                className={
                                    view == 0
                                        ? 'SwitchButton-Active'
                                        : 'SwitchButton'
                                }
                                onClick={SwitchToInformationViewHanlder}>
                                Dane
                            </button>

                            <button
                                className={
                                    view == 1
                                        ? 'SwitchButton-Active'
                                        : 'SwitchButton'
                                }
                                onClick={SwitchToAccountPanelHandler}>
                                Konto
                            </button>
                        </div>
                        : null
                }
            </div>
        )
    else if (loading)
        return (<Loading />)
}

export default User;