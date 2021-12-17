import React, {useState, useEffect, useContext, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as UserPostsStyle } from './UserPosts.module.scss'


//Components
//Components
import PostSmall from '../PostSmall';
import QueryNoResult from '../QueryNoResult';
import Loading from '../Loading';


//Helpers
import postQueryExecutor from '../../helpers/PostHelper';


const UserPosts = () => {

    //useContext
    let { posts, setPosts, currentPage, setCurrentPage,
        q_title, q_categoryName, q_sortOrder,
        q_sortArgument} = useContext(StoreContext);


    //useParams
    const userName = useParams().userName;


    //LoadPosts
    const {loading, error, hasMore} = postQueryExecutor(q_categoryName, q_title,userName, currentPage, 4, q_sortOrder, q_sortArgument, posts, setPosts);


    //Ref
    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage(prevPageNumber => prevPageNumber + 1)
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    if (loading == false && posts.length > 0) {
        return (
            <div className='UserPosts'>
            <div className='UserNameBanner'>U/<p>{userName}</p></div>
            <div className='PostSmallContainer'>
                {
                    posts.map((post, index) => {
                        if (posts.length == index + 1)
                            return <PostSmall key={index} ref={lastPostElementRef} postObject={post} />
                        else
                            return <PostSmall key={index} postObject={post} />
                    })
                }
            </div>
            </div>
        )
    }
    else if (loading == true && posts?.length > 0) {
        return (
            <div className='UserPosts'>
                <div className='UserNameBanner'>U/<p>{userName}</p></div>
                <div className='PostSmallContainer'>
                    {
                        posts.map((post, index) => {
                            if (posts.length == index + 1)
                                return <PostSmall key={index} ref={lastPostElementRef} postObject={post} />
                            else
                                return <PostSmall key={index} postObject={post} />
                        })
                    }
                </div>
                
                <Loading />
            </div>
        )
    }
    else if (loading == true && posts?.length == 0) {
        return <Loading />
    }
    else {
        return (

            <div className='UserPosts'>
                <div className='UserNameBanner'>U/<p>{userName}</p></div>    
                <QueryNoResult/>
            </div>
        )
    }
}

export default UserPosts;