import axios from "axios";
import { API_address, uploadPost_API_route } from "../Constants";


export async function uploadPost(jwt, title, text, categoryName, images) {
    var result = 0;

    //FormData
    let bodyFormData = new FormData();
    bodyFormData.append('Title', title);
    bodyFormData.append("Text", text);
    if (categoryName.length > 0)
        bodyFormData.append("PostCategoryName", categoryName);
    if (images != null)
    {
        images.foreach( (img) => {
            bodyFormData.append("Files", img);
        })
    }


    axios({
        method: "POST",
        url: `${API_address}${uploadPost_API_route}`,
        data: bodyFormData,
        headers: { 
            "content-type": "multipart/form-data",
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

    return result;
}