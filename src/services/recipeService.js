import { getCurrentUser } from './userService';
import { apiEndpoint } from './apiEndpoint';

const baseUrl = `${apiEndpoint}/recipes`;

export async function getRecipes() {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result;
}

export async function getSingleRecipe(recipeId) {
    const responce = await fetch(baseUrl + '/' + recipeId);
    const result = await responce.json();

    return result;
}

export async function getUserRecipes() {
    const { currentUser, jwt } = getCurrentUser();
    const response = await fetch(`${baseUrl}/users/${currentUser._id}`, {
        method: 'GET',
        headers: {
            'x-auth-token': jwt
        }
    });
    const result = await response.json();
    return result;
}