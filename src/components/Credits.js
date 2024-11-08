import React, { useState } from 'react';

function Credits({ credits, addCredit, accountBalance }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddCredit = () => {
    if (description && amount) {
      addCredit(description, amount);
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div>
      <h2>Credits</h2>
      <h3>Account Balance: ${accountBalance}</h3>

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

      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            {credit.description} - ${credit.amount.toFixed(2)} - {credit.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Credits;
