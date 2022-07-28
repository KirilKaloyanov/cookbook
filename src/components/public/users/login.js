import { useState } from "react";
import { loginUser } from "../../../services/userService";
import { Input } from "./input";
import styles from './user.module.css';

export function Login() {

    const [error, setError] = useState(null);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const changeHandler = (e) => {
        setUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await loginUser(user);
        if (result.message) setError(result.message);
        else {
            window.location = '/';
        }
    }

    return (
        <>
            <div className={styles.form}>
                <h2 className="my-5">Login</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label='Username: '
                        name='username'
                        type='text'
                        onChange={changeHandler}
                        value={user.username}
                    />

                    <Input
                        label='Password: '
                        name='password'
                        type='password'
                        onChange={changeHandler}
                        value={user.password}
                    />

                    <div>
                        <input type='submit' value='Login' className="btn btn-primary my-2" />
                    </div>
                </form>
                {error && <div className='alert alert-warning'>{error}</div>}
            </div>
        </>
    );
}