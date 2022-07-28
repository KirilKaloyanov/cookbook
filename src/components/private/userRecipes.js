import { useState, useEffect } from "react";
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

    return (
        <>
            <h2>Your recipes</h2>
            {!userRecipes.length && message}
            {
                userRecipes
                    .map(r => <li key={r._id}> {r.name} </li>)
            }
        </>
    );
}