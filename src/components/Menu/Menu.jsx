import React, {useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as MenuStyles } from './Menu.module.scss'
const style = bemCssModules(MenuStyles);

//Components
import LoginForm from '../LoginForm/LoginForm';


const Menu = () => {
    //Context
    const { isModalOpen, setIsModalOpen, isLoggedIn, setIsLoggedIn} = useContext(StoreContext)

    //Handlers
    const handleOnClose = () => setIsModalOpen(false);
    const handleOnClick = () => setIsModalOpen(true);  
    const handleLogOut = () => {
        window.localStorage.clear();
        setIsLoggedIn(false);
    }

    return (
        <div className={style()}>
            {
                isLoggedIn
                    ? <div><button><Link to="createpost">createPost</Link></button></div>
                    : null
            }

            {
                isLoggedIn
                    ? <div><button><Link to="editpost">editPost</Link></button></div>
                    : null
            }

            {
                isLoggedIn
                    ? <div><button><Link to="userposts">UserPosts</Link></button></div>
                    : null
            }




            {
                !isLoggedIn
                    ? <div><button className={style('loginButton')} onClick={handleOnClick}>Zaloguj</button></div>
                    : <div><button className={style('loginButton')} onClick={handleLogOut}>Wyloguj</button></div>
            }
            
            <LoginForm handleOnClose={handleOnClose} isOpen={isModalOpen} />
        </div>
    )
}

export default Menu;