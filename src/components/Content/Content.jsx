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
import AdminPanel from '../AdminPanel';
import User from '../User';
import UserPosts from '../UserPosts';
import Error from '../Error';
import ScrollUp from '../ScrollUp';


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
        <div className={style()}>
            <Routes>
                <Route path='/' element={<PostSmallContainer />} />
                <Route path='/createpost' element={<CreatePost />} />
                <Route path="/post/:postId" element={<PostBigContainer />} />
                <Route path='/accountcreated' element={<AccountCreated />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path='/myprofile/:userId' element={<MyProfile />} />
                <Route path="/userposts/:userName" element={<UserPosts />} />
                <Route path='/error' elment={<Error />} />
                <Route path='adminpanel' element={<AdminPanel />} />
            </Routes>

            <ScrollUp/>
        </div>
    )
}

export default Content;