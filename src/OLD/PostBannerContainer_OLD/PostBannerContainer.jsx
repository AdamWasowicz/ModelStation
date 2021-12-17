import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostBannerContainerStyles } from './PostBannerContainer.module.scss'
const style = bemCssModules(PostBannerContainerStyles);


//Components
import PostBanner from '../PostBanner_OLD';


const PostBannerContainer = ({ setPostData, postsArray }) => {   
    //useState
    const [query, setQuery] = useState("");
    const [activePostId, setActivePostId] = useState(0);


    //Handlers
    const handleQueryChane = (event) => setQuery(event.target.value);


    //Functions
    const searchFilter = (object) => {
        const inTitle = object.title.includes(query);
        const inText = object.text.includes(query);
        const inPostCategoryName = object.postCategoryName !== null ? object.postCategoryName.includes(query) : false;

        return inTitle || inPostCategoryName || inText; 
    }

    const ClickOnPostBanner = (object) => 
    {
        setPostData(object);
        setActivePostId(object.id);
    }


    return (
        <div className='PostBannerContainer'>
            <div className='Header'>
                <h4>Moje posty: </h4>
                <input value={query} onChange={handleQueryChane} />
            </div>

            <div className='Banners'>
                {
                    postsArray.map((post, index) => {
                        return <PostBanner key={index} pbObject={post} handleOnClick={ClickOnPostBanner} Active={post.id == activePostId} />
                    })
                }
            </div>
        </div>
    )
};

export default PostBannerContainer;