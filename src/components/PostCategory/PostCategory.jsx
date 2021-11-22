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
            <div onClick={handleOnCategoryClick} className='PostCategory'>
                <label className="Prop">{'Nazwa: ' + postCategoryObject.name}</label>
                <label className="Prop">{'Opis: ' + postCategoryObject.description}</label>
            </div>
        </React.Fragment>
    )
};

export default PostCategory;