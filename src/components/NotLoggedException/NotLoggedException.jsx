import React, {useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'


//Styles
import { default as NotLoggedExceptionStyle } from './NotLoggedException.module.scss'
const style = bemCssModules(NotLoggedExceptionStyle);


const NotLoggedException = () => {
    return (
        <React.Fragment>
            <h1>Nie zalogowano się</h1>
            <button><Link to="/">Powrót do menu głównego</Link></button>
        </React.Fragment>
    )
};

export default NotLoggedException;