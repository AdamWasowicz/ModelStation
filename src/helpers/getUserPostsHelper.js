import axios from "axios";
import { API_address, getUserPosts_APU_route } from "../Constants";

export async function GetUserPosts(jwt, userId, setUserPosts, setLoading)
{
    let error = false;
    let data = [];

    await axios({
        method: 'GET',
        url: `${API_address}${getUserPosts_APU_route}/${userId}`,
        headers: {
            Authorization: "Bearer " + jwt
        }
    }).then(result => {
        if (result.status === 200) {  
            setUserPosts(result.data);
            setLoading(false);

            data = result.data;
            error = false;
        } else {
            setPosts([]);
            setLoading(false);

            error = true;
        }
    }).catch(e => {

        setUserPosts([]);
        setLoading(false);
        error = true;
    });

    return { error, data };
}