import jwtDecode from "jwt-decode";
import { profile } from "../http";

export function isLoggedIn() {
  return sessionStorage.getItem("accessToken") !== null;
}

export function loggedInRole() {
  if (!isLoggedIn()) {
    return "";
  }
  const { role } = jwtDecode(sessionStorage.getItem("accessToken"));
  return role;
}

export async function checkVerified() {
  const { data } = await profile();
  const unverifiedStudents = [];
  if (data) {
    const { student_list } = data;
    student_list.forEach(
      ({ verification_status, first_name, last_name, id }) => {
        if (verification_status === false) {
          unverifiedStudents.push({
            name: `${first_name} ${last_name}`,
            id,
          });
        }
      }
    );
  }
  return unverifiedStudents;
}
