import React, { Component } from 'react';

export class Time extends Component {
  constructor() {
    super();
    this.state = { time: "" };
  }

  componentDidMount() {
    fetch('http://localhost:3555/time')
      .then(response => response.text())
      .then(currentTime => {
        this.setState({time: currentTime});
      });
  }

  render() {
    const { time } = this.state;
    return (
      <div className='time section'>
      Time is { time }
      </div>
    )
  }
}
