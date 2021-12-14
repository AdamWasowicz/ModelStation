import React from 'react'
import { useNavigate } from 'react-router-dom';


//Styles
import { default as NotLoggedExceptionStyle } from './NotLoggedException.module.scss'


const NotLoggedException = () => {

    //useNavigate
    const navigate = useNavigate();


    //Handlers
    const GoBackClickHandler = () => navigate('/');

    return (
        <div className='NotLoggedException'>
            <div className='Information'>Brak dostępu</div>

            <div className='Description'>
                Aby uzyskać dostęp do tej części serwisu musisz zalogować się na swoje konto
            </div>

            <button 
                className='GoBackButton'
                onClick={GoBackClickHandler }>
                    Powrót do strony głównej
            </button>
        </div>
    )
};

export default NotLoggedException;