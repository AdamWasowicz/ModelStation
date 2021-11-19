import React, {useState, useEffect, useContext, useRef, useMemo } from 'react';
import bemCssModules from 'bem-css-modules'
import { uploadPost } from '../../helpers/uploadPostHelper';


//Styles
import { default as CreatePostStyle } from './CreatePost.module.scss'
const bemstyle = bemCssModules(CreatePostStyle);


const CreatePost = () => {
    //useState
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [files, setFiles] = useState({});


    //Handlers
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleTextChange = (event) => setText(event.target.value);
    const handleFileChange = (event) => 
    {
        setFiles(event.target.files[0]);
    }

    const handleUpload = async () =>
    {
        let result = await uploadPost(JSON.parse(window.localStorage.getItem('jwt')), title, text, files);

        console.log(result);
    }


    //Functions


    return (
        <React.Fragment>
            <div className={bemstyle('')}>
                <h1>Tworzenie nowego postu</h1>
                <div>
                    <label htmlFor="title">Tytuł</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange}/>
                </div>

                <div>
                    <label htmlFor="text">Zawartość</label>
                    <input type="text" id="text" value={text} onChange={handleTextChange}/>
                </div>

                <div>
                    <label htmlFor="file">Zawartość</label>
                    <input type="file" id="file" onChange={handleFileChange}/>
                </div>

                <button onClick={handleUpload}>
                    Upload
                </button>
            </div>
        </React.Fragment>
    )
};

export default CreatePost;