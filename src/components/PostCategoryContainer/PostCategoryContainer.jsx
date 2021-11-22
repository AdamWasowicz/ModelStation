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
    const [query, setQuery] = useState("");


    //useEffect
    useEffect( () => {
        handleGET();
    }, [])


    //Functions
    const handleGET = async () => {
        setPostCategories(await postCategory_GET(JSON.parse(window.localStorage.getItem('jwt')), setPostCategories));
    }
    const searchFilter = (object) => {
        console.log(object);

        const inName = object.name.includes(query);
        const inDescription = object.description.length > 0 ? object.description.includes(query) : false;

        return inName || inDescription; 
    }
    

    //Handlers
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    }
    

    return (
        <React.Fragment>
            <div className={style('')}>
                <div className='Header'>
                    <h2>Dostępne kategorie</h2>
                    <input value={query} onChange={handleQueryChange}/>
                </div>

                <div className='Categories'>
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
            </div>
        </React.Fragment>
    )
};

export default PostCategoryContainer;