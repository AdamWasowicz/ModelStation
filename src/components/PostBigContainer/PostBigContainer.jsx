import React, {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as PostBigContainerStyle } from './PostBigContainer.module.scss'


//Helpers
import { LikePostHelper_GET, LikedPostHelper_POST, GetPostByPostId} from '../../helpers/PostHelper';



//Components
import PostBig from '../PostBig';
import CommentContainer from '../CommentContainer';



const PostBigContainer = () => {

    //useState
    const [post, setPostObject] = useState({});
    const [loading, setLoading] = useState(true);



    //useParams
    const postId = useParams().postId;


    //useContext
   

    //useEffect
    useEffect(() => {
        GetPostData();
    }, []);


    //Functions
    const GetPostData = async () => {
        const {error, data} = await GetPostByPostId(postId, setPostObject, setLoading);
    }


    //Handlers
    

    return (
        !loading
         ? <div className='PostBigContainer'>
            <PostBig editMode={false} postObject={post}/>
            <CommentContainer/>
        </div>
        : null
    )
};

export default PostBigContainer;