import { logout } from "../../../services/userService";

export function Logout() {
    logout();
    window.location = '/';
}