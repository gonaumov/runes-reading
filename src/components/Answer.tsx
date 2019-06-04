import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom"
import { connect, MapDispatchToProps } from 'react-redux'
import { setSelectedSpread } from '../actions/actions'
import selectedRunes from '../selectors/selected-runes'
import selectedSpread from '../selectors/selected-spread'
import { StaticContext } from 'react-router'

interface StateProps {
  selectedRunes: Array<Rune>
  selectedSpread: Spread | null
}

interface DispatchProps {
  setSelectedSpread: typeof setSelectedSpread
}

type Props = StateProps & DispatchProps & RouteComponentProps<{spreadId: string | undefined}, StaticContext, {}>

const Answer: React.FC<Props> = (props: Props) => {
  const { history, selectedRunes , setSelectedSpread, match} = props

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
         Answers Learn React
        </a>
      </header>
      <div>
        {selectedRunes.map(
          (rune: Rune) =>
            <img 
              title={rune.rune_name} 
              key={rune.rune_id} 
              alt={rune.rune_name} 
              src={'../images/' + rune.rune_image} 
            />
        )
        }
      </div>
      <button onClick={() => history.push('/')}>Ask another question</button>
    </div>
  );
}

const mapStateToProps = (state: State): StateProps => {
  return {
     selectedSpread: selectedSpread(state),
     selectedRunes: selectedRunes(state) 
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: any) => {
  return {
      setSelectedSpread: (spreadNumber: string) => {
          return dispatch(setSelectedSpread(spreadNumber))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Answer))
