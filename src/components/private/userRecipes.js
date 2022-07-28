import { useState, useEffect } from "react";
import { getUserRecipes } from "../../services/recipeService";

export function UserRecipes() {

    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        getUserRecipes()
            .then(result => setUserRecipes(result))
            .catch(err => console.log(err));
    })
    // async function myFunc() {
    //     const recipes = await getUserRecipes(user._id);
    //     console.log(recipes);
    // }

    // myFunc();
    return (
        <>
            <h2>Your recipes</h2>
            {!userRecipes.length && <div>Loading...</div>}
            {userRecipes.length && 
                userRecipes
                    .map(r => <li key = {r._id}> {r.name} </li>)
            }
        </>
    );
}