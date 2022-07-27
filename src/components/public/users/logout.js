export function Logout() {
    localStorage.removeItem('token');
    window.location = '/';
}