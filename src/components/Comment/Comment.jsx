import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import bemCssModules from 'bem-css-modules'
import {StoreContext} from '../../store/StoreProvider'


//Styles
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
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


    //Handlers
    const likeUpButtonHandler = async () => {

    }
    const likeDownButtonHandler = async () => {

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

    return (
        <div className='Comment'>
            <div className='likeSideBar'>
                <div className='likeContainer'>
                    <button className={
                            currentLikeStatus == 1
                            ? 'likeUpButton-Active'
                            : 'likeUpButton'}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>

                    <div className='likeCounter'>
                        {amountOfLikes}
                    </div>

                    <button className={
                            currentLikeStatus == -1
                                ? 'likeDownButton-Active'
                                : 'likeDownButton'}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                </div>
            </div>

            <div className='Main'>
                <div className='UserInformation'>

                </div>

                <div className='CommentContent'>

                </div>
            </div>

            {
                isLoggedIn == true && parseJwt(JSON.parse(window.localStorage.getItem('jwt'))).UserId == comment.userId
                ? <div className='manipulationPanel'>
                    manipulationPanel
                </div>
                : null 
            }
        </div>
    );
}

export default Comment;