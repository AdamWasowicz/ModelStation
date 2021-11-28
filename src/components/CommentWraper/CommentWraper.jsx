import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as CommentWraperStyle } from './CommentWraper.module.scss'
const style = bemCssModules(CommentWraperStyle);


//Components
import CommentContainer from '../CommentContainer';


//Functions

const CommentWraper = () => {

    //useState

    //useEffect

    //Functions
    
    //Handlers

    return (
        <div className='CommentWraper'>
            <CommentContainer/>
        </div>
    )
};

export default CommentWraper;