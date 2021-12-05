import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import {StoreContext} from '../../../store/StoreProvider'


//Styles
import { faTrashAlt, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as DeleteCommentModalStyle } from './DeleteCommentModal.module.scss'


//Helpers
import { Comment_DELETE } from '../../../helpers/CommentHelper'


//Components
import Modal from '../../Modal';


const DeleteCommentModal = ({commentObject, handleOnCancel, HandleCommentDeletion}) => {
    //Handlers
    const DeleteButtonClickHandler = (event) => {
        DeleteComment();
        HandleCommentDeletion(commentObject.id);
        handleOnCancel();
    }


    //Functions
    const DeleteComment = async () => {
        const error = await Comment_DELETE(commentObject.id);
    }





    return (
        <Modal closeOnBackgroundClick={false} isOpen={true} handleOnClose={null} >
            <div className='DeleteCommentModal'>
                <div className='Information'>
                    Czy napewno chcesz usunąć ten komentarz
                </div>

                <div className='CommentText'>
                    <div className='Text'>
                        {commentObject.text}
                    </div>
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

export default DeleteCommentModal;