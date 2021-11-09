import React, { useState, useContext, useEffect } from 'react';
import bemCssModules from 'bem-css-modules';

//ImportedComponents
import Modal from '../Modal/Modal';
import { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as LoginFormStyles } from './LoginForm.module.scss';
const style = bemCssModules(LoginFormStyles);

//Component
const LoginForm = ({ handleOnClose, isOpen }) => {
    //State
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('')

    //Context
    const { setUser } = useContext(StoreContext);


    //Handlers
    const handleOnChangeLogin = ({ target: { value } }) => setLogin(value);
    const handleOnChangePassword = ({ target: { value } }) => setPassword(value);
    const handleOnCloseModal = event => {
        event.preventDefault();
        handleOnClose();
    };
    const handleOnSubmit = async event =>
    {
        //Strzał do API
        event.preventDefault();
        //const { data, status } = await requestAnimationFrame.post('/adresApi',
        //{ login, password }
        //);
        //
        //if (status === 200)
        //{
        //    setUser(data.user);
        //    resetStateOfInputs();
        //    handleOnClose();
        //}
        //else
        //{
        //   setValidateMessage(data.message);
        //}
        console.log('LoginForm->Zaloguj');
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


    //ValidationMessageComponent
    const validateMessageComponent = validateMessage.length
     ? <p className={style('validateMessage')}>{validateMessage}</p> 
     : null;



    return (
        <Modal closeOnBackgroundClick={true}  handleOnClose={handleOnClose} isOpen={isOpen}>
            {validateMessageComponent}
            <form className={style()} method="post" onSubmit={handleOnSubmit}>
                <div className={style('row')}>
                    <label>
                        Login:
                        <input type="text" onChange={handleOnChangeLogin} value={login}/>
                    </label>
                </div>
                    
                <div className={style('row')}>
                    <label>
                        Hasło:
                        <input type="password" onChange={handleOnChangePassword} value={password}/>
                    </label>
                </div>

                <div className={style('row')}>
                    <button type="submit">Zaloguj</button>
                    <button type="button" onClick={handleOnCloseModal}>Anuluj</button>
                </div>
            </form>
        </Modal>
    )
};

export default LoginForm;
