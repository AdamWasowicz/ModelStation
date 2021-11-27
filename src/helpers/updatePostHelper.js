import axios from "axios";
import { API_address, patchPost_API_route } from "../Constants";


export async function updatePost(postId, postTitle, postText, postCategoryName) {
    console.log('updatePostHelper->Start')
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));
    var result = 0;

    axios({
        method: "PATCH",
        url: `${API_address}${patchPost_API_route}`,
        data: {
            id: postId,
            title: postTitle,
            text: postText,
            postCategoryName: postCategoryName
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

    console.log('updatePostHelper->End')
    return result;
}