import React, { useEffect, useContext } from 
'react';
import { Routes, Route } from "react-router-dom";
import bemCssModules from 'bem-css-modules'
import StoreProvider, { StoreContext } from '../../store/StoreProvider';

//Components
import CreatePost from '../CreatePost';
import PostSmallContainer from '../PostSmallContainer';
import PostBigContainer from '../PostBigContainer';
import AccountCreated from '../AccountCreated';
import User from '../User';
import UserPosts from '../UserPosts';


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

    //Maybe it is stupid but it works
    const MyProfile = () => {
        return(
         <div>
                <User/>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className={style()}>
                <Routes>
                    <Route path='/' element={<PostSmallContainer/>}/>
                    <Route path='/createpost' element={<CreatePost/>}/>
                    <Route path="/post/:postId" element={<PostBigContainer/>}/>
                    <Route path='/accountcreated' element={<AccountCreated/>}/>
                    <Route path="/user/:userId" element={<User/>}/>
                    <Route path='/myprofile/:userId' element={<MyProfile/>}/>
                    <Route path="/userposts/:userName" element={<UserPosts/>}/>
                </Routes> 
            </div>
        </React.Fragment>
    )
}

export default Content;