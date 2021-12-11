import React, {useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';


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


    //Context
    const { isModalOpen, setIsModalOpen, isLoggedIn, setIsLoggedIn} = useContext(StoreContext)


    //Handlers
    const handleOnClose = () => setIsModalOpen(false);
    const handleOnClick = () => setIsModalOpen(true);  
    const handleLogOut = () => {
        window.localStorage.clear();
        setIsLoggedIn(false);
    }
    const ChangeRegisterFormOpenHandler = () => setRegisterFormOpen(!registerFormOpen);

    return (
        <div className={'Menu'}>
            {
                !isLoggedIn
                ? <div className='MenuButton'>
                    <button className='LoginButton' 
                        onClick={handleOnClick}>
                            Zaloguj
                    </button>
                </div>
                : null
            }

            {
                !isLoggedIn
                ? <div>
                    <button className='MenuButton'
                        onClick={ChangeRegisterFormOpenHandler}>
                            Rejestracja
                    </button>
                </div>
                : null
            }

            {
                isLoggedIn
                ? <div className='DropDown'>

                    <button className='DropDownButton'>
                        { ReadLocalStorage('user').userName }
                    </button>

                    <div className='DropDownContent'>
                        <button className='DropDownContentItem'>
                            <Link 
                                className='DropDownContentItemLink' to="createpost">
                                    Nowy post
                            </Link>
                        </button>

                        <button className='DropDownContentItem' 
                            onClick={handleLogOut}>
                                Wyloguj
                        </button>
                    </div>

                </div>
                : null
            }

            
            <LoginForm handleOnClose={handleOnClose} isOpen={isModalOpen} />
            {
                registerFormOpen
                ? <RegisterForm 
                    OnCloseHandler={ChangeRegisterFormOpenHandler}/>
                : null
            }
        </div>
    )
}

export default Menu;