import axios from "axios";
import { API_address, getCommentsByPostId_API_route } from "../Constants";

export async function GetCommentsByPostId(postId, setComments, setLoading)
{
    let error = false;
    let data = null;
    const url = `${API_address}${getCommentsByPostId_API_route}/` + postId

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

    return { error, data };
}