import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu/Menu'
import Main from './Components/Main/Main';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    return (
      <div>
        <Menu/>>
        <main style={{position: 'relative', height: 'calc(100vh - 50px)'}}>
          <Main/>
        </main>
      </div>
    );
  }
}