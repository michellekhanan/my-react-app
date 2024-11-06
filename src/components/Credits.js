// src/components/Credits.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Credits({ credits, accountBalance, addCredit }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const history = useHistory();

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

  return (
    <div>
      <h1>Credits</h1>
      <h3>Account Balance: ${parseFloat(accountBalance).toFixed(2)}</h3> {/* Display balance rounded to 2 decimals */}

      <div>
        <h2>Add a New Credit</h2>
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

      <h2>Credits List</h2>
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            {credit.description} - ${parseFloat(credit.amount).toFixed(2)} on {credit.date}
          </li>
        ))}
      </ul>

      <button onClick={() => history.push('/')}>Return Home</button> {/* Return Home button */}
    </div>
  );
}

export default Credits;
