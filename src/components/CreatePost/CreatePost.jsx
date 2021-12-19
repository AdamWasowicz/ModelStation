import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPost } from '../../helpers/PostHelper';
import StoreProvider, { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as CreatePostStyle } from './CreatePost.module.scss'


//Components
import NotLoggedException from '../NotLoggedException';


const CreatePost = () => {

    //useContext
    const { isLoggedIn } = useContext(StoreContext);


    //useNavigate
    const navigate = useNavigate();


    //useState
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [postCategoryName, setPostCategoryName] = useState("");
    const [files, setFiles] = useState({});


    //Functions
    const ValidateForm = () => {
        if (title.length <= 0)
            return false;
        
        return true;
    }


    //Handlers
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleTextChange = (event) => setText(event.target.value);
    const handleFileChange = (event) => setFiles(event.target.files);
    const handlePostCategoryNameChange = (event) => setPostCategoryName(event.target.value);
    const handleUpload = async () => 
    ValidateForm()
    ? await uploadPost(JSON.parse(window.localStorage.getItem('jwt')), title, text, postCategoryName, files, navigate)
    : alert('Niepoprawnie wypełniony formularz');


    if (isLoggedIn) {

        return (
            <React.Fragment>
                <div className='CreatePost'>
                <div className='RightPart'>
                        <div className='Title'>Nowy post</div>

                        <div className='PostData'>
                            <div className='InputField'>
                                <div className='InputFieldLabel'>Tytuł: </div>
                                <input type="text" id="title" value={title} onChange={handleTitleChange} />
                            </div>

                            <div className='InputField'>
                                <div className='InputFieldLabel'>Kategoria: </div>
                                <input type="text" id="text" value={postCategoryName} onChange={handlePostCategoryNameChange} />
                            </div>

                            <div className='InputFieldBig'>
                                <div className='InputFieldLabelBig'>Zawartość: </div>
                                <textarea className='TextAreaInput' type="text" id="text" value={text} onChange={handleTextChange} />
                            </div>

                            <div className='InputField'>
                                <div className='InputFieldLabel'>Zdjęcie: </div>
                                <input className='FileInput' type="file" id="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
                            </div>

                            <button className='Button' onClick={handleUpload}>
                                Stwórz
                            </button>
                        </div>
                    </div>

                    <img
                        className='LeftPart'>

                    </img>                
                </div>
            </React.Fragment>
        );
    }
    else {
        return (<NotLoggedException />)
    }
};

export default CreatePost;