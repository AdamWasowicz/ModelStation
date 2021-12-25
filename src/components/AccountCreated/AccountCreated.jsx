import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'


//Styles
import { default as AccountCreatedStyle } from './AccountCreated.module.scss'


//Components

//Functions

const AccountCreated = () => {

    //useNavigate
    const navigate = useNavigate();


    //Handler
    const GoBackClickHandler = () => navigate('/');


    return (
        <div className='AccountCreated'>
            <div 
                className='WelcomeMessage'>
                    Witamy nowego użytkownika
            </div>

            <div className='InformationMessage'>
                Zaloguj się na swoje konto i zacznij korzystać z możliwości serwisu ModelStation, mamy nadzieje że miło spędzisz czas.
            </div>

            <button 
                className='GoBackButton'
                onClick={GoBackClickHandler}>
                    Powrót do strony głównej
            </button>
        </div>
    )
}

export default AccountCreated;
