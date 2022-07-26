import { apiEndpoint } from './apiEndpoint';

export async function getCategories() {
    const response = await fetch(`${apiEndpoint}/categories`);
    const result = await response.json();

    return result;
}