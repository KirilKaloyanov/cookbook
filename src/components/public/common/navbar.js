import { Link } from "react-router-dom";

export function Navbar({ user }) {
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
                            <Link className="nav-link" to='/recipes'>{user.username}</Link>
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