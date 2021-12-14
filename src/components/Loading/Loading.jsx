import React from 'react'


//Styles
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as LoadingStyle } from './Loading.module.scss'


const Loading = () => {
    return (
        <div className="Loading">
            <div className='Information'>Ładowanie zawartości</div>
            <div className="LoadingIcon">
                <FontAwesomeIcon icon={faSpinner} />
            </div>
        </div>
    )
};

export default Loading;