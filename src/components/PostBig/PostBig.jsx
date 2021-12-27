import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useParams, useNavigate } from 'react-router';
import { API_address, fileStorageName_API_route } from '../../API_routes';


//Resources
import { ReadLocalStorage, parseJwt } from '../../Fuctions';
import { PostCategoryValidationParams, PostValidationParams } from '../../API_constants';


//Styles
import { faPlus as faArrowUp, faMinus as faArrowDown, faEdit, faTrashAlt, faSave, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
    const [postCategory, setPostCategory] = useState(   
            postObject?.postCategoryName != null
            ? postObject.postCategoryName
            : null
    );
    const [photos, setPhotos] = useState(postObject.files);
    const [currentLikeStatus, setCurrentLikeStatus] = useState(0);
    const [amountOfLikes, setAmountOfLikes] = useState(postObject.likes);
    //MultiImage
    const [currentImage, setCurrentImage] = useState(0);

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
    const { isLoggedIn } = useContext(StoreContext);


    //Constants
    const role = ReadLocalStorage('jwt') != null ? parseJwt(ReadLocalStorage('jwt')) : null;


    //useParams
    const postId = useParams().postId;


    //useNavigate
    const navigate = useNavigate();


    //useEffect
    useEffect( () => {
        let urlArray = [];

        post.files.forEach(element => {
            urlArray.push(`${API_address}${fileStorageName_API_route}${element.storageName}`)
        })

        setPhotos(urlArray); 
    }, []);


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

    const ValidateForm = () => {
        if (!(edit_postTitle.length > PostValidationParams.Title_Min && edit_postTitle.length < PostValidationParams.Title_Max))
            return false;
        
        if (!(edit_postText.length > PostValidationParams.Text_Min && edit_postTitle.length <= PostValidationParams.Title_Max))
            return false;

        if (!(edit_postCategory.length < PostCategoryValidationParams.Name_Max))
            return false;

        return true;
    }

    const PatchPost = async () => {
        await updatePost(postId, edit_postTitle, edit_postText, edit_postCategory, setError)
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
    const ChangeEditModeHandler = () => {
        setCurrEditMode(!currEditMode)
    }
    const EnterDeleteModeHandler = () => {
        setCurrentDeleteMode(true)
    }
    const ExitDeleteModeHandler = () => {
        setCurrentDeleteMode(false)
    }
    const AfterDeletionHandler = () => {
        alert("Pomyślnie usunięto post");
        navigate('../');
    }
    const RedirectToUserProfile = () => { 
        navigate('/user/' + post.userName)
    }
    const OpenImageModal = () => { 
        setModalOpen(true)
    }
    const CloseImageModal = () => {
        setModalOpen(false)
    }
    const NextImageHandler = () => {
        setCurrentImage(currentImage + 1);
    }
    const PreviousImageHandler = () =>{
        setCurrentImage(currentImage - 1);
    }

    
    
    //EditModeHandlers
    const ChangeEdit_postTitleHandler = (event) => {
        event.target.value.length <= PostValidationParams.Title_Max
        ? setEdit_postTitle(event.target.value)
        : null
    }
    const ChangeEdit_postTextHandler = (event) => {
        event.target.value.length <= PostValidationParams.Text_Max
        ? setEdit_postText(event.target.value)
        : null
    }
    const ChangeEdit_postCategoryHandler = (event) => {
        if (event.target.value.length <= PostCategoryValidationParams.Name_Max)
            setEdit_postCategory(event.target.value);
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
            alert(`Teść posta powinna mieć od ${PostValidationParams.Text_Min} do ${PostValidationParams.Text_Max} znaków\nTytuł powinnien mieć od ${PostValidationParams.Title_Min} do ${PostValidationParams.Title_Max} znaków\nKategoria powinna mieć do ${PostCategoryValidationParams.Name_Max} znaków`);
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
                            value={edit_postCategory}
                            onChange={ChangeEdit_postCategoryHandler}
                            >
                            </input>
                            : (postCategory != '' && postCategory != null
                                ? <h4 className='PostCategoryLabel'>
                                    C/
                                    <div className='PostCategoryField'>
                                        {postCategory}
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

                <div className='PostContent'>
                    {
                        currEditMode
                            ? <textarea className='EditText' type='text'
                                value={edit_postText}
                                onChange={ChangeEdit_postTextHandler}>
                            </textarea>
                            : <div className='Text'>{postText}</div>
                    }

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
                ? <ImageModal handleOnClose={CloseImageModal} imgFullSrc={photos[currentImage]}/>
                : null
            }
        </div>
    )
};

export default PostBig;