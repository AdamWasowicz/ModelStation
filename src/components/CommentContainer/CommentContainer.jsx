import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as CommentContainerStyle } from './CommentContainer.module.scss'


//Helpers
import { GetCommentsByPostId } from '../../helpers/getCommentsByPostIdHelper';


//Components
import Comment from '../Comment';
import CreateComment from '../CreateComment';

//Functions

const CommentContainer = () => {

    //useState
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
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

    //Handlers
    const HandleNewComment = () => {
        setLoading(true);
        setComments([]);
        GetComments();
        setLoading(false);
    }

    
    

    return (
        <React.Fragment>
            {
                isLoggedIn
                ? <CreateComment HandleChange={HandleNewComment}/>
                : null
            }
            <div className='CommentContainer'>
                {
                    comments.length > 0 
                    ? comments.map( (comment, index) => {
                        return <Comment commentObject={comment} key={index}/>
                    })
                    : null
                }
            </div>
        </React.Fragment>
    )
};

export default CommentContainer;