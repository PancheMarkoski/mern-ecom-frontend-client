import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const userRegister = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/register`, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const userLogin = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/login`, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getUserWishlist = async () => {
  try {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch blog data. Please try again.";
    throw new Error(errorMessage);
  }
};

const updateUser = async (updateUserData) => {
  try {
    const response = await axios.put(
      `${base_url}user/edit-user`,
      updateUserData,
      config
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch blog data. Please try again.";
    throw new Error(errorMessage);
  }
};

const forgotPasswordEmailSend = async (email) => {
  try {
    const response = await axios.post(
      `${base_url}user/forgot-password-token`,
      email,
      config
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch blog data. Please try again.";
    throw new Error(errorMessage);
  }
};

const resetPassword = async (resetPasswordData) => {
  console.log("resetPasswordData", resetPasswordData);
  try {
    const response = await axios.put(
      `${base_url}user/reset-password/${resetPasswordData.token}`,
      { password: resetPasswordData.password },
      config
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch blog data. Please try again.";
    throw new Error(errorMessage);
  }
};

const userService = {
  userRegister,
  userLogin,
  updateUser,
  getUserWishlist,
  forgotPasswordEmailSend,
  resetPassword,
};

export default userService;
