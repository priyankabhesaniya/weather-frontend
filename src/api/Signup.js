import axios from 'axios'; 

export const createUser = async (userData) => {
    try {
        const response = await axios.post('users', userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};
