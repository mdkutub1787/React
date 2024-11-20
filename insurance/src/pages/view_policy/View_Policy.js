import React, { useEffect, useState } from 'react';
import './View_Policy.css'; // Make sure to define necessary CSS

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
    return (
      <div>
        <p className="error">Error: {error}</p> 
        <button onClick={() => window.location.reload()}>Retry</button> {/* Retry button */}
      </div>
    );
  }

  return (
    <div className="policy-container">
      {firePolicies.length === 0 ? (
        <p className="no-policies">No policies found.</p> // Styled message for no policies
      ) : (
        <>
          <h3 className="text-center">Fire Policy List</h3>
          <table className="policy-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Bank Name</th>
                <th>Policyholder</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {firePolicies.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.id}</td>
                  <td>{policy.bankName}</td>
                  <td>{policy.policyholder}</td>
                  <td>{policy.address}</td>
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
