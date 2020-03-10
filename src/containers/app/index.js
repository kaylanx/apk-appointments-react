import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import logo from '../../logo.svg';
import '../../App.css';

const App = () => (
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
          <Link to="/contact-3-2/">Home</Link>
          <Link to="/contact-3-2/about-us">About</Link>
        </header>

        <main>
            <Route exact path="/contact-3-2/" component={Home} />
            <Route exact path="/contact-3-2/about-us" component={About} />
        </main>
    

    </div>
)

export default App