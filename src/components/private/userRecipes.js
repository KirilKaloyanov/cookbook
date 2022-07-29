import { useState, useEffect } from "react";
import { useNavigate, useParams, Link, useResolvedPath } from "react-router-dom";
import { getUserRecipes } from "../../services/recipeService";

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

    return (
        <>
            <h2>Your recipes</h2>
            <button className="btn btn-primary" onClick={newRecipe}>New recipe</button>
            {!userRecipes.length && message}
            {
                userRecipes
                    .map(r => <li key={r._id}> <Link to={`/${params.user}/${r._id}`}>{r.name} </Link></li>)
            }
        </>
    );
}