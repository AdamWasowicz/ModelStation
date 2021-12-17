import React, { useState, useContext, useEffect } from 'react';


//Components
import Modal from '../Modal';
import { StoreContext } from '../../store/StoreProvider';
import { LoginHelper } from '../../helpers/AccountHelper';


//Resources
import { LoginImage } from '../../StaticResources_routes';


//Styles
import { default as LoginFormStyles } from './LoginForm.module.scss';


const LoginForm = ({ handleOnClose, isOpen }) => {
    //State
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('')

    //Context
    const { setIsLoggedIn } = useContext(StoreContext);


    //Handlers
    const handleOnChangeLogin = ({ target: { value } }) => setLogin(value);
    const handleOnChangePassword = ({ target: { value } }) => setPassword(value);
    const handleOnCloseModal = event => {
        event.preventDefault();
        handleOnClose();
    };
    const handleOnSubmit = async event => {
        //Strzał do API
        event.preventDefault();
        const error = await LoginHelper(login, password, setIsLoggedIn);
        if (error) {
            setValidateMessage('Błąd logowania');
        }
        else {
            resetStateOfInputs();
            handleOnClose();
        }
    }

    //Functions
    const resetStateOfInputs = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    }

    useEffect(() => {
        if (isOpen)
            resetStateOfInputs;
    }, [isOpen])


    return (
        <Modal closeOnBackgroundClick={true} handleOnClose={handleOnClose} isOpen={isOpen}>
            <form className='LoginForm' method="post" onSubmit={handleOnSubmit}>
                <img className='LeftPart' src={LoginImage}>

                </img>

                <div className='RightPart'>
                    <div className='LoginInfo'>
                        <div className='InfoLabel'>
                            <div className='InfoText'>
                                Login:
                            </div>
                            <input className='InfoInput' type="text" onChange={handleOnChangeLogin} value={login} />
                        </div>

                        <div className='InfoLabel'>
                            <div className='InfoText'>
                                Hasło:
                            </div>
                            <input className='InfoInput' type="password" onChange={handleOnChangePassword} value={password} />
                        </div>
                    </div>

                    <div className='ValidateMessage'>
                        {validateMessage}
                    </div>

                    <div className='ManipulationPanel'>
                        <button className='LoginButton' type="submit">Zaloguj</button>

                    </div>
                </div>
            </form>
        </Modal>
    )
};

export default LoginForm;
