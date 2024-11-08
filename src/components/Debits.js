import React, { useState } from 'react';

function Debits({ debits, addDebit, accountBalance }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddDebit = () => {
    if (description && amount) {
      addDebit(description, amount);
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div>
      <h2>Debits</h2>
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
        <button onClick={handleAddDebit}>Add Debit</button>
      </div>

      <ul>
        {debits.map((debit, index) => (
          <li key={index}>
            {debit.description} - ${debit.amount.toFixed(2)} - {debit.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Debits;
