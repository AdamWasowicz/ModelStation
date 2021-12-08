import React, { useEffect, useContext } from 
'react';
import { Routes, Route } from "react-router-dom";
import bemCssModules from 'bem-css-modules'
import StoreProvider, { StoreContext } from '../../store/StoreProvider';

//Components
import CreatePost from '../CreatePost';
import PostSmallContainer from '../PostSmallContainer';
import EditPost from '../EditPost';
import PostBigContainer from '../PostBigContainer';
import UserPosts from '../UserPosts';
import AccountCreated from '../AccountCreated';


//Styles
import { default as ContentStyles } from './Content.module.scss'
const style = bemCssModules(ContentStyles);




const Content = () => {

    //useContext
    const { isLoggedIn, setIsLoggedIn } = useContext(StoreContext);

    
    useEffect( () => {
        if (JSON.parse(window.localStorage.getItem('jwt')) == null)
            setIsLoggedIn(false);

    }, [])

    return (
        <React.Fragment>
            <div className={style()}>
                <Routes>
                    <Route path='/' element={<PostSmallContainer/>}/>
                    <Route path='createpost' element={<CreatePost/>}/>
                    <Route path='editpost' element={<EditPost/>}/>
                    <Route path='post/:postId' element={<PostBigContainer/>}/>
                    <Route path='userposts' element={<UserPosts/>}/>
                    <Route path='accountcreated' element={<AccountCreated/>}/>
                </Routes> 
            </div>
        </React.Fragment>
    )
}

export default Content;