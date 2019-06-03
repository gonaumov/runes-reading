import React from 'react';
import { connect } from 'react-redux'

interface StateProps {
  spreads: Array<Spread>
}


const App: React.FC<StateProps> = (props: StateProps) => {
  const { spreads } = props
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
      <select defaultValue="Please select spread">
      <option selected>Select your spread</option>
        {spreads.map(
          (spread: Spread) =>
            (<option
              key={spread.spread_id}
              value={spread.spread_id}>
              {spread.spread_name}
            </option>))
        }
      </select>
    </div>
  );
}

const mapStateToProps = (state: State): StateProps => {
  return {
     spreads: state.spreads 
  }
}

export default connect(mapStateToProps)(App)
