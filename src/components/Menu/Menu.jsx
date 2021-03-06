import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';


//Resources
import { AccessLevels } from '../../API_constants';


//Styles
import { default as MenuStyles } from './Menu.module.scss'
const style = bemCssModules(MenuStyles);


//Functions
import { ReadLocalStorage } from '../../Fuctions';


//Components
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm';


const Menu = () => {

    //useSate
    const [registerFormOpen, setRegisterFormOpen] = useState(false);


    //useNavigate
    const navigate = useNavigate();


    //Constants
    const role = ReadLocalStorage('user')?.role;


    //Context
    const { isModalOpen, setIsModalOpen, isLoggedIn, setIsLoggedIn } = useContext(StoreContext)


    //Handlers
    const handleOnClose = () => setIsModalOpen(false);
    const handleOnClick = () => setIsModalOpen(true);
    const handleLogOut = () => {
        window.localStorage.clear();
        setIsLoggedIn(false);
    }
    const handleReturn = () => {
        navigate('/');
    }
    const ChangeRegisterFormOpenHandler = () => setRegisterFormOpen(!registerFormOpen);
    const handleGoToUserProfileOnClick = () => 
    {
        navigate(`/myprofile/` + ReadLocalStorage('user').userName);
    }

    return (
        <div className='Menu'>

            <div className='LogoButton'
                onClick={handleReturn}>
                <div className='firstPart'>Model</div>
                <div className='secondPart'>Station</div>
            </div>

            <div className='RightPanel'>
                {
                    !isLoggedIn
                        ? <div className='AccountActions'>
                            <div className='MenuButton'
                                    onClick={handleOnClick}>
                                    Zaloguj
                            </div>

                            <div className='MenuButton'
                                    onClick={ChangeRegisterFormOpenHandler}>
                                    Rejestracja
                            </div>
                        </div>
                        : null
                }

                {
                    isLoggedIn
                        ? <div className='DropDown'>

                            <button 
                                className='DropDownButton'
                                onClick={handleGoToUserProfileOnClick}>
                                    {ReadLocalStorage('user').userName}
                            </button>

                            <div className='DropDownContent'>
                                <button className='DropDownContentItem'>
                                    <Link
                                        className='DropDownContentItemLink' to="createpost">
                                            Nowy post
                                    </Link>
                                </button>


                                {
                                    role?.accessLevel >= AccessLevels.IsModerator
                                    ? <button className='DropDownContentItem'>
                                        <Link
                                            className='DropDownContentItemLink' to="adminpanel">
                                                Panel Admina
                                        </Link>
                                    </button>
                                    : null
                                }

                                <button className='DropDownContentItem'
                                    onClick={handleLogOut}>
                                        Wyloguj
                                </button>
                            </div>

                        </div>
                        : null
                }
            </div>


            <LoginForm handleOnClose={handleOnClose} isOpen={isModalOpen} />
            {
                registerFormOpen
                    ? <RegisterForm
                        OnCloseHandler={ChangeRegisterFormOpenHandler} />
                    : null
            }
        </div>
    )
}

export default Menu;