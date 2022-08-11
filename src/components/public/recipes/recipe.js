import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleRecipe } from '../../../services/recipeService';
import { RecipeComment } from './recipeComment';
import { NewComment } from '../../private/newComment';
import { Like } from '../../private/like';
import { UserContext } from '../../contexts/UserContext';

export function Recipe() {
    let params = useParams();
    const user = useContext(UserContext);

    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        getSingleRecipe(params.recipeId)
            .then(result => { setRecipe(result) })
            .catch(err => console.log(err));
    }, [params.recipeId]);

    const callRerender = recipe => {setRecipe(recipe)};

    if (!recipe) return <h1>Loading...</h1>

    return (
        <>
            {recipe && <div>
                <h2 >{recipe.name}</h2>
                <div className='badge rounded-pill p-2 m-2 bg-info'>{recipe.category.name}</div>
                <span className='border border-secondary rounded-4 px-2 py-1 m-1'>
                    <i className='red-heart fa-heart fa-solid m-2' />
                    {recipe.likes.filter(rl => rl.like === true).length}
                </span>
                <h5>Number of servings: {recipe.numberOfServings}</h5>
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
                {user && <Like user={user} recipe={recipe} onRender={callRerender}/>}

                {
                    recipe.comments.length > 0 &&
                    <><h4 className='mt-4'>Comments</h4> {recipe.comments.map(comment => 
                        <RecipeComment  key={comment._id} c={comment} />
                    )}
                    </>
                }
                {user && <NewComment recipe={recipe} onRender={callRerender}/>}
            </div>}

        </>
    );
}