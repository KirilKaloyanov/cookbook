import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getUserRecipes, deleteUserRecipe } from "../../services/recipeService";
import styles from './userRecipes.module.css';

export function UserRecipes() {

    const [userRecipes, setUserRecipes] = useState([]);
    const [message, setMessage] = useState('');
    const [deletion, setRecipeForDeletion] = useState(null);

    useEffect(() => {
        getUserRecipes()
            .then(result => {
                if (!result.message) {
                    setUserRecipes(result);
                }
                else setMessage(result.message);
            })
            .catch(err => console.log(err));
    }, [])

    const params = useParams();
    const navigate = useNavigate();

    function newRecipe() {
        navigate(`/${params.user}/new`)
    }


    function deleteRecipe(recipeId) {
        deleteUserRecipe(recipeId)
            .then(result => {
                if (result.acknowledged) {
                    setUserRecipes(recipes => recipes.filter(r => r._id !== recipeId));
                    setRecipeForDeletion(null);
                }
            })
            .catch(ex => console.log(ex));
    }

    return (
        <>
            <h2>Your recipes</h2>
            <button className="btn btn-primary my-4" onClick={newRecipe}>New recipe</button>
            {!userRecipes.length && !message && <h3>Loading...</h3>}
            <div>{!userRecipes.length && message}</div>
            <ul className="list-group">
                {userRecipes
                    .map(r => <li
                        key={r._id}
                        className='list-group-item d-flex justify-content-between align-items-center'
                    >
                        <Link className="decoration-none" to={`/${params.user}/${r._id}`}>{r.name} </Link>
                        <button
                            className="btn btn-danger mx-2"
                            onClick={() => setRecipeForDeletion(r)}
                        >Delete</button>
                    </li>)
                }
            </ul>
            {
                deletion &&
                <div className={styles.overlay}>
                    <div className={styles.backdrop}>
                        <div className={styles.modal}>
                            Please, confirm deletion of {deletion.name}.
                            <div className={styles.buttons}>
                                <br />
                                <button
                                    className="btn btn-light m-2"
                                    onClick={() => setRecipeForDeletion(null)}
                                >Cancel</button>
                                <button
                                    className="btn btn-danger m-2"
                                    onClick={() => deleteRecipe(deletion._id)}
                                >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}