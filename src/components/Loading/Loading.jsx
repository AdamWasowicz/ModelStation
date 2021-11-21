import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as LoadingStyle } from './Loading.module.scss'
const style = bemCssModules(LoadingStyle);


//Components

//Functions


const Loading = () => {

    //useState);

    //useEffect

    //Functions

    //Handlers
    

    return (
        <React.Fragment>
            <div className={style('')}> 
                <h1>Ładowanie zawartości</h1>
                <FontAwesomeIcon className={style('__LoadingIcon')} icon={faSpinner} />
            </div>
        </React.Fragment>
    )
};

export default Loading;