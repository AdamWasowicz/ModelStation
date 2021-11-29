import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import bemCssModules from 'bem-css-modules'
import {StoreContext} from '../../store/StoreProvider'


//Helpers
import { LikeCommentHelper_GET, LikedCommentHelper_PATCH } from '../../helpers/likeCommentHelper';


//Styles
import { faArrowUp, faArrowDown, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as CommentStyle } from './Comment.module.scss'
const style = bemCssModules(CommentStyle);


const Comment = ({ commentObject }) => {

    //useState
    const [comment, setCommentObject] = useState(commentObject);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useParams
    const postId = useParams().postId;


    //useEffect
    useEffect( () => {
        if (isLoggedIn)
            CheckIfUserLikedComment();
        else if (isLoggedIn == false)
            setCurrentLikeStatus(0);
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


    //Functions
    //https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    const CheckIfUserLikedComment = async () => {
        if (isLoggedIn)
        {
            const { error, value} = await LikeCommentHelper_GET(comment.id);
            setCurrentLikeStatus(value);
        }
    }


    return (
        <div className='Comment'>
            <div className='LikeSideBar'>
                <div className='LikeContainer'>
                    <button 
                        className={
                            currentLikeStatus == 1
                            ? 'LikeUpButton-Active'
                            : 'LikeUpButton'}
                        onClick={likeUpButtonHandler}>
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
                        onClick={likeDownButtonHandler}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                </div>
            </div>

            <div className='Main'>
                <div className='UserInformation'>
                    <div className='UserName'>
                        {comment.userName}
                    </div>

                    <div className='UserImage'>
                        UserImage
                    </div>
                </div>

                <div className='CommentContent'>
                    <div className='Text'>
                        {comment.text}
                    </div>
                </div>
            </div>

            {
                isLoggedIn == true && parseJwt(JSON.parse(window.localStorage.getItem('jwt'))).UserId == comment.userId
                ? <div className='ManipulationPanel'>

                    <button className='EditButton'>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button className='DeleteButton'>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>

                </div>
                : null 
            }
        </div>
    );
}

export default Comment;