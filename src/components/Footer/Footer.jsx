import React, { useContext, useRef, useCallback } from 'react';
import bemCssModules from 'bem-css-modules'


//Styles
import { default as FooterStyles } from './Footer.module.scss'
const style = bemCssModules(FooterStyles);


const Footer = () => {
    return (
        <div className='Footer'>
            Footer
        </div>
    )
}

export default Footer;