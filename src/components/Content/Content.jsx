import React, {useState, useContext, useRef, useCallback, useEffect } from 'react'
import bemCssModules from 'bem-css-modules'

//Components
import PostSmall from '../PostSmall';


//Other
import postQueryExecutor from '../../helpers/postQueryExecutor';
import StoreProvider, {StoreContext} from '../../store/StoreProvider';


//Styles
import { default as ContentStyles } from './Content.module.scss'
const style = bemCssModules(ContentStyles);




const Content = () => {
    //useContext
    const { posts, setPosts, currentPage, setCurrentPage, query } = useContext(StoreContext);

    const {loading, error, hasMore} = postQueryExecutor(
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
 

    return (
        <React.Fragment>
            {console.log('rendering', posts)}
            <div className={style()}>
                {posts.map((post, index) => {
                    if (posts.length == index + 1)
                        return <PostSmall key={index} ref={lastPostElementRef} postObject={post}/>
                    else
                        return <PostSmall key={index} postObject={post}/>
                })}
            </div>
        </React.Fragment>
    )
}

export default Content;