import axios from "axios";
import { API_address, getUserPosts_APU_route } from "../Constants";

export async function GetUserPosts(jwt, userId)
{
    let error = false;
    let data = [];

    await axios({
        method: 'POST',
        url: `${API_address}${getUserPosts_APU_route}/${userId}`,
        headers: {
            Authorization: "Bearer " + jwt
        }
    }).then(result => {
        if (result.status === 200) {
            console.log(result);
            data = result.data;
            error = false;
        } else {
            result = false;
            error = true;
        }
    }).catch(e => {
        result = false;
        error = true;
    });

    return { error, data };
}