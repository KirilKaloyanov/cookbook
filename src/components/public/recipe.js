import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Recipe() {
    let params = useParams();

    const [recipe, setRecipe] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/api/recipes/${params.recipeId}`)
            .then(res => res.json())
            .then(data => setRecipe(data))
            .catch(err => console.log(err));
    }, []);
    console.log(recipe);

    return (
        <>
            <div>{recipe.map(r =>
                <div key={r._id}>
                    <h1 >{r.name}</h1>
                    <h3>Number of servings: {r.numberOfServings}</h3>
                    <ul>
                        {r.ingredients.map(i => 
                            <li key = {i}>{i}</li>    
                        )}
                    </ul>
                    <ol>
                        {r.method.map(m => 
                            <li key = {m}>{m}</li>    
                        )}
                    </ol>
                </div>
            ) || <h1>Loading...</h1>}</div>
        </>
    );
}