import { getCurrentUser } from './userService';
import { apiEndpoint } from './apiEndpoint';

const baseUrl = `${apiEndpoint}/recipes`;

export async function getRecipes() {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result;
}

export async function getSingleRecipe(recipeId) {
    const response = await fetch(baseUrl + '/' + recipeId);
    const result = await response.json();
    return result;
}

export async function getUserRecipe(recipeId) {
    const { currentUser, jwt } = getCurrentUser();
    const response = await fetch(`${baseUrl}/users/${currentUser._id}/${recipeId}`, {
        headers: {
            'x-auth-token': jwt
        }
    });
    const result = await response.json();
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

export async function publishRecipe(recipe) {
    const { jwt } = getCurrentUser();

    if (recipe._id) {
        const body = {...recipe};
        delete body._id;
        const response = await fetch(`${baseUrl}/${recipe._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'x-auth-token': jwt
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        return result;
    }

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-auth-token': jwt
        },
        body: JSON.stringify(recipe)
    });
    const result = await response.json();
    return result;
}

export async function deleteUserRecipe(recipeId) {
    const { jwt } = getCurrentUser();
    const response = await fetch(`${baseUrl}/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': jwt
        }
    });
    const result = await response.json();
    return result;
}