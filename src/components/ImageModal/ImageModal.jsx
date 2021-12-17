import React, { useState } from "react";


//Components
import Modal from '../Modal';

//Styles
import { default as ImageModalStyles } from './ImageModal.module.scss';


const ImageModal = ({ handleOnClose, imgFullSrc }) => {

    return (
        <Modal 
            closeOnBackgroundClick={true} 
            handleOnClose={handleOnClose} 
            isOpen={true}>
                <div className="ImageModal">
                    <img src={imgFullSrc}></img>
                </div>
        </Modal>
    )
}

export default ImageModal;