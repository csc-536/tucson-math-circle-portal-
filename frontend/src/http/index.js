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

export async function disable(data) {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const res = await auth.put("/student/update_disabled", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
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

  const res = await main.get("/student/get_my_profile", {
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

// TODO: change request format
export async function updateProfile(data) {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);
  console.log(data);
  const res = await main.put("/student/update_profile", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  return res;
}

export async function updateEmail(data) {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

  const res = await auth.put("/student/update_email", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  return res;
}

export async function updatePassword(data) {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

  const res = await auth.put("/student/update_password", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  return res;
}

export async function updateStudentVerification(data) {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

  const res = await main.put("/admin/update_student_verification", data, {
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

  const res = await main.post("/admin/create_meeting", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  return res;
}

export async function updateMeeting(data) {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

  const res = await main.put("/admin/update_meeting", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  return res;
}

export async function deleteMeeting(id) {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

  const res = await main.delete("/admin/delete_meeting", {
    headers: {
      Authorization: accessToken,
    },
    data: {
      meeting_id: id,
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

export async function getAllStudents() {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

  const res = await main.get("/admin/get_student_profiles", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  return res;
}

export async function registerMeeting(data) {
  const res = await main.post("/student/update_student_for_meeting", data);
  console.log(res);
  return res;
}

export async function getS3UploadURL() {
  const res = await auth.post("//...");
}

export async function uploadFile(file) {
  const url = "";
  console.log({
    params: {
      Key: file.name,
      ContentType: file.type,
    },
    headers: {
      "Content-Type": file.type,
    },
  });
  // await axios.put(url, file, {
  //     params: {
  //         Key: file.name,
  //         ContentType: file.type,
  //     },
  //     headers: {
  //         "Content-Type": file.type,
  //     },
  // });
}
