import { likeRecipe } from '../../services/recipeService';

export const Like = ({ user, recipe, onRender }) => {

    const index = recipe.likes.findIndex(rl => rl.user === user.username);

    const handleLike = () => {
        likeRecipe(recipe._id)
            .then(result => onRender(result))
            .catch(err => console.log(err));
    }

    const renderIconCss = () => {
        return index >= 0 && recipe.likes[index].like
            ? 'fa-solid red-heart'
            : 'fa-regular';
    }


    return (
        <div >
            <i className={`fa-heart cursor-pointer ${renderIconCss()}`} onClick={handleLike} />

        </div>

    );
}