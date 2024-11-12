import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Import components
import Home from './components/Home';
import Credits from './components/Credits';
import Debits from './components/Debits';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  componentDidMount() {
    const creditsURL = 'https://johnnylaicode.github.io/api/credits.json';
    const debitsURL = 'https://johnnylaicode.github.io/api/debits.json';

    Promise.all([
      fetch(creditsURL).then(res => res.json()),
      fetch(debitsURL).then(res => res.json())
    ])
    .then(([credits, debits]) => {
      this.setState({
        creditList: credits,
        debitList: debits,
        accountBalance: this.calculateBalance(credits, debits)
      });
    })
    .catch(error => console.error("Error fetching data: ", error));
  }

  calculateBalance = (credits, debits) => {
    const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = debits.reduce((sum, debit) => sum + debit.amount, 0);
    return totalCredits - totalDebits;
  }

  addCredit = (description, amount) => {
    const newCredit = { description, amount: parseFloat(amount) };
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
      accountBalance: prevState.accountBalance + parseFloat(amount)
    }));
  };

  addDebit = (description, amount) => {
    const newDebit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    };
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit],
      accountBalance: prevState.accountBalance - parseFloat(amount)
    }));
  };

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser, userName: logInInfo.userName };
    this.setState({ currentUser: newUser });
  }

  render() {
    return (
      <Router basename="/my-react-app">
        <div>
          <nav>
            <Link to="/">Home</Link> | 
            <Link to="/userProfile">UserProfile</Link> | 
            <Link to="/login">Log In</Link> | 
            <Link to="/credits">Credits</Link> | 
            <Link to="/debits">Debits</Link>
          </nav>

          <Switch>
            <Route 
              exact 
              path="/" 
              render={() => (
                <Home accountBalance={this.state.accountBalance} />
              )} 
            />
            <Route 
              exact 
              path="/userProfile" 
              render={() => (
                <UserProfile 
                  userName={this.state.currentUser.userName} 
                  memberSince={this.state.currentUser.memberSince} 
                />
              )} 
            />
            <Route 
              exact 
              path="/login" 
              render={() => (
                <LogIn 
                  user={this.state.currentUser} 
                  mockLogIn={this.mockLogIn} 
                />
              )} 
            />
            <Route 
              exact 
              path="/credits" 
              render={() => (
                <Credits 
                  credits={this.state.creditList} 
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
                  debits={this.state.debitList} 
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
