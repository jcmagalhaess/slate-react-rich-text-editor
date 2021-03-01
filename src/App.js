import React, { Component } from 'react'
import { TextEditor } from './components'
import './scss/main.scss';

class App extends Component {
  render() {
    return (
      <div className='l-app'>
        <TextEditor />
      </div>
    )
  }
}

export default App;