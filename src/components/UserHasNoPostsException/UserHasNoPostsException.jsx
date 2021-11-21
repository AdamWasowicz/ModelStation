import React, {useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'


//Styles
import { default as UserHasNoPostsExceptionStyles } from './UserHasNoPostsException.module.scss'
const style = bemCssModules(UserHasNoPostsExceptionStyles);


const UserHasNoPostsException = () => {
    return (
        <div className='UserHasNoPostsException'>
            <h1>Nie posiadasz żadnych postów</h1>
            <button><Link to="../createpost">Stwórz nowy post</Link></button>
        </div>
    )
};

export default UserHasNoPostsException;