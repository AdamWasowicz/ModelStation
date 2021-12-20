import React, {useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import bemCssModules from 'bem-css-modules'
import { API_address, fileStorageName_API_route } from '../../API_routes';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as PostSmallStyles } from './PostSmall.module.scss'
const style = bemCssModules(PostSmallStyles);


//Helpers
import { LikePostHelper_GET, LikedPostHelper_POST } from '../../helpers/PostHelper';


//Components
import ImageModal from '../ImageModal';



const PostSmall = React.forwardRef((postObject, ref) => {
    //Post
    const post = postObject.postObject;

    console.log(postObject);

    //useState
    const [id, setId] = useState(postObject.postObject.id);
    const [photos, setPhotos] = useState([]);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(post.likes);
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    //useNavigare
    const navigate = useNavigate();


    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useEffect
    useEffect( () => {
        let urlArray = [];

        post.files.forEach(element => {
            urlArray.push(`${API_address}${fileStorageName_API_route}${element.storageName}`)
        })

        setPhotos(urlArray);
        
    }, []);
    useEffect( () => {
        CheckIfUserLikedPost();

        if (isLoggedIn == false)
            setCurrentLikeStatus(0);
    }, [isLoggedIn])


    //Functions
    const CheckIfUserLikedPost = async () => {
        if (isLoggedIn)
        {
            const {error, value} = await LikePostHelper_GET(JSON.parse(window.localStorage.getItem('jwt')), post.id);
            
            setCurrentLikeStatus(value);
        }
    }
    const RedirectToPostBig = () => {
        navigate(`/post/` + post.id);
    }
    
    //Handlers
    const likeUpButtonHandler = async () => {
        if (currentLikeStatus === 1)
        {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 0, post.id);
            setCurrentLikeStatus(0);
            setAmountOfLikes(amountOfLikes - 1)

        }
        else if (currentLikeStatus === -1)
        {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 1, post.id);
            setCurrentLikeStatus(1);
            setAmountOfLikes(amountOfLikes + 2)
        }
        else
        {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 1, post.id);
            setCurrentLikeStatus(1);
            setAmountOfLikes(amountOfLikes + 1)
        }
    }
    const likeDownButtonHandler = async () => {
        if (currentLikeStatus === -1)
        {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), 0, post.id);
            setCurrentLikeStatus(0);
            setAmountOfLikes(amountOfLikes + 1)

        }
        else if (currentLikeStatus === 1)
        {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), -1, post.id);
            setCurrentLikeStatus(-1);
            setAmountOfLikes(amountOfLikes - 2)
        }
        else
        {
            await LikedPostHelper_POST(JSON.parse(window.localStorage.getItem('jwt')), -1, post.id);
            setCurrentLikeStatus(-1);
            setAmountOfLikes(amountOfLikes - 1)
        }
    }
    const handleReditect = (event) => {
        RedirectToPostBig();
    }
    const RedirectToUserProfile = () => navigate('/user/' + post.userName);
    const OpenImageModal = () => setModalOpen(true);
    const CloseImageModal = () => setModalOpen(false);

    return (
        <React.Fragment>
            <div className= {
                                photos.length == 0 
                                ? 'PostSmall-Short'
                                : 'PostSmall'
                            } 
                            ref={ref} >
                <div className="likeSideBar">
                    <div className='likeContainer'>
                        <button className={currentLikeStatus == 1 
                        ? 'likeUpButton-Active'
                        : 'likeUpButton'} onClick={isLoggedIn ? likeUpButtonHandler: null}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>

                        <div className='likeCounter'>
                            {amountOfLikes}
                        </div>

                        <button className={currentLikeStatus == -1 
                            ? 'likeDownButton-Active'
                            : 'likeDownButton'} onClick={isLoggedIn ? likeDownButtonHandler : null}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>

                <div className='Main'>
                    <div className='Information'>
                        <div className='UserNameANDpostCategory'>
                            <h4 
                                className='UserNameLabel'
                                onClick={RedirectToUserProfile}>U/
                                <div 
                                    className='UserName'>
                                    {post.userName}
                                </div>
                            </h4>
                            
                            {
                                post.postCategoryName != '' && post.postCategoryName != null
                                ? <h4 className='PostCategoryLabel'>
                                    C/
                                    <div className='PostCategoryField'>
                                        {post.postCategoryName}
                                        </div>
                                    </h4>
                                : null
                            }
                        </div>

                        <div 
                            className='Title'
                            onClick={handleReditect}>
                            {post.title}
                        </div>
                    </div>

                    <div className='PostContent'>
                        <div 
                            className='Text'
                            onClick={handleReditect}>
                                {post.text}
                        </div>

                        {
                            photos.length != 0 
                            ? (<div className='Photos'>
                                <img 
                                    src={photos[0]} 
                                    className='image'
                                    onClick={OpenImageModal}/></div>) 
                            : null}
                    </div>
                </div>

                {
                    modalOpen && photos[0] != null
                    ? <ImageModal handleOnClose={CloseImageModal} imgFullSrc={photos[0]}/>
                    : null
                }
            </div>
        </React.Fragment>
    )
});

export default PostSmall;