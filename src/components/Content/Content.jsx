import React, {useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'

//Styles
import { default as ContentStyles } from './Content.module.scss'
const style = bemCssModules(ContentStyles);



const Content = () => {
    return (
        <React.Fragment>
            <div className={style()}>
                Content
            </div>
        </React.Fragment>
    )
}

export default Content;