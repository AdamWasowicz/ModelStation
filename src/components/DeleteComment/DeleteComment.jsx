import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import {StoreContext} from '../../store/StoreProvider'


//Styles
import { faTrashAlt, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as DeleteCommentStyle } from './DeleteComment.module.scss'


//Components
import Modal from '../Modal';


const DeleteComment = ({commentObject, handleOnCancel}) => {
    return (
        <Modal closeOnBackgroundClick={false} isOpen={true} handleOnClose={null} >
            <div className='DeleteComment'>
                <div className='Information'>
                    Czy napewno chcesz usunąć ten komentarz
                </div>

                <div className='CommentText'>
                    <div className='Text'>
                        {commentObject.text}
                    </div>
                </div>

                <div className='ActionButtons'>
                    <button className='DeleteButton'>
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

export default DeleteComment;