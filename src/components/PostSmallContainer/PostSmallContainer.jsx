import React, { useContext, useRef, useCallback } from 'react';
import StoreProvider, { StoreContext } from '../../store/StoreProvider';


//Components
import PostSmall from '../PostSmall';
import QueryNoResult from '../QueryNoResult';
import Loading from '../Loading';


//Helpers
import postQueryExecutor from '../../helpers/PostHelper';


//Styles
import { default as PostSmallContainerStyles } from './PostSmallContainer.module.scss'



const PostSmallContainer = () => {
    //useContext
    const { posts, setPosts, currentPage, setCurrentPage, query } = useContext(StoreContext);

    const { loading, error, hasMore } = postQueryExecutor(
        "", query, "", currentPage, 3, "ASC", "NONE", posts, setPosts
    );

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



    if (loading == false && posts.length > 0 || loading == true && posts.length > 0) {
        return (
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
        )
    }
    else if (loading == true && posts.length == 0)
    {
        return <Loading/>
    }
    else
    {
        return <QueryNoResult/>
    }
}

export default PostSmallContainer;