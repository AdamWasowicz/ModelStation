import React, { useState, useEffect, useContext } from 'react';


//Styles
import { faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as DeleteAccountModaltyles } from './DeleteAccountModal.module.scss';


//Components
import Modal from '../../Modal';


const DeleteAccountModal = ({ DeleteAction, OnCancel }) => {

    //useState
    const [code, setCode] = useState('');
    //Fields
    const [currentCode, setCurrentCode] = useState('');
    const [password, setPassword] = useState('');
    //Flags
    const [error, setError] = useState(0);
    const [loading, setLoading] = useState(false);


    //Functions
    const GenerateCode = (length = 6) => {
        let newCode = '';

        for (let i = 0; i < length; i++) {

            let newSymbol = Math.floor(Math.random() * 9);
            newCode += newSymbol;
        }

        return newCode;
    }
    const ValidateForm = () => {
        if (code != currentCode)
            return false;

        if (password.length <= 0)
            return false;

        return true;
    }


    //Handlers
    const DeleteButtonClickHandler = () => {
        if (ValidateForm())
            DeleteAction(password, setLoading, setError);
        else
            alert('Niepoprawnie wypełniony formularz');
    }
    //Change
    const CurrentCodeChangeHandler = (event) => {
        setCurrentCode(event.target.value);
    }
    const PasswordCodeChangeHandler = (event) => {
        setPassword(event.target.value);
    }


    //useEffect
    useEffect( () => {
        setCode(GenerateCode(8));
    }, [])


    return (
        <Modal
            closeOnBackgroundClick={true}
            isOpen={true}
            handleOnClose={OnCancel}>
            <div className='DeleteAccountModal'>
                <div className='Information'>
                    Czy napewno chcesz usunąć swoje konto?
                </div>

                <div className='Description'>
                    Aby usunąć swoje konto wpisz swoje obecne hasło oraz przepisz wygenerowany kod aby potwierdzić.
                </div>

                <div className='Code'>
                    <div className='Field'>
                        <div className='FieldLabel'>Wygenerowany kod:</div>
                        <div className='RandomCode'>{code}</div>
                    </div>
                </div>

                <div className='Inputs'>
                    <div className={error != -2 ? 'Field' : 'Field-Invalid'}>
                        <div className='FieldLabel'>Obecne hasło:</div>
                        <input
                            type='password'
                            className='FieldValue'
                            value={password}
                            onChange={PasswordCodeChangeHandler}></input>
                    </div>

                    <div className='Field'>
                        <div className='FieldLabel'>Kod:</div>
                        <input
                            type='text'
                            className='FieldValue'
                            value={currentCode}
                            onChange={CurrentCodeChangeHandler}></input>
                    </div>
                </div>

                <button
                        className='Button'
                        onClick={DeleteButtonClickHandler}>
                        Zmień hasło
                </button>
            </div>
        </Modal>

    )
}

export default DeleteAccountModal;