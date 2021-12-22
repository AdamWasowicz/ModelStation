import React from 'react';


//Styles
import { default as CC_NotLoggedException } from './NotLoggedException.module.scss';


const NotLoggedException = () => {

    return(
        <div className='NotLoggedException'>
            <div className='Information'>Nie jesteś zalogowany</div>
            <div className='Description'>Aby móc dodać komentarz zaloguj się na swoje konto</div>
        </div>
    )
}


export default NotLoggedException;