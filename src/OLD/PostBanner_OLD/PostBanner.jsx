import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostBannerStyle } from './PostBanner.module.scss'
const style = bemCssModules(PostBannerStyle);


const PostBanner = ({pbObject, handleOnClick, Active}) => {

    //useState
    const [postBannerObject, setPostBannerObject] = useState({});


    //useEffect
    useEffect( () => {
        setPostBannerObject(pbObject);
    }, [] )


    //Handlers
    const handleOnCategoryClick = (event) => {
        handleOnClick(postBannerObject);
    }

    return (
        <div onClick={handleOnCategoryClick} className={Active ? 'PostBanner Active' : "PostBanner"}>
            <label className="Prop">{'Tytuł ' + postBannerObject.title}</label>
            {
                postBannerObject.postCategoryName > ""
                ?<label className="Prop">{'Kategoria: ' + postBannerObject.postCategoryName}</label>
                : null
            }

            {
                postBannerObject.title > ""
                ?<label className="Prop">{'Tekst: ' + postBannerObject.title}</label>
                : null
            }
        </div>
    )
};

export default PostBanner;