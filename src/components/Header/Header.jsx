import React, { useContext } from 'react';
import { Route, Router, Routes } from 'react-router';
import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../../store/StoreProvider';


//Styles
import { default as HeaderStyles } from './Header.module.scss'
const block = bemCssModules(HeaderStyles);


//Components
import SearchBar from '../SearchBar';

const Header = () => {

    const SearchBarContainer = () => {
        return (
            <div className={block('title')}>
                <SearchBar/>
            </div>
        )
    }

    return (
        <header className={block()}>
            <div className={block('bannerImage')} alt='bannerImage'>Image</div>
            <Routes>
                <Route path='/' element={<SearchBarContainer/>}/> 
                <Route path='/userPosts/:userName' element={<SearchBarContainer/>}/> 
            </Routes>
        </header>
    )
}

export default Header;