import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';


//Resources
import { ReadLocalStorage } from '../../Fuctions';
import { AccessLevels, RoleIds } from '../../API_constants';


//Components
import Loading from '../Loading';
import NotLoggedException from '../NotLoggedException';
import NoPermissionException from './NoPermissionException';



//Styles
import { default as AdminPanelStyles } from './AdminPanel.module.scss';


const AdminPanel = () => {

    //useNavigate
    const navigate = useNavigate();


    //Constants
    const role = ReadLocalStorage('user').role;


    //useContext
    const { isLoggedIn, setIsLoggedIn } = useContext(StoreContext)








    if (isLoggedIn == false) 
        return (<NotLoggedException/>);
    
    else if (role.accessLevel < AccessLevels.IsModerator)
        return (<NoPermissionException/>);

    else
        return (
            <div className='AdminPanel'>
                AdminPanel
            </div>
        )
}


export default AdminPanel;