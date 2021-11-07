import React from 'react'
import bemCssModules from 'bem-css-modules'

//Styles
import { default as HeaderStyles } from './Header.module.scss'

const block = bemCssModules(HeaderStyles);

const Header = () => {
    return (
        <header className={block()}>
            <div className={block('bannerImage')}alt='bannerImage'>Image</div>
            <div className={block('title')}>Title</div>
        </header>
    )
}

export default Header;