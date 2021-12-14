import React, { useContext, useRef, useCallback } from 'react';
import bemCssModules from 'bem-css-modules'


//Styles
import { default as FooterStyles } from './Footer.module.scss'
const style = bemCssModules(FooterStyles);


const Footer = () => {
    return (
        <div className='Footer'>
            <div className='LeftPart'>
                &copy; 2021 ModelStation
            </div>
        </div>
    )
}

export default Footer;