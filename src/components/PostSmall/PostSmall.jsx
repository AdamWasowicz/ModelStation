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
import { LikePostHelper_GET } from '../../helpers/likePostHelper';


const PostSmall = React.forwardRef((postObject, ref) => {
    //Post
    const post = postObject.postObject;

    //useState
    const [postData, setPostData] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
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
        setPostData(post);
    }, []);

    useEffect( () => {
        CheckIfUserLikedPost();
    }, [isLoggedIn])

    //Functions
    const CheckIfUserLikedPost = async () => {
        if (isLoggedIn)
        {
            const cerror = await LikePostHelper_GET(JSON.parse(window.localStorage.getItem('jwt')), post.id);      
        }
    }

    return (
        <React.Fragment>
            <div className={style()} ref={ref}>
                <div className={style('likeSideBar')}>
                    <div className={style('likeSideBar__likeContainer')}>
                        <button className={style('likeSideBar__likeContainer__likeUpButton')}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>

                        <div className={style('likeSideBar__likeContainer__likeCounter')}>
                            {post.likes}
                        </div>

                        <button className={style('likeSideBar__likeContainer__likeDownButton')}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>

                <div className={style('Main')}>
                    <div className={style('Main__Information')}>
                        <div className={style('Main__Information__UserNameANDpostCategory')}>
                            <h4>{post.userName}</h4>
                            {post.postCategoryId != null? <h4>PostCategory</h4> : null}
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