import { NavLink } from "react-router-dom";
import css from './navbar.module.css';

export const NavbarItem = ({ name, linkTarget }) => {
    return (
        <NavLink
            className={({ isActive }) => isActive ? css.navlinkActive : css.navlink}
            to={linkTarget}
        >
            {({ isActive }) => (

                <li className={isActive ? css.navitemActive : css.navitem}>{name}</li>
            )}
        </NavLink>
    );
}