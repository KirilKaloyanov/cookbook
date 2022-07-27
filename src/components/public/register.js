import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";

export function Register() {

    const [error, setError] = useState(null);

    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const changeHandler = (e) => {
        setUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {};

        if (user.username.length < 5 || user.password.length < 5) {
            setError({
                username: {
                    message: 'Username and password must be at least 5 characters long'
                }
            });
            return;
        }

        if (user.password !== user.confirmPassword) setError({
            username: {
                message: 'Passwords do not match.'
            }
        }); else {
            data.username = user.username;
            data.password = user.password;
        }

        const result = await registerUser(data);
        if (result.errors) setError(result.errors);
        else {
            navigate('/login', { replace: true })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        id='username'
                        type='text'
                        name='username'
                        onChange={changeHandler}
                        value={user.username}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        onChange={changeHandler}
                        value={user.password}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password: </label>
                    <input
                        id='confirmPassword'
                        type='password'
                        name='confirmPassword'
                        onChange={changeHandler}
                        value={user.confirmPassword}
                    />
                </div>
                <div>
                    <input type='submit' value='Register' />
                </div>
            </form>
            {error && <div>{error.username.message}</div>}
        </>
    );
}