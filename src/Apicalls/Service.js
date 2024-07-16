import { axiosInstance } from ".";

export const registerService = async (payload) => {
    try {
      const response = await axiosInstance.post('/api/service/register', payload);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data;
      } else {
        return { error: 'Internal server error' };
      }
    }
  };
  