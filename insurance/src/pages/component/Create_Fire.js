import React, { useState, useEffect } from 'react';

const CreateFire = ({ onSave, currentItem }) => {
  const [formData, setFormData] = useState({ id: '', date: '', name: '', price: '' });

  // Set form data if editing an existing item
  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    } else {
      setFormData({ id: '', date: '', name: '', price: '' });
    }
  }, [currentItem]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if onSave is a function before calling it
    if (onSave && typeof onSave === 'function') {
      onSave(formData); // Call the onSave function passed from the parent
    }
    // Reset form data after saving
    setFormData({ id: '', date: '', name: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
        required
        disabled={!!currentItem} // Disable ID field when editing
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">{currentItem ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default CreateFire;
