import React, {useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as PostBigContainerStyle } from './PostBigContainer.module.scss'


//Components
import PostBig from '../PostBig';
import CommentContainer from '../CommentContainer';

//Functions

const PostBigContainer = () => {

    //useState

    //useContext
   
    //useEffect

    //Functions
    
    //Handlers
    

    return (
        <div className='PostBigContainer'>
            <PostBig/>
            <CommentContainer/>
        </div>
    )
};

export default PostBigContainer;