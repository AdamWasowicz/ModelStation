import React, {useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules'


//Helpers
import { GetUserPosts } from '../../helpers/getUserPostsHelper';


//Styles
import { default as EditPostStyles } from './EditPost.module.scss'
const style = bemCssModules(EditPostStyles);


//Components
import NotLoggedException from '../NotLoggedException';
import Loading from '../Loading';
import UserHasNoPostsException from '../UserHasNoPostsException';
import Error from '../Error';


const EditPost = () => {
    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useState
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [postCategoryName, setPostCategoryName] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    //Handlers
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleTextChange = (event) => setText(event.target.value);

    
    if (isLoggedIn) {
        //Functions
        const GetPosts = async () => {
            const { error, data } = await GetUserPosts(JSON.parse(window.localStorage.getItem('jwt')), JSON.parse(window.localStorage.getItem('user')).id, setUserPosts, setLoading);

            setError(error);
        };

        //useEffect
        useEffect( () => {
            GetPosts();
        }, [] );

        console.log(userPosts);
        console.log(loading);


        if (loading == false && userPosts.length > 0 && error == false) {
            return (
                <div className='EditPost'>
                    <h4>Edytuj post</h4>

                    <div className='EditPost_Content'>
                        <div className='LeftPart'>
                            <div>
                                <label htmlFor="title">Tytuł: </label>
                                <input type="text" id="title" value={title} onChange={handleTitleChange} />
                            </div>

                            <div>
                                <label htmlFor="text">Zawartość: </label>
                                <input type="text" id="text" value={text} onChange={handleTextChange} />
                            </div>

                            <div>
                                <label htmlFor="postCategoryName">Kategoria: </label>
                                <input type="text" disabled={true} id="postCategoryName" value={postCategoryName} />
                            </div>
                        </div>

                        <div className='RightPart'>
                            RightPart
                        </div>
                    </div>

                    <button className='UpdateButton'>Aktułalizuj</button>
                </div>
            )
        }
        else if ( loading == true && userPosts.length == 0 && error == false) {
            return <Loading/>
        }
        else if ( loading == true && userPosts.length == 0 && error == false) {
            return <UserHasNoPostsException/>
        }
        else
        {
            return <Error/>
        }
    }
    else
    {
        return <NotLoggedException/>
    }
};

export default EditPost;