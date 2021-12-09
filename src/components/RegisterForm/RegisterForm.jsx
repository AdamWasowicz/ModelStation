import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';


//Images
import bannerImage from './resources/RegisterBannerImage_BW.jpg';


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
    const CreateNewAccount = async () => {
        if (ValidateForm())
        {
            await Register(email, login, password, setRegisterResult);
            OnCloseHandler();
            navigate('./accountcreated');

        }
        else
            alert("Niepoprawnie wypełniony formularz");
        
    }
    const ValidateForm = () => {
        if (!(login.length > 0))
            return false;

        if (!(password.length > 0))
            return false;

        return true;
    }


    return (
        <Modal
            closeOnBackgroundClick={true}
            handleOnClose={OnCloseHandler}
            isOpen={true}
        >
            <div className='RegisterForm'>

                <img className='PictureBanner' src={bannerImage} alt='registerBannerImage' />


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
                                Nazwa użytkownika
                            </div>

                            <input className='InfoInput'
                                value={login}
                                onChange={LoginChangeHandler}
                            ></input>
                        </div>

                        <div className='InfoLabel'>
                            <div className='InfoText'>
                                Hasło
                            </div>

                            <input className='InfoInput'
                                type='password'
                                value={password}
                                onChange={PasswordChangeHandler}
                            ></input>
                        </div>
                    </div>

                    <div className='ValidateMessage'>
                        {
                            registerResult != 0
                            ?   registerResult == 1
                                ? 'Wszystko ok'
                                : 'Wystąpił błąd'
                    
                            : null
                        }
                    </div>

                    <div className='ManipulationPanel'>
                        <button className='RegisterButton'
                        onClick={SendFormHandler}
                        >
                            RegisterButton
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default RegisterForm;