import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';


//Resources
import { UserBaseImage } from '../../StaticResources_routes';
import { parseJwt, ReadLocalStorage } from '../../Fuctions';
import { API_address, fileStorageGetUserImage } from '../../API_routes';


//Components
import Loading from '../Loading';


//Helpers
import { GetUserProfileById, PatchUserProfile } from '../../helpers/PostHelper';


//Styles
import { default as UserStyles } from './User.module.scss'


const User = () => {

    //useParams
    const userId = useParams().userId;


    //useNavigate
    const navigate = useNavigate();


    //useContext
    const { isLoggedIn } = useContext(StoreContext)


    //useState
    const [userObject, setUserObject] = useState(null);
    const [view, setView] = useState(0);
    const [loading, setLoading] = useState(true);
    //displayFields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [description, setDescription] = useState('');
    //editFields
    const [e_name, setE_Name] = useState('');
    const [e_surname, setE_Surname] = useState('');
    const [e_description, setE_Description] = useState('');
    //Edit
    const [editMode, setEditMode] = useState(false);


    //useEffect
    useEffect(() => {
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
    const GetUserProfile = async () => GetUserProfileById(userId, setUserObject,setLoading);
    const PatchUserProfileOnClick = async () => {
        if (ValidateEditUserDataForm())
        {
            setLoading(true);
            await PatchUserProfile(e_name, e_surname, e_description, setLoading);
            ReplaceDisplayValuesForEditValues();
            setEditMode(false);
        }
        else
            alert('Niepoprawnie uzupełniony profil');

    }
    const RenderSubView = (view) => {
        if (view == 0)
            return UserDataView();
    }
    const ValidateEditUserDataForm = () => {
        if (!(e_name?.length < 64))
            return false;

        if (!(e_surname?.length < 64))
            return false;

        if (e_description > 256)
            return false;

        return true;
    }


    //Handlers
    const e_NameChangeHandler = (event) => setE_Name(event.target.value);
    const e_SurnameChangeHandler = (event) => setE_Surname(event.target.value);
    const e_DescriptionChangeHandler = (event) => {
        event.target.value.length <= 256 
        ? setE_Description(event.target.value)
        : null;
    }
    const SwitchEditModeHandler = () => setEditMode(!editMode);


    //SubViews
    //UserDataView
    const UserDataView = () => {
        return (
            <div className='UserDataView'>
                <div className='Information'>
                    Dane użytkownika:
                </div>

                <div className='DataContainer'>
                         {UserDataViewDisplay()}
                </div>
            </div>
        )
    }
    const UserDataViewDisplay = () => {
        if ((!(name == '' && surname == '' && description == '')) || editMode)
        return(
            <div className='UserDataViewDisplay'>
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
        )
        else
            return(
                <div className='UserDataViewDisplay'>
                    <div className='UserDescription'>
                        <div className='UserDescriptionLabel'>Brak informacji:</div>
                        <div className='UserDescriptionValue'>Ten użytkownik nie udostępnił żadnych informacji o sobie</div>
                    </div>
                </div>
            )

    }
        
    



    console.log(userObject);
    
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
                        <div className='StatContainer'>
                            <div className='StatLabel'>Posty:</div>
                            <div className='StatValue'>{userObject.amountOfPosts}</div>
                        </div>

                        <div className='StatContainer'>
                            <div className='StatLabel'>Komentarze:</div>
                            <div className='StatValue'>{userObject.amountOfComments}</div>
                        </div>
                    </div>

                    {
                        editMode
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
                    isLoggedIn && parseJwt(ReadLocalStorage('jwt')).UserId == userId
                        ? <div className='ManipulationPanel'>
                            <button
                                className={
                                    editMode
                                    ? 'SwitchButton-Active'
                                    :'SwitchButton'
                                }
                                onClick={SwitchEditModeHandler}>
                                    Edycja</button>
                        </div>
                        : null
                }
            </div>
        )
    else if (loading)
        return (<Loading />)
}

export default User;