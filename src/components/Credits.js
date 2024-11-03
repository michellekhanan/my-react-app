/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';

const Credits = (props) => {
  // Calculate total credits if credits are passed as props
  const calculateTotalCredits = () => {
    if (!props.credits || !Array.isArray(props.credits)) {
      return 0; // Return 0 if credits are not defined or not an array
    }
    return props.credits.reduce((total, credit) => {
      return total + (credit.amount || 0); // Use credit.amount if it exists
    }, 0).toFixed(2); // Ensure the result is formatted as a fixed decimal
  };

  return (
    <div>
      <h1>Credits</h1>
      <h2>Total Credits: ${calculateTotalCredits()}</h2>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
