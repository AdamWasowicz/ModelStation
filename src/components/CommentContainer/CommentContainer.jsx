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

//Functions

const CommentContainer = () => {

    //useState
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newComment, setNewComment] = useState(false);
    const [changeOccured, setChangeOccured] = useState(false);


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
    const sortCommentsByLastEditDate = (c1, c2) => {

        const d1 = new Date(c1.lastEditDate);
        const d2 = new Date(c2.lastEditDate);

        if (d1 > d2)
            return -1;
        
        if (d1 < d2)
            return 1;

        return 0;
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
        <React.Fragment>
            {
                isLoggedIn
                ? <CreateComment HandleChange={HandleNewCommentAdd}/>
                : null
            }
            <div className='CommentContainer'>
                {
                    comments.length > 0 
                    ? comments.map( (comment, index) => {
                        return <Comment commentObject={comment} key={index} HandleCommentDeletion={HandleCommentDeletion}/>
                    })
                    : null
                }
            </div>
        </React.Fragment>
    )
};

export default CommentContainer;