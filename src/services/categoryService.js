import { apiEndpoint } from './apiEndpoint';

export async function getCategories() {
    const responce = await fetch(`${apiEndpoint}/categories`);
    const result = await responce.json();

    return result;
}