import { likeRecipe } from '../../../services/recipeService';
import styles from './../recipe.module.css';

export const Like = ({ user, recipe, onRender }) => {

    const index = recipe.likes.findIndex(rl => rl.user === user.username);

    const handleLike = () => {
        likeRecipe(recipe._id)
            .then(result => onRender(result))
            .catch(err => console.log(err));
    }

    const renderIconStyles = () => {
        return index >= 0 && recipe.likes[index].like
            ? `fa-solid `
            : 'fa-regular';
    }


    return (
        <div >
            <i className={`fa-heart cursor-pointer ${renderIconStyles()} ${styles.redHeart}`} onClick={handleLike} />

        </div>

    );
}