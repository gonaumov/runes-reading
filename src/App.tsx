import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from "./components/Home"
import Answer from "./components/Answer"
import { Store } from 'redux';

const App = ({store}: {store: Store<State>}) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/answer/:spreadId(\d+)" component={Answer} />
        <Route path="/:spreadId(\d+)?" component={Home} />
      </Switch>
    </Router>
  </Provider>
)

export default App;
