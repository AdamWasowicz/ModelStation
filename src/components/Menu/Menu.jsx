import React, {useContext } from 'react'
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as MenuStyles } from './Menu.module.scss'
const style = bemCssModules(MenuStyles);

//Components
import LoginForm from '../LoginForm/LoginForm';

const Menu = () => {
    //Context
    const { isModalOpen, user, setUser, setIsModalOpen, setJwt } = useContext(StoreContext)

    //Handlers
    const handleOnClose = () => setIsModalOpen(false);

    const handleOnClick = () => {
        if (Boolean(user))
            setUser(null);
        else
            setIsModalOpen(true);
    }

    const handleLogOut = () => {
        setUser(null);
        setJwt('');
    }
    

    return (
        <React.Fragment>
            <div className={style()}>
                { user == null 
                    ? <button className={style('loginButton')}onClick={handleOnClick}>Zaloguj</button>
                    : <button className={style('loginButton')}onClick={handleLogOut}>Wyloguj</button>
                }
            </div>
            <LoginForm handleOnClose={handleOnClose} isOpen={isModalOpen}/>
        </React.Fragment>
    )
}

export default Menu;