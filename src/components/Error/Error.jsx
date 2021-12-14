import React from 'react';
import { useNavigate } from 'react-router';


//Styles
import { default as ErrorStyles } from './Error.module.scss'


const Error = () => {

    //useNavigate
    const navigate = useNavigate();


    //Handler
    const GoToMainClickHandler = () => navigate('/');
    const GoToPrevious = () => navigate(-1);


    return (
        <div className='Error'>
            <div className='Information'>
                Wystąpił nieznany błąd
            </div>

            <div className='Description'>
                Bład został automatycznie zgłoszony, postaramy się jak najszybciej go naprawić. Przeprawszamy za niedogodność.
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

export default Error;