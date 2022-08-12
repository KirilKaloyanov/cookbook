import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export function Navbar() {

    const user = useContext(UserContext);
    return (
        <nav>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/recipes'>Recipes</Link>
                </li>
                {!user &&
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/register'>Register</Link>
                        </li>
                    </>
                }           
                {user && 
                    <>
                        <li className="nav-item">
                        <Link className="nav-link" to={`/${user.username}`}>Your recipes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/logout'>Logout</Link>
                        </li>
                    </>
                
                }
            </ul>
        </nav>
    );
}