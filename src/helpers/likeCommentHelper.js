import axios from "axios";
import { API_address, getLikedComment_APi_route, patchLikedComment_API_route } from "../Constants";


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