import React, {useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'

//Styles
import { default as HeaderStyles } from './Header.module.scss'
import LoginForm from '../LoginForm/LoginForm';
import StoreProvider, { StoreContext } from '../../store/StoreProvider';

const block = bemCssModules(HeaderStyles);

const Header = () => {
    //State
    //Modal
    const [isOpen, setIsOpen] = useState(false);
    //User
    const { user, setUser} = useContext(StoreContext);
    console.log('Header->StoreContext', StoreContext);

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