import React, {useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'

//Styles
import { default as PostSmallStyles } from './PostSmall.module.scss'
const style = bemCssModules(PostSmallStyles);


const PostSmall = React.forwardRef((postObject, ref) => {
    console.log(postObject);
    const post = postObject.postObject;
    
    return (
        <React.Fragment>
            <div className={style()} ref={ref}>
                <div className={style('likeSideBar')}>
                    <button className={style('likeSideBar__likeUpButton')}>
                        LikeUp
                    </button>

                    <div className={style('likeSideBar__likeCounter')}>
                        {post.likes}
                    </div>

                    <button className={style('likeSideBar__likeDownButton')}>
                        LikeDown
                    </button>
                </div>

                <div className={style('Main')}>
                    <div className={style('Main__Information')}>
                        <div className={style('Main__Information__UserNameANDpostCategory')}>
                            <h4>{post.userName}</h4>
                            {post.postCategoryId != null? <h4>PostCategory</h4> : null}
                        </div>

                        <div className={style('Main__Information__Title')}>
                            {post.title}
                        </div>
                    </div>

                    <div className={style('Main__PostContent')}
                        >
                        <div className={style('Main__PostContent__Text')}
                        >
                            {post.text}
                        </div>

                        <div className={style('Main__PostContent__Photos')}
                        >
                            Photo
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
});

export default PostSmall;