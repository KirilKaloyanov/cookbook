import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getUserRecipes, deleteUserRecipe } from "../../services/recipeService";

export function UserRecipes() {

    const [userRecipes, setUserRecipes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getUserRecipes()
            .then(result => {
                if (!result.message)
                    setUserRecipes(result);
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
                }
            })
            .catch(ex => console.log(ex));
    }

    return (
        <>
            <h2>Your recipes</h2>
            <button className="btn btn-primary my-4" onClick={newRecipe}>New recipe</button>
            {!userRecipes.length && message}
            {
                userRecipes
                    .map(r => <li key={r._id}> 
                        <Link to={`/${params.user}/${r._id}`}>{r.name} </Link>
                        <button className="btn btn-danger m-2" onClick={() => deleteRecipe(r._id)}>Delete</button>
                    </li>)
            }
        </>
    );
}