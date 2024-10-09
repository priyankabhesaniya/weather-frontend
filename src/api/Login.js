import axios from 'axios'; 
import { headers } from '../pages/admin-const/constants';

export const loginUSer = async (userData) => {
    try {
        const response = await axios.post('login', userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
      return error?.response?.data
      throw new Error(error.response?.data?.message || 'Error creating user');
    }
};
export const logOutUSer = async (token) => {
  try {
      const response = await axios.post('logout',{}, headers(token)); // Use the Axios instance
      return response.data; // Return response data if needed
  } catch (error) {
    return error?.response?.data
    throw new Error(error.response?.data?.message || 'Error creating user');
  }
};