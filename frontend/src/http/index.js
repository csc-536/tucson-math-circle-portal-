import axios from "axios";

export const auth = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export async function register({ email, password }) {
    const res = await auth.post("/register", {
        email,
        password,
    });
    console.log(res);
}
