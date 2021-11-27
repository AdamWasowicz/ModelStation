import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostBigContainerStyle } from './PostBigContainer.module.scss'
const style = bemCssModules(PostBigContainerStyle);


//Components
import PostBig from '../PostBig';


//Functions

const PostBigContainer = () => {

    //useState

    //useEffect

    //Functions
    
    //Handlers
    

    return (
        <div className='PostBigContainer'>
            <PostBig/>
        </div>
    )
};

export default PostBigContainer;