import React, { useContext } from 'react'
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';

//Styles
import { default as HeaderStyles } from './Header.module.scss'
const block = bemCssModules(HeaderStyles);

const Header = () => {
    //Context
    const { query, setQuery, setCurrentPage} = useContext(StoreContext);

    const handleQueryChange = (event) =>{
        setQuery(event.target.value);
        setCurrentPage(1);
    }
    


    return (
        <header className={block()}>
            <div className={block('bannerImage')}alt='bannerImage'>Image</div>
            <div className={block('title')}>
                <input value={query} onChange={handleQueryChange}></input>
            </div>
        </header>
    )
}

export default Header;