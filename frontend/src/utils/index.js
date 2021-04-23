import jwtDecode from "jwt-decode";

export function isLoggedIn() {
    return sessionStorage.getItem("accessToken") !== null;
}

export function loggedInRole() {
    if (!isLoggedIn()) {
        return "";
    }
    const { role } = jwtDecode(sessionStorage.getItem("accessToken"));
    console.log(role);
    return role;
}
