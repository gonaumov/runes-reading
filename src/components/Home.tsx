import React, { useEffect } from 'react'
import { connect , MapDispatchToProps} from 'react-redux'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { setSelectedSpread } from '../actions/actions'
import  selectedSpread from '../selectors/selected-spread'
import { StaticContext } from 'react-router';

interface StateProps {
  spreads: Array<Spread>
  selectedSpread: Spread | null
}

interface DispatchProps {
  setSelectedSpread: typeof setSelectedSpread
}

type Props = StateProps & DispatchProps & RouteComponentProps<{spreadId: string | undefined}, StaticContext, {}>

const Home: React.FC<Props> = (props: Props) => {
  const { spreads, setSelectedSpread, selectedSpread, match } = props

  useEffect(() => {
    if(match.params.spreadId) {
      setSelectedSpread(match.params.spreadId)
    } else {
      setSelectedSpread('')
    }
  }, [match,setSelectedSpread])

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
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(selectedSpread === null) 
        return
        props.history.push('/answer/' + selectedSpread.spread_id)
      }}>
      <select 
        defaultValue=''
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
         props.history.push('/'.concat(e.target.value !== '' ? e.target.value : ''))}
      >
      <option value={selectedSpread ? selectedSpread.spread_id : ''}>Select your spread</option>
        {spreads.map(
          (spread: Spread) =>
            (<option
              key={spread.spread_id}
              value={spread.spread_id}>
              {spread.spread_name}
            </option>))
        }
      </select>
      <textarea required rows={10} cols={10}></textarea>
      <input type="submit" value="Cast stones"></input>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
