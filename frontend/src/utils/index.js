export function isLoggedIn() {
  return sessionStorage.getItem("accessToken") !== null;
}

export function loggedInRole() {
  return "coordinator";
}
