import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';
import { API_address, fileStorageName_API_route } from '../../Constants';


//Styles
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as PostBigStyles } from './PostBig.module.scss'
const style = bemCssModules(PostBigStyles);

//Helpers
import { LikePostHelper_GET, LikedPostHelper_POST} from '../../helpers/likePostHelper';
import { GetPostByPostId } from '../../helpers/getPostByIdHelper';


//Components
import Loading from '../Loading';




const PostBig = () => {

    //useState
    const [post, setPostObject] = useState({});
    const [photos, setPhotos] = useState([]);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    //useParams
    const postId = useParams().postId;


    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useEffect
    useEffect(() => {
        GetPostData();
    }, []);

    useEffect(() => {
        CheckIfUserLikedPost();

        if (isLoggedIn == false)
            setCurrentLikeStatus(0);
    }, [isLoggedIn]);


    //Functions
    const CheckIfUserLikedPost = async () => {
        if (isLoggedIn) {
            const { error, value } = await LikePostHelper_GET(JSON.parse(window.localStorage.getItem('jwt')), post.id);

            setCurrentLikeStatus(value);
        }
    }
    const GetPostData = async () => {
        const {error, data} = await GetPostByPostId(postId, setPostObject, setLoading);
        setAmountOfLikes(data.likes);
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




    if (loading == false)
        return (
            <div className='PostBig'>
                <div className='likeSideBar'>
                    <div className='likeContainer'>
                        <button className={currentLikeStatus == 1
                            ? 'likeUpButton-Active'
                            : 'likeUpButton'}
                            onClick={isLoggedIn ? likeUpButtonHandler : null}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>

                        <div className='likeCounter'>
                            {amountOfLikes}
                        </div>

                        <button className={
                            currentLikeStatus == -1
                                ? 'likeDownButton-Active'
                                : 'likeDownButton'}
                            onClick={isLoggedIn ? likeDownButtonHandler : null}>
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
    else
        return(<Loading/>)
};

export default PostBig;