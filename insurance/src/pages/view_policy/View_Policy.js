import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './View_Policy.css'; // Ensure necessary CSS is defined

const FirePolicyComponent = () => {
  const [firePolicies, setFirePolicies] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Fetch fire policies data from API
    fetch('http://localhost:8080/api/policy/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        // Format the date for each policy
        const formattedPolicies = data.map((policy) => {
          return {
            ...policy,
            // Format date to show only the date (not time)
            formattedDate: new Date(policy.date).toLocaleDateString('en-GB'), // Adjust to your preferred format
          };
        });
        setFirePolicies(formattedPolicies);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  // Error handling
  if (error) {
    return (
      <div className="error-container">
        <p className="error">Error: {error}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Render table if data is available
  return (
    <div className="policy-container">
      {firePolicies.length === 0 ? (
        <p className="no-policies">No policies found.</p>
      ) : (
        <>
        <div className="floating-add-button">
            <button
              className="btn btn-success"
              onClick={() => navigate('/createpolicy')} // Use navigate for routing
            >
              Add Policy
            </button>
          </div>
          <h3 className="text-center">Fire Policy List</h3>
          <table className="policy-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Bank Name</th>
                <th>Policyholder</th>
                <th>Address</th>
                <th>Sum Insured</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {firePolicies.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.id}</td>
                  <td>{policy.formattedDate}</td> {/* Display formatted date */}
                  <td>{policy.bankName}</td>
                  <td>{policy.policyholder}</td>
                  <td>{policy.address}</td>
                  <td>{policy.sumInsurd}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </>
      )}
    </div>
  );
};

export default FirePolicyComponent;
