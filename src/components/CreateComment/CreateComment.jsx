import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as CreateCommentStyle } from './CreateComment.module.scss'
import {faShareSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//Helpers
import { Post_Comment } from '../../helpers/postCommentHelper';

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
    const hanldeCommentUpload = (event) => {
        UploadComment();
    }


    //Functions
    const UploadComment = async () => {
        const result = await Post_Comment(commentText, postId);
        console.log("handleChange");
        ClearInput();
        HandleChange();
    }
    const ClearInput = () => {
        setCommentText("");
    }


    return (
        <div className='CreateComment'>
            <div className='Main'>
                <div className='UserInformation'>
                    <div className='UserName'>
                        {isLoggedIn ? user.userName : 'Niezalogowany użytkownik'}
                    </div>

                    <div className='UserImage'>
                        UserImage
                    </div>
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