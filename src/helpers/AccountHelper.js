import axios from "axios";
import { API_address, login_API_route, register_API_route } from "../API_routes";


export async function LoginHelper(login, password, setLoggedIn)
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

export async function Register(email, login, password, setRegisterStatus) {

    let resultCode = 400;

    await axios({
        method: 'POST',
        url: `${API_address}${register_API_route}`,
        data: {
            email: email,
            userName: login,
            password: password
        },
    }).then(result => {
        console.log(result);
        if (result.status === 201)
        {
            resultCode = result.code;
            setRegisterStatus(1);
        }
        else
        {
            resultCode = result.code;
            setRegisterStatus(-1)
        }

    }).catch(e => {
        console.log(e);
        resultCode = e.code;
        setRegisterStatus(-1)
    });
    
  return resultCode;
}
