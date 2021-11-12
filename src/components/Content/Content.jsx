import React, {useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'

//Components
import PostSmall from '../PostSmall';


//Styles
import { default as ContentStyles } from './Content.module.scss'
const style = bemCssModules(ContentStyles);



const Content = () => {
    return (
        <React.Fragment>
            <div className={style()}>
                <PostSmall/>

                <PostSmall/>
            </div>
        </React.Fragment>
    )
}

export default Content;