import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";

export function Register() {

    const [user, setUser] = useState({
        username: '',
        password: ''
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

        const result = await registerUser(user);

        if (result.errors) console.log(result.errors)
        else navigate('/login', {replace: true})

    }

    return (
        <div>
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
                    <input type='submit' value='Regsiter' />
                </div>
            </form>
        </div>
    );
}