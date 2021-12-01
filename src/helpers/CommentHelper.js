import axios from "axios";
import { API_address, getCommentsByPostId_API_route, getLikedComment_APi_route, patchLikedComment_API_route, postComment_API_route } from "../Constants";

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


export async function LikeCommentHelper_GET(commentId) {
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));
    let error = false;
    let value = 0;
    const url = `${API_address}${getLikedComment_APi_route}/` + commentId

    await axios({
        method: 'GET',
        url: url,
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        if (result.status === 200) {
            value = result.data.value;
        } else {
            value = 0;
            error = true;
        }
    }).catch(e => {
        value = 0;
        error = true;
    });

    return {error, value};
}


export async function LikedCommentHelper_PATCH(newValue, commentId)
{
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));
    let error = false;

    await axios({
        method: 'PATCH',
        url: `${API_address}${patchLikedComment_API_route}`,
        headers: {
            Authorization: "Bearer " + jwt
        },
        data: {
            commentId: commentId,
            value: newValue
        },
    }).then(result => {
        if (result.status === 200) {
            console.log(result);
            error = false;
        } else {
            error = true;
        }

    }).catch(e => {
        console.log(e);
        error = true;
    });

    return error;
}


export async function Post_Comment(text, postId) {
    var result = 0;
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));

    console.log('Post_Comment->Start')
    axios({
        method: "POST",
        url: `${API_address}${postComment_API_route}`,
        data: {
            text: text,
            postId: postId
        },
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(function (response) {
        console.log(response);
        result = 1;
    }).catch(function (response)
    {
        console.log(response);
        result = -1;
    });

    console.log('Post_Comment->End')
    return result;
}