import axios from "axios";
import { API_address, postCategory_GET_API_route } from "../Constants";


export async function postCategory_GET(jwt, setPostCategories) {
    let data = null;

    await axios({
        method: 'GET',
        url: `${API_address}${postCategory_GET_API_route}`,
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        if (result.status === 200) 
        {
            data = result.data;
        } 
    }).catch(e => {
        console.log(e);
    });

    return data ;
}