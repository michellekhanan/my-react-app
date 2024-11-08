import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Import components
import Home from './components/Home';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      credits: [],
      debits: [],
    };
  }

  componentDidMount() {
    // Fetching data for credits and debits from the API
    Promise.all([
      fetch('https://johnnylaicode.github.io/api/credits.json').then((res) => res.json()),
      fetch('https://johnnylaicode.github.io/api/debits.json').then((res) => res.json())
    ])
      .then(([credits, debits]) => {
        this.setState({ credits, debits }, this.updateAccountBalance);
      })
      .catch((err) => console.error('Error fetching data: ', err));
  }

  // Method to calculate the updated account balance
  updateAccountBalance = () => {
    const totalCredits = this.state.credits.reduce(
      (total, credit) => total + parseFloat(credit.amount),
      0
    );
    const totalDebits = this.state.debits.reduce(
      (total, debit) => total + parseFloat(debit.amount),
      0
    );
    this.setState({
      accountBalance: (totalCredits - totalDebits).toFixed(2),
    });
  };
  
  // Method to add a new credit
  addCredit = (description, amount) => {
    const newCredit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0], // current date in yyyy-mm-dd format
    };

    this.setState(
      (prevState) => ({
        credits: [...prevState.credits, newCredit],
      }),
      this.updateAccountBalance
    );
  };

  // Method to add a new debit
  addDebit = (description, amount) => {
    const newDebit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0], // current date in yyyy-mm-dd format
    };

    this.setState(
      (prevState) => ({
        debits: [...prevState.debits, newDebit],
      }),
      this.updateAccountBalance
    );
  };

  render() {
    return (
      <Router basename="/my-react-app">
        <div>
          <nav>
            <Link to="/">Home</Link> | <Link to="/credits">Credits</Link> | <Link to="/debits">Debits</Link>
          </nav>

          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home accountBalance={this.state.accountBalance} />}
            />
            <Route
              exact
              path="/credits"
              render={() => (
                <Credits
                  credits={this.state.credits}
                  addCredit={this.addCredit}
                  accountBalance={this.state.accountBalance}
                />
              )}
            />
            <Route
              exact
              path="/debits"
              render={() => (
                <Debits
                  debits={this.state.debits}
                  addDebit={this.addDebit}
                  accountBalance={this.state.accountBalance}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
