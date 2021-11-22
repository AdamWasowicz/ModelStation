import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostBannerContainerStyles } from './PostBannerContainer.module.scss'
const style = bemCssModules(PostBannerContainerStyles);


//Components

const PostBannerContainer = ({ setPostData, postsArray }) => {   

    return (
        <div className='PostBannerContainer'>
            {
                postsArray.map( (post, index) => {
                    return <p>{post.title}</p>
                })
            }
        </div>
    )
};

export default PostBannerContainer;