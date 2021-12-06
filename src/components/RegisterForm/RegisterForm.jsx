import React, { useState, useContext, useEffect } from 'react';
import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../../store/StoreProvider';


//Images
import bannerImage from './RegisterBannerImage_BW.jpg';

//Component
import Modal from '../Modal/Modal';


//Styles
import { default as RegisterFormstyle } from './RegisterForm.module.scss';


const RegisterForm = ({OnCloseHandler}) => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    //Context
    const { setIsLoggedIn } = useContext(StoreContext);


    //Handlers
    const EmailChangeHandler = (event) => setEmail(event.target.value);
    const LoginChangeHandler = (event) => setLogin(event.target.value);
    const PasswordChangeHandler = (event) => setPassword(event.target.value);


    return (
        <Modal
            closeOnBackgroundClick={true}
            handleOnClose={OnCloseHandler} 
            isOpen={true}
        >
            <div className='RegisterForm'>
                
                <img className='PictureBanner' src={bannerImage} alt='registerBannerImage'/>
                

                <div className='RightPanel'>
                    <div className='RegisterInfo'>
                        <div className='InfoLabel'>
                            <div className='InfoText'>
                                Email:
                            </div>

                            <input className='InfoInput' 
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
                        
                    </div>

                    <div className='ManipulationPanel'>
                        <button className='RegisterButton'>
                            RegisterButton
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default RegisterForm;