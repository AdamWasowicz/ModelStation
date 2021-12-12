import React, {useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { faArrowUp, faArrowDown, faThumbsUp, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as SearchBarStyle } from './SearchBar.module.scss'


//Helpers
import postQueryExecutor from '../../helpers/PostHelper';


const SearchBar = () => {

    const [tittle, setTitle] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [sortOrder, setSortOrder] = useState(1);
    const [sortArgument, setSortArgument] = useState(0);

    //useContext
    const { set_q_Title, set_q_CategoryName,  set_q_SortOrder, set_q_SortArgument, setCurrentPage } = useContext(StoreContext);


    //useEffect
    //ResetCurrentPageNumber
    useEffect( () => {
        setCurrentPage(1);
    }, [] )


    //Functions
    const GetSortOrder = () => {

        if (sortOrder == 1)
            return 'ASC';

        if (sortOrder == -1)
            return 'DSC';
    }
    const GetSortArgument = () => {

        if (sortArgument == 0)
            return 'NONE';

        if (sortArgument == 1)
            return 'LIKES'

        if (sortArgument == 2)
            return 'DATE';
    }


    //Handlers
    const TitleChangeHandler = (event) => {
        setTitle(event.target.value);
        set_q_Title(event.target.value);
    }
    const CategoryNameChangeHandler = (event) => {
        setCategoryName(event.target.value);
        set_q_CategoryName(event.target.value);
    }
    const DateClickHandler = () => {
        if (sortArgument == 2)
        {
            setSortArgument(0);
            set_q_SortArgument(0);
        }
        else
        {
            setSortArgument(2);
            set_q_SortArgument(2); 
        }
    }
    const LikeClickHandler = () => {
        if (sortArgument == 1)
        {
            setSortArgument(0);
            set_q_SortOrder(0);
        }
        else
        {
            setSortArgument(1);
            set_q_SortOrder(1); 
        }
    }
    const ASC_ClickHandler = () => {
        if (sortOrder != 1)
        {
            setSortOrder(1);
            set_q_SortOrder(1);
        }
    }
    const DSC_ClickHandler = () => {
        if (sortOrder != -1)
        {
            setSortOrder(-1);
            set_q_SortOrder(-1);
        }
    }


    return (
        <div className='SearchBar'>
            <div className='ControlPanel'>
                <button 
                    className={
                        sortOrder == 1 
                        ? 'ControlButton-Active'
                        : 'ControlButton'
                    }
                    onClick={ASC_ClickHandler}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>

                <button 
                    className = {
                        sortOrder == -1 
                        ? 'ControlButton-Active'
                        : 'ControlButton'
                    }
                    onClick={DSC_ClickHandler}
                >
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>

                <button 
                    className = {
                        sortArgument == 1
                        ? 'ControlButton-Active'
                        : 'ControlButton'
                    }
                    onClick={LikeClickHandler}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>

                <button 
                    className = {
                        sortArgument == 2
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
                    <input 
                        className='SearchBar'
                        value={tittle}
                        onChange={TitleChangeHandler}
                        ></input>
                </div>

                <div className='SearchBarObject'>
                    <input 
                        className='SearchBar'
                        value={categoryName}
                        onChange={CategoryNameChangeHandler}
                    ></input>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
