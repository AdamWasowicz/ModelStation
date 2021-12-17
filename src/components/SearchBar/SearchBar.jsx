import React, {useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { faArrowUp, faArrowDown, faThumbsUp, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as SearchBarStyle } from './SearchBar.module.scss'


//Helpers
import postQueryExecutor from '../../helpers/PostHelper';


const SearchBar = () => {


    //useContext
    const { set_q_Title, set_q_CategoryName,  set_q_SortOrder, set_q_SortArgument, setCurrentPage, q_title, q_categoryName, q_sortOrder, q_sortArgument} = useContext(StoreContext);


    //useEffect
    //ResetCurrentPageNumber
    useEffect( () => {
        setCurrentPage(1);
        set_q_Title('');
        set_q_CategoryName('');
    }, [] )

    useEffect( () => {
        setCurrentPage(1);
    }, [q_title, q_categoryName, q_sortOrder, q_sortArgument])


    //Handlers
    const TitleChangeHandler = (event) => {
        set_q_Title(event.target.value);
    }
    const CategoryNameChangeHandler = (event) => {
        set_q_CategoryName(event.target.value);
    }
    const DateClickHandler = () => {
        if (q_sortArgument == 2)
            set_q_SortArgument(0);
        else
            set_q_SortArgument(2); 
    }
    const LikeClickHandler = () => {

        if (q_sortArgument == 1)
            set_q_SortArgument(0); 
        else
            set_q_SortArgument(1); 
    }
    const ASC_ClickHandler = () => {
        if (q_sortOrder != 1)
            set_q_SortOrder(1);
    }
    const DSC_ClickHandler = () => {
        if (q_sortOrder != -1)
            set_q_SortOrder(-1);
    }


    return (
        <div className='SearchBar'>
            <div className='ControlPanel'>
                <button 
                    className={
                        q_sortOrder == 1 
                        ? 'ControlButton-Active'
                        : 'ControlButton'
                    }
                    onClick={ASC_ClickHandler}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>

                <button 
                    className = {
                        q_sortOrder == -1 
                        ? 'ControlButton-Active'
                        : 'ControlButton'
                    }
                    onClick={DSC_ClickHandler}
                >
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>

                <button 
                    className = {
                        q_sortArgument == 1
                        ? 'ControlButton-Active'
                        : 'ControlButton'
                    }
                    onClick={LikeClickHandler}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>

                <button 
                    className = {
                        q_sortArgument == 2
                        ? 'ControlButton-Active'
                        : 'ControlButton'
                    }
                    onClick={DateClickHandler}
                >
                    <FontAwesomeIcon icon={faClock} />
                </button>
            </div>

            <div className='SearchBars'>
                <div className='SearchBarObject'>
                    Tytuł:
                    <input 
                        className='SearchBarInput'
                        value={q_title}
                        onChange={TitleChangeHandler}
                        ></input>
                </div>

                <div className='SearchBarObject'>
                    Kategoria:
                    <input 
                        className='SearchBarInput'
                        value={q_categoryName}
                        onChange={CategoryNameChangeHandler}
                    ></input>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
