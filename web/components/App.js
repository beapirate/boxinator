import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BoxForm from '../components/BoxForm'
import BoxList from '../components/BoxList'


const App = () => (
  <div class="app">

 <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addbox">Add</Link>
            </li>
            <li>
              <Link to="/listboxes">List</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/addbox">
            <BoxForm />
          </Route>
          <Route path="/listboxes">
            <BoxList />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
)

export default App
