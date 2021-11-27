import axios from "axios";
import { API_address, getPostByUserId } from "../Constants";

export async function GetPostByPostId(postId, setPostObject, setLoading)
{
    let error = false;
    let data = null;

    await axios({
        method: 'GET',
        url: `${API_address}${getPostByUserId}/${postId}`
    }).then(result => {
        data = result.data;
        setPostObject(result.data);
        setLoading(false);
    }).catch(e => {
        setPostObject({});
        setLoading(false);
        console.log(e);
        error = true;
    });
    
    setLoading(false);

    return { error, data };
}