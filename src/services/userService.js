import { apiEndpoint } from "./apiEndpoint";


export async function registerUser(user) {
    const response = await fetch(`${apiEndpoint}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.json();
    return result;
}

export async function loginUser(user) {
    const response = await fetch(`${apiEndpoint}/auth`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.json();
    return result;
}