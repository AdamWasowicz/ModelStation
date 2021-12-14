import React from 'react'
import { useNavigate } from 'react-router-dom';


//Styles
import { default as UserHasNoPostsExceptionStyles } from './UserHasNoPostsException.module.scss'


const UserHasNoPostsException = () => {

    //useNavigate
    const navigate = useNavigate();


    //Handler
    const GoToMainClickHandler = () => navigate('/');
    const GoToPrevious = () => navigate(-1);


    return (
        <div className='UserHasNoPostsException'>
            <div className='Information'>
                Ten użytkownik nie posiada żadnych postów
            </div>


            <div className='Buttons'>
                <button
                    className='GoBackButton'
                    onClick={GoToPrevious}>
                    Powrót do poprzedniej strony
                </button>

                <button
                    className='GoBackButton'
                    onClick={GoToMainClickHandler}>
                    Powrót do strony głównej
                </button>
            </div>
        </div>
    )
};

export default UserHasNoPostsException;