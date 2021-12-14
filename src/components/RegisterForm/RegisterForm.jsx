import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';


//Resources
import { RegisterImage } from '../../StaticResources_routes';


//Component
import Modal from '../Modal/Modal';


//Helpers
import { Register } from '../../helpers/AccountHelper';


//Styles
import { default as RegisterFormstyle } from './RegisterForm.module.scss';


const RegisterForm = ({ OnCloseHandler }) => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [registerResult, setRegisterResult] = useState(0);

    const [emailValid, setEmailValid] = useState(0);
    const [loginValid, setLoginValid]  = useState(0);
    const [passwordValid, setPasswordValid] = useState(0);


    //Context
    const { setIsLoggedIn } = useContext(StoreContext);


    //useNavigate
    const navigate = useNavigate();


    //Handlers
    const EmailChangeHandler = (event) => setEmail(event.target.value);
    const LoginChangeHandler = (event) => setLogin(event.target.value);
    const PasswordChangeHandler = (event) => setPassword(event.target.value);
    const SendFormHandler = () => CreateNewAccount();
    

    //Functions
    const ValidateForm = () => {

        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
        {
            setEmailValid(-1);
        }
        else
            setEmailValid(1);


        if (login.length == 0)
        {
            setLoginValid(-1)
        }
        else
            setLoginValid(1);

        if (password.length == 0)
        {
            setPasswordValid(-1)
        }
        else
            setPasswordValid(1);

        if (emailValid == 1 && loginValid == 1 && passwordValid == 1)
            return true
        else
            return false;
    }

    const CreateNewAccount = async () => {
        if (ValidateForm() == true)
        {
            await Register(email, login, password, setRegisterResult);
            ClearInputs();
            OnCloseHandler();
            navigate('./accountcreated');

        }
        else
            alert("Niepoprawnie wypełniony formularz");
    }

    const ClearInputs = () => {
        setEmail('');
        setLogin('');
        setPassword('');
        setValidationMessage('');
    }


    return (
        <Modal
            closeOnBackgroundClick={true}
            handleOnClose={OnCloseHandler}
            isOpen={true}
        >
            <div className='RegisterForm'>

                <img className='PictureBanner' src={RegisterImage} alt='registerBannerImage' />


                <div className='RightPanel'>
                    <div className='RegisterInfo'>
                        <div className='InfoLabel'>
                            <div className='InfoText'>
                                Email:
                            </div>

                            <input type='email' className='InfoInput'
                                value={email}
                                onChange={EmailChangeHandler}
                            ></input>
                        </div>

                        <div className='InfoLabel'>
                            <div className='InfoText'>
                                Nazwa użytkownika:
                            </div>

                            <input className='InfoInput'
                                value={login}
                                onChange={LoginChangeHandler}
                            ></input>
                        </div>

                        <div className='InfoLabel'>
                            <div className='InfoText'>
                                Hasło:
                            </div>

                            <input className='InfoInput'
                                type='password'
                                value={password}
                                onChange={PasswordChangeHandler}
                            ></input>
                        </div>
                    </div>

                    <div className='ValidateMessage'>
                        <h4 className={emailValid == -1 ? 'Requirement-Invalid' : 'Requirement'}>Email: musi być poprawny</h4>
                        <h4 className={loginValid == -1 ? 'Requirement-Invalid' : 'Requirement'}>Login: przynajmniej 8 znaków</h4>
                        <h4 className={passwordValid == -1 ? 'Requirement-Invalid' : 'Requirement'}>Hasło: przynajmniej 8 znaków</h4>
                    </div>

                    <div className='ManipulationPanel'>
                        <button className='RegisterButton'
                        onClick={SendFormHandler}>
                            Zarejestruj się
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default RegisterForm;