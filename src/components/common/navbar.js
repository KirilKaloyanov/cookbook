import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { NavbarItem } from "./navbarItem";
import css from './navbar.module.css';
import logo from '../../img/logo.jpg';

export function Navbar() {

    const user = useContext(UserContext);
    return (
        <nav className={css.navWrapper}>
            <Link to='/'>
                <img src={logo} alt='logo' className={css.logoImg} />
            </Link>
            <ul className={css.navi}>

                <NavbarItem name='Recipes' linkTarget='/recipes' />

                {!user &&
                    <>
                        <NavbarItem name='Login' linkTarget='/login' />
                        <NavbarItem name='Register' linkTarget='/register' />

                    </>
                }
                {user &&
                    <>
                        <NavbarItem name='Your recipes' linkTarget={`/${user.username}`} />
                        <NavbarItem name='Logout' linkTarget='/logout' />

                    </>

                }
            </ul>
        </nav>
    );
}