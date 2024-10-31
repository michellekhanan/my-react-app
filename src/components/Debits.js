/*==================================================
src/components/Debits.js

The Debits component contains information for the Debits page view.
==================================================*/
import { Link } from 'react-router-dom';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    if (!Array.isArray(debits)) {
      return <li>No debits available</li>; // Handle case when debits is not an array
    }
    
    return debits.map((debit) => {
      let date = debit.date.slice(0, 10);
      return (
        <li key={debit.id}>
          {debit.amount ? debit.amount.toFixed(2) : '0.00'} {debit.description} {date}
        </li>
      );
    });
  };

  // Calculate total debits if needed
  const calculateTotalDebits = () => {
    if (!props.debits || !Array.isArray(props.debits)) {
      return 0;
    }
    return props.debits.reduce((total, debit) => {
      return total + (debit.amount || 0);
    }, 0).toFixed(2);
  };

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <h2>Total Debits: ${calculateTotalDebits()}</h2>
      <ul>{debitsView()}</ul>
      <form onSubmit={props.addDebit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
