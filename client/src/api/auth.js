import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export const login = async ({ username, password }) => {
  try {
    const res = await axios.post("/auth/login", {
      username,
      password,
    });
    if (res.status !== 200) {
      throw new Error("Failed to login user");
    }

    return {
      success: true,
      message: res.data.message,
      token: res.data.token,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const register = async ({ username, firstName, lastName, password }) => {
  try {
    const res = await axios.post("/auth/register", {
      username,
      firstName,
      lastName,
      password,
    });
    if (res.status !== 201) {
      throw new Error("Failed to register user");
    }
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
