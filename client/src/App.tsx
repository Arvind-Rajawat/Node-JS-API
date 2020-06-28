import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  state = {
    response: '',
    //post: '',
    responseToPost: '',
    name: '',
    password: '',
    profession: '',
     id: 0
  };

  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('http://localhost:3001');
    const body = await response.json();
    console.log("body   " + body);
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async () => {
    
    const response = await fetch('http://localhost:3001/db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name, password: this.state.password, profession: this.state.profession }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
            <input
            type="text"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
            <input
            type="text"
            value={this.state.profession}
            onChange={e => this.setState({ profession: e.target.value })}
          />
        
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
export default App;
