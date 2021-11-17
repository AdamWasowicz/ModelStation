import axios from "axios";
import { API_address, login_API_route } from "../Constants";


export default async function LoginHelper(login, password, setUser, setJwt)
{
    let error = false;

        await axios({
            method: 'POST',
            url: `${API_address}${login_API_route}`,
            data: {
                userName: login,
                password: password
            },
        }).then(result => {
            if (result.status === 200)
            {
                setUser(result.data.user);
                setJwt(result.data.jwt);
            }
            else
            {
                error = true;
            }
        }).catch(e => {
            error = true;
        });

      return error; 
}