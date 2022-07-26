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