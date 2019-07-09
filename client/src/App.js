import React, { Component } from 'react';
import {Time} from './Time';
import {Hello} from './Hello';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Time/>
      <Hello/>
      <Bank/>
      </div>
    );
  }
}

export class Bank extends Component {
  render() {
    return (
      <div className='bank section'>
        <Account accountId='1' to='2'/>
        <Account accountId='2' to='1'/>
      </div>
    );
  }
}

export class Account extends Component {
  constructor() {
    super();
    this.state = {
      secret: '',
      balance: '',
      transfer: '',
      transferResponse: '',
    };
  }

  changeSecret(event) {
    this.setState({ secret: event.target.value });
  }

  changeTransfer(event) {
    this.setState({ transfer: event.target.value });
  }

  refreshBalance() {
    const {to, accountId} = this.props;
    const {secret} = this.state;
    fetch(`http://localhost:3555/bank/balance`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fromAccount: accountId, secret })
    }).then(response => response.text())
      .then(balance => { 
        this.setState({ balance });
      });
  }


  doTransfer() {
    const {to, accountId} = this.props;
    const {secret, transfer} = this.state;
    fetch(`http://localhost:3555/bank/transfer`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromAccount: accountId,
        toAccount: to,
        amount: parseInt(transfer),
        secret,
      })
    }).then(response => response.text())
      .then(t => { this.setState({ transferResponse: t }) });
  }

  render() {
    const { accountId } = this.props;
    const { secret, balance, transfer, transferResponse } = this.state;
    return (
      <div className='account section'>
        Account { accountId }
        <div>
          <input type='text' placeholder="Secret" onChange={this.changeSecret.bind(this)} value={secret}/>
        </div>

        <div>
          <button onClick={this.refreshBalance.bind(this)}>Get Balance</button> { balance }
        </div>

        <div>
          <input type='text' placeholder="Transfer" onChange={this.changeTransfer.bind(this)} value={transfer}/>
          <button onClick={this.doTransfer.bind(this)}>Transfer</button> { transferResponse }
        </div>
      </div>
    );
  }
}

export default App;
