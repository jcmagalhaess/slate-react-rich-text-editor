import React, { Component } from 'react'
import { TextEditor } from './components'
import './assets/scss/main.scss';

class App extends Component {
  render() {
    return (
      <div className='l-app'>
        <div className="c-card">
          <TextEditor />
        </div>
      </div>
    )
  }
}

export default App;