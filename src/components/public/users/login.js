import { useState } from "react";
import { loginUser } from "../../../services/userService";
import { Input } from "../common/input";
import { useEnableButton } from "../../../hooks/useEnableButton";
import styles from './user.module.css';

export function Login() {

    const [error, setError] = useState(null);
    const { isButtonEnabled, disableButton } = useEnableButton(error);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const changeHandler = (e) => {
        setError(null);
        setUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        disableButton();

        const result = await loginUser(user);
        if (result.message) {
            setError(result.message);
        }
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

                    <div>
                        {
                            !isButtonEnabled 
                            ? <button disabled className="btn btn-primary my-2">Logging in ...</button>
                            : <input type='submit' value='Login' className="btn btn-primary my-2" />
                        }
                    </div>
                </form>
                {error && <div className='alert alert-warning'>{error}</div>}
            </div>
        </>
    );
}