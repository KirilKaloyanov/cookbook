import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";
import { Input } from "../common/input";
import { useEnableButton } from "../../hooks/useEnableButton"; //11import
import styles from './user.module.css';

export function Register() {

    const [error, setError] = useState(null);
    const { isButtonEnabled, disableButton } = useEnableButton(error);  //22destructure
   
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const changeHandler = (e) => {
        setError(null); //33clear errors
        setUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        disableButton(); // 444disable button on submission
        const data = {};

        if (user.username.length < 5 || user.password.length < 5) {
            setError('Username and password must be at least 5 characters long');
            return;
        }

        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match.');
            return;
        } else {
            data.username = user.username;
            data.password = user.password;
        }

        const result = await registerUser(data);
        if (result.errors) {
            setError(result.errors.username.message);
        }
        else {
            navigate('/login', { replace: true })
        }
    }

    return (
        <>
            <div className={styles.form}>
                <h2 className="my-5">Register</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label='Username: '
                        name='username'
                        onChange={changeHandler}
                        value={user.username}
                        autoFocus={true}
                    />

                    <Input
                        label='Password: '
                        name='password'
                        type='password'
                        onChange={changeHandler}
                        value={user.password}
                    />

                    <Input
                        label='Confirm password: '
                        name='confirmPassword'
                        type='password'
                        onChange={changeHandler}
                        value={user.confirmPassword}
                    />

                    <div>
                    {
                        !isButtonEnabled // 55conditionally render disabled button
                        ? <button disabled className="btn btn-primary my-2">Registering ...</button>
                        : <input type='submit' value='Register' className="btn btn-primary my-2" />
                    }
                        </div>
                </form>
                {error && <div className='alert alert-warning'>{error}</div>}
            </div>
        </>
    );
}