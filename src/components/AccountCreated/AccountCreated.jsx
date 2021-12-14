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
    const GoToRuleSetClickHandler = () => navigate('./ruleset');


    return (
        <div className='AccountCreated'>
            <div 
                className='WelcomeMessage'>
                    Witamy nowego użytkownika
            </div>

            <div className='InformationMessage'>
                Podczas korzystania z serwisu przestrzegaj regulaminu i bądź uprzejmy dla innych użytkowników ale przedewszystkim baw się dobrze.
            </div>

            <button 
                    className='RuleSetButton'
                    onClick={GoToRuleSetClickHandler}>
                        Regulamin
            </button>

            <button 
                class='GoBackButton'
                onClick={GoBackClickHandler}>
                    Powrót do strony głównej
            </button>
        </div>
    )
}

export default AccountCreated;
