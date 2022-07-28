import jwtDecode from 'jwt-decode';
import { apiEndpoint } from "./apiEndpoint";

const tokenKey = 'token';

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
    if (result.token) localStorage.setItem(tokenKey, result.token);

    return result;
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

//// demo
export async function getUserProfile() {
    const response = await fetch(`${apiEndpoint}/users/me`, {
        method: 'GET',
        headers: {
            'x-auth-token': localStorage.getItem(tokenKey)
        }
    });
    const result = await response.json();
    return result;
}
////