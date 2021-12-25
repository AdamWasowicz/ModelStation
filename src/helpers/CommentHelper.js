import axios from "axios";
import { API_address, getCommentsByPostId_API_route, getLikedComment_APi_route, patchLikedComment_API_route, postComment_API_route, patchComment_API_route, deleteComment_API_route, getCommentById_API_route } from "../API_routes";

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

export async function LikeCommentHelper_GET(commentId, setLikeValue) {
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
        console.log(result);
        console.log(result.data.value)
        if (result.status === 200) {
            setLikeValue(result.data.value);
        } else {
            setLikeValue(0);
        }
    }).catch(e => {
        setLikeValue(0);
        value = 0;
        error = true;
    });

    return {error, value};
}

export async function LikedCommentHelper_PATCH(newValue, commentId)
{
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));
    let error = false;

    console.log('Hello:', newValue, commentId)

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

export async function Post_Comment(text, postId, HandleNewCommentAdd) {
    var result = 0;
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));

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
    }).then(response => {

        let newId = response.data;
        if (response.status == 200)
            HandleNewCommentAdd(newId);

        result = 1;
    }).catch(function (response)
    {
        console.log(response);
        result = -1;
    });

    return result;
}

export async function Comment_PATCH(text, commentId) {
    var result = 0;
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));


    axios({
        method: "PATCH",
        url: `${API_address}${patchComment_API_route}`,
        data: {
            text: text,
            id: commentId
        },
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(function (response) {
        result = 1;
    }).catch(function (response)
    {
        console.log(response);
        result = -1;
    });

    return result;
}

export async function Comment_DELETE(commentId)
{
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));
    let error = false;
    const url = `${API_address}${deleteComment_API_route}/${commentId}`

    await axios({
        method: 'DELETE',
        url: url,
        headers: {
            Authorization: "Bearer " + jwt
        }
    }).then(result => {
        error = false;

    }).catch(e => {
        console.log(e);
        error = true;
    });

    return error;
}

export async function GetCommentById(commentId, setComments, comments, setLoading) {

    setLoading(true);
    let error = false;
    const url = `${API_address}${getCommentById_API_route}/` + commentId

    await axios({
        method: 'GET',
        url: url
    }).then(result => {
        if (result.status == 200)
        {
            let newcomments = [...new Set([...comments,result.data])]
            setComments(newcomments);
            error = false;
        }
    }).catch(e => {
        console.log(e);
        error = true;
    });
    

    setLoading(false);
    return error ;
}
