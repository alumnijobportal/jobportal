import axios from "axios";

const URL = import.meta.env.VITE_URL;

const handleApiError = (error, apiName) => {
  const errorMsg =
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred";
  return { success: false, message: errorMsg, status: error.response?.status };
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(response);
    
    return {
      success: true,
      data: response.data.response.data,
      message: "Signed Up Successfully!",
    };
  } catch (error) {
    return handleApiError(error, "Register API Error");
  }
};
