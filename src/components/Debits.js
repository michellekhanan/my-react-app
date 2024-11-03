// src/components/Debits.js

import React, { useState } from 'react';

function Debits({ debits, accountBalance, addDebit }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddDebit = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || !description) {
      alert("Please enter a valid description and amount.");
      return;
    }

    const newDebit = {
      description,
      amount: parsedAmount.toFixed(2),
      date: new Date().toISOString().split('T')[0] // Format: yyyy-mm-dd
    };

    addDebit(newDebit);

    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h2>Debits</h2>
      
      {/* Display current account balance */}
      <p>Account Balance: ${parseFloat(accountBalance).toFixed(2)}</p>
      
      {/* Display list of debits */}
      <ul>
        {debits.map((debit, index) => (
          <li key={index}>
            {debit.description} - ${parseFloat(debit.amount).toFixed(2)} on {debit.date}
          </li>
        ))}
      </ul>
      
      {/* Input fields to add a new debit */}
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
        <button onClick={handleAddDebit}>Add Debit</button>
      </div>
    </div>
  );
}

export default Debits;
