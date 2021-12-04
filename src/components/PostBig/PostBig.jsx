import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useParams } from 'react-router';
import { API_address, fileStorageName_API_route } from '../../Constants';


//Styles
import { faArrowUp, faArrowDown, faEdit, faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as PostBigStyles } from './PostBig.module.scss'

//Helpers
import { LikePostHelper_GET, LikedPostHelper_POST} from '../../helpers/PostHelper';


const PostBig = ({editMode, postObject}) => {

    //useState
    //Post
    const [post, setPostObject] = useState(postObject);
    const [postTitle, setPostTitle] = useState(postObject.title);
    const [postText, setPostText] = useState(postObject.text);
    const [postCategory, setPostCategory] = useState({id: postObject.postCategoryId, name: postObject.postCategoryName});
    const [photos, setPhotos] = useState(postObject.files);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(postObject.likes);

    //EditModePost
    const [edit_postTitle, setEdit_postTitle] = useState(postTitle);
    const [edit_postText, setEdit_postText] = useState(postText);
    const [edit_postCategory, setEdit_postCategory] = useState(postCategory);

    //Flags
    const [currEditMode, setCurrEditMode] = useState(editMode);
    const [currDeleteMode, setCurrentDeleteMode] = useState(false);


    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useParams
    const postId = useParams().postId;


    useEffect(() => {
        CheckIfUserLikedPost();

        if (isLoggedIn == false)
            setCurrentLikeStatus(0);
    }, [isLoggedIn]);


    //Functions
    const CheckIfUserLikedPost = async () => {
        if (isLoggedIn) {
            const { error, value } = await LikePostHelper_GET(JSON.parse(window.localStorage.getItem('jwt')), postId);

            setCurrentLikeStatus(value);
        }
    }
    //https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };


    //Handlers
    const likeUpButtonHandler = async () => {
        if (currentLikeStatus === 1) {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 0, post.id);
            setCurrentLikeStatus(0);
            setAmountOfLikes(amountOfLikes - 1)

        }
        else if (currentLikeStatus === -1) {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 1, post.id);
            setCurrentLikeStatus(1);
            setAmountOfLikes(amountOfLikes + 2)
        }
        else {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 1, post.id);
            setCurrentLikeStatus(1);
            setAmountOfLikes(amountOfLikes + 1)
        }
    }
    const likeDownButtonHandler = async () => {
        if (currentLikeStatus === -1) {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 0, post.id);
            setCurrentLikeStatus(0);
            setAmountOfLikes(amountOfLikes + 1)

        }
        else if (currentLikeStatus === 1) {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), -1, post.id);
            setCurrentLikeStatus(-1);
            setAmountOfLikes(amountOfLikes - 2)
        }
        else {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), -1, post.id);
            setCurrentLikeStatus(-1);
            setAmountOfLikes(amountOfLikes - 1)
        }
    }


    return (
        <div className='PostBig'>
            <div className='likeSideBar'>
                <div className='likeContainer'>
                    <button className={currentLikeStatus == 1
                        ? 'likeUpButton-Active'
                        : 'likeUpButton'}
                        onClick={isLoggedIn && !editMode ? likeUpButtonHandler : null}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>

                    <div className='likeCounter'>
                        {amountOfLikes}
                    </div>

                    <button className={
                        currentLikeStatus == -1
                            ? 'likeDownButton-Active'
                            : 'likeDownButton'}
                        onClick={isLoggedIn && !editMode ? likeDownButtonHandler : null}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                </div>
            </div>

            <div className='Main'>
                <div className='Information'>
                    <div className='UserNameANDpostCategory'>
                        <h4>{post.userName}</h4>
                        {post.postCategoryId != null ? <h4>{post.postCategoryName}</h4> : null}
                    </div>

                    <div className='Title'>
                        {post.title}
                    </div>
                </div>

                <div className='PostContent'
                >
                    <div className='Text'>
                        {post.text}
                    </div>

                    {post.files.length != 0 ? (<div className='Photos'>
                        <img src={`${API_address}${fileStorageName_API_route}${post.files[0].storageName}`} className='image' />
                    </div>) : null}
                </div>
            </div>
            {
                isLoggedIn == true && parseJwt(JSON.parse(window.localStorage.getItem('jwt'))).UserId == post.userId || true
                ? <div className='ManipulationPanel'>
                    <button className='EditButton'>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>

                    {
                        !currEditMode
                        ? <button className='DeleteButton'>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>

                        : <button className='SaveButton'>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    }
                </div>
                : null 
            }
        </div>
    )
};

export default PostBig;