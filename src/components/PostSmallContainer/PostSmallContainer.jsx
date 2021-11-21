import React, { useContext, useRef, useCallback } from
    'react';
import bemCssModules from 'bem-css-modules'

//Components
import PostSmall from '../PostSmall';
import QueryNoResult from '../QueryNoResult';
import Loading from '../Loading';

//Other
import postQueryExecutor from '../../helpers/postQueryExecutor';
import StoreProvider, { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as PostSmallContainerStyles } from './PostSmallContainer.module.scss'
const style = bemCssModules(PostSmallContainerStyles);




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

    if (query.length > 0 && post.length > 0) {
        return (
            <React.Fragment>
                {
                    posts.map((post, index) => {
                        if (posts.length == index + 1)
                            return <PostSmall key={index} ref={lastPostElementRef} postObject={post} />
                        else
                            return <PostSmall key={index} postObject={post} />
                    })
                }
            </React.Fragment>
        )
    }
    else if (loading == true)
    {
        return <Loading/>
    }
    else
    {
        return <QueryNoResult/>
    }
}

export default PostSmallContainer;