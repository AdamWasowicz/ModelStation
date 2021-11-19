import React, { createContext, useState } from "react";

require("regenerator-runtime/runtime");

export const StoreContext = createContext(null);


const StoreProvider = ( { children} ) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(window.localStorage.getItem('jwt')) ? true : false);

    return (
        <StoreContext.Provider value={{
            posts, setPosts,

            currentPage, setCurrentPage,

            query, setQuery,

            isModalOpen, setIsModalOpen,

            isLoggedIn, setIsLoggedIn
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;