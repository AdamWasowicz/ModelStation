import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostCategoryContainerStyle } from './PostCategoryContainer.module.scss'
const style = bemCssModules(PostCategoryContainerStyle);


//Functions
import { postCategory_GET } from '../../helpers/postCategoryHelper';


const PostCategoryContainer = (setCategoryName) => {

    //useState
    const [postCategories, setPostCategories] = useState([]);

    //useEffect
    useEffect( () => {
        handleGET();
    }, [])

    //Functions
    const handleGET = async () => {
        setPostCategories(await postCategory_GET(JSON.parse(window.localStorage.getItem('jwt')), setPostCategories));
    }
    
    //Handlers
    const handleOnComponentClick = (event) => {
        setCategoryName(event.target.value);
    }

    return (
        <React.Fragment>
            <div className={style('')}>
                <ul>
                    { 
                        postCategories.length > 0
                        ? postCategories.map((pc, index) => {
                            return <li key={index}>{pc.name}</li>
                        })
                        : null
                    }
                </ul>
            </div>
        </React.Fragment>
    )
};

export default PostCategoryContainer;