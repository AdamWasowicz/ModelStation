import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import bemCssModule from 'bem-css-modules';

//Styles
import { default as ModalStyles} from './Modal.module.scss';
const style = bemCssModule(ModalStyles);


//Component
const Modal = ({ children, handleOnClose, isOpen, closeOnBackgroundClick }) => 
{
    //References
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);


    //UseEffect
    //HandleDialog
    useEffect(() => {
        if (!modalRef.current)
            return;

        const { current: modal } = modalRef;

        if (isOpen)
        {
            previousActiveElement.current = document.activeElement;
            modal.showModal();
        }
        else if (previousActiveElement.current)
        {
            modal.close();
            previousActiveElement.current.focus();
        }

    }, [isOpen]);

    //HandleClose
    useEffect( () => {
        const { current: modal } = modalRef;

        const handleCancel = event =>
        {
            event.preventDefault();
            handleOnClose();
        };

        modal.addEventListener('cancel', handleCancel);

        return () =>
        {
            modal.removeEventListener('cancel', handleCancel);
        }

    }, [handleOnClose]);


    //Handlers
    const handleBackgroundClick = ({ target }) =>
    {
        const { current } = modalRef;

        if (closeOnBackgroundClick && target === current)
            handleOnClose();
    }

    return ReactDOM.createPortal((
        <dialog ref={modalRef} className={style()} onClick={handleBackgroundClick}>
            {children}
        </dialog>
    ), document.body);
};


//Export
export default Modal;