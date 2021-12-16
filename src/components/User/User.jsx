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
import { GetUserProfileById } from '../../helpers/PostHelper';


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
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [description, setDescription] = useState(null);
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
            setName(userObject.name);
            setSurname(userObject.surname);
            setDescription(userObject.description);

            name != null ? setE_Name(name) : null;
            surname != null ? setE_Surname(surname) : null;
            description != null ? setE_Description(description) : null;
        }
    }, [userObject])


    //Functions
    const GetUserProfile = async () => GetUserProfileById(userId, setUserObject,setLoading);
    const RenderSubView = (view) => {
        if (view == 0)
            return UserDataView();
    }



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
        if (!(name == null && surname == null && description == null))
        return(
            <div className='UserDataViewDisplay'>
                {
                    name != null
                    ? <div className='UserInformation'>
                        <div className='UserInformationLabel'>Imię:</div>
                        <div className='UserInformationValue'>{name}</div>
                    </div>
                    : null
                }

                {
                    surname != null
                    ? <div className='UserInformation'>
                        <div className='UserInformationLabel'>Nazwisko:</div>
                        <div className='UserInformationValue'>{surname}</div>
                    </div>
                    : null
                }

                {
                    description != null
                    ? <div className='UserDescription'>
                        <div className='UserDescriptionLabel'>O mnie:</div>
                        <div className='UserDescriptionValue'>{description}</div>
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
                </div>

                <div className='Display'>
                    {RenderSubView(view)}
                </div>

                {
                    isLoggedIn && parseJwt(ReadLocalStorage('jwt')).userId == userId
                        ? <div className='ManipulationPanel'>
                            ManipulationPanel
                        </div>
                        : null
                }
            </div>
        )
    else if (loading)
        return (<Loading />)
}

export default User;