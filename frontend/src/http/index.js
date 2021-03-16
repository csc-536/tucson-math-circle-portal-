import axios from "axios";

export const auth = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const main = axios.create({
    baseURL: "http://127.0.0.1:9000",
});

// request interceptor for constructing the authentication header
main.interceptors.request.use(
    function (config) {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken !== null) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

auth.interceptors.response.use(
    function (response) {
        console.log(response.config.url);
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export async function register({ email, password, role }) {
    try {
        const res = await auth.post("/student/register", {
            email,
            password,
            role,
        });
        console.log(res);
        await login({ username: email, password });
    } catch (error) {
        console.log(error.response);
    }
}

export async function login({ username, password }) {
    const querystring = require("querystring");
    const res = await auth.post(
        "/token",
        querystring.stringify({ username, password })
    );
    const { access_token } = res.data;

    sessionStorage.setItem("accessToken", access_token);
}

export async function profile() {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);

    const res = await main.get("/user_router/get_my_profile", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res);
    return res;
}

// TODO: change request format
export async function addProfile(data) {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);

    const res = await main.post("/student/add_profile", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res);
    return res;
}

export async function allMeetings({ role, body }) {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);

    const res = await main.post(`/${role}/get_meetings`, body, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res);
    return res;
}

export async function addMeeting(data) {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);

    const res = await main.post("/meetings_router/add_meeting", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res);
    return res;
}

export async function user() {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);

    const res = await auth.get("/users/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res);
    return res;
}
