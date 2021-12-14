import React, {useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as UserPostsStyle } from './UserPosts.module.scss'


//Components
import NotLoggedException from '../NotLoggedException'


const UserPosts = () => {

    //useContext
    const { isLoggedIn } = useContext(StoreContext);





    if (isLoggedIn) {
        return (
            <div className='UserPosts'>a</div>
        )
    }
    else {
        return <NotLoggedException/>
    }

}

export default UserPosts;