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
  const { history, selectedRunes , selectedSpread, setSelectedSpread, match} = props

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
        This is your answer:
      </h5>
    </div>
      <div>
        {selectedRunes.map(
          (rune: Rune) =>
            <img 
              className="img-thumbnail" 
              title={rune.rune_name} 
              key={rune.rune_id} 
              alt={rune.rune_name} 
              src={'../images/' + rune.rune_image} 
            />
        )
        }
      </div>
      <button className="btn btn-primary" onClick={() => history.push('/' + (selectedSpread !== null ? selectedSpread.spread_id : ''))}>Ask another question</button>
    </>
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
