import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as CommentContainerStyle } from './CommentContainer.module.scss'


//Helpers
import { GetCommentsByPostId, GetCommentById } from '../../helpers/CommentHelper';


//Components
import Comment from '../Comment';
import CreateComment from '../CreateComment';
import NotLoggedException from '../CreateComment/NotLoggedException';
import NoContentException from './NoContentException';


const CommentContainer = () => {

    //useState
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    //const [newComment, setNewComment] = useState(false);
    //const [changeOccured, setChangeOccured] = useState(false);


    //useParams
    const postId = useParams().postId;


    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useEffect
    useEffect( () => {
        setLoading(true);
        GetComments();
        setLoading(false);
    }, [])


    //Functions
    const GetComments = async () => {
        const { error, data } = await GetCommentsByPostId(postId, setComments, setLoading);
    } 
    const GetNewComment = async (commentId) => {
        await GetCommentById(commentId, setComments, comments, setLoading);
    }

    //Handlers
    const HandleCommentDeletion = (commentId) => {
        const objectToRemove = comments.find(c => c.id == commentId);
        const objectToRemoveId = comments.indexOf(objectToRemove)

        if (objectToRemoveId != -1)
        {
            let arrayOfComments = comments;
            arrayOfComments.splice(objectToRemoveId, 1) 
            setComments([]);
            setComments(arrayOfComments);
        }
    }
    const HandleNewCommentAdd = (commentId) => {
        GetNewComment(commentId);
    }

    
    

    return (
        <div className='CommentContainer'>
            {
                isLoggedIn
                    ? <CreateComment HandleChange={HandleNewCommentAdd} />
                    : <NotLoggedException />
            }

            {
                comments.length > 0
                    ? comments.map((comment, index) => {
                        return <Comment commentObject={comment} key={index} HandleCommentDeletion={HandleCommentDeletion} />
                    })
                    : <NoContentException/>
            }
        </div>
    )
};

export default CommentContainer;