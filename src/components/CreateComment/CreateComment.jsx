import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';


//Resources
import { UserBaseImage } from '../../StaticResources_routes.js';
import { API_address, fileStorageGetUserImage } from '../../API_routes';
import { CommentValidationParams } from '../../API_constants';



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
    const handleCommentTextChange = (event) => {
        event.target.value.length <= CommentValidationParams.Text_Max
        ? setCommentText(event.target.value)
        : null
    }
    const hanldeCommentUpload = () => {
        UploadComment()
    }
    


    //Functions
    const UploadComment = async () => {
        if (ValidateForm()) {
            await Post_Comment(commentText, postId, HandleChange);
            ClearInput();
        }
        else {
            alert("Komentarz musi mieć przynajmniej jeden znak oraz nie być dłuższy niż 256 znaków")
        }
    }
    const ClearInput = () => {
        setCommentText("")
    }
    const ValidateForm = () => {
        if (commentText.length >= CommentValidationParams.Text_Min && commentText.length < CommentValidationParams.Text_Max)
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
                    src={JSON.parse(window.localStorage.getItem('user')).file != null && JSON.parse(window.localStorage.getItem('user')).file.id != null ? `${API_address}${fileStorageGetUserImage}/${JSON.parse(window.localStorage.getItem('user')).file.id}` : UserBaseImage}>
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