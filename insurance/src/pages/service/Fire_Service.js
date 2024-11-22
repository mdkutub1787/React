const BASE_URL = 'http://localhost:8080/api/fire/'; // Replace with your actual API URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const FireService = {
  getAll: async () => {
    try {
      const response = await fetch(BASE_URL);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching all items:', error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      return null;
    }
  },

  create: async (item) => {
    try {
      const response = await fetch(`${BASE_URL}save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  update: async (id, item) => {
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating item with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete item with ID ${id}`);
      }
      console.log(`Item with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      throw error;
    }
  },
};

export default FireService;
