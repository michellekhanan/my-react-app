// src/components/Credits.js

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Credits({ credits, accountBalance, addCredit }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [fetchedCredits, setFetchedCredits] = useState([]); // State to store fetched credits
  const history = useHistory();

  // Fetch credits from the API when the component mounts
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch('https://johnnylaicode.github.io/api/credits.json');
        const data = await response.json();
        setFetchedCredits(data); // Store the fetched credits in state
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    fetchCredits();
  }, []);

  const handleAddCredit = () => {
    if (description && amount) {
      const newCredit = {
        description,
        amount: parseFloat(amount).toFixed(2), // Round to 2 decimal places
        date: new Date().toISOString().split('T')[0] // Format as yyyy-mm-dd
      };
      addCredit(newCredit); // Call the function passed from App.js to add the credit
      setDescription(''); // Reset description field
      setAmount(''); // Reset amount field
    }
  };

  const handleReturnHome = () => {
    history.push('/'); // Navigate to the Home page
  };

  return (
    <div>
      <h2>Credits</h2>
      
      {/* Display current account balance */}
      <p>Account Balance: ${parseFloat(accountBalance).toFixed(2)}</p>
      
      {/* Display list of credits fetched from the API */}
      <h3>Fetched Credits</h3>
      <ul>
        {fetchedCredits.map((credit, index) => (
          <li key={index}>
            {credit.description} - ${parseFloat(credit.amount).toFixed(2)} on {credit.date}
          </li>
        ))}
      </ul>

      {/* Display list of credits passed from parent component */}
      <h3>Your Credits</h3>
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            {credit.description} - ${parseFloat(credit.amount).toFixed(2)} on {credit.date}
          </li>
        ))}
      </ul>

      {/* Input fields to add a new credit */}
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddCredit}>Add Credit</button>
      </div>

      {/* Return Home button */}
      <button onClick={handleReturnHome} style={{ marginTop: '20px' }}>Return Home</button>
    </div>
  );
}

export default Credits;
