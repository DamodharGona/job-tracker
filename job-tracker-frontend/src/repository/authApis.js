import axios from "axios";

export const loginUser = async ({ email, password }) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    console.log("login successful", res.data);
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.error?.message ??
      "Unable to login. Please try again.";

    const code = err.response?.data?.error?.code ?? "LOGIN_FAILED";

    console.error("Login failed:", message, code);
    throw err;
  }
};

export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/register",
      {
        name,
        email,
        password,
      },
      { withCredentials: true },
    );

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
