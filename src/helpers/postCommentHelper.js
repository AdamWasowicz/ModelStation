import axios from "axios";
import { API_address, postComment_API_route } from "../Constants";


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