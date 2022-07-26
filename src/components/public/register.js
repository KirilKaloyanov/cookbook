import { useState } from "react";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted');
        console.log(user.username);
        console.log(user.password);
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