import React, { useEffect } from 'react'
import { Dispatch, Action } from 'redux'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { connect, MapDispatchToProps } from 'react-redux'
import { setSelectedSpread, getRunes, getSpreads } from '../actions/actions'
import selectedRunes from '../selectors/selected-runes'
import selectedSpread from '../selectors/selected-spread'
import { StaticContext } from 'react-router'

interface StateProps {
  selectedRunes: Array<Rune>
  selectedSpread: Spread | null
}

interface DispatchProps {
  setSelectedSpread: typeof setSelectedSpread
  getRunes: typeof getRunes
  getSpreads: typeof getSpreads
}

type Props = StateProps & DispatchProps & RouteComponentProps<{spreadId: string | undefined}, StaticContext, {}>

const renderRune = (rune: Rune | undefined): JSX.Element | null => {
  if (typeof rune === 'undefined') {
    return null
  }

  return (
  <>
  <p>
   {rune.rune_name}
  </p>  
  <img
    title={rune.rune_name}
    key={rune.rune_id}
    alt={rune.rune_name}
    src={'../images/' + rune.rune_image}
  />
  <p>
   {rune.rune_meaning}
  </p>  
  </>
  )
}

const renderSingle = (runes: Array<Rune>): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col">
          {renderRune(runes.shift())}
        </div>
      </div>
    </>
  )
}

const renderNorn = (runes: Array<Rune>): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
      </div>
    </>
  )
}

const renderFork = (runes: Array<Rune>): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
      </div>
      <div className="row">
        <div className="col">
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
        </div>
      </div>
    </>
  )
}

const renderDiamond = (runes: Array<Rune>): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col">
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
        </div>
      </div>
      <div className="row">
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
      </div>
      <div className="row">
        <div className="col">
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
        </div>
      </div>
    </>
  )
}

const renderCross = (runes: Array<Rune>): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col">
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
        </div>
      </div>
      <div className="row">
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
      </div>
      <div className="row">
        <div className="col">
        </div>
        <div className="col">
          {renderRune(runes.shift())}
        </div>
        <div className="col">
        </div>
      </div>
    </>
  )
}

const Answer: React.FC<Props> = (props: Props) => {
  const { 
          history, 
    selectedRunes, 
   selectedSpread, 
   setSelectedSpread, 
            match, 
            getRunes, 
            getSpreads
  } = props

  useEffect(() => {
    if (selectedRunes.length === 0) {
      getSpreads()
      getRunes()
    }

    if(match.params.spreadId) {
      setSelectedSpread(match.params.spreadId)
    } else {
      setSelectedSpread('')
    }
  }, [match,setSelectedSpread, selectedSpread, getRunes, getSpreads, selectedRunes])

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        This is your answer:
      </h5>
    </div>
    <button className="btn btn-primary" onClick={() => history.push('/' + (selectedSpread !== null ? selectedSpread.spread_id : ''))}>Ask another question</button>
      <div className="container">
        {selectedSpread && selectedSpread.spread_name === 'Cross' && renderCross(selectedRunes)}
        {selectedSpread && selectedSpread.spread_name === 'Diamond' && renderDiamond(selectedRunes)}
        {selectedSpread && selectedSpread.spread_name === 'Fork' && renderFork(selectedRunes)}
        {selectedSpread && selectedSpread.spread_name === 'Norn' && renderNorn(selectedRunes)}
        {selectedSpread && selectedSpread.spread_name === 'Single' && renderSingle(selectedRunes)}
      </div>
    </div>
  );
}

const mapStateToProps = (state: State): StateProps => {
  return {
     selectedSpread: selectedSpread(state),
     selectedRunes: selectedRunes(state) 
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch<Action>) => {
  return {
      setSelectedSpread: (spreadNumber: string) => {
          return dispatch(setSelectedSpread(spreadNumber))
      },
      getSpreads: () => (dispatch(getSpreads())),
      getRunes: () =>   (dispatch(getRunes())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Answer))
