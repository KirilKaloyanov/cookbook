import { Link } from 'react-router-dom';
import css from './home.module.css';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

export const Home = () => {
    const user = useContext(UserContext)
    return (
        <>
            <h2>Welcome</h2> 
            <div className={css.homeContainer}> 
                <Link className={css.homeLink} to='/recipes'>                
                    <div className={css.homeCard}>Explore recipes</div>
                </Link>
                {
                    !user && <>
                        <Link className={css.homeLink} to='/login'>                        
                            <div className={css.homeCard}>Log in</div>
                        </Link>
                        <Link className={css.homeLink} to='/register'>                        
                            <div className={css.homeCard}>Register</div>
                        </Link>
                    </>
                }
                {
                    user && 
                       <Link className={css.homeLink} to={`/${user.username}`} >                       
                        <div className={css.homeCard}>Your recipes</div>
                       </Link>
                }
            </div>
        </>
    )
}