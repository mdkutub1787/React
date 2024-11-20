import React, { useEffect, useState } from 'react';
import './FirePolicyComponent.css'; // Import the CSS file

const FirePolicyComponent = () => {
  const [firePolicies, setFirePolicies] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    fetch('http://localhost:8080/api/firepolicy/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setFirePolicies(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>; // Show loading message with styling
  }

  if (error) {
    return <p className="error">Error: {error}</p>; // Show error message with styling
  }

  return (
    <div>
      {firePolicies.length === 0 ? (
        <p className="no-policies">No policies found.</p> // Styled message for no policies
      ) : (
        <ul>
          {firePolicies.map((policy) => (
            <li key={policy.id}>
              <strong>Bank:</strong> {policy.bankName} | 
              <strong> Policyholder:</strong> {policy.policyholder} | 
              <strong> Address:</strong> {policy.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FirePolicyComponent;
