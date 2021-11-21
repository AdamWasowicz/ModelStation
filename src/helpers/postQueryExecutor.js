import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { API_address } from "../Constants";


export default function postQueryExecutor(PostCategory, Title, UserName, CurrentPage, NumberOfPosts, SortOrder, SortAtr, posts, setPosts)
{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);


    useEffect( () => {
        setPosts([])
    }, [Title])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: `${API_address}/api/v1/post/query`,
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
          
        }).then(res => {

          setPosts(prevPosts => {
            return [...new Set([...prevPosts, ...res.data.posts])]
          });

          setHasMore(res.data.posts.length == NumberOfPosts);
          setLoading(false);

        }).catch(e => {

          if (axios.isCancel(e)) return
          setError(true);
          setLoading(false);
        })
        return () => cancel()
      }, [Title, CurrentPage])
    
      return { loading, error, hasMore }
}