import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleRecipe } from '../../../services/recipeService';

export function Recipe() {
    let params = useParams();

    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        getSingleRecipe(params.recipeId)
            .then(result => {setRecipe(result) })
            .catch(err => console.log(err));
    }, [params.recipeId]);

    if (!recipe) return <h1>Loading...</h1>

    return (
        <>
            {recipe && <div>
                <h1 >{recipe.name}</h1>
                <h3>Number of servings: {recipe.numberOfServings}</h3>
                <ul>
                    {recipe.ingredients.map(i =>
                        <li key={i.id}>{i.ingredient}</li>
                    )}
                </ul>
                <ol>
                    {recipe.methods.map(m =>
                        <li key={m.id}>{m.method}</li>
                    )}
                </ol>
                <em>Created by: {recipe.userId.username}</em>
            </div>}

        </>
    );
}