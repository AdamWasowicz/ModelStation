import React, {useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'

//Styles
import { default as MenuStyles } from './Menu.module.scss'
const style = bemCssModules(MenuStyles);



const Menu = () => {
    return (
        <React.Fragment>
            <div className={style()}>
                Menu
            </div>
        </React.Fragment>
    )
}

export default Menu;