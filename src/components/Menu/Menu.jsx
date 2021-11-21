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
        <React.Fragment>
            <div className={style()}>
                <div>
                    { 
                        isLoggedIn
                        ? <button><Link to="createpost">createPost</Link></button>
                        : null
                    }
                </div>

                <div>
                    { 
                        isLoggedIn
                        ? <button><Link to="editpost">editPost</Link></button>
                        : null
                    }
                </div>

                <div>
                    {
                        !isLoggedIn
                        ? <button className={style('loginButton')}onClick={handleOnClick}>Zaloguj</button>
                        : <button className={style('loginButton')}onClick=     {handleLogOut}>Wyloguj</button>
                    }
                </div>
            </div>
            <LoginForm handleOnClose={handleOnClose} isOpen={isModalOpen}/>
        </React.Fragment>
    )
}

export default Menu;