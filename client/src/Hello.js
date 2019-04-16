import React, { Component } from 'react';
export class Hello extends Component {
  constructor() {
    super();
    this.state = { name: "", response: "" };
  }

  updateName(event) {
    this.setState({ name: event.target.value, response: "" });
  }

  post(event) {
    const { name } = this.state;
    fetch(`http://localhost:3555/hello`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ who: name }),
    }).then(response => response.text())
      .then(t => {
        this.setState({ response: t });
      });
  }


  get(event) {
    const { name } = this.state;
    fetch(`http://localhost:3555/hello/${name}`)
      .then(response => response.text())
      .then(t => {
        this.setState({ response: t });
      });
  }


  render() {
    return (
      <div className='hello section'>
      <input type='text' placeholder="Name" onChange={this.updateName.bind(this)} />
      <button onClick={this.get.bind(this)}>GET</button>
      <button onClick={this.post.bind(this)}>POST</button>
      { this.state.response || "" } 
      </div>
    );
  }
}
