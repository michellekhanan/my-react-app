import React, { useState } from 'react';

const Credits = ({ credits, addCredit, accountBalance = 0 }) => {  // Default to 0
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCredit(description, parseFloat(amount));
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h2>Credits</h2>
      <h3>Account Balance: ${accountBalance.toFixed(2)}</h3>  {/* Safely calls toFixed */}
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            {credit.description} - ${credit.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Credit</button>
      </form>
    </div>
  );
};

export default Credits;
