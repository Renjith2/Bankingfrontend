import { axiosInstance } from ".";

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/user/register', payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    } else {
      return { error: 'Internal server error' };
    }
  }
};


export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/user/login', payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    } else {
      return { error: 'Internal server error' };
    }
  }
};
