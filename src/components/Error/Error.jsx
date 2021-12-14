import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as ErrorStyles } from './Error.module.scss'
const style = bemCssModules(ErrorStyles);


const Error = () => {
    return (
        <div className='Error'>
            Error
        </div>
    )
};

export default Error;