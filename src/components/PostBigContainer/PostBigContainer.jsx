import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostBigContainerStyle } from './PostBigContainer.module.scss'
const style = bemCssModules(PostBigContainerStyle);


//Components
import PostBig from '../PostBig';
import CreateComment from '../CreateComment';
import CommentWraper from '../CommentWraper';


//Functions

const PostBigContainer = () => {

    //useState

    //useEffect

    //Functions
    
    //Handlers
    

    return (
        <div className='PostBigContainer'>
            <PostBig/>
            <CreateComment/>
            <CommentWraper/>
        </div>
    )
};

export default PostBigContainer;