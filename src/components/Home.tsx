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
    <>
     <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        A simple runic oracle
      </h5>
    </div>
    
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
      <div className="text-justify">
      {selectedSpread && selectedSpread.spread_description}
      </div>
    </>
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
