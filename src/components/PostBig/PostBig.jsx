import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useParams } from 'react-router';
import { API_address, fileStorageName_API_route } from '../../Constants';


//Styles
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as PostBigStyles } from './PostBig.module.scss'

//Helpers
import { LikePostHelper_GET, LikedPostHelper_POST} from '../../helpers/PostHelper';


const PostBig = ({editMode, postObject}) => {

    //useState
    const [post, setPostObject] = useState(postObject);
    const [photos, setPhotos] = useState(postObject.files);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(postObject.likes);
    const [error, setError] = useState(false);


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


    console.log(postObject);

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
        </div>
    )
};

export default PostBig;