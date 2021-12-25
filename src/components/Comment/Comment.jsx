import React, {useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import {StoreContext} from '../../store/StoreProvider'


//Helpers
import { LikeCommentHelper_GET, LikedCommentHelper_PATCH, Comment_PATCH } from '../../helpers/CommentHelper';


//Resources
import { UserBaseImage } from '../../StaticResources_routes.js';
import { ReadLocalStorage, parseJwt } from '../../Fuctions';
import { API_address, fileStorageGetUserImage } from '../../API_routes';
import { CommentValidationParams } from '../../API_constants';


//Components
import DeleteCommentModal from './DeleteCommentModal';


//Styles
import { faArrowUp, faArrowDown, faEdit, faTrashAlt, faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as CommentStyle } from './Comment.module.scss'


const Comment = ({ commentObject, HandleCommentDeletion }) => {

    //useState
    const [comment, setCommentObject] = useState(commentObject);
    const [commentText, setCommentText] = useState(commentObject.text);
    const [editCommentText, setEditCommentText] = useState(commentObject.text);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(commentObject.likes);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [visible, setVisible] = useState(true);


    //Constants
    const role = ReadLocalStorage('jwt') != null ? parseJwt(ReadLocalStorage('jwt')) : null;


    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useNavigate
    const navigate = useNavigate();


    //useParams
    const postId = useParams().postId;


    //useEffect
    useEffect( () => {
        if (isLoggedIn)
            CheckIfUserLikedComment();
        else if (isLoggedIn == false)
        {
            setCurrentLikeStatus(0);
            setEditMode(false);
        }
    }, [isLoggedIn])


    //Handlers
    const likeUpButtonHandler = async () => {
        if (currentLikeStatus == 1) {
            await LikedCommentHelper_PATCH(0, comment.id);
            setCurrentLikeStatus(0);
            setAmountOfLikes(amountOfLikes - 1);
        }
        else if (currentLikeStatus === -1) {
            await LikedCommentHelper_PATCH(1, comment.id);
            setCurrentLikeStatus(1);
            setAmountOfLikes(amountOfLikes + 2);
        }
        else {
            await LikedCommentHelper_PATCH(1, comment.id);
            setCurrentLikeStatus(1);
            setAmountOfLikes(amountOfLikes + 1);
        }
    }
    const likeDownButtonHandler = async () => {
        if (currentLikeStatus === 1) {
            await LikedCommentHelper_PATCH(-1, comment.id);
            setCurrentLikeStatus(-1);
            setAmountOfLikes(amountOfLikes - 2);
        }
        else if (currentLikeStatus === -1) {
            await LikedCommentHelper_PATCH(0, comment.id);
            setCurrentLikeStatus(0);
            setAmountOfLikes(amountOfLikes + 1);
        }
        else {
            await LikedCommentHelper_PATCH(-1, comment.id);
            setCurrentLikeStatus(-1);
            setAmountOfLikes(amountOfLikes - 1);
        }
    }
    const TextAreaChangeHandler = (event) => {
        event.target.value.length <= CommentValidationParams.Text_Max
        ? setEditCommentText(event.target.value)
        : null
    }
    const EditModeChangeHandler = () => {
        setEditCommentText(commentText);
        setEditMode(!editMode);
    }
    const EnterDeleteModeHandler = () => {
        setDeleteMode(true)
    }
    const SendPatchHandler = () => {
        if (ValidateForm())
        {
            PatchComment();
            EditModeChangeHandler();
        }
        else {
            alert("Komentarz musi mieć przynajmniej jeden znak oraz nie być dłuższy niż 256 znaków")
        }
    }
    const CloseDeleteModeHandler = () => {
        setDeleteMode(false);
    }
    const HandleDelete = (id) => {
        setVisible(false);
        HandleCommentDeletion(id)
    }
    const RedirectToUserProfile = () => {
        navigate('/user/' + commentObject.userName)
    }


    //Functions
    const CheckIfUserLikedComment = async () => {
        if (isLoggedIn)
        {
            const { error, value} = await LikeCommentHelper_GET(comment.id, setCurrentLikeStatus);
        }
    }
    const PatchComment = async () => {
        await Comment_PATCH(editCommentText, comment.id);
        setCommentText(editCommentText);
    }
    const ValidateForm = () => {
        if (editCommentText.length >= CommentValidationParams.Text_Min && editCommentText.length < CommentValidationParams.Text_Max)
            return true;
        
        return false;
    }



    if (visible)
    return (
        <div className='Comment'>
            {
                deleteMode
                ? <DeleteCommentModal commentObject={commentObject} handleOnCancel={CloseDeleteModeHandler} HandleCommentDeletion={HandleDelete}/>
                : null
            }
            <div className='LikeSideBar'>
                <div className='LikeContainer'>
                    <button 
                        className={
                            currentLikeStatus == 1
                            ? 'LikeUpButton-Active'
                            : 'LikeUpButton'}
                        onClick={!editMode ? likeUpButtonHandler : null}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>

                    <div className='LikeCounter'>
                        {amountOfLikes}
                    </div>

                    <button 
                        className={
                            currentLikeStatus == -1
                                ? 'LikeDownButton-Active'
                                : 'LikeDownButton'}
                        onClick={!editMode ? likeDownButtonHandler : null}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                </div>
            </div>

            <div className='Main'>
                <div className='UserInformation'>
                    <div 
                        className='UserNameLabel'
                        onClick={RedirectToUserProfile}>
                            U/
                            <div className='UserName'>
                                {comment.userName}
                            </div>
                    </div>

                    <img 
                        className='UserImage' 
                        src={
                            comment.userImageId != null 
                            ? `${API_address}${fileStorageGetUserImage}/${comment.userImageId}` 
                            : UserBaseImage
                            }>      
                    </img>
                </div>

                <div className='CommentContent'>
                    {
                        editMode && isLoggedIn
                        ? <textarea className='Text-Edit' type='text' value=   {editCommentText} onChange={TextAreaChangeHandler}>
                        </textarea>
                        : <div className='Text'>
                            {commentText}
                        </div>
                    }
                </div>
            </div>

            {
                isLoggedIn == true && parseJwt(JSON.parse(window.localStorage.getItem('jwt'))).UserId == comment.userId || (role != null && role.AccessLevel >= 6)
                ? <div className='ManipulationPanel'>

                    <button className={editMode ? 'EditButton-Active' : 'EditButton'} onClick={EditModeChangeHandler}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>

                    {
                        !editMode
                        ? <button className='DeleteButton' onClick={EnterDeleteModeHandler}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        : <button className='SaveButton' onClick={SendPatchHandler}>
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                    }

                </div>
                : null 
            }
        </div>
    )
    else
        return null;
}

export default Comment;