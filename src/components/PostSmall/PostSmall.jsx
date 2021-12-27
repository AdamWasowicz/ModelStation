import React, {useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';
import bemCssModules from 'bem-css-modules'
import { API_address, fileStorageName_API_route } from '../../API_routes';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { faPlus as faArrowUp, faMinus as faArrowDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as PostSmallStyles } from './PostSmall.module.scss'


//Helpers
import { LikePostHelper_GET, LikedPostHelper_POST } from '../../helpers/PostHelper';


//Components
import ImageModal from '../ImageModal';



const PostSmall = React.forwardRef((postObject, ref) => {
    //Post
    const post = postObject.postObject;

    //useState
    const [id, setId] = useState(postObject.postObject.id);
    const [photos, setPhotos] = useState([]);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(post.likes);
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    //MultiImage
    const [currentImage, setCurrentImage] = useState(0);


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
    const DisplayDate = () => {
        let dateObj = new Date(post.creationDate);

        const month = String(dateObj.getMonth()).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = day  + '.'+ month  + '.' + year;

        return output;
    }
    const DisplayLikes = () => {

        let likes = amountOfLikes;
        if (Math.abs(likes) > 1000)
        {
            likes = Math.abs(likes);
            let front = Math.floor(likes / 1000);
            let back = likes - (front * 1000);
            back = Math.floor(back / 100);

            return `${amountOfLikes < 0 ? '-' : ''}${front}.${back}k`;
        }
        else 
            return likes;
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
    const NextImageHandler = () => {
        setCurrentImage(currentImage + 1);
    }
    const PreviousImageHandler = () =>{
        setCurrentImage(currentImage - 1);
    }


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
                            {DisplayLikes()}
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
                        <div className='Date'>{DisplayDate()}</div>
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
                            ? (
                                <div className='Photos'>
                                    <div className='Top'>
                                        <div className='ButtonContainer'>
                                            {
                                                currentImage != 0
                                                ? <div 
                                                    className='Button'
                                                    onClick={PreviousImageHandler}>
                                                    <FontAwesomeIcon icon={faChevronLeft} />
                                                </div>
                                                : null
                                            }
                                        </div>

                                        <div className='Bottom'>
                                            <img 
                                                src={photos[currentImage]} 
                                                className='image'
                                                onClick={OpenImageModal}
                                            />

                                            {
                                                post.files.length > 1
                                                ? <div className='Page'>
                                                    {`${currentImage + 1} / ${post.files.length}`}
                                                </div>
                                                : null
                                            }
                                        
                                        </div>

                                        <div className='ButtonContainer'>
                                            {
                                                currentImage < post.files.length - 1 && post.files.length > 1
                                                ? <div 
                                                    className='Button'
                                                    onClick={NextImageHandler}>
                                                        <FontAwesomeIcon icon={faChevronRight} />
                                                </div>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) 
                            : null
                        }
                    </div>
                </div>

                {
                    modalOpen && photos[0] != null
                    ? <ImageModal handleOnClose={CloseImageModal} imgFullSrc={photos[currentImage]}/>
                    : null
                }
            </div>
        </React.Fragment>
    )
});

export default PostSmall;