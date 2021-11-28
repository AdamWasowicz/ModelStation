import axios from "axios";
import { API_address, getCommentsByPostId_API_route } from "../Constants";

export async function GetCommentsByPostId(postId, setComments, setLoading)
{
    let error = false;
    let data = null;
    console.log(postId);
    const url = `${API_address}${getCommentsByPostId_API_route}/` + postId
    console.log(url);

    await axios({
        method: 'GET',
        url: url
    }).then(result => {
        data = result.data;
        setComments(result.data);
        setLoading(false);
    }).catch(e => {
        setComments({});
        setLoading(false);
        console.log(e);
        error = true;
    });
    
    setLoading(false);
    console.log('end');

    return { error, data };
}