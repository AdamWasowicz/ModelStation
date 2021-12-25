import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";


//Styles
import { faLevelUpAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as ScrollUpStyle } from './ScrollUp.module.scss'


const ScrollUp = () => {
    
    //useState
    const [ visible, setVisible ] = useState(false);


    //Const
    const yMin = 1900;


    //Functions
    const ChangeVisibility = () => {
        const positionY = document.documentElement.scrollTop;

        if (positionY > yMin)
            setVisible(true);

        else if (positionY <= yMin)
            setVisible(false);
    }


    //Handlers
    const GoToTheTopOnClickHandler = () => {
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    //useEffect
    useEffect( () => {

        window.addEventListener("scroll", ChangeVisibility);

        return () => window.removeEventListener("scroll", ChangeVisibility);
    }, [])


    return (
        <div
            className={ visible ? 'ScrollUp' : 'ScrollUp-Hidden'}
            onClick={GoToTheTopOnClickHandler}>
                <FontAwesomeIcon icon={faLevelUpAlt} />
        </div>
    )
}


export default ScrollUp;