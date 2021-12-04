import React, {useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as UserPostElementStyle } from './UserPostElement.module.scss'


//Components



const UserPostElement = ({postObject}) => {

    return (
        <div className='UserPostElement'>
            <div className='Post'>
                
            </div>

            <div className='PostCategories'>

            </div>
        </div>
    )
}

export default UserPostElement;