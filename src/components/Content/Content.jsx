import React, {useState, useContext, useRef, useCallback, useEffect } from 
'react';
import { Routes, Route } from "react-router-dom";
import bemCssModules from 'bem-css-modules'

//Components
import CreatePost from '../CreatePost';
import PostSmallContainer from '../PostSmallContainer';
import EditPost from '../EditPost';
import PostBigContainer from '../PostBigContainer';
import UserPosts from '../UserPosts';


//Styles
import { default as ContentStyles } from './Content.module.scss'
const style = bemCssModules(ContentStyles);




const Content = () => {
    return (
        <React.Fragment>
            <div className={style()}>
                <Routes>
                    <Route path='/' element={<PostSmallContainer/>}/>
                    <Route path='createpost' element={<CreatePost/>}/>
                    <Route path='editpost' element={<EditPost/>}/>
                    <Route path='post/:postId' element={<PostBigContainer/>}/>
                    <Route path='userposts' element={<UserPosts/>}/>
                </Routes> 
            </div>
        </React.Fragment>
    )
}

export default Content;