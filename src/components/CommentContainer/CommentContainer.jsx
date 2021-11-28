import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import bemCssModules from 'bem-css-modules'


//Styles
import { default as CommentContainerStyle } from './CommentContainer.module.scss'
const style = bemCssModules(CommentContainerStyle);


//Helpers
import { GetCommentsByPostId } from '../../helpers/getCommentsByPostIdHelper';


//Components
import Comment from '../Comment';

//Functions

const CommentContainer = () => {

    //useState
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    //useParams
    const postId = useParams().postId;


    //useEffect
    useEffect( () => {
        setLoading(true);
        GetComments();
        setLoading(false);
    }, [])


    //Functions
    const GetComments = async () => {
        console.log(postId);
        const { error, data } = await GetCommentsByPostId(postId, setComments, setLoading);
    } 

    
    

    return (
        <div className='CommentContainer'>
            {
                comments.length > 0 
                ? comments.map( (comment, index) => {
                    return <Comment commentObject={comment} key={index}/>
                })
                : null
            }
        </div>
    )
};

export default CommentContainer;