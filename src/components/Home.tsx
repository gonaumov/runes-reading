import React, { useEffect } from 'react'
import { Dispatch, Action } from 'redux'
import { connect , MapDispatchToProps} from 'react-redux'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { setSelectedSpread, getSpreads } from '../actions/actions'
import  selectedSpread from '../selectors/selected-spread'
import { StaticContext } from 'react-router';

interface StateProps {
  spreads: Array<Spread>
  selectedSpread: Spread | null
}

interface DispatchProps {
  setSelectedSpread: typeof setSelectedSpread,
  getSpreads: typeof getSpreads,
  init: any
}

type Props = StateProps & DispatchProps & RouteComponentProps<{spreadId: string | undefined}, StaticContext, {}>

const Home: React.FC<Props> = (props: Props) => {
  const { 
              spreads, 
    setSelectedSpread, 
       selectedSpread, 
                match,
                init
  } = props

  useEffect(() => {
    if (match.params.spreadId) {
      init(match.params.spreadId)
    } else {
      init('')
    }
  }, [match, setSelectedSpread])
  return (
    <div className='container'>
     <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom box-shadow">
      <h1 className="my-0 mr-md-auto font-weight-normal">
        A simple runic oracle
      </h1>
      <div className='row'>
        <div className='cell'>
          <img src='Valknut.png' alt='Valknut'/>
        </div>
      </div>
    </div>
    {selectedSpread ? 
        <div className="text-justify">
        <div className='font-weight-bold'>
          Spread description: 
        </div>
        {selectedSpread.spread_description}
        </div> : null}
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(selectedSpread === null) 
        return
        props.history.push('/answer/' + selectedSpread.spread_id)
      }}>
        <div className="form-group">
        <label htmlFor='select_spread'>
          Please select spread
          </label>
      <select
        required
        className='form-control' 
        id='select_spread'
        value={selectedSpread ? selectedSpread.spread_id : ''}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
         props.history.push('/'.concat(e.target.value !== '' ? e.target.value : ''))}
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
      </div>
      <div className='form-group'>
      <label htmlFor="question">
        Please type your question
        </label>
      <textarea id="question" required className='form-control'></textarea>
      </div>
      <input className="btn btn-primary" type="submit" value="Cast stones"></input>
      </form>
    </div>
  );
}

const mapStateToProps = (state: State): StateProps => {
  return {
     spreads: state.spreads,
     selectedSpread: selectedSpread(state) 
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch<Action>) => {
  return {
      setSelectedSpread: (spreadNumber: string) => {
          return dispatch(setSelectedSpread(spreadNumber))
      },
      getSpreads: () => (dispatch(getSpreads())),
      init: (spread_number: string) => (dispatch({type: 'INIT', spread_number}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
