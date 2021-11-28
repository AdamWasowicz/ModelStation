import React, {useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import bemCssModules from 'bem-css-modules'


//Styles
import { default as CommentContainerStyle } from './CommentContainer.module.scss'
const style = bemCssModules(CommentContainerStyle);


//Helpers
import { GetCommentsByPostId } from '../../helpers/getCommentsByPostIdHelper';


//Components

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
            a
        </div>
    )
};

export default CommentContainer;