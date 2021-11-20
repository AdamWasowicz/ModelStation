import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostCategoryStyle } from './PostCategory.module.scss'
const style = bemCssModules(PostCategoryStyle);


//Functions


const PostCategory = ({pcObject, handleOnClick}) => {

    //useState
    const [postCategoryObject, setPostCategoryObject] = useState({});

    //useEffect
    useEffect( () => {
        setPostCategoryObject(pcObject);
    }, [])


    //Functions


    //Handlers
    const handleOnCategoryClick = (event) => {
        handleOnClick(postCategoryObject.name);
    }
    


    return (
        <React.Fragment>
            <li onClick={handleOnCategoryClick}>
                <div>
                    <label>{'Nazwa: ' + postCategoryObject.name}</label>
                    <label>{'Opis: ' + postCategoryObject.description}</label>
                </div>
            </li>
        </React.Fragment>
    )
};

export default PostCategory;