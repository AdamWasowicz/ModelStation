import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPost } from '../../helpers/PostHelper';
import StoreProvider, { StoreContext } from '../../store/StoreProvider';


//Resources
import {PostValidationParams, PostCategoryValidationParams } from '../../API_constants';
import { CreatePostImage } from '../../StaticResources_routes';


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
        if (!(title.length >= PostValidationParams.Title_Min && title.length <= PostValidationParams.Title_Max))
            return false;

        if (!(text.length >= PostValidationParams.Text_Min && text.length <= PostValidationParams.Text_Max))
            return false;

        if (!(postCategoryName.length >= PostCategoryValidationParams.Name_Min && postCategoryName.length <= PostCategoryValidationParams.Name_Max))
            return false;
        
        return true;
    }


    //Handlers
    const handleTitleChange = (event) => {
        event.target.value.length <= PostValidationParams.Title_Max
        ? setTitle(event.target.value)
        : null
    }
    const handleTextChange = (event) => {
        event.target.value.length <= PostValidationParams.Text_Max
        ? setText(event.target.value)
        : null
    }
    const handleFileChange = (event) => {
        setFiles(event.target.files)
    }
    const handlePostCategoryNameChange = (event) => {
        event.target.value.length <= PostCategoryValidationParams.Name_Max
        ? setPostCategoryName(event.target.value)
        : null
    }
    const handleUpload = async () => {
        ValidateForm()
        ? await uploadPost(JSON.parse(window.localStorage.getItem('jwt')), title, text, postCategoryName, files, navigate)
        : alert(`Tytuł powinien mieć od ${PostValidationParams.Title_Min} do ${PostValidationParams.Title_Max} znaków\nKategoria powinna mieć do ${PostCategoryValidationParams.Name_Max} znaków\nZawartość powinna mieć od ${PostValidationParams.Text_Min} do ${PostValidationParams.Text_Max} znaków`);
    }


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
                                <input className='FileInput' multiple={true}type="file" id="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
                            </div>

                            <button className='Button' onClick={handleUpload}>
                                Stwórz
                            </button>
                        </div>
                    </div>

                    <img
                        className='LeftPart'
                        src={CreatePostImage}>
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