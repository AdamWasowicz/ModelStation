import axios from "axios";
import { API_address, likeComment_API_route, likedComment_create_or_edit_API_route
} from "../Constants";


export async function LikePostHelper_GET(jwt, postId) {
    let error = false;
    let value = 0;

    await axios({
        method: 'GET',
        url: `${API_address}${likeComment_API_route}` + postId,
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        console.log(result);
        if (result.status === 200) {
            console.log(result);
            value = result.data.value;
        } else {
            value = 0;
            error = true;
        }
    }).catch(e => {
        value = 0;
        error = true;
    });

    console.log('LikePostHelper_GET : END')
    return {error, value};
}

export async function LikedPostHelper_POST(jwt, newValue, postId)
{
    let error = false;
    let result = true;

    await axios({
        method: 'POST',
        url: `${API_address}${likedComment_create_or_edit_API_route}`,
        headers: {
            Authorization: "Bearer " + jwt
        },
        data: {
            postId: postId,
            value: newValue
        },
    }).then(result => {
        if (result.status === 200) {
            console.log(result);

            result = true;
            error = false;
        } else {
            result = false;
            error = true;
        }

    }).catch(e => {
        console.log(e);
        result = false;
        error = true;
    });

    console.log('LikePostHelper_POST : END')
    return error;
}