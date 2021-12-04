import React, {useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as UserPostElementStyle } from './UserPostElement.module.scss'


//Components
import PostBig from '../PostBig';


const UserPostElement = ({postObject}) => {

    //useState
    const [deleteMode, setDeleteMode] = useState(false);


    return (
        <div className='UserPostElement'>
            <div className='Post'>
                <PostBig editMode={true} postObject={postObject}/>
                <div className='MainpulationPanel'>
                    ManipulationPanel
                </div>
            </div>
            
        </div>
    )
}

export default UserPostElement;