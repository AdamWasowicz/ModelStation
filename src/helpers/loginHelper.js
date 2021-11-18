import axios from "axios";
import { API_address, login_API_route } from "../Constants";


export default async function LoginHelper(login, password, setLoggedIn)
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
                window.localStorage.setItem("jwt", JSON.stringify(result.data.jwt));
                window.localStorage.setItem("user", JSON.stringify(result.data.user));
                
                setLoggedIn(true);
            }
            else
            {
                error = true;
            }
            return error;

        }).catch(e => {
            error = true;
        });
        
      return error; 
}