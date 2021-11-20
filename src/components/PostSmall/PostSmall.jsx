import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'
import { API_address, fileStorageName_API_route } from '../../Constants';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as PostSmallStyles } from './PostSmall.module.scss'
const style = bemCssModules(PostSmallStyles);

//Functions
import { LikePostHelper_GET, LikedPostHelper_POST } from '../../helpers/likePostHelper';


const PostSmall = React.forwardRef((postObject, ref) => {
    //Post
    const post = postObject.postObject;

    //useState
    const [photos, setPhotos] = useState([]);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(post.likes);
    const [error, setError] = useState(false);

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


    return (
        <React.Fragment>
            <div className={style()} ref={ref}>
                <div className={style('likeSideBar')}>
                    <div className={style('likeSideBar__likeContainer')}>
                        <button className={currentLikeStatus == 1 
                        ? style('likeSideBar__likeContainer__likeUpButton-Active')
                        : style('likeSideBar__likeContainer__likeUpButton')} onClick={isLoggedIn ? likeUpButtonHandler: null}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>

                        <div className={style('likeSideBar__likeContainer__likeCounter')}>
                            {amountOfLikes}
                        </div>

                        <button className={currentLikeStatus == -1 
                            ? style('likeSideBar__likeContainer__likeDownButton-Active')
                            : style('likeSideBar__likeContainer__likeDownButton')} onClick={isLoggedIn ? likeDownButtonHandler : null}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>

                <div className={style('Main')}>
                    <div className={style('Main__Information')}>
                        <div className={style('Main__Information__UserNameANDpostCategory')}>
                            <h4>{post.userName}</h4>
                            {post.postCategoryId != null ? <h4>{post.postCategoryName}</h4> : null}
                        </div>

                        <div className={style('Main__Information__Title')}>
                            {post.title}
                        </div>
                    </div>

                    <div className={style('Main__PostContent')}
                        >
                        <div className={style('Main__PostContent__Text')}
                        >
                            {post.text}
                        </div>

                        {photos.length != 0 ?  (<div className={style('Main__PostContent__Photos')}
                        >
                            <img src={photos[0]} className={style('Main__PostContent__Photos__image')}/>
                        </div>) : null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
});

export default PostSmall;