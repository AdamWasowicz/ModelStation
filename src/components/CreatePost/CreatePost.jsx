import React, {useState, useEffect, useContext, useRef, useMemo } from 'react';
import bemCssModules from 'bem-css-modules'
import { uploadPost } from '../../helpers/uploadPostHelper';
import { useNavigate } from "react-router-dom";
import StoreProvider, { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as CreatePostStyle } from './CreatePost.module.scss'
const bemstyle = bemCssModules(CreatePostStyle);


//Components
import PostCategoryContainer from '../PostCategoryContainer/PostCategoryContainer';


const CreatePost = () => {
    //useState
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [postCategoryName, setPostCategoryName] = useState("");
    const [files, setFiles] = useState({});

    //useContext
    const { isLoggedIn } = useContext(StoreContext);

    //Handlers
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleTextChange = (event) => setText(event.target.value);
    const handleFileChange = (event) => setFiles(event.target.files);
    const handlePostCategoryNameChange = (event) => setPostCategoryName(event.target.value);
    const handleUpload = async () => await uploadPost(JSON.parse(window.localStorage.getItem('jwt')), title, text, files);
    
    if (isLoggedIn)
    {
    return (
        <React.Fragment>
            <div className={bemstyle('')}>
                <h1>Tworzenie nowego postu</h1>
                <div>
                    <div>
                        <label htmlFor="title">Tytuł</label>
                        <input type="text" id="title" value={title} onChange={handleTitleChange} />
                    </div>

                    <div>
                        <label htmlFor="text">Zawartość</label>
                        <input type="text" id="text" value={text} onChange={handleTextChange} />
                    </div>

                    <div>
                        <label htmlFor="text">Nazwa kategori</label>
                        <input type="text" id="text" value={postCategoryName} onChange={handlePostCategoryNameChange} />
                    </div>

                    <div>
                        <label htmlFor="file">Zdjęcie</label>
                        <input type="file" id="file" onChange={handleFileChange} />
                    </div>

                    <button onClick={handleUpload}>
                        Upload
                    </button>
                </div>

                <div>
                    <PostCategoryContainer/>
                </div>
            </div>
        </React.Fragment>
    );
    }
    else
    {
        return(
            <React.Fragment>
                BRAK DOSTĘPU
            </React.Fragment>
        )
    }
};

export default CreatePost;