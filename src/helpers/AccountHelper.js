import axios from "axios";
import { API_address, login_API_route, register_API_route, changeUserPassword_API_route, deleteAccount_API_route } from "../API_routes";


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

export async function Register(email, login, password, setRegisterStatus, navigate, OnCloseHandler) {

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
        if (result.status === 201)
        {
            resultCode = result.code;
            setRegisterStatus(1);
            OnCloseHandler();
            navigate('/accountcreated');
        }
        else
        {
            resultCode = result.code;
            navigate('/error')
            setRegisterStatus(-1)
        }

    }).catch(e => {
        
        resultCode = e.code;
        navigate('/error')
        setRegisterStatus(-1)
    });
    
  return resultCode;
}

export async function ChangePassword(currentPassword, newPassword, setLoading, setIsLoggedIn, setView, setError) {
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));

    await axios({
        method: 'PATCH',
        url: `${API_address}${changeUserPassword_API_route}`,
        data: {
            currentPassword: currentPassword,
            newPassword: newPassword
        },
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        console.log(result);
        if (result.data == 0) {
            alert('Pomyślnie zmieniono hasło');
            setIsLoggedIn(false);
            setLoading(false);
        }
        else {
            if (result.data == -2)
                alert('Niepoprawne hasło');

            setError(result.data);
            setLoading(false);
        }

    }).catch(e => {
        console.log(e);
        setError(e.data);
        setView(12);
        setLoading(false);
    });
}

export async function DeleteAccount(currentPassword, setLoading, setIsLoggedIn, setView, setError, setDeleteModalOpen, navigate) {
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));

    await axios({
        method: 'DELETE',
        url: `${API_address}${deleteAccount_API_route}`,
        data: {
            currentPassword: currentPassword
        },
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        if (result.data === 0) {
            alert('Pomyślnie usunięto konto');
            setIsLoggedIn(false);
            setLoading(false);
            setDeleteModalOpen(false);
            navigate('/');
        }
        else {
            if (result.data == -2)
                alert('Niepoprawne hasło');

            setError(result.data);
            setLoading(false);
        }

    }).catch(e => {
        console.log(e);
        setError(e.data);
        setView(12);
        setLoading(false);
        setDeleteModalOpen(false);
    });
}



