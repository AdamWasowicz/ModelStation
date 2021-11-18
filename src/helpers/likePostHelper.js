import axios from "axios";
import { API_address, likeComment_API_route } from "../Constants";


export async function LikePostHelper_GET(jwt, postId)
{
    let error = false;

    console.log(`${API_address}${likeComment_API_route}${postId}`);

        await axios({
            method: 'GET',
            url: `${API_address}${likeComment_API_route}` + postId,
            headers: {
                Authorization: "Bearer " + jwt
            },
        }).then(result => {
            if (result.status === 200)
            {
                console.log(result);
            }
            else
            {
                error = true;
            }

            console.log(result);
        }).catch(e => {
            console.log(e);
            error = true;
        });
        
        console.log('LikePostHelper_GET : END')
      return error; 
}