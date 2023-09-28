import axios from "axios";

const apiServerUrl = "http://localhost:8081";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiServerUrl}/user/login`, {
      email,
      password,
    });

    const { data } = response;
    const { access_token } = data;

    return {
      data: access_token,
      error: null,
    };
  } catch (error) {
    // Handle error
    if (error.response && error.response.status === 401) {
      return {
        data: null,
        error: "Wrong login details!",
      };
    } else {
      return {
        data: null,
        error: "Login failed",
      };
    }
  }
};

export const signupUser = async (fullname, email, password) => {
  try {
    const response = await axios.post(`${apiServerUrl}/user/signup`, {
      fullname,
      email,
      password,
    });

    const { data } = response;

    const { access_token } = data;
    localStorage.setItem("access_token: ", access_token);
    return {
      data: access_token,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || "Signup failed.",
    };
  }
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token: ");
};

export const isAuthenticated = () => {
  const token = getTokenFromLocalStorage();
  console.log("IsAuthenticated:", token !== null && token !== undefined);
  return token !== null && token !== undefined;
};

export const logoutUser = async () => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.log("No token found. User is already logged out");
      return false;
    }

    await axios.post(`${apiServerUrl}/user/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("access_token: ");
    console.log("User logged out successfully.");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};
