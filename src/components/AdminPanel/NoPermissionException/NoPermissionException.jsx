import React from 'react'
import { useNavigate } from 'react-router-dom';


//Styles
import { default as NoPermssionExceptionStyles } from './NoPermissionException.module.scss'


const NoPermissionException = () => {

    //useNavigate
    const navigate = useNavigate();


    //Handlers
    const GoBackClickHandler = () => navigate('/');


    return (
        <div className='NoPermissionException'>
            <div className='Information'>Brak dostępu</div>

            <div className='Description'>
                Nie masz odpowiednich uprawnień by zobaczyć daną zawartość
            </div>

            <button
                className='GoBackButton'
                onClick={GoBackClickHandler}>
                Powrót do strony głównej
            </button>
        </div>
    )
}


export default NoPermissionException;