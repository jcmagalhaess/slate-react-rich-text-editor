import React, { Component } from 'react'
import { TextEditor } from './components'
import './assets/scss/main.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this)
    this.state = {
      maximize: false
    }

  }

  handler() {
    const currentState = this.state.maximize;
    currentState ? this.setState({ maximize: false }) : this.setState({ maximize: true })
  }

  render() {
    return (
      <div className='l-app'>
        <div className={`c-card ${ this.state.maximize ? 'c-card--maximize' : ''}`}>
          <TextEditor handler={ this.handler } />
        </div>
      </div>
    )
  }
}

export default App;