import { apiEndpoint } from "./apiEndpoint";

const baseUrl = `${apiEndpoint}/users`;

export async function registerUser(user) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    // if (response.ok) {
        const result = await response.json();

        return result;
    // } else {
    //     throw { message: 'Unable to register the user.'}
    // }
}