import React, {useState, useEffect, useContext } from 'react'
import bemCssModules from 'bem-css-modules'


//Styles
import { default as PostCategoryContainerStyle } from './PostCategoryContainer.module.scss'
const style = bemCssModules(PostCategoryContainerStyle);


//Components
import PostCategory from '../PostCategory/PostCategory';


//Functions
import { postCategory_GET } from '../../helpers/postCategoryHelper';


const PostCategoryContainer = ({setCategoryName}) => {

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
    

    return (
        <React.Fragment>
            <div className={style('')}>
                <h2>Dostępne kategorie</h2>
                <ul>
                    { 
                        postCategories.length > 0
                        ? postCategories.map((pc, index) => {
                            return <PostCategory key={index} pcObject={pc} handleOnClick={setCategoryName}/>
                        })
                        : null
                    }
                </ul>
            </div>
        </React.Fragment>
    )
};

export default PostCategoryContainer;