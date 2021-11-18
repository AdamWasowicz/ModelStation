import React, {createContext, useState, useEffect} from "react";
import request from "../helpers/request";

require("regenerator-runtime/runtime");

export const StoreContext = createContext(null);


const StoreProvider = ( { children} ) => {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState('');
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <StoreContext.Provider value={{
            posts, setPosts,

            user, setUser,

            jwt, setJwt,

            currentPage, setCurrentPage,

            query, setQuery,

            isModalOpen, setIsModalOpen
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;