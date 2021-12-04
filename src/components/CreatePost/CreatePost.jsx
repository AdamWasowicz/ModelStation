import React, {useState, useEffect, useContext, useRef, useMemo } from 'react';
import bemCssModules from 'bem-css-modules'
import { uploadPost } from '../../helpers/PostHelper';
import StoreProvider, { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as CreatePostStyle } from './CreatePost.module.scss'
const bemstyle = bemCssModules(CreatePostStyle);


//Components
import PostCategoryContainer from '../PostCategoryContainer';
import NotLoggedException from '../NotLoggedException';


const CreatePost = () => {
    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    if (isLoggedIn) {
        //useState
        const [title, setTitle] = useState("");
        const [text, setText] = useState("");
        const [postCategoryName, setPostCategoryName] = useState("");
        const [files, setFiles] = useState({});


        //Handlers
        const handleTitleChange = (event) => setTitle(event.target.value);
        const handleTextChange = (event) => setText(event.target.value);
        const handleFileChange = (event) => setFiles(event.target.files);
        const handlePostCategoryNameChange = (event) => setPostCategoryName(event.target.value);
        const handleUpload = async () => await uploadPost(JSON.parse(window.localStorage.getItem('jwt')), title, text, postCategoryName, files);


        return (
            <React.Fragment>
                <div className={bemstyle('')}>
                    <h1>Tworzenie nowego postu</h1>
                    <div>
                        <div>
                            <label htmlFor="title">Tytuł: </label>
                            <input type="text" id="title" value={title} onChange={handleTitleChange} />
                        </div>

                        <div>
                            <label htmlFor="text">Zawartość: </label>
                            <input type="text" id="text" value={text} onChange={handleTextChange} />
                        </div>

                        <div>
                            <label htmlFor="text">Kategoria: </label>
                            <input type="text" disabled={true} id="text" value={postCategoryName} onChange={handlePostCategoryNameChange} />
                        </div>

                        <div>
                            <label htmlFor="file">Zdjęcia: </label>
                            <input type="file" id="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
                        </div>

                        <button onClick={handleUpload}>
                            Upload
                        </button>
                    </div>

                    <div>
                        <PostCategoryContainer setCategoryName={setPostCategoryName} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
    else {
        return (<NotLoggedException />)
    }
};

export default CreatePost;