import React from 'react'
import { connect , MapDispatchToProps} from 'react-redux'
import { setSelectedSpread } from '../actions/actions'
import  selectedSpread from '../selectors/selected-spread'

interface StateProps {
  spreads: Array<Spread>
  selectedSpread: Spread | null
}

interface DispatchProps {
  setSelectedSpread: typeof setSelectedSpread
}

type Props = StateProps & DispatchProps

const App: React.FC<Props> = (props: Props) => {
  const { spreads, setSelectedSpread, selectedSpread } = props
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
      <select 
        defaultValue=''
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
          e.target.value !== '' && setSelectedSpread(e.target.value)}
      >
      <option value=''>Select your spread</option>
        {spreads.map(
          (spread: Spread) =>
            (<option
              key={spread.spread_id}
              value={spread.spread_id}>
              {spread.spread_name}
            </option>))
        }
      </select>
      {selectedSpread && selectedSpread.spread_description}
    </div>
  );
}

const mapStateToProps = (state: State): StateProps => {
  return {
     spreads: state.spreads,
     selectedSpread: selectedSpread(state) 
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: any) => {
  return {
      setSelectedSpread: (spreadNumber: string) => {
          return dispatch(setSelectedSpread(spreadNumber))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
