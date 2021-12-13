import React, { createContext, useState } from "react";

require("regenerator-runtime/runtime");

export const StoreContext = createContext(null);


const StoreProvider = ( { children} ) => {

    //Posts
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    //SerchBar
    const [q_title, set_q_Title] = useState('');
    const [q_categoryName, set_q_CategoryName] = useState('');
    const [q_sortOrder, set_q_SortOrder] = useState(1);
    const [q_sortArgument, set_q_SortArgument] = useState(0);



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(window.localStorage.getItem('jwt')) ? true : false);

    return (
        <StoreContext.Provider value={{
            posts, setPosts,
            currentPage, setCurrentPage,
            q_title, set_q_Title,
            q_categoryName, set_q_CategoryName,
            q_sortOrder, set_q_SortOrder,
            q_sortArgument, set_q_SortArgument,


            
            isModalOpen, setIsModalOpen,
            isLoggedIn, setIsLoggedIn
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;