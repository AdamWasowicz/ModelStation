import axios from "axios";
import { useEffect, useState, useContext } from "react";

export default function postQueryExecutor(PostCategory, Title, UserName, CurrentPage, NumberOfPosts, SortOrder, SortAtr, posts, setPosts)
{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);


    useEffect( () => {
        setLoading(true);
        setError(false);

        let cancel;

        axios({
            method: 'GET',
            url: 'https://localhost:44363/api/v1/post/query',
            params: {
                PostCategory: PostCategory, 
                Title: Title,
                UserName: UserName,
                CurrentPage: CurrentPage,
                NumberOfPosts: NumberOfPosts,
                OrderByDirection: SortOrder,
                SortAtribute: SortAtr
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
        .then(result => {
            console.log(result);
            setPosts(...new Set([...posts, result.data.posts]));

            setHasMore(result.data.totalPages != CurrentPage)
            setLoading(false);
        })
        .catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
          })
        return () => cancel()
    }, [CurrentPage])

    return {loading, error, hasMore}
}