import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Create_Policy.css'; // Import the CSS file

const FirePolicyCreate = () => {
  const [formData, setFormData] = useState({
    bankName: '',
    policyholder: '',
    address: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // State for controlling the dialog box
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/firepolicy/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
          throw new Error('Failed to create policy');
        }

        // If the response body is empty, handle it without parsing
        if (response.status === 204) {
          return {}; // Return an empty object for success without content
        }

        // Log the response text before parsing it
        return response.text().then((text) => {
          // If text is empty, just return an empty object
          if (text.trim() === '') {
            return {};
          }

          // Try parsing the response as JSON
          try {
            const data = JSON.parse(text); // Parse the response text
            return data;
          } catch (error) {
            throw new Error('Failed to parse JSON: ' + error.message);
          }
        });
      })
      .then(() => {
        setSuccess(true);
        setError(null);
        setShowDialog(true); // Show the dialog box upon success
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    navigate('/viewpolicy'); // Navigate to the "View Policy" page after closing the dialog
  };

  return (
    <div className="policy-form-container">
      <h2>Create Fire Policy</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Policy created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Policyholder:</label>
          <input
            type="text"
            name="policyholder"
            value={formData.policyholder}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Policy</button>
      </form>

      {/* Success Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Policy Created Successfully!</h3>
            <button onClick={handleCloseDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirePolicyCreate;
