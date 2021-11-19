import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as CreatePostStyle } from './CreatePost.module.scss'
const style = bemCssModules(CreatePostStyle);


//Functions


const PostSmall = React.forwardRef((postObject, ref) => {
    return (
        <React.Fragment>
            <div>
                CreatePost
            </div>
        </React.Fragment>
    )
});

export default PostSmall;