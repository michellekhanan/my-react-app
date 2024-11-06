// App.js
<<<<<<< HEAD

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
=======

import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';

>>>>>>> 5f7ee7cd2e3d19f31624b18cb42c5d6e5a9ce8cf

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Achapko200',
        memberSince: '11/22/99',
      }
    };
  }

  // Method to calculate the updated account balance
  updateAccountBalance = () => {
    const totalCredits = this.state.creditList.reduce((total, credit) => total + parseFloat(credit.amount), 0);
    const totalDebits = this.state.debitList.reduce((total, debit) => total + parseFloat(debit.amount), 0);
    return (totalCredits - totalDebits).toFixed(2);
  }

  // Method to add a new credit
  addCredit = (newCredit) => {
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit]
    }), () => {
      this.setState({ accountBalance: this.updateAccountBalance() });
    });
  }

  // Method to add a new debit
  addDebit = (newDebit) => {
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit]
    }), () => {
      this.setState({ accountBalance: this.updateAccountBalance() });
    });
  }

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.updateAccountBalance()} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        accountBalance={this.updateAccountBalance()}
        addCredit={this.addCredit}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        accountBalance={this.updateAccountBalance()}
        addDebit={this.addDebit}
      />
    );

    return (
      <Router basename="/my-react-app">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
