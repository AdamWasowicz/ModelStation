import axios from "axios";
import { API_address, login_API_route, register_API_route, changeUserPassword_API_route, deleteAccount_API_route, unbanUser_API_route, banUser_API_route, changeRole_API_route, changeUserPassword_Admin_API_route} from "../API_routes";


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

export async function ChangePasswordByUserName(userName, newPassword, setLoading, setError) {
    setLoading(true);
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));

    await axios({
        method: 'PATCH',
        url: `${API_address}${changeUserPassword_Admin_API_route}`,
        data: {
            userName: userName,
            currentPassword: '',
            newPassword: newPassword
        },
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        if (result.data == 0) {
            alert('Pomyślnie zmieniono hasło');
            setLoading(false);
            return;
        }
        else {
            setError(result.data);
            alert('Nie udało się zmienić hasła');
            setLoading(false);
            return;
        }

    }).catch(e => {
        alert('Nie udało się zmienić hasła');
        setError(e.data);
        setLoading(false);
        return;
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

export async function BanUser(userName, setLoading, setError) {
    const jwt = JSON.parse(window.localStorage.getItem('jwt'));

    setLoading(true);

    await axios({
        method: 'PATCH',
        url: `${API_address}${banUser_API_route}/${userName}`,
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        if (result.status === 200)
        {
            alert('Zbanowano użytkownika: ' + userName);
            setLoading(false);
            return;
        }
        else
        {
            setError(-1);
            alert('Nie udało się zbanować użytkownika');
            setLoading(false);
            return;
        }

    }).catch(e => {
        setError(-2);
        alert('Nie udało się zbanować użytkownika');
        setLoading(false);
        return;
    });
}

export async function UnBanUser(userName, setLoading, setError) {

    const jwt = JSON.parse(window.localStorage.getItem('jwt'));
    setLoading(true);

    await axios({
        method: 'PATCH',
        url: `${API_address}${unbanUser_API_route}/${userName}`,
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        if (result.status === 200)
        {
            alert('Odbanowano użytkownika: ' + userName);
            setLoading(false);
            return;
        }
        else
        {
            setError(-1);
            alert('Nie udało się odbanować użytkownika')
            setLoading(false);
            return;
        }

    }).catch(e => {
        setError(-2)
        alert('Nie udało się odbanować użytkownika')
        setLoading(false);
        return;
    });
}

export async function ChangeRole(userName, roleId, setLoading, setError) {

    const jwt = JSON.parse(window.localStorage.getItem('jwt'));
    setLoading(true);

    await axios({
        method: 'PATCH',
        url: `${API_address}${changeRole_API_route}`,
        data: {
            userName: userName,
            newRoleId: roleId
        },
        headers: {
            Authorization: "Bearer " + jwt
        },
    }).then(result => {
        if (result.status === 200)
        {
            alert('Zmieniono role użytkownika: ' + userName);
            setLoading(false);
            return;
        }
        else
        {
            setError(-1);
            alert('Nie udało się zmienić role użytkownika')
            setLoading(false);
            return;
        }

    }).catch(e => {
        setError(-2)
        alert('Nie udało się zmienić role użytkownika')
        setLoading(false);
        return;
    });
}

