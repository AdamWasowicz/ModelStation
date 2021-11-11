import React, {useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'
import StoreProvider, { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as HeaderStyles } from './Header.module.scss'
const block = bemCssModules(HeaderStyles);

//Components
import LoginForm from '../LoginForm/LoginForm';


const Header = () => {
    //State
    //Modal
    const [isOpen, setIsOpen] = useState(false);
    //User
    const { user, setUser} = useContext(StoreContext);

    //Handlers
    const handleOnClose = () => setIsOpen(false);
    const handleOnClick = () => {
        if (Boolean(user))
            setUser(null);
        else
            setIsOpen(true);
    }


    return (
        <header className={block()}>
            <div className={block('bannerImage')}alt='bannerImage'>Image</div>
            <div className={block('title')}>Title</div>
            <button onClick={handleOnClick}>ModalTest</button>
            <LoginForm handleOnClose={handleOnClose} isOpen={isOpen}/>
        </header>
    )
}

export default Header;