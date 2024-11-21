import React, { useEffect, useState } from 'react';

const BillComponent = () => {
  const [firePolicies, setFirePolicies] = useState([]);
  const [bills, setBills] = useState([]); // Add state for bills
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    // Fetch fire policies data
    fetch('http://localhost:8080/api/policy/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch fire policies');
        }
        return response.json();
      })
      .then((data) => {
        // Format the date for each policy
        const formattedPolicies = data.map((policy) => ({
          ...policy,
          formattedDate: new Date(policy.date).toLocaleDateString('en-GB'), // Adjust to your preferred format
        }));
        setFirePolicies(formattedPolicies);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Fetch bills data
    fetch('http://localhost:8080/api/bill/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch bills');
        }
        return response.json();
      })
      .then((data) => {
        setBills(data);
        setLoading(false); // Set loading to false after both data sets are fetched
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
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // Merge fire policies and bills based on policyId
  const mergedData = firePolicies.map((policy) => {
    const associatedBills = bills.filter((bill) => bill.policyId === policy.id); // Match bills to the policy
    return {
      ...policy,
      bills: associatedBills, // Attach the bills to each policy
    };
  });

  // Render table if data is available
  return (
    <div className="policy-container">
      {mergedData.length === 0 ? (
        <p className="no-policies">No policies found.</p>
      ) : (
        <>
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
                <th>Bill Fire</th>
                <th>Bill Net Premium</th>
                <th>Bill Tax</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {mergedData.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.id}</td>
                  <td>{policy.formattedDate}</td>
                  <td>{policy.bankName}</td>
                  <td>{policy.policyholder}</td>
                  <td>{policy.address}</td>
                  <td>{policy.sumInsured}</td>
                  <td>{policy.bills[0]?.fire || 'N/A'}</td> {/* Using bills */}
                  <td>{policy.bills[0]?.netPremium || 'N/A'}</td>
                  <td>{policy.bills[0]?.tax || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BillComponent;
