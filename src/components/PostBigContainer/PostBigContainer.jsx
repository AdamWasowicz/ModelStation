import React, {useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as PostBigContainerStyle } from './PostBigContainer.module.scss'


//Components
import PostBig from '../PostBig';
import CreateComment from '../CreateComment';
import CommentWraper from '../CommentWraper';


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
            <CommentWraper/>
        </div>
    )
};

export default PostBigContainer;