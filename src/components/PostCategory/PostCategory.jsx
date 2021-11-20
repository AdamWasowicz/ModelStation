import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostCategory } from './PostCategory.module.scss'
const style = bemCssModules(PostCategory);


//Functions


const PostCategory = () => {

    //useState
    const [postCategory, setPostCategory] = useState({});

    //useEffect

    //Functions
    
    //Handlers
    const handleOnClick = (event) => {

    }

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
};

export default PostCategory;