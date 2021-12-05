import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import {StoreContext} from '../../../store/StoreProvider'


//Styles
import { faTrashAlt, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as DeletePostModalStyle } from './DeletePostModal.module.scss'


//Helpers
import { deletePost } from '../../../helpers/PostHelper';



//Components
import Modal from '../../Modal';


const DeletePostModal = ({postObject, handleOnCancel, handleOnDeletion}) => {

    //hANDLERS
    const DeleteButtonClickHandler = (event) => {
        DeletePost();
        handleOnDeletion();
    }


    //Function
    const DeletePost = async () => {
        await deletePost(postObject.id);
    }


    return (
        <Modal 
        closeOnBackgroundClick={false} 
        isOpen={true} 
        handleOnClose={null}>
            <div className='DeletePostModal'>
                <div className='Information'>
                    Czy napewno chcesz usunąć ten post?
                </div>

                <div className='ActionButtons'>
                    <button className='DeleteButton' onClick={DeleteButtonClickHandler}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>

                    <button className='CancelButton' onClick={handleOnCancel}>
                        <FontAwesomeIcon icon={faWindowClose} />
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default DeletePostModal;
