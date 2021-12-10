import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';


//Resources
import userDefaultImage from './resources/userDefaultImage.png';
import { API_address, fileStorageGetUserImage } from '../../API_routes';


//Styles
import { default as CreateCommentStyle } from './CreateComment.module.scss'
import {faShareSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//Helpers
import { Post_Comment } from '../../helpers/CommentHelper';

//Components


const CreateComment = ({HandleChange}) => {

    //useState
    const [commentText, setCommentText] = useState("");


    //useParams
    const postId = useParams().postId;


    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //Const
    const user = JSON.parse(window.localStorage.getItem('user'));


    //Handlers
    const handleCommentTextChange = (event) => setCommentText(event.target.value);
    const hanldeCommentUpload = (event) => UploadComment();
    


    //Functions
    const UploadComment = async () => {
        if (ValidateForm()) {
            const result = await Post_Comment(commentText, postId, HandleChange);
            ClearInput();
        }
        else {
            alert("Komentarz musi mieć przynajmniej jeden znak oraz nie być dłuższy niż 256 znaków")
        }
    }
    const ClearInput = () => setCommentText("");
    const ValidateForm = () => {
        if (commentText.length > 0 && commentText.length < 256)
            return true;
        
        return false;
    }


    return (
        <div className='CreateComment'>
            <div className='Main'>
                <div className='UserInformation'>
                <div className='UserNameLabel'>
                        U/
                        <div className='UserName'>
                            {user.userName}
                        </div>
                    </div>

                    <img className='UserImage' 
                    src={JSON.parse(window.localStorage.getItem('user')).file.id != null 
                    ? `${API_address}${fileStorageGetUserImage}/${JSON.parse(window.localStorage.getItem('user')).file.id}` 
                    : userDefaultImage}>
                    </img>
                </div>

                <div className='CommentContent'>
                    <textarea className='Text'type='text' value={commentText} onChange={handleCommentTextChange}>
                    </textarea>
                </div>
            </div>

            <div className='ControlPanel'>
                <button className="UploadButton" onClick={hanldeCommentUpload}>
                    <FontAwesomeIcon icon={faShareSquare} />
                </button>
            </div>
        </div>
    )
};

export default CreateComment;