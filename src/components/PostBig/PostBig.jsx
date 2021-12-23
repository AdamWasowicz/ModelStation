import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useParams, useNavigate } from 'react-router';
import { API_address, fileStorageName_API_route } from '../../API_routes';


//Resources
import { ReadLocalStorage } from '../../Fuctions';


//Styles
import { faPlus as faArrowUp, faMinus as faArrowDown, faEdit, faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as PostBigStyles } from './PostBig.module.scss'

//Helpers
import { LikePostHelper_GET, LikedPostHelper_POST, updatePost} from '../../helpers/PostHelper';


//Components
import DeletePostModal from './DeletePostModal';
import ImageModal from '../ImageModal';


const PostBig = ({editMode, postObject}) => {

    //useState
    //Post
    const [post, setPostObject] = useState(postObject);
    const [postTitle, setPostTitle] = useState(postObject.title);
    const [postText, setPostText] = useState(postObject.text);
    const [postCategory, setPostCategory] = useState({id: postObject.postCategoryId, name: postObject.postCategoryName != '' ? postObject.postCategoryName : ''});
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
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    //useContext
    const { isLoggedIn, posts } = useContext(StoreContext);


    //Constants
    const role = ReadLocalStorage('jwt') != null ? parseJwt(ReadLocalStorage('jwt')) : null;


    //useParams
    const postId = useParams().postId;


    //useNavigate
    const navigate = useNavigate();


    //useEffect
    useEffect(() => {
        CheckIfUserLikedPost();

        if (isLoggedIn == false)
            setCurrentLikeStatus(0);

        setCurrEditMode(false);
        setCurrentDeleteMode(false);
        
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

    const ValidateForm = () => {
        if (!(edit_postTitle.length > 0 && edit_postTitle.length <= 32 ))
            return null;
        
        if (!(edit_postText.length > 0 && edit_postTitle.length <= 256))
            return null;

        return true;
    }

    const PatchPost = async () => await updatePost(postId, edit_postTitle, edit_postText, edit_postCategory.name, setError);

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
        if (likes > 1000)
        {
            let front = Math.floor(likes / 1000);
            let back = likes - front;
            back = Math.floor(back / 100);

            return `${front}.${back}k`;
        }

        else 
            return likes;
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
    const ChangeEditModeHandler = () => setCurrEditMode(!currEditMode);
    const EnterDeleteModeHandler = () => setCurrentDeleteMode(true);
    const ExitDeleteModeHandler = () => setCurrentDeleteMode(false);
    const AfterDeletionHandler = () => {
        alert("Pomyślnie usunięto post");
        navigate('../');
    }
    const RedirectToUserProfile = () => navigate('/user/' + post.userName);
    const OpenImageModal = () => setModalOpen(true);
    const CloseImageModal = () => setModalOpen(false);
    
    
    //EditModeHandlers
    const ChangeEdit_postTitleHandler = (event) => setEdit_postTitle(event.target.value);
    const ChangeEdit_postTextHandler = (event) => setEdit_postText(event.target.value);
    const ChangeEdit_postCategoryHandler = (event) => {
        let newpcObject = {id: 0, name: event.target.value };
        setEdit_postCategory(newpcObject);
    }
    const SendPatchHandler = () => {
        if (ValidateForm()) {

            PatchPost();

            if (!error)
            {
                setPostTitle(edit_postTitle);
                setPostText(edit_postText);
                setPostCategory(edit_postCategory);
                ChangeEditModeHandler();
            }
            else
                alert('Wystłąpił błąd podczas zmiany danych posta');
        }
        else 
            alert("Nowa treść postu zawiera błędy");
    }



    return (
        <div className={
                            post.files?.length == 0
                            ? 'PostBig-Short'
                            : 'PostBig'
                        }>
            <div className='likeSideBar'>
                <div className='likeContainer'>
                    <button className={currentLikeStatus == 1
                        ? 'likeUpButton-Active'
                        : 'likeUpButton'}
                        onClick={isLoggedIn && !editMode ? likeUpButtonHandler : null}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>

                    <div className='likeCounter'>
                        {DisplayLikes()}
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
                    <div className='Date'>{DisplayDate()}</div>
                    <div className='UserNameANDpostCategory'>
                        <h4 
                            className='UserNameLabel'
                            onClick={RedirectToUserProfile}>U/
                            <div className='UserName'>
                                {post.userName}
                            </div>
                        </h4>
                        {
                            currEditMode
                            ? <input className='EditPostCategory'
                            value={edit_postCategory.name}
                            onChange={ChangeEdit_postCategoryHandler}
                            >
                            </input>
                            : (postCategory.name != '' && postCategory.name != null
                                ? <h4 className='PostCategoryLabel'>
                                    C/
                                    <div className='PostCategoryField'>
                                        {postCategory.name}
                                        </div>
                                    </h4>
                                : null)
                        }
                        
                    </div>

                    <div className='Title'>
                        {
                            currEditMode
                            ? <input className='EditTitle'
                            value={edit_postTitle}
                            onChange={ChangeEdit_postTitleHandler}
                            ></input>
                            : <React.Fragment>{postTitle}</React.Fragment>
                        }
                    </div>
                </div>

                <div className='PostContent'
                >
                    {
                        currEditMode
                            ? <textarea className='EditText' type='text'
                                value={edit_postText}
                                onChange={ChangeEdit_postTextHandler}>
                            </textarea>
                            : <div className='Text'>{postText}</div>
                    }

                    {post.files.length != 0 ? (<div className='Photos'>
                        <img 
                            src={`${API_address}${fileStorageName_API_route}${post.files[0].storageName}`} 
                            className='image' 
                            onClick={OpenImageModal}/>
                    </div>) : null}
                </div>
            </div>
            {
                isLoggedIn == true && parseJwt(JSON.parse(window.localStorage.getItem('jwt'))).UserId == post.userId || (role != null && role.AccessLevel >= 6)
                ? <div className='ManipulationPanel'>
                    <button className={
                        currEditMode
                        ? 'EditButton-Active' 
                        : 'EditButton'
                        } 
                        onClick={ChangeEditModeHandler}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>

                    {
                        !currEditMode
                        ? <button className='DeleteButton'
                            onClick={EnterDeleteModeHandler}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>

                        : <button className='SaveButton'
                        onClick={SendPatchHandler}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    }
                </div>
                : null 
            }

            {
                currDeleteMode
                ? <DeletePostModal 
                    postObject={post}
                    handleOnCancel={ExitDeleteModeHandler }
                    handleOnDeletion={AfterDeletionHandler}
                />
                : null
            }

            {
                modalOpen && post.files.length != 0
                ? <ImageModal handleOnClose={CloseImageModal} imgFullSrc={`${API_address}${fileStorageName_API_route}${post.files[0].storageName}`}/>
                : null
            }
        </div>
    )
};

export default PostBig;